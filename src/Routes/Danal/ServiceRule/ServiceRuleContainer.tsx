import React from "react";
import { RouteComponentProps } from "react-router-dom";
import PrivatePresenter from "./ServiceRulePresenter";

class PrivateInfoContainer extends React.Component<RouteComponentProps<any>> {
  public render() {
    return <PrivatePresenter />;
  }
}
export default PrivateInfoContainer;
