import moment from "moment";
import React from "react";
import AlertPopUp from "src/Components/AlertPopUp";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { headGetUserDetail_HeadGetUserDetail_user } from "src/types/api";

const Back = styled(DefaultBack)``;
const Section = styled.section``;
const PersonalInfoSection = styled(Section)``;
const ImageRow = styled.div`
  text-align: center;
`;
const ProfileImg = styled.img`
  width: 50px;
`;

const ProfileContentContainer = styled.div`
  border: 1px solid #dedede;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProfileContentRow = styled.div`
  display: flex;
  padding: 5px 0;
`;
const ProfileItemTitle = styled.div`
  flex-basis: 80px;
`;
const ProfileItemValue = styled.div``;

const ButtonSection = styled(Section)``;
const ButtonContainer = styled.div`
  padding-top: 15px;
  border-top: 1px solid #dedede;
  text-align: center;
  width: 100%;
`;
const Button = styled(SmallButton)`
  margin: 0 5px;
`;
const EnrollMembershipBtn = styled(Button)``;
const EnrollCabinetBtn = styled(Button)``;
const ExtendBtn = styled(Button)`
  background-color: ${props => props.theme.greenColor};
`;
const ExpireBtn = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;
const MembershipSection = styled(Section)`
  margin-top: 20px;
  border: 1px solid #dedede;
  padding: 15px;
`;

const MembershipContainer = styled.div``;
const CabinetContianer = styled.div``;
const MembershipTitle = styled.div`
  font-size: 22px;
  margin-bottom: 10px;
`;
const MembershipContent = styled.div``;
const MembershipContRow = styled.div`
  padding: 5px 0;
  display: flex;
`;
const MembershipContTitle = styled(ProfileItemTitle)``;
const MembershipContVal = styled.div``;

const MembershipContList = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid #dedede;
  margin-bottom: 20px;
`;

interface IProps {
  getUserDetailLoading: boolean;
  user?: headGetUserDetail_HeadGetUserDetail_user;
  enrollMembershipClick: (userId: number) => void;
  enrollCabinetClick: (userId: number) => void;
  onMembershipExtendClick: (membershipId: number) => void;
  showExpirePopUp: boolean;
  showExpirePopUpToggle: () => void;
  tempSelMembershipId?: number;
  onMembershipExpireClick: (membershipId: number) => void;
  onExpireConfirmClick: () => Promise<void>;
  onExtendCabinetClick: (membershipId: number) => void;
}

