import moment from "moment";
import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { MANAGER_EXPIRE_MEMBERSHIP } from "src/Components/sharedQueries";
import {
  getMembershipLogsById,
  getMembershipLogsById_GetMembershipLogsById_membershipLogs,
  getMembershipLogsByIdVariables,
  managerExpireMembership,
  managerExpireMembershipVariables,
  managerGetUserDetail,
  managerGetUserDetail_ManagerGetUserDetail_user,
  managerGetUserDetailVariables
} from "src/types/api";
import UserDetailPresenter from "./UserDetailPresenter";
import {
  GET_MEMBERSHIP_LOGS_BY_ID,
  MANAGER_GET_USER_DETAIL
} from "./UserDetailQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  userId: number;
  user?: managerGetUserDetail_ManagerGetUserDetail_user;
  showExpirePopUp: boolean;
  tempSelMembershipId?: number;
  backUrl: string;
  backInfo?: any;
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
  isManStaff: boolean;
  isCleanStaff: boolean;
  startDatetime: Date;
  endDatetime: Date;
  membershipLogs?: Array<getMembershipLogsById_GetMembershipLogsById_membershipLogs | null>;
}

class GetMembershipLogsByIdQuery extends Query<
  getMembershipLogsById,
  getMembershipLogsByIdVariables
> {}

class ExpireMembershipMutation extends Mutation<
  managerExpireMembership,
  managerExpireMembershipVariables
> {}

class GetUserDetailQuery extends Query<
  managerGetUserDetail,
  managerGetUserDetailVariables
> {}

