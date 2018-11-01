import ip from "ip";
import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_SEATS } from "src/Components/Room/RoomQueries";
import { USER_PROFILE } from "../../Components/sharedQueries";
import {
  getBranchByIp,
  getBranchByIp_UserGetBranchByIP_branch_rooms,
  getBranchByIpVariables,
  getMyUsingSeat,
  userAssignSeat,
  userAssignSeatVariables,
  userProfile,
  userReturnSeat
} from "../../types/api";
import HomePresenter from "./HomePresenter";
import {
  GET_BRANCH_BY_IP,
  GET_MY_USING_SEAT,
  USER_ASSIGN_SEAT,
  USER_RETURN_SEAT
} from "./HomeQueries";

interface IState {
  isMenuOpen: boolean;
  nowIp: string;
  nowBranchId: number | null;
  loungeImage: string;
  minimapImage: string;
  rooms: [getBranchByIp_UserGetBranchByIP_branch_rooms] | null;
  branchLoaded: boolean;
  nowRoomId: number;
  assignSeatId: number | null;
  branchName: string;
  myUsingSeatId: number | null;
}
interface IProps extends RouteComponentProps<any> {}

class GetMyUsingSeatMutation extends Query<getMyUsingSeat> {}
class ReturnSeatMutation extends Mutation<userReturnSeat> {}
class AssignSeatMutation extends Mutation<
  userAssignSeat,
  userAssignSeatVariables
> {}
class GetBranchByIpQuery extends Query<getBranchByIp, getBranchByIpVariables> {}
class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public assignSeatFn: MutationFn;
  public returnSeatFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      assignSeatId: null,
      branchLoaded: false,
      branchName: "",
      isMenuOpen: false,
      loungeImage: "",
      minimapImage: "",
      myUsingSeatId: null,
      nowBranchId: null,
      nowIp: ip.address(),
      nowRoomId: 0,
      rooms: null
    };
  }

  public render() {
    const {
      isMenuOpen,
      nowIp,
      branchLoaded,
      loungeImage,
      minimapImage,
      rooms,
      nowRoomId,
      assignSeatId,
      branchName,
      myUsingSeatId
    } = this.state;
    return (
      <GetMyUsingSeatMutation
        query={GET_MY_USING_SEAT}
        onCompleted={data => {
          if ("GetMyUsingSeat" in data) {
            const { GetMyUsingSeat } = data;
            if (GetMyUsingSeat.ok) {
              if (GetMyUsingSeat.seat) {
                this.setState({ myUsingSeatId: GetMyUsingSeat.seat.id });
              } else {
                this.setState({ myUsingSeatId: null });
              }
            } else {
              toast.error(GetMyUsingSeat.error);
            }
          }
        }}
        fetchPolicy={"cache-and-network"}
      >
        {() => {
          return (
            <ReturnSeatMutation
              mutation={USER_RETURN_SEAT}
              refetchQueries={[
                { query: GET_BRANCH_BY_IP, variables: { ip: nowIp } },
                { query: GET_MY_USING_SEAT }
              ]}
              onCompleted={data => {
                const { UserReturnSeat } = data;
                if (UserReturnSeat.ok) {
                  toast.success("좌석을 반납했습니다!");
                } else {
                  toast.error(UserReturnSeat.error);
                }
              }}
            >
              {userReturnSeatMutation => {
                this.returnSeatFn = userReturnSeatMutation;
                return (
                  <AssignSeatMutation
                    mutation={USER_ASSIGN_SEAT}
                    refetchQueries={[
                      { query: GET_SEATS, variables: { roomId: nowRoomId } },
                      { query: GET_BRANCH_BY_IP, variables: { ip: nowIp } },
                      { query: GET_MY_USING_SEAT }
                    ]}
                    onCompleted={data => {
                      const { UserAssignSeat } = data;
                      if (UserAssignSeat.ok) {
                        toast.success("좌석을 배정했습니다!");
                        this.setState({
                          assignSeatId: null
                        });
                      } else {
                        toast.error(UserAssignSeat.error);
                      }
                    }}
                    onError={err => {
                      if (err.graphQLErrors[0].message) {
                        toast.error(err.graphQLErrors[0].message);
                      }
                    }}
                  >
                    {(assignSeatMutation, { loading: assignSeatLoading }) => {
                      this.assignSeatFn = assignSeatMutation;
                      return (
                        <GetBranchByIpQuery
                          query={GET_BRANCH_BY_IP}
                          variables={{ ip: nowIp }}
                          onCompleted={this.updateFields}
                          fetchPolicy={"cache-and-network"}
                        >
                          {({ loading: branchLoading }) => (
                            <ProfileQuery query={USER_PROFILE}>
                              {({ loading: profileLoading }) => (
                                <HomePresenter
                                  profileLoading={profileLoading}
                                  branchLoading={branchLoading}
                                  isMenuOpen={isMenuOpen}
                                  toggleMenu={this.toggleMenu}
                                  branchLoaded={branchLoaded}
                                  loungeImage={loungeImage}
                                  minimapImage={minimapImage}
                                  rooms={rooms}
                                  onRoomClick={this.onRoomClick}
                                  nowRoomId={nowRoomId}
                                  onSeatsPopUpCloseClick={
                                    this.onSeatsPopUpCloseClick
                                  }
                                  onSeatClick={this.onSeatClick}
                                  assignSeatId={assignSeatId}
                                  assignSeatLoading={assignSeatLoading}
                                  onEntranceClick={this.onEntranceClick}
                                  onReturnClick={this.onReturnClick}
                                  branchName={branchName}
                                  myUsingSeatId={myUsingSeatId}
                                />
                              )}
                            </ProfileQuery>
                          )}
                        </GetBranchByIpQuery>
                      );
                    }}
                  </AssignSeatMutation>
                );
              }}
            </ReturnSeatMutation>
          );
        }}
      </GetMyUsingSeatMutation>
    );
  }
  // 자동으로 실행되는 query를 skip하고 싶으면 query 속성에 skip을 추가해주면 됨
  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public updateFields = (data: {} | getBranchByIp) => {
    if ("UserGetBranchByIP" in data) {
      const {
        UserGetBranchByIP: { branch }
      } = data;

      if (branch !== null) {
        const { loungeImage, minimapImage, rooms, name } = branch;
        this.setState({
          branchLoaded: true,
          branchName: name,
          loungeImage,
          minimapImage,
          rooms
        } as any);
      }
    }
  };

  public onRoomClick = (roomId: number) => {
    const { rooms } = this.state;
    if (!rooms) {
      toast.error("지점 및 열람실 정보가 제대로 불러오지 않았습니다");
    } else {
      const findRoom = rooms.find(room => room.id === roomId);
      if (!findRoom) {
        toast.error("해당 열람실을 찾을 수 없습니다");
      } else {
        if (!findRoom.usable) {
          toast.error("해당 열람실은 현재 이용할수 없습니다");
        } else {
          this.setState({ nowRoomId: roomId });
        }
      }
    }
  };

  public onSeatsPopUpCloseClick = () => {
    this.setState({ nowRoomId: 0 });
  };

  public onSeatClick = (seatId: number) => {
    this.setState(
      {
        assignSeatId: seatId
      },
      () => this.assignSeatFn({ variables: { seatId } })
    );
  };

  public onEntranceClick = () => {
    this.setState({ nowRoomId: 0 });
  };

  public onReturnClick = async () => {
    await this.returnSeatFn();
  };
}
export default HomeContainer;