const UserDetailPresenter: React.SFC<IProps> = ({
  getUserDetailLoading,
  user,
  enrollMembershipClick,
  enrollCabinetClick,
  onMembershipExtendClick,
  showExpirePopUp,
  showExpirePopUpToggle,
  onMembershipExpireClick,
  onExpireConfirmClick,
  onExtendCabinetClick
}) => {
  let memberships;
  let cabinetMemberships;
  if (user) {
    memberships = user.memberships.filter(
      membership =>
        membership &&
        membership.usable &&
        !membership.cabinetId &&
        moment(membership.endDatetime) > moment()
    );
    cabinetMemberships = user.memberships.filter(
      membership =>
        membership &&
        membership.usable &&
        membership.cabinetId &&
        moment(membership.endDatetime) > moment()
    );
  }

  return (
    <Back backUrl={"/manage-users"} title={"user-detail"}>
      {getUserDetailLoading || !user ? (
        <Loading />
      ) : (
        <>
          <PersonalInfoSection>
            <ImageRow>
              <ProfileImg
                src={
                  user.profilePhoto || require("src/images/default_profile.png")
                }
              />
            </ImageRow>
            <ProfileContentContainer>
              <ProfileContentRow>
                <ProfileItemTitle>이름</ProfileItemTitle>
                <ProfileItemValue> : {user.name}</ProfileItemValue>
              </ProfileContentRow>
              <ProfileContentRow>
                <ProfileItemTitle>아이디</ProfileItemTitle>
                <ProfileItemValue> : {user.userId}</ProfileItemValue>
              </ProfileContentRow>
              <ProfileContentRow>
                <ProfileItemTitle>전화번호</ProfileItemTitle>
                <ProfileItemValue> : {user.phoneNumber}</ProfileItemValue>
              </ProfileContentRow>
              <ProfileContentRow>
                <ProfileItemTitle>생년월일</ProfileItemTitle>
                <ProfileItemValue>
                  :{" "}
                  {moment()
                    .set("year", user.birthYear)
                    .set("month", user.birthMonth - 1)
                    .set("date", user.birthDay)
                    .format("YYYY-MM-DD")}
                </ProfileItemValue>
              </ProfileContentRow>
              <ProfileContentRow>
                <ProfileItemTitle>이용지점</ProfileItemTitle>
                <ProfileItemValue> : {user.baseBranch.name}</ProfileItemValue>
              </ProfileContentRow>
              {user.email ? (
                <ProfileContentRow>
                  <ProfileItemTitle>이메일</ProfileItemTitle>
                  <ProfileItemValue> : {user.email}</ProfileItemValue>
                </ProfileContentRow>
              ) : (
                ""
              )}
            </ProfileContentContainer>
          </PersonalInfoSection>
          <ButtonSection>
            <ButtonContainer>
              <EnrollMembershipBtn
                value={"멤버쉽 등록"}
                onClick={() => enrollMembershipClick(user.id)}
              />
              <EnrollCabinetBtn
                value={"사물함 등록"}
                onClick={() => enrollCabinetClick(user.id)}
              />
            </ButtonContainer>
          </ButtonSection>
          <MembershipSection>
            <MembershipContainer>
              <MembershipTitle>이용중인 멤버쉽</MembershipTitle>
              <MembershipContent>
                {memberships.length > 0 ? (
                  memberships.map(
                    membership =>
                      membership && (
                        <MembershipContList key={membership.id}>
                          <MembershipContRow>
                            <MembershipContTitle>이용지점</MembershipContTitle>
                            <MembershipContVal>
                              {" "}
                              : {user.baseBranch.name}
                            </MembershipContVal>
                          </MembershipContRow>
                          <MembershipContRow>
                            <MembershipContTitle>이용 시작</MembershipContTitle>
                            <MembershipContVal>
                              {" "}
                              : {membership.startDatetime}
                            </MembershipContVal>
                          </MembershipContRow>
                          <MembershipContRow>
                            <MembershipContTitle>이용 만료</MembershipContTitle>
                            <MembershipContVal>
                              {" "}
                              : {membership.endDatetime}
                            </MembershipContVal>
                          </MembershipContRow>
                          <MembershipContRow>
                            <ButtonContainer>
                              <ExtendBtn
                                value={"연장하기"}
                                onClick={() =>
                                  onMembershipExtendClick(membership.id)
                                }
                              />
                              <ExpireBtn
                                value={"만료하기"}
                                onClick={() =>
                                  onMembershipExpireClick(membership.id)
                                }
                              />
                            </ButtonContainer>
                          </MembershipContRow>
                        </MembershipContList>
                      )
                  )
                ) : (
                  <MembershipContList>
                    현재 이용중인 멤버쉽이 없습니다
                  </MembershipContList>
                )}
              </MembershipContent>
            </MembershipContainer>
            <CabinetContianer>
              <MembershipTitle>이용중인 사물함</MembershipTitle>
              <MembershipContent>
                {cabinetMemberships.length > 0 ? (
                  cabinetMemberships.map(
                    membership =>
                      membership && (
                        <MembershipContList key={membership.id}>
                          <MembershipContRow>
                            <MembershipContTitle>이용지점</MembershipContTitle>
                            <MembershipContVal>
                              {" "}
                              : {user.baseBranch.name}
                            </MembershipContVal>
                          </MembershipContRow>
                          <MembershipContRow>
                            <MembershipContTitle>
                              사물함 번호
                            </MembershipContTitle>
                            <MembershipContVal>
                              {" "}
                              : {membership.cabinet.cabinetNumber}
                            </MembershipContVal>
                          </MembershipContRow>

                          <MembershipContRow>
                            <MembershipContTitle>이용 시작</MembershipContTitle>
                            <MembershipContVal>
                              {" "}
                              : {membership.startDatetime}
                            </MembershipContVal>
                          </MembershipContRow>
                          <MembershipContRow>
                            <MembershipContTitle>이용 만료</MembershipContTitle>
                            <MembershipContVal>
                              {" "}
                              : {membership.endDatetime}
                            </MembershipContVal>
                          </MembershipContRow>

                          <MembershipContRow>
                            <ButtonContainer>
                              <ExtendBtn
                                value={"연장하기"}
                                onClick={() =>
                                  onExtendCabinetClick(membership.id)
                                }
                              />
                              <ExpireBtn value={"만료하기"} />
                            </ButtonContainer>
                          </MembershipContRow>
                        </MembershipContList>
                      )
                  )
                ) : (
                  <MembershipContList>
                    현재 이용중인 사물함이 없습니다
                  </MembershipContList>
                )}
              </MembershipContent>
            </CabinetContianer>
          </MembershipSection>
        </>
      )}

      {showExpirePopUp ? (
        <AlertPopUp
          closeFunc={showExpirePopUpToggle}
          message={"해당 멤버쉽을 만료시키시겠습니까?"}
          onOkClick={async () => {
            await onExpireConfirmClick();
          }}
        />
      ) : (
        ""
      )}
    </Back>
  );
};

export default UserDetailPresenter;
