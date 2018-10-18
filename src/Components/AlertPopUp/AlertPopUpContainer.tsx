import React from "react";
import AlertPopUpPresenter from "./AlertPopUpPresenter";

interface IProps {
  closeFunc: () => void;
  message: string;
  onOkClick: () => void;
  onCancelClick?: () => void;
}

interface IState {
  closeFunc: () => void;
  message: string;
  onOkClick: () => void;
  onCancelClick: () => void;
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
      onOkClick: props.onOkClick
    };
  }

  public render() {
    const { closeFunc, message, onCancelClick, onOkClick } = this.state;
    return (
      <AlertPopUpPresenter
        message={message}
        closeFunc={closeFunc}
        onCancelClick={onCancelClick}
        onOkClick={onOkClick}
      />
    );
  }
}

export default AlertPopUpContainer;
