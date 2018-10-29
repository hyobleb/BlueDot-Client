import React from "react";
import SeatsPopUpPresenter from "./SeatsPopUpPresenter";

interface IProps {
  closeFunc: any;
  roomId: number;
  onSeatClick: (seatId: number) => void;
  assignSeatId: number | null;
  assignSeatLoading: boolean;
}

class SeatsPopUpContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const {
      closeFunc,
      roomId,
      onSeatClick,
      assignSeatId,
      assignSeatLoading
    } = this.props;
    return (
      <SeatsPopUpPresenter
        closeFunc={closeFunc}
        roomId={roomId}
        onSeatClick={onSeatClick}
        assignSeatId={assignSeatId}
        assignSeatLoading={assignSeatLoading}
      />
    );
  }
}

export default SeatsPopUpContainer;
