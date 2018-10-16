import React from "react";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

const Container = styled.div``;
const HeadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileImg = styled.img`
  width: 80px;
  border-radius: 50%;
`;
const GreetContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Section = styled.div`
  border: 1px solid #dedede;
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ContentContainer = styled.div`
  text-align: center;
`;
const NoMembershipContainer = styled.div`
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.div`
  text-align: center;
`;
const EnrollButton = styled(SmallButton)`
  margin-left: auto;
  margin-right: auto;
`;

interface IProps {
  name: string;
  profilePhoto: string;
  profileLoading: boolean;
}

const MembershipPresenter: React.SFC<IProps> = ({
  name,
  profilePhoto,
  profileLoading
}) => (
  <Container>
    {profileLoading ? (
      <Loading />
    ) : (
      <>
        <HeadSection>
          <ProfileContainer>
            {profilePhoto ? (
              <ProfileImg src={profilePhoto} />
            ) : (
              <ProfileImg
                src={
                  "http://www.iconarchive.com/download/i103458/paomedia/small-n-flat/profile.ico"
                }
              />
            )}

            <GreetContainer>{name}님 반갑습니다 :)</GreetContainer>
          </ProfileContainer>
        </HeadSection>
        <Section>
          <ContentContainer>
            <NoMembershipContainer>
              현재 멤버쉽이 없습니다
            </NoMembershipContainer>
          </ContentContainer>
          <ButtonContainer>
            <EnrollButton value={"등록하러 가기"} />
          </ButtonContainer>
        </Section>
        <Section>
          <ContentContainer>
            <NoMembershipContainer>
              현재 사물함이 없습니다
            </NoMembershipContainer>
          </ContentContainer>
          <ButtonContainer>
            <EnrollButton value={"등록하러 가기"} />
          </ButtonContainer>
        </Section>{" "}
      </>
    )}
  </Container>
);

export default MembershipPresenter;
