import React from "react";
import DefaultBack from "../../../Components/DefaultBack";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)``;

const Box = styled.div`
  border: 1px solid #242424;
`;

interface IProps {
  isOk: boolean
}

const OrderPresenter: React.SFC<IProps> = ({isOk}) => (
  <Back title={"Order | BlueDot"} backUrl={"/"}>
    <Box>{isOk ? "isOk" : "notOk"}</Box>
  </Back>
);

export default OrderPresenter;
