import React from "react";
import Dropdown, { Option } from "react-dropdown";
import Helmet from "react-helmet";
import SelMembershipPopUp from "src/Components/SelMembershipPopUp";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

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
const MembershipSelButton = styled(Button)`
  position: absolute;
  right: 10px;
`;
const ThrowBasketButton = styled(Button)``;
const MembershipDataRow = styled.div`
  padding: 5px 0;
`;
const SelPeriodSection = styled(Section)`
  margin-bottom: 20px;
`;
const SelPeriodTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const ButtonSection = styled(Section)`
  text-align: center;
`;

interface IProps {
  showMembershipPopUp: boolean;
  toggleShowMembershipPopUp: () => void;
  exstingMemberships: any;
  selMembership: any;
  onMembershipClick: (membershipId: number) => void;
  products: any;
  onOptionChange: (arg: Option) => void;
  selProductTitle: string;
  onThrowBasketClick: () => void;
}

const ReqExtendCabinetPresenter: React.SFC<IProps> = ({
  showMembershipPopUp,
  toggleShowMembershipPopUp,
  exstingMemberships,
  onMembershipClick,
  selMembership,
  products,
  onOptionChange,
  selProductTitle,
  onThrowBasketClick
}) => {
  const productOptions = new Array();
  if (products) {
    products.forEach(product => {
      if (product && product.target === "CABINET" && !product.discard) {
        const productItem = { value: product.id, label: product.title };
        productOptions.push(productItem);
      }
    });
  }
  return (
    <BackContainer>
      <Helmet>
        <title>Extend Requset Membership | BlueDot</title>
      </Helmet>
      <Container>
        <HeadSection>사물함 연장</HeadSection>
        <MembershipSection>
          <MembershipContainer>
            <MembershipSelButton
              value={"멤버쉽 선택"}
              onClick={toggleShowMembershipPopUp}
            />
            {(selMembership &&
              selMembership.cabinetId && (
                <>
                  <MembershipDataRow>
                    {selMembership.branch.name}{" "}
                    {selMembership.cabinet.cabinetNumber}번 사물함
                  </MembershipDataRow>
                  <MembershipDataRow>
                    이용 시작 : {selMembership.startDatetime}
                  </MembershipDataRow>
                  <MembershipDataRow>
                    이용 만료 : {selMembership.endDatetime}
                  </MembershipDataRow>
                </>
              )) || (
              <MembershipDataRow>
                연장할 사물함을 선택해주세요!
              </MembershipDataRow>
            )}
          </MembershipContainer>
        </MembershipSection>
        <SelPeriodSection>
          <SelPeriodTitle>이용권을 선택해주세요!</SelPeriodTitle>
          <Dropdown
            disabled={productOptions.length === 0}
            options={productOptions}
            placeholder={"이용권을 선택해주세요"}
            controlClassName={"control"}
            onChange={args => onOptionChange(args)}
            value={selProductTitle}
          />
        </SelPeriodSection>
        <ButtonSection>
          <ThrowBasketButton
            value={"장바구니 담기"}
            onClick={onThrowBasketClick}
          />
        </ButtonSection>
      </Container>
      {showMembershipPopUp && (
        <SelMembershipPopUp
          closeFunc={toggleShowMembershipPopUp}
          memberships={exstingMemberships}
          onMembershipClick={onMembershipClick}
          title={"연장할 사물함을 선택해주세요"}
        />
      )}
    </BackContainer>
  );
};

export default ReqExtendCabinetPresenter;
