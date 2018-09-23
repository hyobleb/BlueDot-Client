import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { userIdSignIn, userIdSignInVariables } from "../../types/api";
import LoginPresenter from "./LoginPresenter";
import { USER_ID_SIGN_IN } from "./LoginQueries";

interface IState {
  userId: string;
  password: string;
}

class SignInMutation extends Mutation<userIdSignIn, userIdSignInVariables> {}

export default class LoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state = {
    password: "",
    userId: ""
  };
  public render() {
    const { userId, password } = this.state;
    return (
      <SignInMutation
        mutation={USER_ID_SIGN_IN}
        variables={{
          password,
          userId
        }}
        onCompleted={data => {
          const { UserIdSignIn } = data;
          if (UserIdSignIn.ok) {
            return;
          } else {
            toast.error(UserIdSignIn.error);
          }
        }}
        // onCompleted에서는 data가 이미 type이 되어 있음
        // update={this.afterSbumit}
        // mutation은 child로 함수를 받아야함
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
            event.preventDefault();
            mutation();
          };

          return (
            <LoginPresenter
              userId={this.state.userId}
              password={this.state.password}
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
              loading={loading}
            />
          );
        }}
      </SignInMutation>
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

  // public afterSbumit: MutationUpdaterFn = (
  //   cache,
  //   result: { data: userIdSignIn }
  // ) => {};
}
