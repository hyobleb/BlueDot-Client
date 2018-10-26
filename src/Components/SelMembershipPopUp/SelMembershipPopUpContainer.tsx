import React from "react";
import SelMembershipPopUpPresenter from "./SelMembershipPopUpPresenter";

interface IProps {
  closeFunc: any;
  memberships: any;
  onMembershipClick: (membershipId: number) => void;
  title: string;
}

class SelMembershipPopUpContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { closeFunc, memberships, onMembershipClick, title } = this.props;
    return (
      <SelMembershipPopUpPresenter
        closeFunc={closeFunc}
        memberships={memberships}
        onMembershipClick={onMembershipClick}
        title={title}
      />
    );
  }
}

export default SelMembershipPopUpContainer;
