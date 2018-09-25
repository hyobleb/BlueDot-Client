import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  name: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public mutation: MutationFn;

  public render() {
    const { name, email, fbId } = this.state;
    return (
      <LoginMutation
        mutation={FACEBOOK_CONNECT}
        variables={{ name, email, fbId }}
      >
        {(mutation, { loading }) => {
          this.mutation = mutation;
          return <SocialLoginPresenter loginCallback={this.callback} />;
        }}
      </LoginMutation>
    );
  }

  public callback = fbData => {
    this.setState({
      email: fbData.email
    });
    this.mutation();
  };
}

export default SocialLoginContainer;
