import moment from "moment";
import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { getMembershipLogs, getMembershipLogsVariables } from "../../types/api";
import ChartPresenter from "./ChartPresenter";
import { GET_MEMBERSHIP_LOGS } from "./ChartQueries";

class GetMembershipLogQuery extends Query<
  getMembershipLogs,
  getMembershipLogsVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId?: number;
  totalMemberhsipLogs: any[];
  selMonth: number;
  selYear: number;
  logDatasByDate: any[];
}

class ChartContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      branchId:
        (props.location.state && props.location.state.branchId) || undefined,
      logDatasByDate: [],
      selMonth: moment().month() + 1,
      selYear: moment().year(),
      totalMemberhsipLogs: []
    };
  }
  public render() {
    const { branchId, logDatasByDate } = this.state;
    return (
      <GetMembershipLogQuery
        query={GET_MEMBERSHIP_LOGS}
        variables={{ branchId }}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {({ loading: membershipLogsLoading }) => (
          <ChartPresenter
            membershipLogsLoading={membershipLogsLoading}
            logDatasByDate={logDatasByDate}
          />
        )}
      </GetMembershipLogQuery>
    );
  }

  public updateFields = (data: {} | getMembershipLogs) => {
    if ("GetMembershipLogs" in data) {
      const {
        GetMembershipLogs: { membershipLogs }
      } = data;
      if (membershipLogs !== null) {
        const logDatasByDate = this.getLogDatasByDate(membershipLogs);
        this.setState(
          {
            logDatasByDate,
            totalMemberhsipLogs: membershipLogs
          }
          // () => {
          //   this.setLogDatasByDate(this.state.totalMemberhsipLogs);
          // }
        );
      }
    }
  };

  public daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  public getLogDatasByDate = totalMemberhsipLogs => {
    const logDatasByDate: any[] = [];
    const { selMonth, selYear } = this.state;
    const daysInMonth = this.daysInMonth(selMonth, selYear);

    for (let dateIndex = 1; dateIndex <= daysInMonth; dateIndex++) {
      const date = `${selMonth}/${dateIndex}`;

      const dateMatchedLogs = totalMemberhsipLogs.filter(log => {
        const logMoment = moment(log.actualStartDatetime);
        const logMonth = logMoment.month() + 1;
        const logYear = logMoment.year();
        const logDay = logMoment.date();
        if (
          logYear === selYear &&
          logMonth === selMonth &&
          logDay === dateIndex
        ) {
          return true;
        } else {
          return false;
        }
      });

      const day1 = dateMatchedLogs.filter(log => log.hours <= 24).length;
      const day15 = dateMatchedLogs.filter(log => log.hours === 24 * 15).length;
      const day30 = dateMatchedLogs.filter(log => log.hours === 24 * 30).length;
      const day60 = dateMatchedLogs.filter(log => log.hours === 24 * 60).length;
      const day90 = dateMatchedLogs.filter(log => log.hours === 24 * 90).length;
      const other =
        dateMatchedLogs.length - (day1 + day15 + day30 + day60 + day90);
      logDatasByDate.push({
        date,
        day1,
        day15,
        day30,
        day90,
        other
      });
    }

    return logDatasByDate;
  };
}

export default ChartContainer;
