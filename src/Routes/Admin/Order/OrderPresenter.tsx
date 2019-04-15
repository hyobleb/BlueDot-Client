import React from "react";
import DefaultBack from "../../../Components/DefaultBack";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)``;

const Box = styled.div`
  border: 1px solid #242424;
`;

const OrderPresenter: React.SFC = () => (
  <Back title={"Order | BlueDot"} backUrl={"/"}>
    <Box>Hi.</Box>
  </Back>
);

export default OrderPresenter;
