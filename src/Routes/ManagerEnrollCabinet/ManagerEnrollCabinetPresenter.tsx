import moment from "moment";
import "moment/locale/ko";
import React from "react";
import Datetime from "react-datetime";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import CabinetSetsContainer from "src/Components/CabinetSetsContainer";
import Form from "src/Components/Form";
import Loading from "src/Components/Loading";
import { CreatePaymentMethodOption } from "src/Components/shareOptions";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  getBranchForEnrollCabinet,
  getCabinets_GetCabinetSet_cabinetSet_cabinets,
  getManaingBranches_GetManagingBranches_branches,
  userGetProducts,
  userGetProducts_UserGetBranch_branch_products
} from "src/types/api";
import BranchSearchPopUp from "../../Components/BranchSearchPopUp";
import CabinetDisplay from "../../Components/CabinetDisplay";

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
const BranchSection = styled(Section)`
  align-items: center;
`;

const CabinetSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
  align-items: center;
`;
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

const EndDatetime = styled.div`
  border: 1px solid #dedede;
  display: inline-block;
  padding: 8px;
  font-size: 13px;
`;

const BackContainer = styled.div``;

const SetTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const SetTitleItem = styled.div`
  border: 1px solid #dedede;
  padding: 10px;
  width: 100px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.blueColor};
    color: white;
  }
`;

const CabinetDisplayTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
`;

const AddDatetimeCon = styled.div``;
const AddDatetimeBtn = styled(Button)`
  font-size: 12px;
`;

