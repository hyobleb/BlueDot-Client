import React from "react";
import BlankPopUpPresenter from "./BlankPopUpPresenter";

interface IProps {
  closeFunc: any;
  childeComponent?: React.StatelessComponent<{}>;
}

class BranchSearchPopUpContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { closeFunc, childeComponent } = this.props;
    return (
      <BlankPopUpPresenter closeFunc={closeFunc} children={childeComponent} />
    );
  }
}

export default BranchSearchPopUpContainer;
