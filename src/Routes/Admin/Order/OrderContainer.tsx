import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import OrderPresenter from "./OrderPresenter";

interface IProps extends RouteComponentProps<any> {} 
interface IState {
  isOk: boolean
}

class OrderContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      isOk: true
    }
  }
  public render() {
    const { isOk } = this.state;

    return <OrderPresenter isOk = { isOk }/>;
  }
}
export default OrderContainer;
