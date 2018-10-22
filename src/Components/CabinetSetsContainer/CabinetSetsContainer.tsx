import React from "react";
import theme from "../../theme";
import styled from "../../typed-components";

const ImgContainer = styled.div`
  width: 60%;
  min-width: 190px;
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
  tempCabinetSetHegiht?: number;
  tempCabinetSetWidth?: number;
  tempCabinetSetXpos?: number;
  tempCabinetSetYpos?: number;
  onCabinetSetClick?: (setId: number) => void;
  onCabinetSetHover?: (setId: number) => void;
  cabinetSets?: any;
  tempSelCabinetSetId?: number;
  onCabinetSetHoverOut?: () => void;
  targetCabinetSetId?: number;
  targetCabinetSetXpos?: number;
  targetCabinetSetYpos?: number;
  targetCabinetSetWidth?: number;
  targetCainbetSetHeight?: number;
  selectedCabinetId?: number;
}

interface ITRProps {
  tempCabinetSetHegiht: number;
  tempCabinetSetWidth: number;
  tempCabinetSetXpos: number;
  tempCabinetSetYpos: number;
}

interface IRProps {
  setHeight: number;
  setWidth: number;
  setXpos: number;
  setYpos: number;
  setId: number;
  onCabinetSetClick: (setId: number) => void;
  onCabinetSetHover: (setId: number) => void;
  tempSelected: boolean;
  onCabinetSetHoverOut: () => void;
  selectedCabinetId?: number;
}

const TempCabinetSet: React.SFC<ITRProps> = ({
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

const CabinetSet: React.SFC<IRProps> = ({
  setHeight,
  setWidth,
  setXpos,
  setYpos,
  setId,
  onCabinetSetClick,
  onCabinetSetHover,
  tempSelected = false,
  onCabinetSetHoverOut,
  selectedCabinetId
}) => {
  const style = {
    backgroundColor: `${
      tempSelected
        ? theme.greenColor
        : selectedCabinetId && selectedCabinetId === setId
          ? theme.greenColor
          : theme.lightBlueColor
    }`,
    height: `${setHeight}%`,
    left: `${setXpos}%`,
    top: `${setYpos}%`,
    width: `${setWidth}%`
  };
  return (
    <ExsitingCabinetSetTransparent
      style={style}
      onClick={() => onCabinetSetClick(setId)}
      onMouseOver={() => onCabinetSetHover(setId)}
      onMouseOut={onCabinetSetHoverOut}
    />
  );
};

const CabinetSetsContainer: React.SFC<IProps> = ({
  imgUrl,
  showTempCabinetSet = false,
  tempCabinetSetWidth,
  tempCabinetSetHegiht,
  tempCabinetSetXpos,
  tempCabinetSetYpos,
  cabinetSets = null,
  onCabinetSetClick = () => null,
  onCabinetSetHover = () => null,
  tempSelCabinetSetId = null,
  onCabinetSetHoverOut = () => null,
  targetCabinetSetXpos,
  targetCabinetSetYpos,
  targetCabinetSetWidth,
  targetCainbetSetHeight,
  selectedCabinetId
}) => (
  <ImgContainer>
    <LoungeImg src={imgUrl} />
    {showTempCabinetSet &&
      tempCabinetSetWidth &&
      tempCabinetSetHegiht &&
      tempCabinetSetXpos &&
      tempCabinetSetYpos && (
        <TempCabinetSet
          tempCabinetSetWidth={tempCabinetSetWidth}
          tempCabinetSetHegiht={tempCabinetSetHegiht}
          tempCabinetSetXpos={tempCabinetSetXpos}
          tempCabinetSetYpos={tempCabinetSetYpos}
        />
      )}
    {cabinetSets &&
      cabinetSets.length > 0 &&
      cabinetSets.map(cabinetSet => (
        <CabinetSet
          key={cabinetSet.id}
          setHeight={
            cabinetSet.id === tempSelCabinetSetId
              ? targetCainbetSetHeight
              : cabinetSet.height
          }
          setWidth={
            cabinetSet.id === tempSelCabinetSetId
              ? targetCabinetSetWidth
              : cabinetSet.width
          }
          setXpos={
            cabinetSet.id === tempSelCabinetSetId
              ? targetCabinetSetXpos
              : cabinetSet.xpos
          }
          setYpos={
            cabinetSet.id === tempSelCabinetSetId
              ? targetCabinetSetYpos
              : cabinetSet.ypos
          }
          setId={cabinetSet.id}
          onCabinetSetClick={onCabinetSetClick}
          onCabinetSetHover={onCabinetSetHover}
          tempSelected={cabinetSet.id === tempSelCabinetSetId}
          onCabinetSetHoverOut={onCabinetSetHoverOut}
          selectedCabinetId={selectedCabinetId}
        />
      ))}
  </ImgContainer>
);
export default CabinetSetsContainer;
