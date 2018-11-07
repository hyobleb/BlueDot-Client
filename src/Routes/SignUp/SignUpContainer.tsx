import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import SignUpPresenter from "./SignUpPresenter";

interface IState {
  termsAndConditionsCheck: boolean;
  personalDataCheck: boolean;
  allChecked: boolean;
}

interface IProps extends RouteComponentProps<any> {}

export default class SignUpContainer extends React.Component<IProps, IState> {
  public state = {
    allChecked: false,
    personalDataCheck: false,
    termsAndConditionsCheck: false
  };
  public render() {
    return (
      <SignUpPresenter
        allChecked={this.state.allChecked}
        personalDataCheck={this.state.personalDataCheck}
        termsAndConditionsCheck={this.state.termsAndConditionsCheck}
        toggleAllCheck={this.toggleAllCheck}
        togglePersonalDataCheck={this.togglePersonalDataCheck}
        toggleTermsAndConditionCheck={this.toggleTermsAndConditionCheck}
        onConfirmClick={this.onConfirmClick}
      />
    );
  }

  public togglePersonalDataCheck = () => {
    this.setState({
      ...this.state,
      personalDataCheck: !this.state.personalDataCheck
    });
  };

  public toggleTermsAndConditionCheck = () => {
    this.setState({
      ...this.state,
      termsAndConditionsCheck: !this.state.termsAndConditionsCheck
    });
  };

  public toggleAllCheck = () => {
    if (!this.state.allChecked) {
      this.setState({
        ...this.state,
        allChecked: true,
        personalDataCheck: true,
        termsAndConditionsCheck: true
      });
    } else {
      this.setState({
        ...this.state,
        allChecked: false,
        personalDataCheck: false,
        termsAndConditionsCheck: false
      });
    }
  };

  public onConfirmClick = () => {
    const { history } = this.props;

    if (
      this.state.personalDataCheck &&
      this.state.allChecked &&
      this.state.termsAndConditionsCheck
    ) {
      history.push({
        pathname: "/sign-up-detail",
        state: {
          confirmTerms: true
        }
      });
    } else {
      toast.error("각 항목에 동의를 하셔야 가입을 하실수 있습니다");
    }
  };
}
