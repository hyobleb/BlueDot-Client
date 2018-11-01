import moment from "moment";
import React from "react";
import styled from "src/typed-components";

const Container = styled.div`
  position: relative;
  max-width: 200px;
  min-width: 100px;
`;
const MiniMapImg = styled.img`
  width: 100%;
`;

// const RoomTransparent = styled<
//   {
//     height: number;
//     width: number;
//     top: number;
//     left: number;
//     tempSelected: boolean;
//   },
//   "div"
// >("div")`
//   cursor: pointer;
//   position: absolute;
//   border: 1px solid black;
//   height: ${props => props.height}%;
//   width: ${props => props.width}%;
//   top: ${props => props.top}%;
//   left: ${props => props.left}%;
//   backgroundcolor: ${props =>
//     props.tempSelected ? props.theme.redColor : props.theme.lightBlueColor};
//   &:hover {
//     background-color: white;
//     opacity: 0.6;
//   }
// `;

const Room = styled<
  {
    width: number;
    height: number;
    xpos: number;
    ypos: number;
  },
  "div"
>("div")`
  position: absolute;
  width: ${props => props.width}%;
  height: ${props => props.height}%;
  left: ${props => props.xpos}%;
  top: ${props => props.ypos}%;
`;
const SeatContainer = styled<
  {
    xpos: number;
    ypos: number;
    rotate: number;
    usable: boolean;
    discard: boolean;
    nowUsing: boolean;
    endDatetime: string;
  },
  "div"
>("div")`
  position: absolute;
  left: ${props => props.xpos}%;
  top: ${props => props.ypos}%;
  width: 3px;
  height: 3px;
  transform: rotate(${props => props.rotate}deg);
`;

const Seat = styled<{ nowUsing: boolean; endDatetime: string }, "div">("div")`
  position: absolute;
  top: -80%;
  width: 3px;
  height: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.nowUsing && moment(props.endDatetime) >= moment()
      ? props.theme.redColor
      : props.theme.lightBlueColor};
`;

interface IProps {
  minimapImage: string;
  className?: string;
  rooms?: any;
}

const Minimap: React.SFC<IProps> = ({ minimapImage, rooms, className }) => (
  <Container className={className}>
    <MiniMapImg src={minimapImage} />
    {rooms &&
      rooms.map(room => (
        <Room
          key={room.id}
          width={room.width}
          height={room.height}
          xpos={room.xpos}
          ypos={room.ypos}
        >
          {room.seats.map(
            seat =>
              !seat.discard &&
              seat.usable && (
                <SeatContainer
                  key={seat.id}
                  xpos={seat.xpos}
                  ypos={seat.ypos}
                  rotate={seat.rotate}
                  usable={seat.usable}
                  discard={seat.discard}
                  nowUsing={seat.nowUsing}
                  endDatetime={seat.endDatetime}
                >
                  <Seat
                    nowUsing={seat.nowUsing}
                    endDatetime={seat.endDatetime}
                  />
                </SeatContainer>
              )
          )}
        </Room>
      ))}
  </Container>
);
export default Minimap;
