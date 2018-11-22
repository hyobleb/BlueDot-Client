import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import {
  DANGER_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR
} from "src/keys/colors";
import styled from "src/typed-components";
import { getCabinets_GetCabinetSet_cabinetSet_cabinets } from "src/types/api";

interface IProps {
  cabinets: [getCabinets_GetCabinetSet_cabinetSet_cabinets];
  horizontalNumber: number;
  onCabinetClick?: (cabinetId: number) => void;
  selCabinetId?: number;
  isMan?: boolean;
}

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CabinetItem = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.blueColor};
  border-radius: 5px;
  margin: 2px;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.greyColor};
    color: ${props => props.theme.yellowColor};
    transform: scale(2);
    transition: all 0.2s ease-in-out;
  }
`;

const CabinetNumber = styled.div`
  color: white;
`;

const CabinetRow = styled.div`
  display: flex;
`;

const ColorIndexContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  width: 320px;
`;
const ColorIndex = styled.div`
  padding: 5px;
  color: white;
  width: 60px;
  font-size: 10px;
  text-align: center;
  margin-left: 3px;
  margin-right: 3px;
`;

const CabinetDisplay: React.SFC<IProps> = ({
  cabinets,
  horizontalNumber,
  onCabinetClick = () => {
    return;
  },
  selCabinetId,
  isMan
}) => {
  const verticalCabients = new Array();
  for (let hIndex = 1; hIndex <= horizontalNumber; hIndex++) {
    const rowCabinets = cabinets.filter(cabinet => cabinet.ypos === hIndex);
    verticalCabients.push(rowCabinets);
  }

  return (
    <Container>
      <ColorIndexContainer>
        <ColorIndex style={{ backgroundColor: PRIMARY_COLOR }}>
          이용가능
        </ColorIndex>
        <ColorIndex style={{ backgroundColor: WARNING_COLOR }}>
          이용중
        </ColorIndex>
        <ColorIndex style={{ backgroundColor: SUCCESS_COLOR }}>
          선택한 사물함
        </ColorIndex>
        {isMan ? (
          <ColorIndex style={{ backgroundColor: SECONDARY_COLOR }}>
            예약한 사물함
          </ColorIndex>
        ) : (
          ""
        )}
      </ColorIndexContainer>
      {verticalCabients.map((rowCabinets, index) => (
        <CabinetRow key={index}>
          {rowCabinets.map(cabinet => {
            let backgroundColor =
              !cabinet.usable || !cabinet.lockId
                ? DANGER_COLOR
                : cabinet.nowUsing || moment(cabinet.endDatetime) > moment()
                ? WARNING_COLOR
                : cabinet.status === "RESERVED" &&
                  moment(cabinet.reservedDatetime) > moment()
                ? WARNING_COLOR
                : cabinet.id === selCabinetId
                ? SUCCESS_COLOR
                : PRIMARY_COLOR;

            if (isMan) {
              if (cabinet.id === selCabinetId) {
                backgroundColor = SUCCESS_COLOR;
              } else if (moment(cabinet.reservedDatetime) > moment()) {
                backgroundColor = SECONDARY_COLOR;
              }
            }

            return (
              <CabinetItem
                key={cabinet.id}
                onClick={() => {
                  if (isMan) {
                    onCabinetClick(cabinet.id);
                  } else {
                    if (!cabinet.usable || !cabinet.lockId) {
                      toast.error("해당 사물함은 이용할수 없습니다");
                    } else if (
                      cabinet.nowUsing &&
                      moment(cabinet.endDatetime) > moment()
                    ) {
                      toast.error("해당 사물함은 현재 이용중입니다");
                    } else if (
                      cabinet.status === "RESERVED" &&
                      moment(cabinet.reservedDatetime) > moment()
                    ) {
                      toast.error("해당 사물함은 예약 중입니다");
                    } else {
                      onCabinetClick(cabinet.id);
                    }
                  }
                }}
                style={{ backgroundColor }}
              >
                <CabinetNumber>
                  {!cabinet.usable || !cabinet.lockId
                    ? "X"
                    : cabinet.cabinetNumber}
                </CabinetNumber>
              </CabinetItem>
            );
          })}
        </CabinetRow>
      ))}
    </Container>
  );
};
export default CabinetDisplay;
