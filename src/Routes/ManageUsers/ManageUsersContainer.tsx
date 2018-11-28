import moment, { Moment } from "moment";
import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import {
  managerGetManagingBranches,
  managerGetManagingBranches_GetManagingBranches_branches,
  managerGetMembershipLogs,
  managerGetMembershipLogsVariables,
  managerGetNowUsingUsers,
  managerGetNowUsingUsersVariables
} from "src/types/api";
import {
  MANAGER_GET_MANAGING_BRANCHES,
  MANAGER_GET_MEMBERSHIP_LOGS,
  MANAGER_GET_NOW_USING_USERS
} from "./ManagerUsersQueries";
import ManageUsersPresenter from "./ManageUsersPresenter";

interface IProps extends RouteComponentProps<any> {
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
}
interface IState {
  selDate: Moment;
  membershipLogsByDate: any[];
  nowUsingUsers: any[];
  branchSearchPopupShow: boolean;
  selBranchId?: number;
  showUserSearchPopUp: boolean;
  branchName?: string;
  managingBranches?: Array<managerGetManagingBranches_GetManagingBranches_branches | null>;
}

class GetManagingBranchesQuery extends Query<managerGetManagingBranches> {}
class GetNowUsingUsersQuery extends Query<
  managerGetNowUsingUsers,
  managerGetNowUsingUsersVariables
> {}

class GetMembershipLogsQuery extends Query<
  managerGetMembershipLogs,
  managerGetMembershipLogsVariables
> {}

class ManageUsersContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      branchSearchPopupShow: false,
      membershipLogsByDate: [],
      nowUsingUsers: [],
      selBranchId: props.location.state
        ? props.location.state.branchId
          ? props.location.state.branchId
          : undefined
        : undefined,
      selDate: moment(),
      showUserSearchPopUp: false
    };
  }
  public render() {
    const { isHead, isFranchiser, isSupervisor } = this.props;

    const {
      selDate,
      membershipLogsByDate,
      branchSearchPopupShow,
      selBranchId,
      nowUsingUsers,
      showUserSearchPopUp,
      branchName,
      managingBranches
    } = this.state;
    return (
      <GetManagingBranchesQuery
        query={MANAGER_GET_MANAGING_BRANCHES}
        skip={isHead}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <GetNowUsingUsersQuery
            query={MANAGER_GET_NOW_USING_USERS}
            variables={{
              branchId: selBranchId
            }}
            onCompleted={this.updateFields}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading: usingUsersLoading }) => {
              return (
                <GetMembershipLogsQuery
                  query={MANAGER_GET_MEMBERSHIP_LOGS}
                  variables={{
                    branchId: selBranchId,
                    date: moment(selDate).format("YYYY-MM-DD")
                  }}
                  onCompleted={this.updateFields}
                  fetchPolicy={"cache-and-network"}
                >
                  {({ loading: membershipLogsLoading }) => {
                    return (
                      <ManageUsersPresenter
                        selDate={selDate}
                        onDatetimeChange={this.onDatetimeChange}
                        membershipLogsByDate={membershipLogsByDate}
                        branchSearchPopupShow={branchSearchPopupShow}
                        toggleBranchPopUpShow={this.toggleBranchPopUpShow}
                        onBranchClick={this.onBranchClick}
                        membershipLogsLoading={membershipLogsLoading}
                        usingUsersLoading={usingUsersLoading}
                        nowUsingUsers={nowUsingUsers}
                        onAllBranchClick={this.onAllBranchClick}
                        toggleShowUserSearchPopUp={
                          this.toggleShowUserSearchPopUp
                        }
                        showUserSearchPopUp={showUserSearchPopUp}
                        onUserClick={this.onUserClick}
                        branchName={branchName}
                        onChartBtnClick={this.onChartBtnClick}
                        onOfflineReqBtnClick={this.onOfflineReqBtnClick}
                        isHead={isHead}
                        isFranchiser={isFranchiser}
                        isSupervisor={isSupervisor}
                        managingBranches={managingBranches}
                        onBranchBtnClick={this.onBranchBtnClick}
                      />
                    );
                  }}
                </GetMembershipLogsQuery>
              );
            }}
          </GetNowUsingUsersQuery>
        )}
      </GetManagingBranchesQuery>
    );
  }

  public onDatetimeChange = (datetimeValue: Moment) => {
    this.setState({
      selDate: datetimeValue
    });
  };

  public updateFields = (
    data:
      | {}
      | managerGetMembershipLogs
      | managerGetNowUsingUsers
      | managerGetManagingBranches
  ) => {
    if ("ManagerGetMembershipLogs" in data) {
      const {
        ManagerGetMembershipLogs: { membershipLogs, branch }
      } = data;
      if (membershipLogs !== null) {
        this.setState({
          branchName: branch ? branch.name : undefined,
          membershipLogsByDate: membershipLogs
        });
      }
    } else if ("ManagerGetNowUsingUsers" in data) {
      const {
        ManagerGetNowUsingUsers: { users }
      } = data;

      if (users !== null) {
        this.setState({
          nowUsingUsers: users
        });
      }
    } else if ("GetManagingBranches" in data) {
      const {
        GetManagingBranches: { branches }
      } = data;

      if (branches !== null) {
        this.setState({
          managingBranches: branches
        });
      }
    }
  };

  public toggleBranchPopUpShow = () => {
    this.setState({
      branchSearchPopupShow: !this.state.branchSearchPopupShow
    });
  };

  public onBranchBtnClick = (branchId: number) => {
    this.setState({
      selBranchId: branchId
    });
  };

  public onBranchClick = (branchId: number) => {
    this.setState({
      branchSearchPopupShow: !this.state.branchSearchPopupShow,
      selBranchId: branchId
    });
  };

  public onAllBranchClick = () => {
    this.setState({
      selBranchId: undefined
    });
  };

  public toggleShowUserSearchPopUp = () => {
    this.setState({
      showUserSearchPopUp: !this.state.showUserSearchPopUp
    });
  };

  public onUserClick = async (userId: number) => {
    const { history } = this.props;
    const { isHead, isFranchiser, isSupervisor } = this.props;

    history.push({
      pathname: "/user-detail",
      state: {
        isFranchiser,
        isHead,
        isSupervisor,
        userId
      }
    });
  };

  public onChartBtnClick = () => {
    const { history } = this.props;

    history.push({
      pathname: "/chart"
    });
  };

  public onOfflineReqBtnClick = () => {
    const { history } = this.props;
    const { selBranchId } = this.state;
    history.push({
      pathname: "/view-req-sign-up",
      state: {
        branchId: selBranchId
      }
    });
  };
}

export default ManageUsersContainer;
