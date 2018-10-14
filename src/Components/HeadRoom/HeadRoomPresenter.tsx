import React from "react";
import styled from "../../typed-components";
import { headGetRoom } from "../../types/api";
import Loading from "../Loading";

interface IProps {
  data?: headGetRoom;
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
}

const BackContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const Container = styled.div`
  width: 70%;
  max-width: 500px;
  min-width: 320px;
  height: 400px;
  background-color: powderblue;
  position: relative;
`;
const Room = styled.div`
  background-color: "#dedede";
`;
const SeatItem = styled.div`
  width: 15%;
  position: absolute;
`;
const SeatImg = styled.img`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const SeatNumber = styled.div`
  position: absolute;
  top: 17%;
  &:hover {
    cursor: pointer;
  }
`;

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

const Seat: React.SFC<ISProps> = ({
  left,
  top,
  rotate,
  seatNumber,
  onSeatClick = () => {
    return;
  },
  discard = false
}) => {
  const itemStyle = {
    left: `${left}%`,
    top: `${top}%`,
    transform: `rotate(${rotate}deg)`
  };

  return (
    <SeatItem style={itemStyle}>
      <ImgContainer onClick={onSeatClick}>
        <SeatImg src={"https://image.ibb.co/d52ryp/standbyseat-ENXv-SRg.png"} />
        <SeatNumber>{seatNumber}</SeatNumber>
      </ImgContainer>
    </SeatItem>
  );
};

const HeadRoomPresenter: React.SFC<IProps> = ({
  data: { HeadGetRoom: { room = null } = {} } = {},
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
  selSeatRotate = 0
}) => {
  return (
    <BackContainer>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Room>
            {showTempSeat ? (
              <Seat
                left={tempSeatXpos}
                top={tempSeatYpos}
                rotate={tempSeatRotate}
                seatNumber={tempSeatNumber}
                usable={tempSeatUsable}
                femaleUsable={tempSeatFemaleUsable}
                maleUsable={tempSeatMaleUsable}
              />
            ) : (
              ""
            )}
            {room &&
              room.seats &&
              room.seats.map(
                seat =>
                  seat &&
                  !seat.discard &&
                  (seat.id === selSeatId ? (
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
                  ) : (
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
                    />
                  ))
              )}
          </Room>
        </Container>
      )}
    </BackContainer>
  );
};

export default HeadRoomPresenter;
