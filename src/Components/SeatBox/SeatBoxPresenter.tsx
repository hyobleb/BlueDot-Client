import moment from "moment";
import React from "react";
import styled from "../../typed-components";
import { getSeatsV2_GetSeatsV2_seats } from "../../types/api";
import Loading from "../Loading";

// const CONTAINER_WIDTH = 90;
const LEFT_RATIO = 0.25;
const TOP_RATIO = 0.25;
const SEAT_TEXT_FONT_RATIO = 0.4;
const SEAT_WIDTH_RATIO = 0.07;
const TEMP_SEAT = `${process.env.PUBLIC_URL}/img/seats/temp_seat.png`;
const STAND_BY_SEAT = `${process.env.PUBLIC_URL}/img/seats/standbyseat.png`;

interface IProps {
  containerWidth: number;
  containerMaxW: number;
  containerMinW: number;
  onSeatClick: (seatId: number) => Promise<void>;
  seats: Array<getSeatsV2_GetSeatsV2_seats | null> | null;
  getSeatsLoading: boolean;
  onSeatHover: (seatId: number) => void;
  onSeatHoverOut: () => void;
  seatIdHovered: number;
  seatImg?: string;
  onDoorClick: (doorId: number) => void;
  forAdmin?: boolean;
  selSeatId?: number;
  selDoorId?: number;
  tempLeft?: number;
  tempTop?: number;
  tempRotate?: number;
  tempFlip?: boolean;
  tempSeatNumber?: number;
  assignSeatId?: number;
  assignSeatLoading?: boolean;
  editMode: boolean;
  newIsFlip?: boolean;
  newIsDoor?: boolean;
  newLeft?: number;
  newRotate?: number;
  newSeat?: boolean;
  newSeatNumber?: number;
  newTop?: number;
}
interface ISeatProps {
  left: number;
  top: number;
  rotate: number;
  isDoor?: boolean;
  onDoorClick: (doorId: number) => void;
  discard?: boolean;
  isFlip?: boolean;
  containerWidth: number;
  onSeatClick: (seatId: number) => Promise<void>;
  id?: number;
  onSeatHover: (seatId: number) => void;
  onSeatHoverOut: () => void;
  seatIdHovered: number;
  nowUsing: boolean;
  seatImg?: string;
  forAdmin?: boolean;
  seatNumber: number;
  userName: string;
  selSeatId?: number;
  selDoorId?: number;
  tempLeft?: number;
  tempTop?: number;
  tempRotate?: number;
  tempFlip?: boolean;
  endDatetime?: string | null;
  tempSeatNumber?: number;
  assignSeatId?: number;
  assignSeatLoading?: boolean;
  isNewSeat?: boolean;
}

const Container = styled<
  {
    maxWidth: number;
    minWidth: number;
    containerWidth: number;
  },
  "div"
>("div")`
  width: ${props => props.containerWidth}px;
  height: ${props => props.containerWidth}px;
  min-height: ${props => props.minWidth}px;
  max-height: ${props => props.maxWidth}px;
  min-width: ${props => props.minWidth}px;
  max-width: ${props => props.maxWidth}px;
  border: 1px solid #dedede;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border-radius: 10px;
`;

const SeatImg = styled.img`
  width: 100%;
`;

const SeatItem = styled<
  {
    left: number;
    top: number;
    rotate: number;
    width: number;
    height: number;
    isFlip?: boolean;
    containerWidth: number;
    containerHeight: number;
    isHover: boolean;
  },
  "div"
>("div")`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: absolute;
  left: ${props =>
    props.containerWidth / 2 +
    props.left * props.width * LEFT_RATIO -
    (1 / 2) * props.width}px;
  top: ${props =>
    props.containerHeight / 2 +
    props.top * props.height * TOP_RATIO -
    (1 / 2) * props.height}px;
  transform: rotate(${props => props.rotate}deg)
    ${props => (props.isFlip ? "scaleX(-1)" : "")};
  cursor: pointer;
  background-color: ${props =>
    props.isHover ? props.theme.lightBlueColor : "inherit"};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const SeatTextCon = styled<
  {
    rotate: number;
    seatHeight: number;
    displayName?: boolean;
  },
  "div"
>("div")`
  width: 100%;
  text-align: center;
  top: ${props => (props.seatHeight / 100) * 5}px;
  position: absolute;
  background-color: ${props => (props.displayName ? "white" : "inheirt")};
`;

const SeatText = styled<
  {
    isReverse: boolean;
    seatWidth: number;
  },
  "div"
>("div")`
  transform: rotate(${props => (props.isReverse && "180deg") || "0deg"});
  width: 100%;
  font-size: ${props => props.seatWidth * SEAT_TEXT_FONT_RATIO}px;
  text-align: center;
  color: ${props => props.theme.blueColor};
`;

// For Fool's Day
// const FoolsDayImg = styled<{ rotate: number }, "img">("img")`
//   width: 100%;
//   transform: rotate(180deg);
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1;
// `;
//

