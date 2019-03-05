import React from "react";
import { getSeatsV2_GetSeatsV2_seats } from "../../types/api";
import SeatBoxPresenter from "./SeatBoxPresenter";

const CONTAINER_RATIO = 90;
const CONTAINER_MAX_WIDTH = 500;
const CONTAINER_MIN_WIDTH = 300;

interface IProps {
  onSeatClick: (seatId: number) => Promise<void>;
  onDoorClick: (doorId: number) => void;
  roomId: number; // room Id 전달받고 데이터 가져오기
  forAdmin: boolean;
  selSeatId?: number;
  selDoorId?: number;
  tempLeft?: number;
  tempTop?: number;
  tempRotate?: number;
  tempFlip?: boolean;
  tempSeatNumber?: number;
  assignSeatId?: number;
  assignSeatLoading?: boolean;
  seats: Array<getSeatsV2_GetSeatsV2_seats | null> | null;
  getSeatsLoading: boolean;
  editMode?: boolean;
  newSeat?: boolean;
  newTop?: number;
  newLeft?: number;
  newRotate?: number;
  newIsFlip?: boolean;
  newSeatNumber?: number;
  newIsDoor?: boolean;
}

interface IState {
  windowWidth: number;
  containerWidth: number;
  seats: Array<getSeatsV2_GetSeatsV2_seats | null> | null;
  seatIdHovered: number;
  roomId: number;
}

class SeatBoxContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      roomId: props.roomId,
      seatIdHovered: 0,
      seats: null,
      windowWidth: 0
    };
  }

  public componentWillMount() {
    this.setScreen();
    window.onresize = event => {
      this.setScreen();
    };
  }

  public setScreen = () => {
    const windowWidth = window.innerWidth || document.body.clientWidth;
    const calContainerWidth = (windowWidth / 100) * CONTAINER_RATIO;

    const containerWidth =
      calContainerWidth > CONTAINER_MAX_WIDTH
        ? CONTAINER_MAX_WIDTH
        : calContainerWidth;

    this.setState({
      containerWidth,
      windowWidth
    });
  };

  public onSeatHover = (seatId: number) => {
    this.setState({
      seatIdHovered: seatId
    });
  };

  public onSeatHoverOut = () => {
    this.setState({
      seatIdHovered: 0
    });
  };

  public render() {
    const { containerWidth, seatIdHovered } = this.state;
    const {
      onSeatClick,
      onDoorClick,
      forAdmin,
      selSeatId,
      selDoorId,
      tempLeft,
      tempTop,
      tempRotate,
      tempFlip,
      tempSeatNumber,
      assignSeatId,
      assignSeatLoading,
      seats,
      getSeatsLoading,
      editMode = false,
      newSeat,
      newTop,
      newLeft,
      newRotate,
      newIsFlip,
      newSeatNumber,
      newIsDoor
    } = this.props;

    return (
      <SeatBoxPresenter
        containerWidth={containerWidth}
        containerMaxW={CONTAINER_MAX_WIDTH}
        containerMinW={CONTAINER_MIN_WIDTH}
        onSeatClick={onSeatClick}
        getSeatsLoading={getSeatsLoading}
        seats={seats}
        onSeatHover={this.onSeatHover}
        onSeatHoverOut={this.onSeatHoverOut}
        seatIdHovered={seatIdHovered}
        onDoorClick={onDoorClick}
        forAdmin={forAdmin}
        selSeatId={selSeatId}
        selDoorId={selDoorId}
        tempLeft={tempLeft}
        tempTop={tempTop}
        tempRotate={tempRotate}
        tempFlip={tempFlip}
        tempSeatNumber={tempSeatNumber}
        assignSeatId={assignSeatId}
        assignSeatLoading={assignSeatLoading}
        editMode={editMode}
        newIsFlip={newIsFlip}
        newIsDoor={newIsDoor}
        newLeft={newLeft}
        newRotate={newRotate}
        newSeat={newSeat}
        newSeatNumber={newSeatNumber}
        newTop={newTop}
      />
    );
  }
}

export default SeatBoxContainer;
