import moment = require("moment");
import "moment/locale/ko";
import React from "react";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import BranchSearchPopUp from "src/Components/BranchSearchPopUp";
import Form from "src/Components/Form";
import { CreatePaymentMethodOption } from "src/Components/shareOptions";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  getManaingBranches_GetManagingBranches_branches,
  userGetProducts,
  userGetProducts_UserGetBranch_branch_products
} from "src/types/api";
import DatetimePicker from "../../Components/DatetimePicker";
import Loading from "../../Components/Loading";

const FormExtended = styled(Form)`
  width: 95%;
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
  width: 95%;
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
const DatetimePickerCon = styled.div`
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Button = styled(SmallButton)`
  margin: 2px;
  font-size: 10px;
  width: 30%;
  min-width: 70px;
  max-width: 100px;
`;

const FieldCardCreateMembershipBtn = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const CashCreateMembershipBtn = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

// const CreateMembershipBtn = styled(Button)`
//   background-color: ${props => props.theme.lightBlueColor};
// `;

const CancleButton = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;

const AddDatetimeCon = styled.div``;
const AddDatetimeBtn = styled(Button)`
  width: 130px;
`;

const ResetButton = styled(Button)`
  background-color: ${props => props.theme.yellowColor};
  width: 200px;
`;

const BackContainer = styled.div``;

const EndDatetime = styled.div`
  border: 1px solid #dedede;
  display: inline-block;
  padding: 8px;
  font-size: 13px;
  width: 100%;
  text-align: center;
`;

const ProductsSection = styled.div`
  margin-top: 10px;
  width: 90%;
`;
const ProductsTitle = styled.div`
  font-size: 20px;
`;
const ProductContainer = styled.div`
  min-height: 40px;
  width: 100%;
  border: 1px solid #dedede;
  padding: 10px;
  margin-top: 10px;
`;
const ProductItem = styled.div`
  padding: 10px;
  border: 1px solid #dedede;
  margin: 3px 0;
`;

const BranchBtn = styled(Button)``;

const ExtendedDatetimePicker = styled(DatetimePicker)`
  width: 100%;
  font-size: 13px;
`;

interface IProps {
  datetimeValue: Date;
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
  onDatetimeChange: (datetimeValue: Date) => void;
  onCreateMembershipClick: (
    payMethod?: CreatePaymentMethodOption | undefined
  ) => Promise<void>;
  backUrl: string;
  onEndDatetimeChange: (datetimeValue: Date) => void;
  endDatetimeValue: Date;
  onDateTimeAddClick: (
    product: userGetProducts_UserGetBranch_branch_products,
    hours: number
  ) => void;
  onBackClick: () => void;
  setDatetimeValueNow: () => void;
  setEndDatetimeToStart: () => void;
  userName: string;
  userIdName: string;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
  managingBranches?: Array<getManaingBranches_GetManagingBranches_branches | null>;
  onBranchBtnClick: (branchId: number) => void;
  isCleanStaff: boolean;
  isManStaff: boolean;
  branchId: number;
  userReqMemLoading: boolean;
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
  userIdName,
  selProducts,
  isFranchiser,
  isHead,
  isSupervisor,
  managingBranches,
  onBranchBtnClick,
  isCleanStaff,
  isManStaff,
  branchId,
  userReqMemLoading
}) => {
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
            {(isHead || isFranchiser || isManStaff) && (
              <ChangeBranchButton
                value={`${(productDatas &&
                  productDatas.UserGetBranch &&
                  productDatas.UserGetBranch.branch &&
                  productDatas.UserGetBranch.branch.name &&
                  "지점 변경") ||
                  "지점 선택"}`}
                onClick={setTrueBranchPopUpShow}
              />
            )}
            {(isFranchiser || isSupervisor) && managingBranches
              ? managingBranches.length >= 2 &&
                managingBranches.map(
                  branch =>
                    branch && (
                      <BranchBtn
                        key={branch.id}
                        value={branch.name}
                        onClick={() => onBranchBtnClick(branch.id)}
                      />
                    )
                )
              : ""}
          </BranchButtonCol>
        </BranchSection>
        <DatetimeSection>
          <DatetimeTitle>이용 시작 일시를 선택해주세요</DatetimeTitle>
          <DatetimePickerCon>
            <ExtendedDatetimePicker
              flatPickrDate={datetimeValue}
              onFlatPickrChange={onDatetimeChange}
            />
          </DatetimePickerCon>
          <ResetButton
            value={"현재시각으로 맞추기"}
            onClick={setDatetimeValueNow}
          />
        </DatetimeSection>
        <DatetimeSection>
          <DatetimeTitle>이용 종료 일시를 선택해주세요</DatetimeTitle>
          <DatetimePickerCon>
            <EndDatetime>
              {moment(endDatetimeValue).format("YYYY년 MMMM Do")}{" "}
              {moment(endDatetimeValue, "a hh:mm", "en").format("A hh:mm")}
            </EndDatetime>
          </DatetimePickerCon>
          <ResetButton
            value={"시작일시로 맞추기"}
            onClick={setEndDatetimeToStart}
          />
        </DatetimeSection>
        <AddDatetimeCon>
          {(productsLoading && branchId !== 0 && <Loading />) ||
            (productDatas &&
              productDatas.UserGetBranch &&
              productDatas.UserGetBranch.branch &&
              productDatas.UserGetBranch.branch.products &&
              productDatas.UserGetBranch.branch.products
                .filter(
                  product =>
                    product &&
                    product.target === "MEMBERSHIP" &&
                    !product.discard
                )
                .map(
                  product =>
                    product && (
                      <AddDatetimeBtn
                        key={product.id}
                        value={`+ ${product.hours}시간 ${
                          product.hours % 24 === 0
                            ? `(${product.hours / 24}일)`
                            : ""
                        }`}
                        onClick={() =>
                          onDateTimeAddClick(product, product.hours)
                        }
                      />
                    )
                ))}
        </AddDatetimeCon>
        <ProductsSection>
          <ProductsTitle>선택한 멤버쉽 상품</ProductsTitle>
          <ProductContainer>
            {selProducts.length > 0
              ? selProducts.map((product, index) => (
                  <ProductItem key={index}>
                    {product.title} : {product.amount}원
                  </ProductItem>
                ))
              : "선택한 이용권이 없습니다"}
          </ProductContainer>
        </ProductsSection>

        <ButtonSection>
          <ButtonContainer>
            {userReqMemLoading ? (
              <Loading />
            ) : (
              <>
                <FieldCardCreateMembershipBtn
                  value={"카드 현장 등록"}
                  onClick={() =>
                    onCreateMembershipClick(
                      CreatePaymentMethodOption.FIELD_CARD
                    )
                  }
                />
                <CashCreateMembershipBtn
                  value={"현금 결제 등록"}
                  onClick={() =>
                    onCreateMembershipClick(CreatePaymentMethodOption.CASH)
                  }
                />
                {/* 무결제 등록 숨김 처리 */}
                {/* <CreateMembershipBtn
              value={"무결제 등록"}
              onClick={() => onCreateMembershipClick()}
            /> */}
                <CancleButton value={"취소"} onClick={onBackClick} />
              </>
            )}
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