const Seat: React.SFC<ISeatProps> = ({
  containerWidth,
  left,
  top,
  rotate,
  isFlip,
  isDoor,
  onSeatClick,
  id,
  onSeatHover,
  onSeatHoverOut,
  seatIdHovered,
  nowUsing,
  seatImg,
  onDoorClick,
  seatNumber,
  userName,
  forAdmin,
  selSeatId,
  selDoorId,
  tempLeft,
  tempTop,
  tempRotate,
  tempFlip,
  endDatetime,
  tempSeatNumber,
  assignSeatId,
  assignSeatLoading,
  isNewSeat = false
}) => {
  const actualUsing: boolean = nowUsing
    ? endDatetime && moment(endDatetime) > moment()
      ? true
      : false
    : false;
  const SEAT_WIDTH = containerWidth * SEAT_WIDTH_RATIO;
  const SEAT_HEIGHT = SEAT_WIDTH;
  const text = isDoor
    ? ""
    : isNewSeat
    ? seatNumber || userName
    : selDoorId === id || selSeatId === id
    ? tempSeatNumber
    : forAdmin
    ? actualUsing
      ? userName
      : seatNumber
    : actualUsing
    ? ""
    : seatNumber;

  const displayName =
    isNewSeat && !seatNumber
      ? true
      : forAdmin && actualUsing && selDoorId !== id && selSeatId !== id;
  const seatLeft =
    selDoorId === id || selSeatId === id
      ? tempLeft !== undefined
        ? tempLeft
        : left
      : left;

  const seatTop =
    selDoorId === id || selSeatId === id
      ? tempTop !== undefined
        ? tempTop
        : top
      : top;

  const seatRotate =
    selDoorId === id || selSeatId === id
      ? tempRotate !== undefined
        ? tempRotate
        : rotate
      : rotate;

  const seatFlip =
    selDoorId === id || selSeatId === id
      ? tempFlip !== undefined
        ? tempFlip
        : isFlip
      : isFlip;

  return (
    <SeatItem
      left={seatLeft}
      top={seatTop}
      width={SEAT_WIDTH}
      height={SEAT_HEIGHT}
      rotate={seatRotate}
      isFlip={seatFlip}
      containerWidth={containerWidth}
      containerHeight={containerWidth}
      onClick={async () =>
        !isDoor ? id && (await onSeatClick(id)) : id && onDoorClick(id)
      }
      onPointerEnter={() => id && onSeatHover(id)}
      onPointerLeave={onSeatHoverOut}
      isHover={!actualUsing && !isDoor && id === seatIdHovered}
    >
      {assignSeatId === id && assignSeatLoading ? (
        <SeatImg src={`${process.env.PUBLIC_URL}/img/seats/loading_eyes.gif`} />
      ) : (
        <>
          <SeatImg
            src={
              isNewSeat
                ? seatImg
                : selSeatId === id
                ? TEMP_SEAT
                : actualUsing
                ? seatImg
                : isDoor
                ? seatImg
                : STAND_BY_SEAT
            }
          />
          <SeatTextCon
            seatHeight={SEAT_HEIGHT}
            rotate={rotate}
            displayName={displayName}
          >
            <SeatText seatWidth={SEAT_WIDTH} isReverse={isTextFlip(rotate)}>
              {text}
            </SeatText>
          </SeatTextCon>

          {/* For Fool's Day */}
          {/* {actualUsing ? (
            <FoolsDayImg
              rotate={rotate}
              src={
                "/img/event/flames_500_clr_8629.gif.9ad871baf6507367fa72448c1be2662c.gif"
              }
            />
          ) : (
            ""
          )} */}
          {/*  */}
        </>
      )}
    </SeatItem>
  );
};

const SeatBoxPresenter: React.SFC<IProps> = ({
  containerWidth,
  containerMaxW,
  containerMinW,
  onSeatClick,
  getSeatsLoading,
  seats,
  onSeatHover,
  onSeatHoverOut,
  seatIdHovered,
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
  newIsFlip,
  newIsDoor,
  newLeft,
  newRotate,
  newSeat,
  newSeatNumber,
  newTop
}) => {
  return (
    <Container
      containerWidth={containerWidth}
      maxWidth={containerMaxW}
      minWidth={containerMinW}
    >
      {getSeatsLoading ? (
        <Loading />
      ) : (
        seats &&
        seats.map(
          seat =>
            seat && (
              <Seat
                key={seat.id}
                containerWidth={containerWidth}
                left={seat.left}
                top={seat.top}
                rotate={seat.rotate}
                seatNumber={seat.seatNumber}
                onSeatClick={onSeatClick}
                id={seat.id}
                isDoor={seat.isDoor}
                onSeatHover={onSeatHover}
                onSeatHoverOut={onSeatHoverOut}
                seatIdHovered={seatIdHovered}
                nowUsing={seat.nowUsing}
                seatImg={seat.seatImg}
                onDoorClick={onDoorClick}
                userName={seat.userName}
                forAdmin={forAdmin}
                selSeatId={selSeatId}
                selDoorId={selDoorId}
                tempLeft={tempLeft}
                tempTop={tempTop}
                tempRotate={tempRotate}
                tempFlip={tempFlip}
                endDatetime={seat.endDatetime}
                tempSeatNumber={tempSeatNumber}
                isFlip={seat.isFlip}
                assignSeatId={assignSeatId}
                assignSeatLoading={assignSeatLoading}
              />
            )
        )
      )}

      {newSeat ? (
        <Seat
          containerWidth={containerWidth}
          left={newLeft || 0}
          top={newTop || 0}
          rotate={newRotate || 0}
          seatNumber={newSeatNumber || 0}
          onSeatClick={onSeatClick}
          isDoor={newIsDoor}
          onSeatHover={onSeatHover}
          onSeatHoverOut={onSeatHoverOut}
          seatIdHovered={seatIdHovered}
          nowUsing={false}
          seatImg={
            newIsDoor
              ? `${process.env.PUBLIC_URL}/img/seats/door.png`
              : `${process.env.PUBLIC_URL}/img/seats/temp_seat.png`
          }
          onDoorClick={() => {
            return;
          }}
          userName={"새좌석"}
          forAdmin={true}
          tempSeatNumber={newSeatNumber}
          isFlip={newIsFlip}
          isNewSeat={true}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

const isTextFlip = rotate => (rotate > 90 && rotate < 270) || false;

export default SeatBoxPresenter;
