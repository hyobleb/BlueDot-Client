import React from "react";
import theme from "../../theme";
import styled from "../../typed-components";

const ImgContainer = styled.div`
  width: 30%;
  min-width: 310px;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  position: relative;
`;
const LoungeImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
`;

const RoomTransparent = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid black;
  opacity: 0.6;
  filter: alpha(opacity=60); /* For IE8 and earlier */
`;

const ExsitingRoomTransparent = styled(RoomTransparent)`
  position: absolute;
  background-color: ${props => props.theme.blueColor};
  border: none;
  opacity: 0.6;
  filter: alpha(opacity=60); /* For IE8 and earlier */
  cursor: pointer;
`;

interface IProps {
  imgUrl: string;
  showTempRoom: boolean;
  tempRoomHegiht: number;
  tempRoomWidth: number;
  tempRoomXpos: number;
  tempRoomYpos: number;
  onRoomClick?: (roomId: number) => void;
  onRoomHover?: (roomdId: number) => void;
  rooms?: any;
  tempSelRoomId?: number;
  onRoomHoverOut?: () => void;
}

interface ITRProps {
  tempRoomHegiht: number;
  tempRoomWidth: number;
  tempRoomXpos: number;
  tempRoomYpos: number;
}

interface IRProps {
  roomHeight: number;
  roomWidth: number;
  roomXpos: number;
  roomYpos: number;
  roomId: number;
  onRoomClick: (roomId: number) => void;
  onRoomHover: (roomId: number) => void;
  tempSelected: boolean;
  onRoomHoverOut: () => void;
}

const TempRoom: React.SFC<ITRProps> = ({
  tempRoomHegiht,
  tempRoomWidth,
  tempRoomXpos,
  tempRoomYpos
}) => {
  const style = {
    height: `${tempRoomHegiht}%`,
    left: `${tempRoomXpos}%`,
    top: `${tempRoomYpos}%`,
    width: `${tempRoomWidth}%`
  };
  return <RoomTransparent style={style} />;
};

const Room: React.SFC<IRProps> = ({
  roomHeight,
  roomWidth,
  roomXpos,
  roomYpos,
  roomId,
  onRoomClick,
  onRoomHover,
  tempSelected = false,
  onRoomHoverOut
}) => {
  const style = {
    backgroundColor: `${tempSelected ? theme.redColor : theme.lightBlueColor}`,
    height: `${roomHeight}%`,
    left: `${roomXpos}%`,
    top: `${roomYpos}%`,
    width: `${roomWidth}%`
  };
  return (
    <ExsitingRoomTransparent
      style={style}
      onClick={() => onRoomClick(roomId)}
      onMouseOver={() => onRoomHover(roomId)}
      onMouseOut={onRoomHoverOut}
    />
  );
};

const LoungeContainer: React.SFC<IProps> = ({
  imgUrl,
  showTempRoom,
  tempRoomWidth,
  tempRoomHegiht,
  tempRoomXpos,
  tempRoomYpos,
  rooms = null,
  onRoomClick = () => null,
  onRoomHover = () => null,
  tempSelRoomId = null,
  onRoomHoverOut = () => null
}) => (
  <ImgContainer>
    <LoungeImg src={imgUrl} />
    {showTempRoom && (
      <TempRoom
        tempRoomWidth={tempRoomWidth}
        tempRoomHegiht={tempRoomHegiht}
        tempRoomXpos={tempRoomXpos}
        tempRoomYpos={tempRoomYpos}
      />
    )}
    {rooms &&
      rooms.length > 0 &&
      rooms.map(room => (
        <Room
          key={room.id}
          roomHeight={room.height}
          roomWidth={room.width}
          roomXpos={room.xpos}
          roomYpos={room.ypos}
          roomId={room.id}
          onRoomClick={onRoomClick}
          onRoomHover={onRoomHover}
          tempSelected={room.id === tempSelRoomId}
          onRoomHoverOut={onRoomHoverOut}
        />
      ))}
  </ImgContainer>
);
export default LoungeContainer;
