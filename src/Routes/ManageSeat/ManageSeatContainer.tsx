import moment from "moment-timezone";
import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import {
  managerAssignUser,
  managerAssignUserVariables,
  managerGetSeatLogs,
  managerGetSeatLogs_ManagerGetSeatLogs_seat,
  managerGetSeatLogsVariables,
  managerReturnSeat,
  managerReturnSeatVariables
} from "src/types/api";
import ManageSeatPresenter from "./ManageSeatPresenter";
import {
  MANAGER_ASSIGN_USER,
  MANAGER_GET_SEAT_LOGS,
  MANAGER_RETURN_SEAT
} from "./ManageSeatQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  startDatetime: Date;
  endDatetime: Date;
  nowRoomId: number;
  seatId: number;
  selBranchId: number;
  seatLogs: any[];
  seat?: managerGetSeatLogs_ManagerGetSeatLogs_seat;
  showSearchUserPopUp: boolean;
}

class ManagerGetSeatLogs extends Query<
  managerGetSeatLogs,
  managerGetSeatLogsVariables
> {}

class ManagerAssignUserMutation extends Mutation<
  managerAssignUser,
  managerAssignUserVariables
> {}

class ManagerReturnSeatMutation extends Mutation<
  managerReturnSeat,
  managerReturnSeatVariables
> {}

