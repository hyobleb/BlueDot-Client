import React from "react";
import ModalBoxPresenter from "./ModalBoxPresenter";

interface IProps {
  color: string;
  name: string;
  branchName: string;
  startDatetime: string;
  endDatetime: string;
  marginBottom?: number;
  title: string;
}

class ModalBoxContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const {
      color,
      name,
      branchName,
      startDatetime,
      endDatetime,
      marginBottom = 20,
      title
    } = this.props;
    return (
      <ModalBoxPresenter
        color={color}
        name={name}
        branchName={branchName}
        startDatetime={startDatetime}
        endDatetime={endDatetime}
        marginBottom={marginBottom}
        title={title}
      />
    );
  }
}

export default ModalBoxContainer;
