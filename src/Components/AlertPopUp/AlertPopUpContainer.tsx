import React from "react";
import AlertPopUpPresenter from "./AlertPopUpPresenter";

interface IProps {
  closeFunc: () => void;
  message: string;
  onOkClick: () => void;
  onCancelClick?: () => void;
  useCancelBtn?: boolean;
}

interface IState {
  closeFunc: () => void;
  message: string;
  onOkClick: () => void;
  onCancelClick: () => void;
  useCancelBtn?: boolean;
}

class AlertPopUpContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      closeFunc: props.closeFunc,
      message: props.message,
      onCancelClick: props.onCancelClick
        ? props.onCancelClick
        : props.closeFunc,
      onOkClick: props.onOkClick,
      useCancelBtn: props.useCancelBtn
    };
  }

  public render() {
    const {
      closeFunc,
      message,
      onCancelClick,
      onOkClick,
      useCancelBtn
    } = this.state;
    return (
      <AlertPopUpPresenter
        message={message}
        closeFunc={closeFunc}
        onCancelClick={onCancelClick}
        onOkClick={onOkClick}
        useCancelBtn={useCancelBtn}
      />
    );
  }
}

export default AlertPopUpContainer;
