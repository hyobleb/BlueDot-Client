import React from "react";
import { RouteComponentProps } from "react-router-dom";
import SignUpDetailPresenter from "./SignUpDetailPresenter";

interface IState {
  userId: string;
  password: string;
  repassword: string;
  phoneNumber: string;
  baseBrachId: number | string;
}

interface IProps extends RouteComponentProps<any> {}

export default class SignUpDetailContainer extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    } else {
      if (!props.location.state.confirmTerms) {
        props.history.push("/");
      }
    }

    this.state = {
      baseBrachId: "",
      password: "",
      phoneNumber: "",
      repassword: "",
      userId: ""
    };
  }
  public render() {
    return (
      <SignUpDetailPresenter
        baseBrachId={this.state.baseBrachId}
        password={this.state.password}
        phoneNumber={this.state.phoneNumber}
        repassword={this.state.repassword}
        userId={this.state.userId}
      />
    );
  }
}
