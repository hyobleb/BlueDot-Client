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
  userAssignSeat,
  userAssignSeatVariables,
  userProfile
} from "../../types/api";
import HomePresenter from "./HomePresenter";
import { GET_BRANCH_BY_IP, USER_ASSIGN_SEAT } from "./HomeQueries";

interface IState {
  isMenuOpen: boolean;
  nowIp: string;
  nowBranchId: number | null;
  loungeImage: string;
  minimapImage: string;
  rooms: getBranchByIp_UserGetBranchByIP_branch_rooms | null;
  branchLoaded: boolean;
  nowRoomId: number;
  assignSeatId: number | null;
}
interface IProps extends RouteComponentProps<any> {}

class AssignSeatMutation extends Mutation<
  userAssignSeat,
  userAssignSeatVariables
> {}
class GetBranchByIpQuery extends Query<getBranchByIp, getBranchByIpVariables> {}
class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public assignSeatFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      assignSeatId: null,
      branchLoaded: false,
      isMenuOpen: false,
      loungeImage: "",
      minimapImage: "",
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
      assignSeatId
    } = this.state;
    return (
      <AssignSeatMutation
        mutation={USER_ASSIGN_SEAT}
        refetchQueries={[
          { query: GET_SEATS, variables: { roomId: nowRoomId } },
          { query: GET_BRANCH_BY_IP, variables: { ip: nowIp } }
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
                      onSeatsPopUpCloseClick={this.onSeatsPopUpCloseClick}
                      onSeatClick={this.onSeatClick}
                      assignSeatId={assignSeatId}
                      assignSeatLoading={assignSeatLoading}
                    />
                  )}
                </ProfileQuery>
              )}
            </GetBranchByIpQuery>
          );
        }}
      </AssignSeatMutation>
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
        const { loungeImage, minimapImage, rooms } = branch;
        this.setState({
          branchLoaded: true,
          loungeImage,
          minimapImage,
          rooms
        } as any);
      }
    }
  };

  public onRoomClick = (roomId: number) => {
    this.setState({ nowRoomId: roomId });
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
}
export default HomeContainer;
