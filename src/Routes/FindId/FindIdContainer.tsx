import React from "react";
import { RouteComponentProps } from "react-router";
import FindIdPresenter from "./FindIdPresenter";

interface IProps extends RouteComponentProps<any> {}

class FindIdContainer extends React.Component<IProps> {
  public render() {
    return <FindIdPresenter />;
  }
}

export default FindIdContainer;
