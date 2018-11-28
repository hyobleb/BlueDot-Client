import moment, { Moment } from "moment";
import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { MANAGER_EXPIRE_MEMBERSHIP } from "src/Components/sharedQueries";
import {
  managerExpireMembership,
  managerExpireMembershipVariables,
  managerGetCabinetLogs,
  managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet,
  managerGetCabinetLogsVariables
} from "src/types/api";
import { MANAGER_GET_USER_DETAIL } from "../UserDetail/UserDetailQueries";
import ManageCabinetPresenter from "./ManageCabinetPresenter";
import { MANAGER_GET_CABINET_LOGS } from "./ManageCabinetQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  startDatetime: Moment;
  endDatetime: Moment;
  cabinetId: number;
  selBranchId: number;
  selSetId: number;
  cabinetLogs?: any;
  branchName: string;
  cabinet?: managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet;
  showUserSearchPopUp: boolean;
  nowMembershipId?: number;
  showExpireConfirmPopUp: boolean;
  showBranchSearchPopUp: boolean;
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
}

class GetCabinetLogsQuery extends Query<
  managerGetCabinetLogs,
  managerGetCabinetLogsVariables
> {}

class ExpireCabinetMutation extends Mutation<
  managerExpireMembership,
  managerExpireMembershipVariables
> {}

