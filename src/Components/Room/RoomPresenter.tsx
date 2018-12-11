import moment from "moment";
import React from "react";
import styled from "../../typed-components";
import { getSeats } from "../../types/api";
import Loading from "../Loading";

interface IProps {
  data?: getSeats;
  loading: boolean;
  onSeatClick: (seatId: number) => void;
  showTempSeat: boolean;
  tempSeatXpos: number;
  tempSeatYpos: number;
  tempSeatRotate: number;
  tempSeatNumber: number;
  tempSeatUsable: boolean;
  tempSeatFemaleUsable: boolean;
  tempSeatMaleUsable: boolean;
  selSeatNumber?: number;
  selSeatId?: number;
  selSeatXpos?: number;
  selSeatYpos?: number;
  selSeatDiscard?: boolean;
  selSeatMaleUsable?: boolean;
  selSeatFemaleUsable?: boolean;
  selSeatUsable?: boolean;
  selSeatRotate?: number;
  isAddDoor?: boolean;
  isFlip?: boolean;
  assignSeatId?: number | null;
  assignSeatLoading?: boolean;
  onEntranceClick?: () => void;
}

interface ISProps {
  left: number;
  top: number;
  rotate: number;
  seatNumber: number;
  onSeatClick?: () => void;
  usable: boolean;
  femaleUsable: boolean;
  maleUsable: boolean;
  discard?: boolean;
  endDatetime?: string | null;
  nowUsing?: boolean;
  isDoor?: boolean;
  gender?: string | null;
  assignSeatId?: number | null;
  assignSeatLoading?: boolean;
  seatId?: number;
}

interface IDProps {
  left: number;
  top: number;
  rotate: number;
  onDoorClick?: () => void;
  discard?: boolean;
  isFlip?: boolean;
}

// const SeatLoading = styled(Loading)`
//   width: 100%;
//   height: 100%;
// `;

const BackContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const Container = styled.div`
  /* width: 100%;
  max-width: 500px;
  min-width: 247px; */
  width: 320px;
  height: 500px;
  position: relative;
  border: 1px solid #dedede;
  border-radius: 10px;
  overflow: scroll;
`;
const Room = styled.div`
  background-color: "#dedede";
`;

const Item = styled<
  {
    left: number;
    top: number;
    rotate: number;
    isFlip?: boolean;
  },
  "div"
>("div")`
  width: 10%;
  height: 10%;
  position: absolute;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  transform: rotate(${props => props.rotate}deg)
    ${props => (props.isFlip ? "scaleX(-1)" : "")};
`;

const SeatNumber = styled<{ numberRotate?: boolean }, "div">("div")`
  position: absolute;
  top: 10%;
  font-size: 10%;
  &:hover {
    cursor: pointer;
  }
  transform: rotate(${props => props.numberRotate && 180}deg);
`;

const SeatItem = styled(Item)``;

const DoorItem = styled(Item)``;

const SeatImg = styled.img`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
// const SeatNumber = styled.div`
//   position: absolute;
//   top: 10%;
//   font-size: 10%;
//   &:hover {
//     cursor: pointer;
//   }
// `;

