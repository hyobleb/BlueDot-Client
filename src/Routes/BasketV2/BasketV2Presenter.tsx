import React from "react";
import DefaultBack from "../../Components/DefaultBack";
import SmallButton from "../../Components/SmallButton";
import styled from "../../typed-components";

const Back = styled(DefaultBack)``;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
const Section = styled.div``;

const HeadSection = styled(Section)`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  margin-bottom: 10px;
`;
const ButtonContainer = styled.div``;
const Button = styled(SmallButton)`
  margin: 3px;
  width: inherit;
  font-size: 11px;
  padding-left: 5px;
  padding-right: 5px;
`;
const EnrollMembershipButton = styled(Button)`
  background-color: ${props => props.theme.greyColor};
`;
const ExtendMembershipButton = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const ExtendCabinetButton = styled(Button)`
  background-color: ${props => props.theme.orangeColor};
`;

const EnrollCabinetButton = styled(Button)`
  background-color: ${props => props.theme.greenColor};
`;

const BasketV2Presenter: React.SFC = () => (
  <Back title={"Bakset | BlueDot"}>
    <Container>
      <HeadSection>
        <TitleContainer>장바구니</TitleContainer>
        <ButtonContainer>
          <EnrollMembershipButton
            value={"멤버쉽 등록"}
            // onClick={onEnrollReqMembershipClick}
          />
          <ExtendMembershipButton
            value={"멤버쉽 연장"}
            // onClick={onExtendReqMembershipClick}
          />
          <ExtendCabinetButton
            value={"사물함 연장"}
            // onClick={onExtendReqCabinetClick}
          />
          <EnrollCabinetButton
            value={"사물함 등록"}
            // onClick={onEnrollCabinetClick}
          />
        </ButtonContainer>
      </HeadSection>
    </Container>
  </Back>
);

export default BasketV2Presenter;
