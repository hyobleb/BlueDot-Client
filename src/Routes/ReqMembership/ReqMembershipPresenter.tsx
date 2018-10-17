import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

const BackContainer = styled.div``;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 10px;
`;
const Section = styled.div`
  width: 100%;
`;
const TitleSection = styled(Section)`
  text-align: center;
`;
const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
`;
const BranchSection = styled(Section)`
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BranchNameCol = styled.div`
  margin-right: 10px;
`;
const BranchButtonCol = styled.div``;
const ChangeBranchButton = styled(SmallButton)`
  font-size: 10px;
  width: 50px;
`;

const DatetimeTitle = styled.div``;
const DatetimePicker = styled.div``;
const DatetimeSection = styled(Section)``;
const PeriodSection = styled(Section)``;
const ButtonSection = styled(Section)``;
const ButtonContainer = styled.div``;
const ThrowBasketButton = styled(SmallButton)``;
const PayButton = styled(SmallButton)``;

interface IProps {
  datetimeValue: string;
}

const ReqMembershipPresenter: React.SFC<IProps> = ({ datetimeValue }) => {
  require("moment");
  require("moment/locale/ko");
  return (
    <BackContainer>
      <Container>
        <TitleSection>
          <Title>멤버쉽 등록</Title>
        </TitleSection>
        <BranchSection>
          <BranchNameCol>화명본점</BranchNameCol>
          <BranchButtonCol>
            <ChangeBranchButton value={"지점 변경"} />
          </BranchButtonCol>
        </BranchSection>
        <DatetimeSection>
          <DatetimeTitle>이용 시작 일시를 선택해주세요</DatetimeTitle>
          <DatetimePicker>
            <Datetime
              value={datetimeValue}
              dateFormat="YYYY MMMM Do"
              timeFormat="A hh:mm"
              locale="de"
            />
          </DatetimePicker>
        </DatetimeSection>
        <PeriodSection>이용기간을 선택해주세요</PeriodSection>
        <ButtonSection>
          <ButtonContainer>
            <ThrowBasketButton value={"등록하러 가기"} onClick={null} />
            <PayButton value={"장바구니 담기"} onClick={null} />
          </ButtonContainer>
        </ButtonSection>
      </Container>
    </BackContainer>
  );
};

export default ReqMembershipPresenter;