class UserDetailContainer extends React.Component<IProps, IState> {
  public expireMembershipFn: MutationFn;
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      backInfo: props.location.state.backInfo
        ? {
            ...props.location.state.backInfo
          }
        : undefined,
      backUrl: props.location.state.backUrl || "/manage-users",
      endDatetime: props.location.state.endDatetime
        ? moment(props.location.state.endDatetime).toDate()
        : new Date(),
      isCleanStaff: props.location.state.isCleanStaff || false,
      isFranchiser: props.location.state.isFranchiser || false,
      isHead: props.location.state.isHead || false,
      isManStaff: props.location.state.isManStaff || false,
      isSupervisor: props.location.state.isSupervisor || false,
      showExpirePopUp: false,
      startDatetime: props.location.state.startDatetime
        ? moment(props.location.state.startDatetime).toDate()
        : new Date(),
      userId: props.location.state.userId
    };
  }
  public render() {
    const {
      userId,
      user,
      showExpirePopUp,
      tempSelMembershipId,
      startDatetime,
      endDatetime,
      membershipLogs
    } = this.state;
    return (
      <GetMembershipLogsByIdQuery
        query={GET_MEMBERSHIP_LOGS_BY_ID}
        variables={{ userId }}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <ExpireMembershipMutation
            mutation={MANAGER_EXPIRE_MEMBERSHIP}
            onCompleted={data => {
              const { ManagerExpireMembership } = data;
              if (ManagerExpireMembership.ok) {
                toast.success("해당 멤버쉽이 만료되었습니다");
                this.setState({
                  showExpirePopUp: !this.state.showExpirePopUp
                });
              } else {
                toast.error(ManagerExpireMembership.error);
              }
            }}
            refetchQueries={[
              { query: MANAGER_GET_USER_DETAIL, variables: { userId } }
            ]}
          >
            {expireMembershipMutationFn => {
              this.expireMembershipFn = expireMembershipMutationFn;
              return (
                <GetUserDetailQuery
                  query={MANAGER_GET_USER_DETAIL}
                  variables={{ userId }}
                  onCompleted={this.updateFields}
                  onError={err => toast.error(err)}
                  fetchPolicy={"cache-and-network"}
                  skip={!userId}
                >
                  {({ loading: getUserDetailLoading }) => {
                    return (
                      <UserDetailPresenter
                        getUserDetailLoading={getUserDetailLoading}
                        user={user}
                        enrollMembershipClick={this.enrollMembershipClick}
                        enrollCabinetClick={this.enrollCabinetClick}
                        onMembershipExtendClick={this.onMembershipExtendClick}
                        showExpirePopUp={showExpirePopUp}
                        showExpirePopUpToggle={this.showExpirePopUpToggle}
                        tempSelMembershipId={tempSelMembershipId}
                        onMembershipExpireClick={this.onMembershipExpireClick}
                        onExpireConfirmClick={this.onExpireConfirmClick}
                        onExtendCabinetClick={this.onExtendCabinetClick}
                        onBackClick={this.onBackClick}
                        startDatetime={startDatetime}
                        endDatetime={endDatetime}
                        onPeriodBtnClick={this.onPeriodBtnClick}
                        onStartDatetimeChange={this.onStartDatetimeChange}
                        onEndDatetimeChange={this.onEndDatetimeChange}
                        membershipLogs={membershipLogs}
                        onPayViewBtnClick={this.onPayViewBtnClick}
                      />
                    );
                  }}
                </GetUserDetailQuery>
              );
            }}
          </ExpireMembershipMutation>
        )}
      </GetMembershipLogsByIdQuery>
    );
  }

  public updateFields = (
    data: {} | managerGetUserDetail | getMembershipLogsById
  ) => {
    if ("ManagerGetUserDetail" in data) {
      const {
        ManagerGetUserDetail: { user }
      } = data;

      if (user !== null) {
        this.setState({
          user
        });
      }
    } else if ("GetMembershipLogsById" in data) {
      const {
        GetMembershipLogsById: { membershipLogs }
      } = data;

      if (membershipLogs !== null) {
        this.setState({
          membershipLogs
        });
      }
    }
  };

  public enrollMembershipClick = (userId: number) => {
    const { history } = this.props;
    const {
      user,
      isHead,
      isFranchiser,
      isSupervisor,
      isManStaff,
      isCleanStaff
    } = this.state;

    history.push({
      pathname: "/manager-enroll-membership",
      state: {
        backUrl: "/user-detail",
        isCleanStaff,
        isFranchiser,
        isHead,
        isManStaff,
        isSupervisor,
        userId,
        userIdName: user && user.userId,
        userName: user && user.name
      }
    });
  };
  public enrollCabinetClick = (userId: number) => {
    const { history } = this.props;
    const {
      user,
      isHead,
      isFranchiser,
      isSupervisor,
      isManStaff,
      isCleanStaff
    } = this.state;

    history.push({
      pathname: "/manager-enroll-cabinet",
      state: {
        backUrl: "/user-detail",
        isCleanStaff,
        isFranchiser,
        isHead,
        isManStaff,
        isSupervisor,
        userId,
        userIdName: user && user.userId,
        userName: user && user.name
      }
    });
  };

  public onMembershipExtendClick = (membershipId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/manager-extend-membership",
      state: {
        selMembershipId: membershipId
      }
    });
  };

  public onMembershipExpireClick = (membershipId: number) => {
    this.setState(
      {
        tempSelMembershipId: membershipId
      },
      this.showExpirePopUpToggle
    );
  };

  public showExpirePopUpToggle = () => {
    this.setState({
      showExpirePopUp: !this.state.showExpirePopUp
    });
  };

  public onExpireConfirmClick = async () => {
    const { tempSelMembershipId } = this.state;
    await this.expireMembershipFn({
      variables: { membershipId: tempSelMembershipId }
    });
  };

  public onExtendCabinetClick = (membershipId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/manager-extend-cabinet",
      state: {
        selMembershipId: membershipId
      }
    });
  };

  public onBackClick = () => {
    const { history } = this.props;
    const { backUrl, backInfo, isHead, isManStaff, isSupervisor } = this.state;
    history.push({
      pathname: backUrl,
      state: {
        isHead,
        isManStaff,
        isSupervisor,
        ...backInfo
      }
    });
  };

  public onPeriodBtnClick = (hours: number) => {
    this.setState({
      endDatetime: new Date(),
      startDatetime: moment()
        .subtract(hours, "h")
        .toDate()
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
  public onPayViewBtnClick = (paymentId: number) => {
    const { history } = this.props;
    const {
      backInfo,
      backUrl,
      isCleanStaff,
      isFranchiser,
      isHead,
      isManStaff,
      isSupervisor,
      userId,
      startDatetime,
      endDatetime
    } = this.state;
    history.push({
      pathname: "/view-payinfo",
      state: {
        backInfo: {
          backUrl: "/user-detail",
          content: {
            backInfo,
            backUrl,
            endDatetime: moment(endDatetime).format("YYYY-MM-DD HH:mm:ss"),
            isCleanStaff,
            isFranchiser,
            isHead,
            isManStaff,
            isSupervisor,
            startDatetime: moment(startDatetime).format("YYYY-MM-DD HH:mm:ss"),
            userId
          }
        },
        paymentId
      }
    });
  };
}

export default UserDetailContainer;
