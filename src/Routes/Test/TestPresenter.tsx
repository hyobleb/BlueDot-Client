import React from "react";
// import SeatBox from "../../Components/SeatBox";
import styled from "../../typed-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const BoxContainer = styled.div``;

interface IProps {
  onSeatClick: (id: number) => Promise<void>;
  onDoorClick: () => void;
  forAdmin: boolean;
}

const TestPresetner: React.SFC<IProps> = ({
  onSeatClick,
  onDoorClick,
  forAdmin
}) => (
  <Container>
    <BoxContainer>
      {/* <SeatBox
        roomId={10}
        onSeatClick={onSeatClick}
        onDoorClick={onDoorClick}
        forAdmin={forAdmin}
      /> */}
    </BoxContainer>
  </Container>
);

export default TestPresetner;
