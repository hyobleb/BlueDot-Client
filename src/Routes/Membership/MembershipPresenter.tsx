import React from "react";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { getUsableMyMemberships } from "src/types/api";
import BranchSearchPopUp from "../../Components/BranchSearchPopUp";

const Container = styled.div`
  margin-bottom: 30px;
`;
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
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const SectionTitle = styled.div`
  font-size: 22px;
`;

const ContentContainer = styled.div`
  border: 1px solid #dedede;
  text-align: center;
  padding: 15px;
  border-radius: 5px;
`;
const NoMembershipContainer = styled.div`
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const EnrollButton = styled(SmallButton)`
  margin-left: auto;
  margin-right: auto;
`;

const ExtendButton = styled(SmallButton)`
  justify-self: center;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const MembershipContainer = styled.div`
  text-align: left;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #dedede;
`;
const MembershipContentRow = styled.div`
  padding: 5px 0;
`;

const MembershipTitle = styled(MembershipContentRow)``;
const StartDatetime = styled(MembershipContentRow)``;
const EndDatetime = styled(MembershipContentRow)``;
// const CabinetLock = styled(MembershipContentRow)``;

interface IProps {
  name: string;
  profilePhoto: string;
  profileLoading: boolean;
  popUpShow: boolean;
  membershipPopUpShow: () => void;
  cabinetPopUpShow: () => void;
  popUpCloseFunc: () => void;
  onBranchClick: (branchId: number) => void;
  myMembershipDatas?: getUsableMyMemberships;
  myMembershipDatasLoading: boolean;
  onMembershipExtendClick: (selMembershipId: number) => void;
  onCabinetExtendClick: (selMembershipId: number) => void;
  overtimeCabinetMemberships: any[];
}

const MembershipPresenter: React.SFC<IProps> = ({
  name,
  profilePhoto,
  profileLoading,
  popUpShow,
  membershipPopUpShow,
  cabinetPopUpShow,
  popUpCloseFunc,
  onBranchClick,
  myMembershipDatas,
  myMembershipDatasLoading,
  onMembershipExtendClick,
  onCabinetExtendClick,
  overtimeCabinetMemberships
}) => (
  <Container>
    <Helmet>
      <title>membership | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/home" />
    {profileLoading || myMembershipDatasLoading ? (
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
          <SectionHead>
            <SectionTitle>멤버쉽</SectionTitle>
            <ButtonContainer>
              <EnrollButton
                value={"등록하러 가기"}
                onClick={membershipPopUpShow}
              />
            </ButtonContainer>
          </SectionHead>

          <ContentContainer>
            {(myMembershipDatas &&
              myMembershipDatas.GetMyUsableMemberships &&
              myMembershipDatas.GetMyUsableMemberships.memberships &&
              myMembershipDatas.GetMyUsableMemberships.memberships.filter(
                membership => membership && !membership.cabinetId
              ).length > 0 &&
              myMembershipDatas.GetMyUsableMemberships.memberships.map(
                membership =>
                  membership &&
                  !membership.cabinet && (
                    <MembershipContainer key={membership.id}>
                      <MembershipTitle>
                        {membership.branch.name} 멤버쉽
                      </MembershipTitle>
                      <StartDatetime>
                        이용 시작 : {membership.startDatetime}
                      </StartDatetime>
                      <EndDatetime>
                        이용 종료 : {membership.endDatetime}
                      </EndDatetime>
                      <ButtonContainer>
                        <ExtendButton
                          value={"연장하기"}
                          onClick={() => onMembershipExtendClick(membership.id)}
                        />
                      </ButtonContainer>
                    </MembershipContainer>
                  )
              )) || (
              <NoMembershipContainer>
                현재 멤버쉽이 없습니다
              </NoMembershipContainer>
            )}
          </ContentContainer>
        </Section>
        <Section>
          <SectionHead>
            <SectionTitle>사물함</SectionTitle>
            <ButtonContainer>
              <EnrollButton
                value={"등록하러 가기"}
                onClick={cabinetPopUpShow}
              />
            </ButtonContainer>
          </SectionHead>
          <ContentContainer>
            {(myMembershipDatas &&
              myMembershipDatas.GetMyUsableMemberships &&
              myMembershipDatas.GetMyUsableMemberships.memberships &&
              myMembershipDatas.GetMyUsableMemberships.memberships.filter(
                membership => membership && membership.cabinet
              ).length > 0 &&
              myMembershipDatas.GetMyUsableMemberships.memberships.length > 0 &&
              myMembershipDatas.GetMyUsableMemberships.memberships.map(
                membership =>
                  membership &&
                  membership.cabinet && (
                    <MembershipContainer key={membership.id}>
                      <MembershipTitle>
                        {membership.branch.name}{" "}
                        {membership.cabinet.cabinetNumber}번 사물함
                      </MembershipTitle>
                      <StartDatetime>
                        이용 시작 : {membership.startDatetime}
                      </StartDatetime>
                      <EndDatetime>
                        이용 종료 : {membership.endDatetime}
                      </EndDatetime>
                      {/* <CabinetLock>
                        자물쇠 비밀번호 :{" "}
                        {membership.cabinet.lock
                          ? membership.cabinet.lock.password
                          : "사물함 이용시작 시간 이후 비밀번호를 열람할수 있습니다"}
                      </CabinetLock> */}
                      <ButtonContainer>
                        <ExtendButton
                          value={"연장하기"}
                          onClick={() => onCabinetExtendClick(membership.id)}
                        />
                      </ButtonContainer>
                    </MembershipContainer>
                  )
              )) || (
              <NoMembershipContainer>
                현재 이용중인 사물함이 없습니다
              </NoMembershipContainer>
            )}
          </ContentContainer>
        </Section>

        {overtimeCabinetMemberships.length > 0 ? (
          <Section>
            <SectionHead>
              <SectionTitle>기간이 지난 사물함</SectionTitle>
            </SectionHead>

            <ContentContainer>
              {overtimeCabinetMemberships.map(
                membership =>
                  membership.cabinet && (
                    <MembershipContainer key={membership.id}>
                      <MembershipTitle>
                        {membership.cabinet.branch.name}
                        {membership.cabinet.cabinetNumber}번 사물함
                      </MembershipTitle>
                      <StartDatetime>
                        이용 시작 : {membership.startDatetime}
                      </StartDatetime>
                      <EndDatetime>
                        이용 종료 : {membership.endDatetime}
                      </EndDatetime>
                      <ButtonContainer>
                        <ExtendButton
                          value={"연장하기"}
                          onClick={() => onCabinetExtendClick(membership.id)}
                        />
                      </ButtonContainer>
                    </MembershipContainer>
                  )
              )}
            </ContentContainer>
          </Section>
        ) : (
          ""
        )}
      </>
    )}

    {popUpShow ? (
      <BranchSearchPopUp
        closeFunc={popUpCloseFunc}
        onBranchClick={onBranchClick}
        title={"등록할 지점을 선택해주세요"}
      />
    ) : (
      ""
    )}
  </Container>
);

export default MembershipPresenter;
