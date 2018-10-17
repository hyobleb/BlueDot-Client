import React from "react";
import { RouteComponentProps } from "react-router";
import SettingProductPresenter from "./SettingProductPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
}
class SettingProductContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchId: props.location.state.branchId
    };
  }

  public render() {
    return <SettingProductPresenter onAddButtonClick={this.onAddButtonClick} />;
  }

  public onAddButtonClick = () => {
    const { history } = this.props;
    const { branchId } = this.state;
    history.push({
      pathname: "/add-product",
      state: {
        branchId
      }
    });
  };
}

export default SettingProductContainer;
