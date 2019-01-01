import React from "react";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import { CreatePaymentMethodOption } from "src/Components/shareOptions";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { userGetProducts_UserGetBranch_branch_products } from "src/types/api";

const BackContainer = styled.div`
  margin-top: 30px;
`;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
const Section = styled.div``;
const HeadSection = styled(Section)`
  text-align: center;
  font-size: 20px;
  margin-bottom: 40px;
`;
const MembershipSection = styled(Section)`
  margin-bottom: 20px;
`;
const MembershipContainer = styled.div`
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;
const Button = styled(SmallButton)``;

const ExtendConfirmBtn = styled(Button)`
  width: 150px;
  margin-top: 3px;
  margin-bottom: 3px;
`;
const MembershipDataRow = styled.div`
  padding: 5px 0;
`;

const ButtonSection = styled(Section)`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ResetButton = styled(Button)`
  background-color: ${props => props.theme.yellowColor};
  width: 200px;
`;

const AddDatetimeCon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const AddDatetimeBtn = styled(Button)`
  margin: 0 3px;
  font-size: 11px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: ${props => props.theme.greenColor};
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
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

interface IProps {
  showMembershipPopUp: boolean;
  selMembership: any;
  onMembershipClick: (membershipId: number) => void;
  products: any;
  onExtendConfirmClick: (
    payMethod?: CreatePaymentMethodOption | undefined
  ) => Promise<void>;
  totalExtHours: number;
  onResetClick: () => void;
  onDateTimeAddClick: (
    product: userGetProducts_UserGetBranch_branch_products,
    hours: number
  ) => void;
  selEndDatetime: string;
  onBackClick: () => void;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
}

const ManagerExtendCabinetPresenter: React.SFC<IProps> = ({
  selMembership,
  products,
  onExtendConfirmClick,
  totalExtHours,
  onResetClick,
  onDateTimeAddClick,
  selEndDatetime,
  onBackClick,
  selProducts
}) => {
  return (
    <BackContainer>
      <Helmet>
        <title>Extend Cabinet | BlueDot</title>
      </Helmet>
      <BackArrowExtended backFn={onBackClick} />

      <Container>
        <HeadSection>사물함 연장</HeadSection>
        <MembershipSection>
          <MembershipContainer>
            {selMembership && selMembership.cabinetId && (
              <>
                <MembershipDataRow>
                  {selMembership.branch.name}{" "}
                  {selMembership.cabinet.cabinetNumber}번 사물함
                </MembershipDataRow>
                <MembershipDataRow>
                  이용 시작 : {selMembership.startDatetime}
                </MembershipDataRow>
                <MembershipDataRow>
                  이용 만료 : {selEndDatetime}
                </MembershipDataRow>
                <MembershipDataRow>
                  <ResetButton value={"리셋"} onClick={onResetClick} />
                </MembershipDataRow>
                <MembershipDataRow>
                  {totalExtHours > 0 ? `총 ${totalExtHours}시간 연장` : ""}
                </MembershipDataRow>
              </>
            )}
          </MembershipContainer>
        </MembershipSection>

        <AddDatetimeCon>
          {products &&
            products
              .filter(
                product =>
                  product && product.target === "CABINET" && !product.discard
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
                      onClick={() => onDateTimeAddClick(product, product.hours)}
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
        <ButtonSection>
          <ExtendConfirmBtn
            value={"현장 현금결제 연장"}
            onClick={() => onExtendConfirmClick(CreatePaymentMethodOption.CASH)}
          />
          <ExtendConfirmBtn
            value={"현장 카드결제 연장"}
            onClick={() =>
              onExtendConfirmClick(CreatePaymentMethodOption.FIELD_CARD)
            }
          />
          {/* 무결제 등록 숨김 처리 */}
          {/* <ExtendConfirmBtn
            value={"무결제 연장"}
            onClick={() => onExtendConfirmClick()}
          /> */}
        </ButtonSection>
      </Container>
    </BackContainer>
  );
};

export default ManagerExtendCabinetPresenter;
