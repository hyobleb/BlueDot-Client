import React from "react";
import { getSeatsV2_GetSeatsV2_seats } from "../../types/api";
import RoomPopUpPresenter from "./RoomPopUpPresenter";

interface IProps {
  closeFunc: any;
  roomId: number;
  onSeatClick: (seatId: number) => Promise<void>;
  assignSeatId?: number;
  assignSeatLoading?: boolean;
  onEntranceClick: () => void;
  canReturn?: boolean;
  returnFn?: () => void;
  title?: string;
  returnSeatLoading?: boolean;
  seats: Array<getSeatsV2_GetSeatsV2_seats | null> | null;
  getSeatsLoading: boolean;
  forAdmin?: boolean;
}

class RoomPopUpContainer extends React.Component<IProps> {
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
      title,
      returnSeatLoading,
      seats,
      getSeatsLoading,
      forAdmin = false
    } = this.props;

    return (
      <RoomPopUpPresenter
        closeFunc={closeFunc}
        roomId={roomId}
        onSeatClick={onSeatClick}
        assignSeatId={assignSeatId}
        assignSeatLoading={assignSeatLoading}
        onEntranceClick={onEntranceClick}
        canReturn={canReturn}
        returnFn={returnFn}
        title={title}
        returnSeatLoading={returnSeatLoading}
        seats={seats}
        getSeatsLoading={getSeatsLoading}
        forAdmin={forAdmin}
      />
    );
  }
}

export default RoomPopUpContainer;
