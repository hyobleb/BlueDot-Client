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

const CainbetSetTransparent = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid black;
  opacity: 0.6;
  filter: alpha(opacity=60); /* For IE8 and earlier */
`;

const ExsitingCabinetSetTransparent = styled(CainbetSetTransparent)`
  position: absolute;
  background-color: ${props => props.theme.blueColor};
  border: none;
  opacity: 0.6;
  filter: alpha(opacity=60); /* For IE8 and earlier */
  cursor: pointer;
`;

interface IProps {
  imgUrl: string;
  showTempCabinetSet: boolean;
  tempCabinetSetHegiht: number;
  tempCabinetSetWidth: number;
  tempCabinetSetXpos: number;
  tempCabinetSetYpos: number;
  onCabinetSetClick?: (roomId: number) => void;
  onCabinetSetHover?: (roomdId: number) => void;
  cabinetSets?: any;
  tempSelCabinetSetId?: number;
  onCabinetSetHoverOut?: () => void;
}

interface ITRProps {
  tempCabinetSetHegiht: number;
  tempCabinetSetWidth: number;
  tempCabinetSetXpos: number;
  tempCabinetSetYpos: number;
}

interface IRProps {
  roomHeight: number;
  roomWidth: number;
  roomXpos: number;
  roomYpos: number;
  roomId: number;
  onCabinetSetClick: (roomId: number) => void;
  onCabinetSetHover: (roomId: number) => void;
  tempSelected: boolean;
  onCabinetSetHoverOut: () => void;
}

const TempRoom: React.SFC<ITRProps> = ({
  tempCabinetSetHegiht,
  tempCabinetSetWidth,
  tempCabinetSetXpos,
  tempCabinetSetYpos
}) => {
  const style = {
    height: `${tempCabinetSetHegiht}%`,
    left: `${tempCabinetSetXpos}%`,
    top: `${tempCabinetSetYpos}%`,
    width: `${tempCabinetSetWidth}%`
  };
  return <CainbetSetTransparent style={style} />;
};

const Room: React.SFC<IRProps> = ({
  roomHeight,
  roomWidth,
  roomXpos,
  roomYpos,
  roomId,
  onCabinetSetClick,
  onCabinetSetHover,
  tempSelected = false,
  onCabinetSetHoverOut
}) => {
  const style = {
    backgroundColor: `${tempSelected ? theme.redColor : theme.lightBlueColor}`,
    height: `${roomHeight}%`,
    left: `${roomXpos}%`,
    top: `${roomYpos}%`,
    width: `${roomWidth}%`
  };
  return (
    <ExsitingCabinetSetTransparent
      style={style}
      onClick={() => onCabinetSetClick(roomId)}
      onMouseOver={() => onCabinetSetHover(roomId)}
      onMouseOut={onCabinetSetHoverOut}
    />
  );
};

const CabinetSetsContainer: React.SFC<IProps> = ({
  imgUrl,
  showTempCabinetSet,
  tempCabinetSetWidth,
  tempCabinetSetHegiht,
  tempCabinetSetXpos,
  tempCabinetSetYpos,
  cabinetSets = null,
  onCabinetSetClick = () => null,
  onCabinetSetHover = () => null,
  tempSelCabinetSetId = null,
  onCabinetSetHoverOut = () => null
}) => (
  <ImgContainer>
    <LoungeImg src={imgUrl} />
    {showTempCabinetSet && (
      <TempRoom
        tempCabinetSetWidth={tempCabinetSetWidth}
        tempCabinetSetHegiht={tempCabinetSetHegiht}
        tempCabinetSetXpos={tempCabinetSetXpos}
        tempCabinetSetYpos={tempCabinetSetYpos}
      />
    )}
    {cabinetSets &&
      cabinetSets.length > 0 &&
      cabinetSets.map(room => (
        <Room
          key={room.id}
          roomHeight={room.height}
          roomWidth={room.width}
          roomXpos={room.xpos}
          roomYpos={room.ypos}
          roomId={room.id}
          onCabinetSetClick={onCabinetSetClick}
          onCabinetSetHover={onCabinetSetHover}
          tempSelected={room.id === tempSelCabinetSetId}
          onCabinetSetHoverOut={onCabinetSetHoverOut}
        />
      ))}
  </ImgContainer>
);
export default CabinetSetsContainer;
