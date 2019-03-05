import React from "react";
import { RouteComponentProps } from "react-router-dom";
import RefundInfoPresenter from "./RefundInfoPresenter";

class RefundInfoContainer extends React.Component<RouteComponentProps<any>> {
  public render() {
    return <RefundInfoPresenter />;
  }
}
export default RefundInfoContainer;