class ManageCabinetContainer extends React.Component<IProps, IState> {
  public apolloClient;
  public expireCabinetFn: MutationFn;
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }

    const branchName = props.location.state.branchName;
    const cabinetId = props.location.state.cabinetId;
    const selBranchId = props.location.state.selBranchId;
    const selSetId = props.location.state.selSetId;

    this.state = {
      branchName,
      cabinetId,
      endDatetime: moment(),
      isFranchiser: props.location.state.isFranchiser,
      isHead: props.location.state.isHead,
      isSupervisor: props.location.state.isSupervisor,
      selBranchId,
      selSetId,
      showBranchSearchPopUp: false,
      showExpireConfirmPopUp: false,
      showUserSearchPopUp: false,
      startDatetime: moment()
    };
  }
  public render() {
    const {
      cabinetId,
      endDatetime,
      startDatetime,
      cabinetLogs,
      branchName,
      cabinet,
      showUserSearchPopUp,
      showExpireConfirmPopUp,
      showBranchSearchPopUp
    } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          this.apolloClient = client;
          return (
            <ExpireCabinetMutation
              mutation={MANAGER_EXPIRE_MEMBERSHIP}
              onCompleted={data => {
                const { ManagerExpireMembership } = data;
                if (ManagerExpireMembership.ok) {
                  toast.success("해당 멤버쉽이 만료되었습니다");
                  this.toggleShowExpireConfirmPopUp();
                } else {
                  toast.error(ManagerExpireMembership.error);
                }
              }}
              refetchQueries={[
                {
                  query: MANAGER_GET_CABINET_LOGS,
                  variables: {
                    cabinetId,
                    endDatetime: moment(endDatetime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    ),
                    startDatetime: moment(startDatetime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }
                }
              ]}
            >
              {expireMembershipMutationFn => {
                this.expireCabinetFn = expireMembershipMutationFn;
                return (
                  <GetCabinetLogsQuery
                    query={MANAGER_GET_CABINET_LOGS}
                    variables={{
                      cabinetId,
                      endDatetime: moment(endDatetime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      ),
                      startDatetime: moment(startDatetime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    }}
                    onCompleted={this.updateFields}
                  >
                    {({ loading: getCabinetLogsLoading }) => (
                      <ManageCabinetPresenter
                        endDatetime={endDatetime}
                        startDatetime={startDatetime}
                        onStartDatetimeChange={this.onStartDatetimeChange}
                        onEndDatetimeChange={this.onEndDatetimeChange}
                        onBackClick={this.onBackClick}
                        cabinetLogs={cabinetLogs}
                        getCabinetLogsLoading={getCabinetLogsLoading}
                        branchName={branchName}
                        onPeriodBtnClick={this.onPeriodBtnClick}
                        cabinet={cabinet}
                        showUserSearchPopUp={showUserSearchPopUp}
                        toggleShowUserSearchPopUp={
                          this.toggleShowUserSearchPopUp
                        }
                        onUserClick={this.onUserClick}
                        onExtendBtnClick={this.onExtendBtnClick}
                        showExpireConfirmPopUp={showExpireConfirmPopUp}
                        toggleShowExpireConfirmPopUp={
                          this.toggleShowExpireConfirmPopUp
                        }
                        expireCabinet={this.expireCabinet}
                        toggleShowBranchSearchPopUp={
                          this.toggleShowBranchSearchPopUp
                        }
                        showBranchSearchPopUp={showBranchSearchPopUp}
                        onBranchClick={this.onBranchClick}
                      />
                    )}
                  </GetCabinetLogsQuery>
                );
              }}
            </ExpireCabinetMutation>
          );
        }}
      </ApolloConsumer>
    );
  }

  public onStartDatetimeChange = (startDatetimeValue: Moment) => {
    const { endDatetime } = this.state;
    if (endDatetime < startDatetimeValue) {
      toast.warn("기간설정이 잘 못 되었습니다");
    } else {
      this.setState({
        startDatetime: startDatetimeValue
      });
    }
  };

  public onEndDatetimeChange = (endDatetimeValue: Moment) => {
    const { startDatetime } = this.state;
    if (endDatetimeValue < startDatetime) {
      toast.warn("기간설정이 잘 못 되었습니다");
    } else {
      this.setState({
        endDatetime: endDatetimeValue
      });
    }
  };

  public onBackClick = () => {
    const { history } = this.props;
    const { cabinetId, selBranchId, selSetId } = this.state;

    history.push({
      pathname: "/manage-cabinets",
      state: {
        cabinetId,
        selBranchId,
        selSetId
      }
    });
  };

  public updateFields = (data: {} | managerGetCabinetLogs) => {
    if ("ManagerGetCabinetLogs" in data) {
      const {
        ManagerGetCabinetLogs: { cabinetLogs, cabinet }
      } = data;

      if (cabinetLogs && cabinet) {
        this.setState({
          cabinet,
          cabinetLogs,
          nowMembershipId:
            (cabinetLogs &&
              cabinetLogs.length > 0 &&
              cabinetLogs[0] &&
              moment(cabinetLogs[0]!.endDatetime) > moment() &&
              cabinetLogs[0]!.membershipId) ||
            undefined
        });
      }
    }
  };
  public onPeriodBtnClick = (hours: number) => {
    this.setState({
      endDatetime: moment(),
      startDatetime: moment().subtract(hours, "h")
    });
  };

  public toggleShowUserSearchPopUp = () => {
    this.setState({
      showUserSearchPopUp: !this.state.showUserSearchPopUp
    });
  };

  public onUserClick = async (userId: number) => {
    const { history } = this.props;
    const {
      cabinet,
      branchName,
      cabinetId,
      selBranchId,
      selSetId
    } = this.state;

    const { data } = await this.apolloClient.query({
      query: MANAGER_GET_USER_DETAIL,
      variables: { userId }
    });

    if ("ManagerGetUserDetail" in data) {
      const {
        ManagerGetUserDetail: { user }
      } = data;

      if (user !== null && cabinet) {
        history.push({
          pathname: "/manager-enroll-cabinet",
          state: {
            backInfo: {
              backUrl: "/manage-cabinet",
              content: {
                branchName,
                cabinetId,
                selBranchId,
                selSetId
              }
            },
            branchId: selBranchId,
            cabinetId,
            setId: selSetId,
            userId,
            userIdName: user.userId,
            userName: user.name
          }
        });
      }
    }
  };

  public onExtendBtnClick = () => {
    const { history } = this.props;
    const {
      nowMembershipId,
      branchName,
      cabinetId,
      selBranchId,
      selSetId
    } = this.state;
    if (nowMembershipId) {
      history.push({
        pathname: "/manager-extend-cabinet",
        state: {
          backInfo: {
            backUrl: "/manage-cabinet",
            content: {
              branchName,
              cabinetId,
              selBranchId,
              selSetId
            }
          },
          selMembershipId: nowMembershipId
        }
      });
    }
  };

  public toggleShowExpireConfirmPopUp = () => {
    this.setState({
      showExpireConfirmPopUp: !this.state.showExpireConfirmPopUp
    });
  };

  public expireCabinet = async () => {
    const { nowMembershipId } = this.state;
    if (!nowMembershipId) {
      toast.error("해당 사물함 멤버쉽 정보가 없습니다");
    } else {
      await this.expireCabinetFn({
        variables: { membershipId: nowMembershipId }
      });
    }
  };

  public toggleShowBranchSearchPopUp = () => {
    this.setState({
      showBranchSearchPopUp: !this.state.showBranchSearchPopUp
    });
  };

  public onBranchClick = (branchId: number) => {
    const { history } = this.props;
    const {
      branchName,
      cabinetId,
      selBranchId,
      selSetId,
      cabinet,
      nowMembershipId
    } = this.state;
    if (cabinet && cabinet.user) {
      history.push({
        pathname: "/manager-enroll-cabinet",
        state: {
          backInfo: {
            backUrl: "/manage-cabinet",
            content: {
              branchName,
              cabinetId,
              selBranchId,
              selSetId
            }
          },
          isShifitCabinet: true,
          nowMembershipId,
          userId: cabinet.user.userId,
          userIdName: cabinet.user.userId,
          userName: cabinet.user.name
        }
      });
    }
  };
}

export default ManageCabinetContainer;