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
  button1Func?: () => void;
  button2Func?: () => void;
  displayTitle?: boolean;
  highLightBorder?: boolean;
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
      title,
      button1Func,
      button2Func,
      displayTitle = true,
      highLightBorder = false
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
        button1Func={button1Func}
        button2Func={button2Func}
        displayTitle={displayTitle}
        highLightBorder={highLightBorder}
      />
    );
  }
}

export default ModalBoxContainer;
