import React from "react";
import BlankPopUpPresenter from "./BlankPopUpPresenter";

interface IProps {
  closeFunc: any;
}

class BranchSearchPopUpContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { closeFunc } = this.props;
    return <BlankPopUpPresenter closeFunc={closeFunc} />;
  }
}

export default BranchSearchPopUpContainer;
