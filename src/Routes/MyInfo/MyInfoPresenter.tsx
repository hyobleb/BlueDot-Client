import React from "react";
import styled from "styled-components";
import DefaultBack from "../../Components/DefaultBack";

const Back = styled(DefaultBack)``;
const Container = styled.div``;
const TitleContainer = styled.div``;
const HeadTitle = styled.h1``;
// const RowCon = styled.div``;
// const RowTitle = styled.div``;
// const RowInput = styled.div``;

const MyInfoPresenter: React.SFC = () => (
  <Back title={"My Info|BlueDot"} backUrl={"/"}>
    <Container>
      <TitleContainer>
        <HeadTitle>회원 정보</HeadTitle>
      </TitleContainer>
    </Container>
  </Back>
);

export default MyInfoPresenter;
