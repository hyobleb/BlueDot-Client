import moment, { Moment } from "moment";
import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import {
  headGetMembershipLogs,
  headGetMembershipLogsVariables
} from "src/types/api";
import { HEAD_GET_MEMBERSHIP_LOGS } from "./ManagerUsersQueries";
import ManageUsersPresenter from "./ManageUsersPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  selDate: Moment;
  membershipLogsByDate: any[];
  branchSearchPopupShow: boolean;
  selBranchId?: number;
}

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
      selDate: moment()
    };
  }
  public render() {
    const {
      selDate,
      membershipLogsByDate,
      branchSearchPopupShow,
      selBranchId
    } = this.state;
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
            />
          );
        }}
      </GetMembershipLogsQuery>
    );
  }

  public onDatetimeChange = (datetimeValue: Moment) => {
    this.setState({
      selDate: datetimeValue
    });
  };

  public updateFields = (data: {} | headGetMembershipLogs) => {
    if ("HeadGetMembershipLogs" in data) {
      const {
        HeadGetMembershipLogs: { membershipLogs }
      } = data;
      if (membershipLogs !== null) {
        this.setState({
          membershipLogsByDate: membershipLogs
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
}

export default ManageUsersContainer;