const ResetButton = styled(Button)`
  background-color: ${props => props.theme.yellowColor};
  width: 200px;
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

const CashCreateMembershipBtn = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const FieldCardCreateMembershipBtn = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const BranchBtn = styled(Button)``;

interface IProps {
  branchId: number;
  branchPopUpShow: boolean;
  cabinetId: number;
  productTitle: string;
  startDatetime: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  productDatas?: userGetProducts;
  onOptionChange: (arg: any) => void;
  setTrueBranchPopUpShow: () => void;
  setFalseBranchPopUpShow: () => void;
  onBranchClick: (branchId: number) => void;
  onDatetimeChange: (startDatetime: moment.Moment) => void;
  onEnrollClick: (
    payMethod?: CreatePaymentMethodOption | undefined
  ) => Promise<void>;
  cabinetSetDatas?: getBranchForEnrollCabinet;
  tempSetId: number;
  onSetHover: (setId: number) => void;
  onSetHoverOut: () => void;
  onSetClick: (setId: number) => void;
  setId: number;
  cabinets: [getCabinets_GetCabinetSet_cabinetSet_cabinets] | null;
  horizontalNumber: number;
  onCabinetClick: (cabinetId: number) => void;
  cabinetNumber: number;
  cabinetSetLoading: boolean;
  isFirstLoaidng: boolean;
  selEndDatetime: string;
  onEndDatetimeChange: (endDatetime: moment.Moment) => void;
  onDateTimeAddClick: (
    product: userGetProducts_UserGetBranch_branch_products,
    hours: number
  ) => void;
  userIdName: string;
  userName: string;
  setDatetimeValueNow: () => void;
  setEndDatetimeToStart: () => void;
  onBackClick: () => void;
  isShifitCabinet: boolean;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
  managingBranches?: Array<getManaingBranches_GetManagingBranches_branches | null>;
  onBranchBtnClick: (branchId: number) => void;
  managingBranchesLoading: boolean;
  cabinetLoading: boolean;
  isCleanStaff: boolean;
  isManStaff: boolean;
}

const ManagerEnrollCabinetPresenter: React.SFC<IProps> = ({
  cabinetLoading,
  managingBranchesLoading,
  startDatetime,
  onSubmit,
  productDatas,
  onOptionChange,
  productTitle,
  branchPopUpShow,
  setTrueBranchPopUpShow,
  setFalseBranchPopUpShow,
  onBranchClick,
  onDatetimeChange,
  onEnrollClick,
  cabinetSetDatas,
  tempSetId,
  onSetHover,
  onSetHoverOut,
  onSetClick,
  setId,
  cabinets,
  horizontalNumber,
  onCabinetClick,
  cabinetId,
  cabinetNumber,
  cabinetSetLoading,
  isFirstLoaidng,
  selEndDatetime,
  onEndDatetimeChange,
  onDateTimeAddClick,
  userIdName,
  userName,
  setDatetimeValueNow,
  setEndDatetimeToStart,
  onBackClick,
  isShifitCabinet,
  selProducts,
  isFranchiser,
  isHead,
  isSupervisor,
  managingBranches,
  onBranchBtnClick,
  branchId,
  isCleanStaff,
  isManStaff
}) => {
  const productOptions = new Array();
  if (
    productDatas &&
    productDatas.UserGetBranch &&
    productDatas.UserGetBranch.branch &&
    productDatas.UserGetBranch.branch.products
  ) {
    productDatas.UserGetBranch.branch.products.forEach(product => {
      if (product && product.target === "CABINET" && !product.discard) {
        const productItem = { value: product.id, label: product.title };
        productOptions.push(productItem);
      }
    });
  }

  return (
    <BackContainer>
      <Helmet>
        <title>Enroll Requset Cabinet | BlueDot</title>
      </Helmet>
      <BackArrowExtended backFn={onBackClick} />
      {managingBranchesLoading ? (
        <Loading />
      ) : (
        <FormExtended submitFn={onSubmit}>
          <TitleSection>
            <Title>
              {`${userName}(${userIdName})`}님 사물함{" "}
              {isShifitCabinet ? "이동" : "등록"}
            </Title>
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
          <CabinetSection>
            {cabinetSetLoading && !isFirstLoaidng ? <Loading /> : ""}
            {cabinetSetDatas &&
              cabinetSetDatas.UserGetBranch &&
              cabinetSetDatas.UserGetBranch.branch &&
              cabinetSetDatas.UserGetBranch.branch.cabinetLoungeImage && (
                <>
                  <CabinetSetsContainer
                    imgUrl={
                      cabinetSetDatas.UserGetBranch.branch.cabinetLoungeImage
                    }
                    showTempCabinetSet={false}
                    cabinetSets={
                      cabinetSetDatas.UserGetBranch.branch.cabinetSets
                    }
                    tempSelCabinetSetId={tempSetId}
                    onCabinetSetHover={onSetHover}
                    onCabinetSetHoverOut={onSetHoverOut}
                    onCabinetSetClick={onSetClick}
                    selectedCabinetId={setId}
                  />
                  <SetTitleContainer>
                    {cabinetSetDatas.UserGetBranch.branch.cabinetSets &&
                      cabinetSetDatas.UserGetBranch.branch.cabinetSets.map(
                        set =>
                          set && (
                            <SetTitleItem
                              key={set.id}
                              style={{
                                backgroundColor:
                                  tempSetId === set.id
                                    ? "#1abc9c"
                                    : setId === set.id
                                    ? "#1abc9c"
                                    : "",
                                color:
                                  tempSetId === set.id
                                    ? "white"
                                    : setId === set.id
                                    ? "white"
                                    : ""
                              }}
                              onClick={() => onSetClick(set.id)}
                              onMouseOver={() => onSetHover(set.id)}
                              onMouseLeave={onSetHoverOut}
                            >
                              {set.title}
                            </SetTitleItem>
                          )
                      )}
                  </SetTitleContainer>
                  {setId !== 0 ? (
                    cabinetLoading ? (
                      <Loading />
                    ) : cabinets ? (
                      <>
                        <CabinetDisplayTitle>
                          사물함을 선택해주세요!
                        </CabinetDisplayTitle>
                        <CabinetDisplay
                          cabinets={cabinets}
                          horizontalNumber={horizontalNumber}
                          onCabinetClick={onCabinetClick}
                          selCabinetId={cabinetId}
                        />
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {/* {cabinets ? (
                    <>
                      <CabinetDisplayTitle>
                        사물함을 선택해주세요!
                      </CabinetDisplayTitle>
                      <CabinetDisplay
                        cabinets={cabinets}
                        horizontalNumber={horizontalNumber}
                        onCabinetClick={onCabinetClick}
                        selCabinetId={cabinetId}
                      />
                    </>
                  ) : (
                    ""
                  )} */}

                  {!!cabinetId && (
                    <CabinetDisplayTitle>
                      {cabinetNumber}번 사물함을 선택했습니다
                    </CabinetDisplayTitle>
                  )}
                </>
              )}
          </CabinetSection>
          {isShifitCabinet ? (
            ""
          ) : (
            <>
              <DatetimeSection>
                <DatetimeTitle>이용 시작 일시를 선택해주세요</DatetimeTitle>
                <DatetimePicker>
                  <DatetimeExtended
                    value={moment(startDatetime)}
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
                <DatetimeTitle>이용 종료 일시</DatetimeTitle>
                <DatetimePicker>
                  <EndDatetime>
                    {moment(selEndDatetime).format("YYYY MMMM Do a hh:mm")}
                  </EndDatetime>
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
                    )}
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
            </>
          )}

          <ButtonSection>
            <ButtonContainer>
              {!isShifitCabinet && (
                <>
                  <FieldCardCreateMembershipBtn
                    value={"카드 현장 등록"}
                    onClick={() =>
                      onEnrollClick(CreatePaymentMethodOption.FIELD_CARD)
                    }
                  />
                  <CashCreateMembershipBtn
                    value={"현금 결제 등록"}
                    onClick={() =>
                      onEnrollClick(CreatePaymentMethodOption.CASH)
                    }
                  />
                </>
              )}

              {/* 무결제 등록 숨김 처리 */}
              {isShifitCabinet && (
                <ThrowBasketButton
                  value={isShifitCabinet ? "이동하기" : "무결제 등록"}
                  onClick={() => onEnrollClick()}
                />
              )}

              <CancleButton value={"취소"} onClick={onBackClick} />
            </ButtonContainer>
          </ButtonSection>
        </FormExtended>
      )}

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
export default ManagerEnrollCabinetPresenter;
