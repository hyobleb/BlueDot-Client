import React from "react";
import CabinetDisplay from "src/Components/CabinetDisplay";
import styled from "src/typed-components";

const BackContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const CabinetDisplayContaienr = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
`;

interface IProps {
  cabinets: any;
  horizontalNumber: number;
}

const SettingCabinetsPresenter: React.SFC<IProps> = ({
  cabinets,
  horizontalNumber
}) => (
  <BackContainer>
    {cabinets && cabinets.length > 0 && (
      <CabinetDisplayContaienr>
        <CabinetDisplay
          cabinets={cabinets}
          horizontalNumber={horizontalNumber}
        />
      </CabinetDisplayContaienr>
    )}
  </BackContainer>
);

export default SettingCabinetsPresenter;
