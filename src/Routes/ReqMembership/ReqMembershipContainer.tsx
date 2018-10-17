import moment from "moment";
import React from "react";
import { RouteComponentProps } from "react-router";
import ReqMembershipPresenter from "./ReqMembershipPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  datetimeValue: string;
}

class ReqMembershipContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchId: props.location.state.branchId,
      datetimeValue: moment().format("YYYY-MM-DD HH:mm:ss")
    };
  }

  public render() {
    const { datetimeValue } = this.state;
    return <ReqMembershipPresenter datetimeValue={datetimeValue} />;
  }
}

export default ReqMembershipContainer;
