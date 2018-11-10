import moment, { Moment } from "moment";
import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import {
  headGetMembershipLogs,
  headGetMembershipLogsVariables,
  headGetNowUsingUsers,
  headGetNowUsingUsersVariables
} from "src/types/api";
import {
  HEAD_GET_MEMBERSHIP_LOGS,
  HEAD_GET_NOW_USING_USERS
} from "./ManagerUsersQueries";
import ManageUsersPresenter from "./ManageUsersPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  selDate: Moment;
  membershipLogsByDate: any[];
  nowUsingUsers: any[];
  branchSearchPopupShow: boolean;
  selBranchId?: number;
  showUserSearchPopUp: boolean;
  branchName?: string;
}

class GetNowUsingUsersQuery extends Query<
  headGetNowUsingUsers,
  headGetNowUsingUsersVariables
> {}

class GetMembershipLogsQuery extends Query<
  headGetMembershipLogs,
  headGetMembershipLogsVariables
> {}

class ManageUsersContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      branchSearchPopupShow: false,
      membershipLogsByDate: [],
      nowUsingUsers: [],
      selDate: moment(),
      showUserSearchPopUp: false
    };
  }
  public render() {
    const {
      selDate,
      membershipLogsByDate,
      branchSearchPopupShow,
      selBranchId,
      nowUsingUsers,
      showUserSearchPopUp,
      branchName
    } = this.state;
    return (
      <GetNowUsingUsersQuery
        query={HEAD_GET_NOW_USING_USERS}
        variables={{
          branchId: selBranchId
        }}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {({ loading: usingUsersLoading }) => {
          return (
            <GetMembershipLogsQuery
              query={HEAD_GET_MEMBERSHIP_LOGS}
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
                    toggleShowUserSearchPopUp={this.toggleShowUserSearchPopUp}
                    showUserSearchPopUp={showUserSearchPopUp}
                    onUserClick={this.onUserClick}
                    branchName={branchName}
                  />
                );
              }}
            </GetMembershipLogsQuery>
          );
        }}
      </GetNowUsingUsersQuery>
    );
  }

  public onDatetimeChange = (datetimeValue: Moment) => {
    this.setState({
      selDate: datetimeValue
    });
  };

  public updateFields = (
    data: {} | headGetMembershipLogs | headGetNowUsingUsers
  ) => {
    if ("HeadGetMembershipLogs" in data) {
      const {
        HeadGetMembershipLogs: { membershipLogs, branch }
      } = data;
      if (membershipLogs !== null) {
        this.setState({
          branchName: branch ? branch.name : undefined,
          membershipLogsByDate: membershipLogs
        });
      }
    } else if ("HeadGetNowUsingUsers" in data) {
      const {
        HeadGetNowUsingUsers: { users }
      } = data;

      if (users !== null) {
        this.setState({
          nowUsingUsers: users
        });
      }
    }
  };

  public toggleBranchPopUpShow = () => {
    this.setState({
      branchSearchPopupShow: !this.state.branchSearchPopupShow
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

    history.push({
      pathname: "/user-detail",
      state: {
        userId
      }
    });
  };
}

export default ManageUsersContainer;
