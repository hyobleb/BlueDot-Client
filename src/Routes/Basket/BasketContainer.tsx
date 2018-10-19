import React from "react";
import { RouteComponentProps } from "react-router-dom";
import BasketPresenter from "./BasketPresenter";

interface IProps extends RouteComponentProps<any> {}

class BasketContainer extends React.Component<IProps> {
  public render() {
    return <BasketPresenter />;
  }
}

export default BasketContainer;
