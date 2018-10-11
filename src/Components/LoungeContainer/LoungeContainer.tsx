import React from "react";
import styled from "../../typed-components";

const ImgContainer = styled.div`
  width: 80%;
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
  background-color: #dedede;
`;

interface IProps {
  imgUrl: string;
  showTempRoom: boolean;
  tempRoomHegiht: number;
  tempRoomWidth: number;
  tempRoomXpos: number;
  tempRoomYpos: number;
}

interface ITRProps {
  tempRoomHegiht: number;
  tempRoomWidth: number;
  tempRoomXpos: number;
  tempRoomYpos: number;
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

const LoungeContainer: React.SFC<IProps> = ({
  imgUrl,
  showTempRoom,
  tempRoomWidth,
  tempRoomHegiht,
  tempRoomXpos,
  tempRoomYpos
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
  </ImgContainer>
);
export default LoungeContainer;
