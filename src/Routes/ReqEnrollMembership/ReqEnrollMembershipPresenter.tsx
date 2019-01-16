import moment = require("moment");
import "moment/locale/ko";
import React from "react";
import Datetime from "react-datetime";
import Dropdown from "react-dropdown";
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
const PeriodSection = styled(Section)``;
const ButtonSection = styled(Section)`
  justify-content: center;
`;
const ButtonContainer = styled.div``;
const Button = styled(SmallButton)`
  margin: 3px;
`;

const ThrowBasketButton = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const CancleButton = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;

const InputLabel = styled.label`
  margin: 5px 0px;
  display: flex;
  justify-content: center;
`;

const InputTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100px;
`;

const DropdonwContainer = styled.div`
  width: 80%;

  .control {
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.blueColor};
      color: white;
    }
  }
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
  onThrowBasketButtonClick: () => Promise<void>;
  onCancelClick: () => void;
  reqMembershipLoading: boolean;
}

const ReqEnrollMembershipPresenter: React.SFC<IProps> = ({
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
  onThrowBasketButtonClick,
  onCancelClick,
  reqMembershipLoading
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
      <BackArrowExtended backTo="/membership" />
      <FormExtended submitFn={onSubmit}>
        <TitleSection>
          <Title>멤버쉽 등록</Title>
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
        </DatetimeSection>

        {productDatas &&
          productDatas.UserGetBranch &&
          productDatas.UserGetBranch.branch &&
          productDatas.UserGetBranch.branch.products && (
            <PeriodSection>
              <InputLabel>
                <InputTitle>이용권 : </InputTitle>
                <DropdonwContainer>
                  <Dropdown
                    options={productOptions}
                    onChange={onOptionChange}
                    value={productTitle}
                    placeholder={"이용권을 선택해주세요"}
                    controlClassName={"control"}
                  />
                </DropdonwContainer>
              </InputLabel>
            </PeriodSection>
          )}

        <ButtonSection>
          <ButtonContainer>
            <ThrowBasketButton
              value={reqMembershipLoading ? "장바구니 담는중" : "장바구니 담기"}
              onClick={onThrowBasketButtonClick}
            />
            <CancleButton value={"취소"} onClick={onCancelClick} />
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

export default ReqEnrollMembershipPresenter;
