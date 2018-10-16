import React from "react";
import styled from "src/typed-components";
import { getCabinets_GetCabinetSet_cabinetSet_cabinets } from "src/types/api";

interface IProps {
  cabinets: [getCabinets_GetCabinetSet_cabinetSet_cabinets];
  horizontalNumber: number;
  verticalNumber: number;
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
    background-color: ${props => props.theme.lightBlueColor};
  }
`;

const CabinetNumber = styled.div`
  color: white;
`;

const CabinetRow = styled.div`
  display: flex;
`;

const CabinetDisplay: React.SFC<IProps> = ({
  cabinets,
  horizontalNumber,
  verticalNumber
}) => {
  const verticalCabients = new Array();
  for (let hIndex = 1; hIndex <= horizontalNumber; hIndex++) {
    const rowCabinets = cabinets.filter(cabinet => cabinet.ypos === hIndex);
    verticalCabients.push(rowCabinets);
  }
  return (
    <Container>
      {verticalCabients.map((rowCabinets, index) => (
        <CabinetRow key={index}>
          {rowCabinets.map(cabinet => (
            <CabinetItem key={cabinet.id}>
              <CabinetNumber>{cabinet.cabinetNumber}</CabinetNumber>
            </CabinetItem>
          ))}
        </CabinetRow>
      ))}
    </Container>
  );
};
export default CabinetDisplay;
