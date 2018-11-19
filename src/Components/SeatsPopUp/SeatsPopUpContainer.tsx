import React from "react";
import SeatsPopUpPresenter from "./SeatsPopUpPresenter";

interface IProps {
  closeFunc: any;
  roomId: number;
  onSeatClick: (seatId: number) => void;
  assignSeatId?: number | null;
  assignSeatLoading?: boolean;
  onEntranceClick?: () => void;
  canReturn?: boolean;
  returnFn?: () => void;
  title?: string;
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
      assignSeatLoading,
      onEntranceClick,
      canReturn,
      returnFn,
      title
    } = this.props;
    return (
      <SeatsPopUpPresenter
        closeFunc={closeFunc}
        roomId={roomId}
        onSeatClick={onSeatClick}
        assignSeatId={assignSeatId}
        assignSeatLoading={assignSeatLoading}
        onEntranceClick={onEntranceClick}
        canReturn={canReturn}
        returnFn={returnFn}
        title={title}
      />
    );
  }
}

export default SeatsPopUpContainer;
