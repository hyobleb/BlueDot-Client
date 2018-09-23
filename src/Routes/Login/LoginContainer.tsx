import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import LoginPresenter from "./LoginPresenter";

interface IState {
  userId: string;
  password: string;
}

export default class LoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state = {
    password: "",
    userId: ""
  };
  public render() {
    return (
      <LoginPresenter
        userId={this.state.userId}
        password={this.state.password}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    // const { userId, password } = this.state;
    // tslint: disalbe-next-line

    toast.info("Suup");
  };
}