const ImgContainer = styled.div`
  position: relative;
  left: -50%;
  margin-top: -50%;
  margin-bottom: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Door: React.SFC<IDProps> = ({
  left,
  top,
  rotate,
  onDoorClick = () => {
    return;
  },
  discard = false,
  isFlip = false
}) => {
  return (
    <DoorItem left={left} top={top} rotate={rotate} isFlip={isFlip}>
      <ImgContainer onClick={onDoorClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16 12.771h-3.091c-.542 0-.82-.188-1.055-.513l-1.244-1.674-2.029 2.199 1.008 1.562c.347.548.373.922.373 1.42v4.235h-1.962v-3.981c-.016-1.1-1.695-2.143-2.313-1.253l-1.176 1.659c-.261.372-.706.498-1.139.498h-3.372v-1.906l2.532-.001c.397 0 .741-.14.928-.586l1.126-2.75c.196-.41.46-.782.782-1.102l2.625-2.6-.741-.647c-.223-.195-.521-.277-.812-.227l-2.181.381-.342-1.599 2.992-.571c.561-.107 1.042.075 1.461.462l2.882 2.66c.456.414.924 1.136 1.654 2.215.135.199.323.477.766.477h2.328v1.642zm-2.982-5.042c1.02-.195 1.688-1.182 1.493-2.201-.172-.901-.96-1.528-1.845-1.528-1.186 0-2.07 1.078-1.85 2.234.196 1.021 1.181 1.69 2.202 1.495zm4.982-5.729v15l6 5v-20h-6z" />
        </svg>
      </ImgContainer>
    </DoorItem>
  );
};

const Seat: React.SFC<ISProps> = ({
  left,
  top,
  rotate,
  seatNumber,
  usable,
  femaleUsable,
  maleUsable,
  endDatetime,
  nowUsing,
  isDoor,
  gender,
  assignSeatId,
  assignSeatLoading,
  seatId,
  onSeatClick = () => {
    return;
  },
  discard = false
}) => {
  const numberRotate = rotate >= 180 || rotate <= -180 ? true : false;
  return (
    <SeatItem left={left} top={top} rotate={rotate}>
      {!discard ? (
        usable ? (
          nowUsing && endDatetime && moment(endDatetime) > moment() ? (
            gender &&
            ((gender === "MALE" && (
              <ImgContainer onClick={onSeatClick}>
                <SeatImg src={"https://image.ibb.co/hcUtaq/1.png"} />
                <SeatNumber numberRotate={numberRotate}>
                  {/* {seatNumber} */}
                </SeatNumber>
              </ImgContainer>
            )) ||
              (gender === "FEMALE" && (
                <ImgContainer onClick={onSeatClick}>
                  <SeatImg src={"https://image.ibb.co/cgiKFq/4.png"} />
                  <SeatNumber numberRotate={numberRotate}>
                    {/* {seatNumber} */}
                  </SeatNumber>
                </ImgContainer>
              )))
          ) : assignSeatLoading && assignSeatId === seatId ? (
            <ImgContainer>
              <SeatImg
                src={"https://www.opet.com.tr/assets/images/loading_3.gif"}
              />
              <SeatNumber numberRotate={numberRotate}>
                {/* {seatNumber} */}
              </SeatNumber>{" "}
            </ImgContainer>
          ) : (
            <ImgContainer onClick={onSeatClick}>
              <SeatImg
                src={"https://image.ibb.co/d52ryp/standbyseat-ENXv-SRg.png"}
              />
              <SeatNumber numberRotate={numberRotate}>{seatNumber}</SeatNumber>
            </ImgContainer>
          )
        ) : (
          <ImgContainer onClick={onSeatClick}>
            <SeatImg src={"https://image.ibb.co/gp3uFq/prohibited-seat.png"} />
            <SeatNumber>{seatNumber}</SeatNumber>
          </ImgContainer>
        )
      ) : (
        ""
      )}
    </SeatItem>
  );
};

const RoomPresenter: React.SFC<IProps> = ({
  data: { GetSeats: { seats = null } = {} } = {},
  loading,
  onSeatClick,
  showTempSeat,
  tempSeatXpos,
  tempSeatYpos,
  tempSeatRotate,
  tempSeatNumber,
  tempSeatUsable,
  tempSeatFemaleUsable,
  tempSeatMaleUsable,
  selSeatNumber = 0,
  selSeatId = 0,
  selSeatXpos = 0,
  selSeatYpos = 0,
  selSeatDiscard = false,
  selSeatMaleUsable = true,
  selSeatFemaleUsable = true,
  selSeatUsable = true,
  selSeatRotate = 0,
  isAddDoor = false,
  isFlip = false,
  assignSeatId,
  assignSeatLoading,
  onEntranceClick
}) => {
  return (
    <BackContainer>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Room>
            {seats &&
              seats.map(
                seat =>
                  seat &&
                  !seat.discard &&
                  (seat.id === selSeatId ? (
                    (!seat.isDoor && (
                      <Seat
                        key={selSeatId}
                        left={selSeatXpos}
                        top={selSeatYpos}
                        usable={selSeatUsable}
                        discard={selSeatDiscard}
                        maleUsable={selSeatMaleUsable}
                        femaleUsable={selSeatFemaleUsable}
                        rotate={selSeatRotate}
                        seatNumber={selSeatNumber}
                      />
                    )) || (
                      <Door
                        key={selSeatId}
                        left={selSeatXpos}
                        top={selSeatYpos}
                        rotate={selSeatRotate}
                        isFlip={isFlip}
                      />
                    )
                  ) : !seat.isDoor ? (
                    <Seat
                      key={seat.id}
                      left={seat.xpos}
                      top={seat.ypos}
                      usable={seat.usable}
                      discard={seat.discard}
                      maleUsable={seat.maleUsable}
                      femaleUsable={seat.femaleUsable}
                      rotate={seat.rotate}
                      seatNumber={seat.seatNumber}
                      onSeatClick={() => onSeatClick(seat.id)}
                      endDatetime={seat.endDatetime}
                      nowUsing={seat.nowUsing}
                      isDoor={seat.isDoor}
                      gender={seat.user && seat.user.gender}
                      assignSeatId={assignSeatId}
                      assignSeatLoading={assignSeatLoading}
                      seatId={seat.id}
                    />
                  ) : (
                    <Door
                      key={seat.id}
                      left={seat.xpos}
                      top={seat.ypos}
                      rotate={seat.rotate}
                      isFlip={seat.isFlip}
                      onDoorClick={onEntranceClick}
                    />
                  ))
              )}
            {showTempSeat
              ? (!isAddDoor && (
                  <Seat
                    left={tempSeatXpos}
                    top={tempSeatYpos}
                    rotate={tempSeatRotate}
                    seatNumber={tempSeatNumber}
                    usable={tempSeatUsable}
                    femaleUsable={tempSeatFemaleUsable}
                    maleUsable={tempSeatMaleUsable}
                  />
                )) || (
                  <Door
                    left={tempSeatXpos}
                    top={tempSeatYpos}
                    rotate={tempSeatRotate}
                    isFlip={isFlip}
                  />
                )
              : ""}
          </Room>
        </Container>
      )}
    </BackContainer>
  );
};

export default RoomPresenter;
