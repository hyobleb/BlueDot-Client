import moment from "moment";
import "moment/locale/ko";
import React from "react";
import Datetime from "react-datetime";
import Dropdown from "react-dropdown";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import CabinetSetsContainer from "src/Components/CabinetSetsContainer";
import Form from "src/Components/Form";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  getBranchForEnrollCabinet,
  getCabinets_GetCabinetSet_cabinetSet_cabinets,
  userGetProducts
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
const BranchSection = styled(Section)``;

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
  onThrowBasketButtonClick: () => Promise<void>;
  onCancelClick: () => void;
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
}

const ReqEnrollCabinetPresenter: React.SFC<IProps> = ({
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
  onThrowBasketButtonClick,
  onCancelClick,
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
  isFirstLoaidng
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
      <BackArrowExtended backTo="/membership" />
      <FormExtended submitFn={onSubmit}>
        <TitleSection>
          <Title>사물함 등록</Title>
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
                  cabinetSets={cabinetSetDatas.UserGetBranch.branch.cabinetSets}
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
                {cabinets ? (
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
                )}

                {!!cabinetId && (
                  <CabinetDisplayTitle>
                    {cabinetNumber}번 사물함을 선택했습니다
                  </CabinetDisplayTitle>
                )}
              </>
            )}
        </CabinetSection>
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
              value={"장바구니 담기"}
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
export default ReqEnrollCabinetPresenter;
