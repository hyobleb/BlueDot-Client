// import moment, { Moment } from "moment";
import React from "react";
// import Datetime from "react-datetime";
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
  background-color: ${props => props.theme.blueColor};
  width: 150px;
  margin-top: 2px;
  margin-bottom: 2px;
`;
const MembershipDataRow = styled.div`
  padding: 5px 0;
`;

const ButtonSection = styled(Section)`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
  background-color: ${props => props.theme.lightBlueColor};
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

// const DatetimePicker = styled.div`
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const DatetimeExtended = styled(Datetime)`
//   input {
//     width: 160px;
//     height: 35px;
//     text-align: center;
//     &:hover {
//       cursor: pointer;
//       background-color: ${props => props.theme.blueColor};
//       color: white;
//     }
//   }
// `;
const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
`;

interface IProps {
  selMembership: any;
  products: any;
  selProductTitle: string;
  extendMembership: (
    payMethod?: CreatePaymentMethodOption | undefined
  ) => Promise<void>;
  selEndDatetime: string;
  selStartDatetime: string;
  onDateTimeAddClick: (
    product: userGetProducts_UserGetBranch_branch_products,
    hours: number
  ) => void;
  totalExtHours: number;
  onResetClick: () => void;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
  onBackClick: () => void;

  // onStartDatetimeChange: (datetimeValue: Moment) => void;
  // onEndDatetimeChange: (datetimeValue: Moment) => void;
}

const ManagerExtendMembershipPresenter: React.SFC<IProps> = ({
  selMembership,
  products,
  selProductTitle,
  extendMembership,
  selEndDatetime,
  selStartDatetime,
  onDateTimeAddClick,
  totalExtHours,
  onResetClick,
  selProducts,
  onBackClick
  // onStartDatetimeChange,
  // onEndDatetimeChange
}) => {
  const productOptions = new Array();
  if (products) {
    products.forEach(product => {
      if (product && product.target === "MEMBERSHIP" && !product.discard) {
        const productItem = { value: product.id, label: product.title };
        productOptions.push(productItem);
      }
    });
  }
  return (
    <BackContainer>
      <Helmet>
        <title>Extend Membership | BlueDot</title>
      </Helmet>
      <BackArrowExtended backFn={onBackClick} />

      <Container>
        <HeadSection>멤버쉽 연장</HeadSection>
        <MembershipSection>
          <MembershipContainer>
            {selMembership && (
              <>
                <MembershipDataRow>
                  {selMembership.branch.name} 멤버쉽
                </MembershipDataRow>
                <MembershipDataRow>
                  이용 시작 : {selStartDatetime}
                </MembershipDataRow>
                <MembershipDataRow>
                  이용 만료 : {selEndDatetime}
                  {/* <DatetimePicker>
                    <DatetimeExtended
                      value={moment(selEndDatetime)}
                      dateFormat="YYYY MMMM Do"
                      timeFormat="A hh:mm"
                      locale="de"
                      onChange={onEndDatetimeChange}
                    />
                  </DatetimePicker> */}
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
                  product && product.target === "MEMBERSHIP" && !product.discard
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
            value={"현금 결제 연장"}
            onClick={() => extendMembership(CreatePaymentMethodOption.CASH)}
          />
          <ExtendConfirmBtn
            value={"현장 카드 결제 연장"}
            onClick={() =>
              extendMembership(CreatePaymentMethodOption.FIELD_CARD)
            }
          />
          {/* <ExtendConfirmBtn
            value={"무결제 연장"}
            onClick={() => extendMembership()}
          /> */}
        </ButtonSection>
      </Container>
    </BackContainer>
  );
};

export default ManagerExtendMembershipPresenter;
