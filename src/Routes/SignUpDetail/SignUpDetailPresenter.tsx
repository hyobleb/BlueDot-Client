import React from "react";
import styled from "../../typed-components";

interface IProps {
  userId: string;
  password: string;
  repassword: string;
  phoneNumber: string;
  baseBrachId: number | string;
}

const Container = styled.div``;

const SignUpDetailPresenter: React.SFC<IProps> = ({}) => (
  <Container>dfdf</Container>
);

export default SignUpDetailPresenter;