class ManageSeatContainer extends React.Component<IProps, IState> {
  public assignUserFn: MutationFn;
  public returnSeatFn: MutationFn;

  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      endDatetime: props.location.state.endDatetime
        ? moment(props.location.state.endDatetime).toDate()
        : new Date(),
      nowRoomId: props.location.state.nowRoomId,
      seatId: props.location.state.seatId,
      seatLogs: [],
      selBranchId: props.location.state.selBranchId,
      showSearchUserPopUp: false,
      startDatetime: props.location.state.startDatetime
        ? moment(props.location.state.startDatetime).toDate()
        : new Date()
    };
  }
  public render() {
    const {
      startDatetime,
      endDatetime,
      seatId,
      seatLogs,
      seat,
      showSearchUserPopUp
    } = this.state;

    return (
      <ManagerReturnSeatMutation
        mutation={MANAGER_RETURN_SEAT}
        onCompleted={data => {
          if ("ManagerReturnSeat" in data) {
            const { ManagerReturnSeat } = data;
            if (ManagerReturnSeat.ok) {
              toast.success("해당 좌석을 반납했습니다");
            } else {
              toast.error(ManagerReturnSeat.error);
            }
          }
        }}
        refetchQueries={[
          {
            query: MANAGER_GET_SEAT_LOGS,
            variables: {
              endDatetime: moment(endDatetime).format("YYYY-MM-DD HH:mm:ss"),
              seatId,
              startDatetime: moment(startDatetime).format("YYYY-MM-DD HH:mm:ss")
            }
          }
        ]}
      >
        {returnSeatMutationFn => {
          this.returnSeatFn = returnSeatMutationFn;
          return (
            <ManagerAssignUserMutation
              mutation={MANAGER_ASSIGN_USER}
              onCompleted={data => {
                if ("ManagerAssignUser" in data) {
                  const { ManagerAssignUser } = data;
                  if (ManagerAssignUser.ok) {
                    toast.success("배정에 성공했습니다");
                    this.toggleShowSearchUserPopUp();
                  } else {
                    toast.error(ManagerAssignUser.error);
                  }
                }
              }}
              refetchQueries={[
                {
                  query: MANAGER_GET_SEAT_LOGS,
                  variables: {
                    endDatetime: moment(endDatetime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                    seatId,
                    startDatetime: moment(startDatetime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }
                }
              ]}
            >
              {assignUserMutationFn => {
                this.assignUserFn = assignUserMutationFn;
                return (
                  <ManagerGetSeatLogs
                    query={MANAGER_GET_SEAT_LOGS}
                    variables={{
                      endDatetime: moment(endDatetime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      ),
                      seatId,
                      startDatetime: moment(startDatetime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    }}
                    onCompleted={this.updateFields}
                    fetchPolicy={"cache-and-network"}
                  >
                    {({ loading: seatLogsLoading }) => (
                      <ManageSeatPresenter
                        startDatetime={startDatetime}
                        endDatetime={endDatetime}
                        onBackClick={this.onBackClick}
                        onStartDatetimeChange={this.onStartDatetimeChange}
                        onEndDatetimeChange={this.onEndDatetimeChange}
                        seatLogsLoading={seatLogsLoading}
                        seatLogs={seatLogs}
                        onLogClick={this.onLogClick}
                        seat={seat}
                        onPeriodBtnClick={this.onPeriodBtnClick}
                        toggleShowSearchUserPopUp={
                          this.toggleShowSearchUserPopUp
                        }
                        showSearchUserPopUp={showSearchUserPopUp}
                        onUserClick={this.onUserClick}
                        onReturnClick={this.onReturnClick}
                      />
                    )}
                  </ManagerGetSeatLogs>
                );
              }}
            </ManagerAssignUserMutation>
          );
        }}
      </ManagerReturnSeatMutation>
    );
  }

  public onBackClick = () => {
    const { history } = this.props;
    const { nowRoomId, selBranchId } = this.state;
    history.push({
      pathname: "/manage-seats",
      state: {
        nowRoomId,
        selBranchId
      }
    });
  };
  public onStartDatetimeChange = (startDatetimeValue: Date) => {
    const { endDatetime } = this.state;
    if (moment(endDatetime) < moment(startDatetimeValue)) {
      toast.warn("기간설정이 잘 못 되었습니다");
    } else {
      this.setState({
        startDatetime: startDatetimeValue
      });
    }
  };
  // public onStartDatetimeChange = (startDatetimeValue: Moment) => {
  //   const { endDatetime } = this.state;
  //   if (endDatetime < startDatetimeValue) {
  //     toast.warn("기간설정이 잘 못 되었습니다");
  //   } else {
  //     this.setState({
  //       startDatetime: startDatetimeValue
  //     });
  //   }
  // };

  public onEndDatetimeChange = (endDatetimeValue: Date) => {
    const { startDatetime } = this.state;
    if (moment(endDatetimeValue) < moment(startDatetime)) {
      toast.warn("기간설정이 잘 못 되었습니다");
    } else {
      this.setState({
        endDatetime: endDatetimeValue
      });
    }
  };

  public updateFields = (data: {} | managerGetSeatLogs) => {
    if ("ManagerGetSeatLogs" in data) {
      const {
        ManagerGetSeatLogs: { seatLogs, seat }
      } = data;

      if (seatLogs && seat) {
        this.setState({
          seat,
          seatLogs
        });
      }
    }
  };

  public onLogClick = (userId: number) => {
    const { history } = this.props;
    const { nowRoomId, seatId, selBranchId } = this.state;
    history.push({
      pathname: "/user-detail",
      state: {
        backInfo: {
          nowRoomId,
          seatId,
          selBranchId
        },
        backUrl: "/manage-seat",
        userId
      }
    });
  };

  public onPeriodBtnClick = (days: number) => {
    this.setState({
      endDatetime: new Date(),
      startDatetime: moment()
        .subtract(days, "d")
        .toDate()
    });
  };

  public toggleShowSearchUserPopUp = () => {
    this.setState({
      showSearchUserPopUp: !this.state.showSearchUserPopUp
    });
  };

  public onUserClick = async (userId: number) => {
    const { seatId } = this.state;
    await this.assignUserFn({
      variables: {
        seatId,
        userId
      }
    });
  };

  public onReturnClick = async () => {
    const { seatId } = this.state;
    await this.returnSeatFn({ variables: { seatId } });
  };
}

export default ManageSeatContainer;
