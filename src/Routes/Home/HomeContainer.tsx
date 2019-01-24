import moment from "moment";
import publicIp from "public-ip";
import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_SEATS } from "src/Components/Room/RoomQueries";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  GET_USABLE_MY_MEMBERSHIPS,
  USER_PROFILE
} from "../../Components/sharedQueries";
import {
  getBranchByIp,
  getBranchByIp_UserGetBranchByIP_branch_rooms,
  getBranchByIpVariables,
  getMyUsingSeat,
  getUsableMyMemberships,
  getUsableMyMemberships_GetMyUsableMemberships_memberships,
  userAssignSeat,
  userAssignSeatVariables,
  userGetBranch,
  userProfile,
  userProfile_GetMyProfile_user,
  userReturnSeat
} from "../../types/api";
import HomePresenter from "./HomePresenter";
import {
  GET_BRANCH_BY_IP,
  GET_MY_USING_SEAT,
  USER_ASSIGN_SEAT,
  USER_GET_BRANCH,
  USER_RETURN_SEAT
} from "./HomeQueries";

const Button = styled(SmallButton)`
  color: black;
  width: 180px;
`;

interface IState {
  isMenuOpen: boolean;
  nowIp: string;
  branchIdByIp: number;
  nowBranchId: number | null;
  loungeImage: string;
  minimapImage: string;
  rooms: [getBranchByIp_UserGetBranchByIP_branch_rooms] | null;
  branchLoaded: boolean;
  nowRoomId: number;
  assignSeatId: number | null;
  branchName: string;
  myUsingSeatId: number | null;
  user?: userProfile_GetMyProfile_user;
  usableMembership?: getUsableMyMemberships_GetMyUsableMemberships_memberships;
  profileFetched: boolean;
  branchFetched: boolean;
  usableMembershipFetched: boolean;
  transferredBranchId: number;
  transferredLat?: number;
  transferredLng?: number;
  usableCabinetMembership?: getUsableMyMemberships_GetMyUsableMemberships_memberships;
  returnSeatLoading: boolean;
}
interface IProps extends RouteComponentProps<any> {
  google: any;
}

interface IMessageProps {
  branchName: string;
  message: string;
  branchId?: number;
  history: any;
  extendMembershipId?: number;
  extendCabinetMembershipId?: number;
}

class NewMessageNotification extends React.Component<IMessageProps> {
  public moveToEnrollMembership = (branchId: number) => {
    // remove all notifications
    toast.dismiss();

    const { history } = this.props;
    history.push({
      pathname: "/request-membership",
      state: {
        branchId
      }
    });
    // 지점등록창으로 이동
  };

