import React from "react";
import styled from "../../typed-components";
import Minimap from "../Minimap";

const ImgContainer = styled.div`
  width: 60%;
  min-width: 200px;
  margin-left: auto;
  margin-right: auto;
  max-width: 200px;
  position: relative;
`;
const LoungeImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
`;

const RoomTransparent = styled<
  {
    height: number;
    width: number;
    top: number;
    left: number;
    tempSelected: boolean;
  },
  "div"
>("div")`
  cursor: pointer;
  position: absolute;
  border: 1px solid black;
  height: ${props => props.height}%;
  width: ${props => props.width}%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  &:hover {
    background-color: white;
    opacity: 0.6;
  }
`;

const ExsitingRoomTransparent = styled(RoomTransparent)`
  border: none;
`;

const MiniMapExtended = styled(Minimap)`
  position: absolute;
  width: 30%;
  left: -22%;
  top: 77%;
  z-index: 2;
`;

interface IProps {
  imgUrl: string;
  showTempRoom: boolean;
  tempRoomHegiht?: number;
  tempRoomWidth?: number;
  tempRoomXpos?: number;
  tempRoomYpos?: number;
  onRoomClick?: (roomId: number) => void;
  onRoomHover?: (roomdId: number) => void;
  rooms?: any;
  tempSelRoomId?: number;
  onRoomHoverOut?: () => void;
  minimapImg?: string;
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
  return (
    <RoomTransparent
      height={tempRoomHegiht}
      left={tempRoomXpos}
      top={tempRoomYpos}
      width={tempRoomWidth}
      tempSelected={false}
    />
  );
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
  return (
    <ExsitingRoomTransparent
      onClick={() => onRoomClick(roomId)}
      onMouseOver={() => onRoomHover(roomId)}
      onMouseOut={onRoomHoverOut}
      height={roomHeight}
      left={roomXpos}
      top={roomYpos}
      width={roomWidth}
      tempSelected={tempSelected}
    />
  );
};

const LoungeContainer: React.SFC<IProps> = ({
  imgUrl,
  showTempRoom,
  tempRoomWidth = 0,
  tempRoomHegiht = 0,
  tempRoomXpos = 0,
  tempRoomYpos = 0,
  rooms = null,
  onRoomClick = () => null,
  onRoomHover = () => null,
  tempSelRoomId = null,
  onRoomHoverOut = () => null,
  minimapImg
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
    {minimapImg ? (
      <MiniMapExtended minimapImage={minimapImg} rooms={rooms} />
    ) : (
      ""
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
