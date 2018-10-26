import React from "react";
import BlankPopUpPresenter from "./BlankPopUpPresenter";

interface IProps {
  closeFunc: any;
  childComponent?: React.StatelessComponent<{}>;
}

class BranchSearchPopUpContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { closeFunc, childComponent } = this.props;
    return (
      <BlankPopUpPresenter closeFunc={closeFunc} children={childComponent} />
    );
  }
}

export default BranchSearchPopUpContainer;
