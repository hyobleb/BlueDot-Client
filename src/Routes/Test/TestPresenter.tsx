import React from "react";
import styled from "../../typed-components";
// import SeatBox from "../../Components/SeatBox";

const Back = styled.div`
  background-color: red;
  color: white;
`;

const BackInBack = styled.div`
  display: flex;
  justify-content: center;
`;
const Item = styled.div`
  color: brown;
`;

const TestPresetner: React.SFC = () => (
  <Back>
    <BackInBack>
      <Item>a</Item>
      <Item>b</Item>
      <Item>c</Item>
    </BackInBack>
  </Back>
);

export default TestPresetner;