  public moveToExtendMembership = (membershipId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/extend-req-membership",
      state: {
        selMembershipId: membershipId
      }
    });
  };

  public moveToExtendCabinetMembership = (
    extendCabinetMembershipId: number
  ) => {
    const { history } = this.props;
    history.push({
      pathname: "/extend-req-cabinet",
      state: {
        selMembershipId: extendCabinetMembershipId
      }
    });
  };

  // public onBtnClick = () => {
  //   const {
  //     extendMembershipId,
  //     extendCabinetMembershipId,
  //     branchId
  //   } = this.props;

  //   if (extendMembershipId) {
  //     this.moveToExtendMembership(extendMembershipId);
  //   } else if (branchId) {
  //     this.moveToEnrollMembership(branchId);
  //   } else if (extendCabinetMembershipId) {
  //     this.moveToExtendCabinetMembership(extendCabinetMembershipId);
  //   }
  // };

  public render() {
    const {
      message,
      branchId,
      branchName,
      extendMembershipId,
      extendCabinetMembershipId
    } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        {message}
        <br />
        {branchId ? (
          <Button
            value={`${branchName} 등록 & 결제`}
            onClick={() => this.moveToEnrollMembership(branchId)}
          />
        ) : extendMembershipId ? (
          <Button
            value={`현재 멤버쉽 연장하기`}
            onClick={() => this.moveToExtendMembership(extendMembershipId)}
          />
        ) : extendCabinetMembershipId ? (
          <Button
            value={`현재 사물함 연장하기`}
            onClick={() =>
              this.moveToExtendCabinetMembership(extendCabinetMembershipId)
            }
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

class GetBranchById extends Query<userGetBranch> {}
class GetMyUsableMemberships extends Query<getUsableMyMemberships> {}
class GetMyUsingSeatMutation extends Query<getMyUsingSeat> {}
class ReturnSeatMutation extends Mutation<userReturnSeat> {}
class AssignSeatMutation extends Mutation<
  userAssignSeat,
  userAssignSeatVariables
> {}
class GetBranchByIpQuery extends Query<getBranchByIp, getBranchByIpVariables> {}
class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;

  public assignSeatFn: MutationFn;
  public returnSeatFn: MutationFn;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.state = {
      assignSeatId: null,
      branchFetched: false,
      branchIdByIp: 0,
      branchLoaded: false,
      branchName: "",
      isMenuOpen: false,
      loungeImage: "",
      minimapImage: "",
      myUsingSeatId: null,
      nowBranchId: null,
      nowIp: "",
      nowRoomId: 0,
      profileFetched: false,
      returnSeatLoading: false,
      rooms: null,
      transferredBranchId: 0,
      usableMembershipFetched: false
    };
  }

  public async componentDidMount() {
    const publicIpAddress = await publicIp.v4();
    this.setState({
      nowIp: publicIpAddress
    });
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
      myUsingSeatId,
      nowBranchId,
      transferredBranchId,
      transferredLat,
      transferredLng,
      returnSeatLoading
    } = this.state;

    return (
      <GetBranchById
        query={USER_GET_BRANCH}
        variables={{ branchId: transferredBranchId }}
        skip={transferredBranchId === 0}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <GetMyUsableMemberships
            query={GET_USABLE_MY_MEMBERSHIPS}
            onCompleted={this.updateFields}
            skip={!nowBranchId}
            fetchPolicy={"cache-and-network"}
          >
            {() => (
              <GetMyUsingSeatMutation
                query={GET_MY_USING_SEAT}
                onCompleted={data => {
                  if ("GetMyUsingSeat" in data) {
                    const { GetMyUsingSeat } = data;
                    if (GetMyUsingSeat.ok) {
                      if (GetMyUsingSeat.seat) {
                        this.setState({
                          myUsingSeatId: GetMyUsingSeat.seat.id
                        });
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
                        {
                          query: GET_SEATS,
                          variables: { roomId: nowRoomId }
                        },
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
                              {
                                query: GET_SEATS,
                                variables: { roomId: nowRoomId }
                              },
                              {
                                query: GET_BRANCH_BY_IP,
                                variables: { ip: nowIp }
                              },
                              { query: GET_MY_USING_SEAT }
                            ]}
                            onCompleted={data => {
                              const { UserAssignSeat } = data;
                              if (UserAssignSeat.ok) {
                                toast.success("좌석을 배정했습니다!");
                                this.setState({
                                  assignSeatId: null,
                                  returnSeatLoading: false
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
                            {(
                              assignSeatMutation,
                              { loading: assignSeatLoading }
                            ) => {
                              this.assignSeatFn = assignSeatMutation;
                              return (
                                <GetBranchByIpQuery
                                  query={GET_BRANCH_BY_IP}
                                  variables={{ ip: nowIp }}
                                  onCompleted={this.updateFields}
                                  fetchPolicy={"cache-and-network"}
                                >
                                  {({ loading: branchLoading }) => (
                                    <ProfileQuery
                                      query={USER_PROFILE}
                                      onCompleted={this.updateFields}
                                      fetchPolicy={"cache-and-network"}
                                    >
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
                                          onBranchClick={this.onBranchClick}
                                          onBackClick={this.onBackClick}
                                          transferredLat={transferredLat}
                                          transferredLng={transferredLng}
                                          returnSeatLoading={returnSeatLoading}
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
            )}
          </GetMyUsableMemberships>
        )}
      </GetBranchById>
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

  public updateFields = (
    data:
      | {}
      | getBranchByIp
      | getUsableMyMemberships
      | userProfile
      | userGetBranch
  ) => {
    if ("UserGetBranchByIP" in data) {
      const {
        UserGetBranchByIP: { branch }
      } = data;

      if (branch !== null) {
        const { loungeImage, minimapImage, rooms, name, id } = branch;
        this.setState({
          branchFetched: true,
          branchIdByIp: id,
          branchLoaded: true,
          branchName: name,
          loungeImage,
          minimapImage,
          nowBranchId: id,
          rooms
        } as any);
      }
    } else if ("UserGetBranch" in data) {
      const {
        UserGetBranch: { branch }
      } = data;
      if (branch !== null) {
        const { loungeImage, minimapImage, rooms, name, id } = branch;
        this.setState({
          branchFetched: true,
          branchLoaded: true,
          branchName: name,
          loungeImage,
          minimapImage,
          nowBranchId: id,
          rooms
        } as any);
      }
    } else if ("GetMyUsableMemberships" in data) {
      const {
        GetMyUsableMemberships: { memberships }
      } = data;
      // const { branchName, nowBranchId } = this.state;
      let findMembership;
      if (memberships) {
        findMembership = memberships.find(membership => {
          if (membership) {
            const startDatetime = moment(membership.startDatetime);
            const endDatetime = moment(membership.endDatetime);
            if (startDatetime.diff(endDatetime, "days") >= 15) {
              if (moment().add(3, "d") >= moment(membership.endDatetime)) {
                return true;
              } else {
                return false;
              }
            } else if (startDatetime.diff(endDatetime, "hours") >= 16) {
              if (moment().add(3, "h") >= moment(membership.endDatetime)) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        });

        const usableMembership = memberships.find(membership => {
          if (membership && !membership.cabinetId) {
            return true;
          } else {
            return false;
          }
        });

        const usableCabinetMembership = memberships.find(membership => {
          if (membership && membership.cabinetId) {
            return true;
          } else {
            return false;
          }
        });
        this.setState({
          usableCabinetMembership: usableCabinetMembership
            ? usableCabinetMembership
            : undefined,
          usableMembership: usableMembership ? usableMembership : undefined,
          usableMembershipFetched: true
        });

        this.membershipCheck();
      }

      if (findMembership) {
        toast.error("멤버쉽 기간이 얼마 남지 않았습니다!");
      }
    } else if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;

      if (user !== null) {
        this.setState({
          profileFetched: true,
          user
        } as any);
      }
    }
  };

  public membershipCheck = () => {
    const {
      user,
      usableMembership,
      branchFetched,
      profileFetched,
      usableMembershipFetched,
      nowBranchId,
      branchName,
      usableCabinetMembership
    } = this.state;

    if (branchFetched && profileFetched && usableMembershipFetched) {
      if (!usableMembership) {
        if (user) {
          const {
            isHead,
            isSupervisor,
            isFranchiser,
            managingBranches,
            cleaningBranches,
            staffManangingBranches
          } = user;

          if (!isHead && (isSupervisor || isFranchiser)) {
            if (isSupervisor || isFranchiser) {
              if (managingBranches) {
                const findBranch = managingBranches.find(managingBranch => {
                  if (managingBranch && managingBranch.id === nowBranchId) {
                    return true;
                  } else {
                    return false;
                  }
                });
                if (!findBranch && nowBranchId) {
                  toast.info(
                    <NewMessageNotification
                      history={this.props.history}
                      branchName={branchName}
                      message={`${branchName} 블루닷라운지 이용을 위해 멤버쉽에 가입해주세요`}
                      branchId={nowBranchId}
                    />
                  );
                }
              }
            } else {
              if (cleaningBranches) {
                const matchedCleaningBranch = cleaningBranches.find(
                  cleaningBranch => {
                    if (cleaningBranch && cleaningBranch.id === nowBranchId) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                );
                if (!matchedCleaningBranch) {
                  if (staffManangingBranches) {
                    const matchedStaffManagingBranch = staffManangingBranches.find(
                      staffMangingBranch => {
                        if (
                          staffMangingBranch &&
                          staffMangingBranch.id === nowBranchId
                        ) {
                          return true;
                        } else {
                          return false;
                        }
                      }
                    );

                    if (!matchedStaffManagingBranch && nowBranchId) {
                      toast.info(
                        <NewMessageNotification
                          history={this.props.history}
                          branchName={branchName}
                          message={`${branchName} 블루닷라운지 이용을 위해 멤버쉽에 가입해주세요`}
                          branchId={nowBranchId}
                        />
                      );
                    }
                  } else {
                    if (nowBranchId) {
                      toast.info(
                        <NewMessageNotification
                          history={this.props.history}
                          branchName={branchName}
                          message={`${branchName} 블루닷라운지 이용을 위해 멤버쉽에 가입해주세요`}
                          branchId={nowBranchId}
                        />
                      );
                    }
                  }
                }
              }
            }
          } else {
            if (nowBranchId) {
              const { isCleanStaff, isManStaff, name } = user;
              if (isHead || isSupervisor || isFranchiser) {
                toast.info("관리자 모드로 로그인 되었습니다🤓");
              } else if (isCleanStaff || isManStaff) {
                toast.info(
                  `${name} 스탭님! 오늘도 저희 블루닷라운지 잘 부탁드려요🙏`
                );
              } else {
                toast.info(
                  <NewMessageNotification
                    history={this.props.history}
                    branchName={branchName}
                    message={`${branchName} 블루닷라운지 이용을 위해 멤버쉽에 가입해주세요!`}
                    branchId={nowBranchId}
                  />
                );
              }
            }
          }
        }
      } else {
        if (moment(usableMembership.endDatetime) < moment().add(16, "h")) {
          toast.info(
            <NewMessageNotification
              history={this.props.history}
              branchName={branchName}
              message={`${branchName} 멤버쉽기간이 얼마 남지 않았습니다`}
              extendMembershipId={usableMembership.id}
            />
          );
        }
      }
    }

    // 사물함 체크
    if (usableCabinetMembership) {
      if (moment(usableCabinetMembership.endDatetime) <= moment().add(3, "d")) {
        toast.info(
          <NewMessageNotification
            history={this.props.history}
            branchName={branchName}
            message={`${branchName} 사물함기간이 얼마 남지 않았습니다`}
            extendCabinetMembershipId={usableCabinetMembership.id}
          />
        );
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
    const { branchIdByIp, nowBranchId, user } = this.state;
    const { usableMembership: membership } = this.state;
    if (
      !membership &&
      (user &&
        !user.isHead &&
        !user.isCleanStaff &&
        !user.isManStaff &&
        !user.isFranchiser &&
        !user.isSupervisor)
    ) {
      toast.error("현재 멤버쉽이 없습니다!");
    } else if (branchIdByIp !== nowBranchId) {
      toast.error("좌석 배정은 해당 지점내의 인터넷(와이파이)를 이용해주세요");
    } else {
      const membershipEndDatetime = membership && membership.endDatetime;
      const resultEndDatetime = membershipEndDatetime
        ? moment(membershipEndDatetime) >= moment().add(24, "h")
          ? moment()
              .add(24, "h")
              .format("YYYY-MM-DD HH:mm:ss")
          : moment(membershipEndDatetime).format("YYYY-MM-DD HH:mm:ss")
        : moment()
            .add(24, "h")
            .format("YYYY-MM-DD HH:mm:ss");

      this.setState(
        {
          assignSeatId: seatId
        },
        () =>
          this.assignSeatFn({
            variables: { seatId, endDatetime: resultEndDatetime }
          })
      );
    }
  };

  public onEntranceClick = () => {
    this.setState({ nowRoomId: 0 });
  };

  public onReturnClick = async () => {
    this.setState(
      {
        returnSeatLoading: true
      },
      async () => {
        await this.returnSeatFn();
      }
    );
  };

  public onBranchClick = (
    branchId: number,
    transferredLat: number,
    transferredLng: number
  ) => {
    this.setState({
      transferredBranchId: branchId,
      transferredLat,
      transferredLng
    });
  };

  public onBackClick = () => {
    this.setState({
      branchLoaded: false,
      transferredBranchId: 0
    });
  };
}
export default HomeContainer;
