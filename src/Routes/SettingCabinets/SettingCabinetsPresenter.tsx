import React from "react";
import CabinetDisplay from "src/Components/CabinetDisplay";
import styled from "src/typed-components";

const BackContainer = styled.div`
  display: flex;
  justify-content: center;
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
    {cabinets &&
      cabinets.length > 0 && (
        <CabinetDisplay
          cabinets={cabinets}
          horizontalNumber={horizontalNumber}
        />
      )}
  </BackContainer>
);

export default SettingCabinetsPresenter;
