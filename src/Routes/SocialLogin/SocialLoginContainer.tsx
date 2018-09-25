import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
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
  public state = {
    email: "",
    fbId: "",
    name: ""
  };
  public facebookMutation: MutationFn;

  public render() {
    // const { name, email, fbId } = this.state;
    return (
      <LoginMutation mutation={FACEBOOK_CONNECT}>
        {(facebookMutation, { loading }) => {
          this.facebookMutation = facebookMutation;
          return <SocialLoginPresenter loginCallback={this.loginCallback} />;
        }}
      </LoginMutation>
    );
  }

  public loginCallback = response => {
    const { name, email, id, accessToken } = response;
    if (accessToken) {
      toast.success(`${name}님 환영합니다!`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          name
        }
      });
    } else {
      toast.error("로그인할 수 없습니다😥");
    }

    // this.mutation();
  };
}

export default SocialLoginContainer;
