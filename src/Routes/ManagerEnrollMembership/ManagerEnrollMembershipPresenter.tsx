import moment = require("moment");
import "moment/locale/ko";
import React from "react";
import Datetime from "react-datetime";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import BranchSearchPopUp from "src/Components/BranchSearchPopUp";
import Form from "src/Components/Form";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { userGetProducts } from "src/types/api";

const FormExtended = styled(Form)`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Section = styled.div`
  width: 80%;
  padding: 10px 0;
  display: flex;
`;
const TitleSection = styled(Section)`
  text-align: center;
`;
const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
`;
const BranchSection = styled(Section)``;

const BranchNameCol = styled.div`
  margin-right: 10px;
`;
const BranchButtonCol = styled.div``;
const ChangeBranchButton = styled(SmallButton)`
  font-size: 10px;
  width: 50px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const DatetimeTitle = styled.div`
  margin-bottom: 10px;
`;
const DatetimePicker = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const DatetimeSection = styled(Section)`
  display: flex;
  flex-direction: column;
`;
const ButtonSection = styled(Section)`
  justify-content: center;
`;
const ButtonContainer = styled.div``;
const Button = styled(SmallButton)`
  margin: 3px;
`;

const CreateMembershipBtn = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const CancleButton = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;

const AddDatetimeCon = styled.div``;
const AddDatetimeBtn = styled(Button)``;

const ResetButton = styled(Button)`
  background-color: ${props => props.theme.yellowColor};
  width: 200px;
`;

const DatetimeExtended = styled(Datetime)`
  input {
    width: 160px;
    height: 35px;
    text-align: center;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.blueColor};
      color: white;
    }
  }
`;
const BackContainer = styled.div``;

interface IProps {
  datetimeValue: string;
  productId: number;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  productDatas?: userGetProducts;
  productsLoading: boolean;
  onOptionChange: (arg: any) => void;
  productTitle: string;
  branchPopUpShow: boolean;
  setTrueBranchPopUpShow: () => void;
  setFalseBranchPopUpShow: () => void;
  onBranchClick: (branchId: number) => void;
  onDatetimeChange: (datetimeValue: moment.Moment) => void;
  onCreateMembershipClick: () => Promise<void>;
  backUrl: string;
  onEndDatetimeChange: (datetimeValue: moment.Moment) => void;
  endDatetimeValue: string;
  onDateTimeAddClick: (hours: number) => void;
  onBackClick: () => void;
  setDatetimeValueNow: () => void;
  setEndDatetimeToStart: () => void;
  userName: string;
  userIdName: string;
}

const ManagerEnrollMembershipPresenter: React.SFC<IProps> = ({
  datetimeValue,
  onSubmit,
  productDatas,
  productsLoading,
  onOptionChange,
  productId,
  productTitle,
  branchPopUpShow,
  setTrueBranchPopUpShow,
  setFalseBranchPopUpShow,
  onBranchClick,
  onDatetimeChange,
  onCreateMembershipClick,
  backUrl,
  onEndDatetimeChange,
  endDatetimeValue,
  onDateTimeAddClick,
  onBackClick,
  setDatetimeValueNow,
  setEndDatetimeToStart,
  userName,
  userIdName
}) => {
  const productOptions = new Array();
  if (
    productDatas &&
    productDatas.UserGetBranch &&
    productDatas.UserGetBranch.branch &&
    productDatas.UserGetBranch.branch.products
  ) {
    productDatas.UserGetBranch.branch.products.forEach(product => {
      if (product && product.target === "MEMBERSHIP" && !product.discard) {
        const productItem = { value: product.id, label: product.title };
        productOptions.push(productItem);
      }
    });
  }
  return (
    <BackContainer>
      <Helmet>
        <title>Enroll Requset Membership | BlueDot</title>
      </Helmet>
      <BackArrowExtended backFn={onBackClick} />
      <FormExtended submitFn={onSubmit}>
        <TitleSection>
          <Title>{`${userName}(${userIdName})`}님 멤버쉽 등록</Title>
        </TitleSection>
        <BranchSection>
          <BranchNameCol>
            {(productDatas &&
              productDatas.UserGetBranch &&
              productDatas.UserGetBranch.branch &&
              productDatas.UserGetBranch.branch.name) ||
              "지점을 먼저 선택해주세요"}
          </BranchNameCol>
          <BranchButtonCol>
            <ChangeBranchButton
              value={`${(productDatas &&
                productDatas.UserGetBranch &&
                productDatas.UserGetBranch.branch &&
                productDatas.UserGetBranch.branch.name &&
                "지점 변경") ||
                "지점 선택"}`}
              onClick={setTrueBranchPopUpShow}
            />
          </BranchButtonCol>
        </BranchSection>
        <DatetimeSection>
          <DatetimeTitle>이용 시작 일시를 선택해주세요</DatetimeTitle>
          <DatetimePicker>
            <DatetimeExtended
              value={moment(datetimeValue)}
              dateFormat="YYYY MMMM Do"
              timeFormat="A hh:mm"
              locale="de"
              onChange={onDatetimeChange}
            />
          </DatetimePicker>
          <ResetButton
            value={"현재시각으로 맞추기"}
            onClick={setDatetimeValueNow}
          />
        </DatetimeSection>
        <DatetimeSection>
          <DatetimeTitle>이용 종료 일시를 선택해주세요</DatetimeTitle>
          <DatetimePicker>
            <DatetimeExtended
              value={moment(endDatetimeValue)}
              dateFormat="YYYY MMMM Do"
              timeFormat="A hh:mm"
              locale="de"
              onChange={onEndDatetimeChange}
            />
          </DatetimePicker>
          <ResetButton
            value={"시작일시로 맞추기"}
            onClick={setEndDatetimeToStart}
          />
        </DatetimeSection>
        <AddDatetimeCon>
          {productDatas &&
            productDatas.UserGetBranch &&
            productDatas.UserGetBranch.branch &&
            productDatas.UserGetBranch.branch.products &&
            productDatas.UserGetBranch.branch.products
              .filter(
                product =>
                  product && product.target === "MEMBERSHIP" && !product.discard
              )
              .map(
                product =>
                  product && (
                    <AddDatetimeBtn
                      key={product.id}
                      value={`+ ${product.hours}시간`}
                      onClick={() => onDateTimeAddClick(product.hours)}
                    />
                  )
              )}
        </AddDatetimeCon>

        <ButtonSection>
          <ButtonContainer>
            <CreateMembershipBtn
              value={"등록하기"}
              onClick={onCreateMembershipClick}
            />
            <CancleButton value={"취소"} onClick={onBackClick} />
          </ButtonContainer>
        </ButtonSection>
      </FormExtended>

      {branchPopUpShow ? (
        <BranchSearchPopUp
          closeFunc={setFalseBranchPopUpShow}
          onBranchClick={onBranchClick}
        />
      ) : (
        ""
      )}
    </BackContainer>
  );
};

export default ManagerEnrollMembershipPresenter;
