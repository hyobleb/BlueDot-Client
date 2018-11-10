// import moment, { Moment } from "moment";
import React from "react";
// import Datetime from "react-datetime";
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

const ThrowBasketButton = styled(Button)``;
const MembershipDataRow = styled.div`
  padding: 5px 0;
`;

const ButtonSection = styled(Section)`
  text-align: center;
`;

const AddDatetimeCon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const AddDatetimeBtn = styled(Button)`
  margin: 0 3px;
`;

const ResetButton = styled(Button)`
  background-color: ${props => props.theme.yellowColor};
  width: 200px;
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

interface IProps {
  selMembership: any;
  products: any;
  selProductTitle: string;
  extendMembership: () => void;
  selEndDatetime: string;
  selStartDatetime: string;
  onDateTimeAddClick: (hours: number) => void;
  totalExtHours: number;
  onResetClick: () => void;
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
  onResetClick
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
                      value={`+ ${product.hours}시간`}
                      onClick={() => onDateTimeAddClick(product.hours)}
                    />
                  )
              )}
        </AddDatetimeCon>
        <ButtonSection>
          <ThrowBasketButton value={"연장하기"} onClick={extendMembership} />
        </ButtonSection>
      </Container>
    </BackContainer>
  );
};

export default ManagerExtendMembershipPresenter;
