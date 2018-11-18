import React from "react";
import Helmet from "react-helmet";
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

const ExtendConfirmBtn = styled(Button)``;
const MembershipDataRow = styled.div`
  padding: 5px 0;
`;

const ButtonSection = styled(Section)`
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
`;

interface IProps {
  showMembershipPopUp: boolean;
  exstingMemberships: any;
  selMembership: any;
  onMembershipClick: (membershipId: number) => void;
  products: any;
  onExtendConfirmClick: () => void;
  totalExtHours: number;
  onResetClick: () => void;
  onDateTimeAddClick: (hours: number) => void;
  selEndDatetime: string;
}

const ManagerExtendCabinetPresenter: React.SFC<IProps> = ({
  selMembership,
  products,
  onExtendConfirmClick,
  totalExtHours,
  onResetClick,
  onDateTimeAddClick,
  selEndDatetime
}) => {
  return (
    <BackContainer>
      <Helmet>
        <title>Extend Cabinet | BlueDot</title>
      </Helmet>
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
                      onClick={() => onDateTimeAddClick(product.hours)}
                    />
                  )
              )}
        </AddDatetimeCon>

        <ButtonSection>
          <ExtendConfirmBtn value={"연장하기"} onClick={onExtendConfirmClick} />
        </ButtonSection>
      </Container>
    </BackContainer>
  );
};

export default ManagerExtendCabinetPresenter;
