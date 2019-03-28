import React from "react";
import { RouteComponentProps } from "react-router-dom";
import FindAccountPresenter from "./FindAccountPresenter";

class FindAccountContainer extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <FindAccountPresenter
        onFindUserIdBtnClick={this.onFindUserIdBtnClick}
        onFindUserPasswordBtnClick={this.onFindUserPasswordBtnClick}
      />
    );
  }

  public onFindUserIdBtnClick = () => {
    const { history } = this.props;
    history.push({
      pathname: "/find-userId",
      state: {
        backInfo: {
          backUrl: "/find-account"
        }
      }
    });
  };

  public onFindUserPasswordBtnClick = () => {
    const { history } = this.props;
    history.push({
      pathname: "/find-password",
      state: {
        backInfo: {
          backUrl: "/find-account"
        }
      }
    });
  };
}
export default FindAccountContainer;
