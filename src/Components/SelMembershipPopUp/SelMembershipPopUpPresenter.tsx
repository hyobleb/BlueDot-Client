import React from "react";
import styled from "../../typed-components";
import SmallButton from "../SmallButton";

interface IProps {
  closeFunc: any;
  memberships: any;
  onMembershipClick: (membershipId: number) => void;
}
const Container = styled.div`
  -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  background-color: white;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 90%;
  height: 60%;
  z-index: 9;
  padding: 20px;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BodyContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  height: 75vh;
  max-height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const MembershipContainer = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #dedede;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.lightBlueColor};
    color: white;
  }
`;
const MembershipDataRow = styled.div`
  padding: 4px 0;
`;
const TailContainer = styled.div``;
const ButtonContainer = styled.div`
  text-align: center;
`;
const CancleButton = styled(SmallButton)`
  background: ${props => props.theme.redColor};
  color: white;
`;

const SelMembershipPopUpPresenter: React.SFC<IProps> = ({
  closeFunc,
  memberships,
  onMembershipClick
}) => {
  return (
    <Container>
      <HeadContainer />
      <BodyContainer>
        {memberships &&
          memberships.map(membership => (
            <MembershipContainer
              key={membership.id}
              onClick={() => onMembershipClick(membership.id)}
            >
              <MembershipDataRow>
                {membership.branch.name} 멤버쉽
              </MembershipDataRow>
              <MembershipDataRow>
                이용 시작 : {membership.startDatetime}
              </MembershipDataRow>
              <MembershipDataRow>
                이용 만료 : {membership.endDatetime}
              </MembershipDataRow>
            </MembershipContainer>
          ))}
      </BodyContainer>
      <TailContainer>
        <ButtonContainer>
          <CancleButton value={"취소"} onClick={closeFunc} />
        </ButtonContainer>
      </TailContainer>
      <CloseButton onClick={closeFunc}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z" />
        </svg>
      </CloseButton>
    </Container>
  );
};
export default SelMembershipPopUpPresenter;
