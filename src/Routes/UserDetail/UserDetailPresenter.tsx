import moment, { Moment } from "moment";
import React from "react";
import Datetime from "react-datetime";
import AlertPopUp from "src/Components/AlertPopUp";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  getMembershipLogsById_GetMembershipLogsById_membershipLogs,
  managerGetUserDetail_ManagerGetUserDetail_user
} from "src/types/api";

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

const ViewPayBtn = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
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

const DatetimeExtended = styled(Datetime)`
  input {
    width: 100px;
    height: 30px;
    text-align: center;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.blueColor};
      color: white;
    }
  }
`;

const MembershipLogSection = styled(Section)``;

const ContentsSec = styled(Section)``;
const ContentRow = styled.div`
  justify-content: center;
  display: flex;
  font-size: 13px;
`;
const ContentCon = styled.div``;
const ContentRowCon = styled(ContentCon)`
  max-height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ContentDataRow = styled(ContentRow)`
  border: 1px solid #dedede;
  padding: 20px;
  flex-direction: column;
`;

const ContentValue = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
`;

const ButtonContentValue = styled.div`
  margin: 10px 0;
  text-align: center;
`;

const ContentStatus = styled<
  {
    status: string;
  },
  "div"
>("div")`
  background-color: ${props =>
    props.status === "REGIST"
      ? props.theme.blueColor
      : props.status === "EXTENDED"
      ? props.theme.greenColor
      : props.status === "EXPIRED"
      ? props.theme.redColor
      : ""};
  color: white;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonSec = styled(Section)`
  text-align: center;
  margin-bottom: 10px;
`;

const PeriodButton = styled(Button)`
  width: 60px;
  font-size: 14px;
  margin-left: 4px;
  margin-right: 4px;
`;

const PeriodSec = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

const MembershipLogTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
`;

const NoContentTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const NoPayment = styled.div`
  color: ${props => props.theme.lightBlueColor};
`;

interface IProps {
  getUserDetailLoading: boolean;
  user?: managerGetUserDetail_ManagerGetUserDetail_user;
  enrollMembershipClick: (userId: number) => void;
  enrollCabinetClick: (userId: number) => void;
  onMembershipExtendClick: (membershipId: number) => void;
  showExpirePopUp: boolean;
  showExpirePopUpToggle: () => void;
  tempSelMembershipId?: number;
  onMembershipExpireClick: (membershipId: number) => void;
  onExpireConfirmClick: () => Promise<void>;
  onExtendCabinetClick: (membershipId: number) => void;
  onBackClick: () => void;
  startDatetime: Moment;
  endDatetime: Moment;
  onPeriodBtnClick: (hours: number) => void;
  onStartDatetimeChange: (startDatetimeValue: Moment) => void;
  onEndDatetimeChange: (endDatetimeValue: Moment) => void;
  membershipLogs?: Array<getMembershipLogsById_GetMembershipLogsById_membershipLogs | null>;
  onPayViewBtnClick: (paymentId: number) => void;
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
  onExtendCabinetClick,
  onBackClick,
  startDatetime,
  endDatetime,
  onPeriodBtnClick,
  onStartDatetimeChange,
  onEndDatetimeChange,
  membershipLogs,
  onPayViewBtnClick
}) => {
  let memberships;
  let filteredMembershipLogs;
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

  if (membershipLogs) {
    filteredMembershipLogs = membershipLogs
      .filter(log => {
        if (log) {
          const updateAtMoment = moment(new Date(log.updatedAt).toUTCString());
          if (
            updateAtMoment >= moment(startDatetime).subtract(1, "d") &&
            updateAtMoment < moment(endDatetime)
          ) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      })
      .sort((a, b) => {
        if (a && b) {
          return b.id - a.id;
        } else {
          return 0;
        }
      });
  }

  return (
    <Back backFn={onBackClick} title={"user-detail"}>
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
                    현재 이용중인 사물함이 없습니다
                  </MembershipContList>
                )}
              </MembershipContent>
            </CabinetContianer>
          </MembershipSection>
          <MembershipLogSection>
            <MembershipLogTitle>멤버십 기록</MembershipLogTitle>
            <ButtonSec>
              <PeriodButton
                value={"오늘"}
                onClick={() => onPeriodBtnClick(0)}
              />
              <PeriodButton
                value={"일주일"}
                onClick={() => onPeriodBtnClick(7 * 24)}
              />
              <PeriodButton
                value={"1개월"}
                onClick={() => onPeriodBtnClick(30 * 24)}
              />
              <PeriodButton
                value={"3개월"}
                onClick={() => onPeriodBtnClick(90 * 24)}
              />
            </ButtonSec>
            <PeriodSec>
              <DatetimeExtended
                value={startDatetime}
                dateFormat="YYYY MMMM Do"
                timeFormat={false}
                locale="de"
                onChange={onStartDatetimeChange}
                closeOnSelect={true}
              />
              -
              <DatetimeExtended
                value={endDatetime}
                dateFormat="YYYY MMMM Do"
                timeFormat={false}
                locale="de"
                onChange={onEndDatetimeChange}
                closeOnSelect={true}
              />
            </PeriodSec>

            <ContentsSec>
              <ContentRowCon>
                {membershipLogs && filteredMembershipLogs.length > 0 ? (
                  filteredMembershipLogs.map(
                    log =>
                      log && (
                        <ContentDataRow key={log.id}>
                          {log.status === "REGIST" ? (
                            <ContentStatus status="REGIST">등록</ContentStatus>
                          ) : log.status === "EXTENDED" ? (
                            <ContentStatus status="EXTENDED">
                              연장
                            </ContentStatus>
                          ) : log.status === "EXPIRED" ? (
                            <ContentStatus status="EXPIRED">만료</ContentStatus>
                          ) : (
                            ""
                          )}
                          <ContentValue>
                            등록일자 :{" "}
                            {moment(
                              new Date(log.updatedAt).toUTCString()
                            ).format("YYYY-MM-DD HH:mm:ss")}
                          </ContentValue>

                          <ContentValue>
                            {log.branch.name}{" "}
                            {log.target === "MEMBERSHIP"
                              ? "멤버쉽"
                              : log.target === "CABINET"
                              ? `${log.cabinet &&
                                  log.cabinet.cabinetNumber}번 사물함`
                              : ""}
                          </ContentValue>

                          <ContentValue>
                            {log.hours % 24 === 0
                              ? `${log.hours / 24}일`
                              : `${log.hours}시간`}
                          </ContentValue>
                          <ContentValue>
                            {`이용시작 : ${log.startDatetime}`}
                          </ContentValue>
                          <ContentValue>
                            {`이용만료 : ${log.endDatetime}`}
                          </ContentValue>
                          <ButtonContentValue>
                            {log.paymentId ? (
                              <ViewPayBtn
                                value={"결제기록"}
                                onClick={() => onPayViewBtnClick(log.paymentId)}
                              />
                            ) : (
                              <NoPayment> * 무결제</NoPayment>
                            )}
                          </ButtonContentValue>
                        </ContentDataRow>
                      )
                  )
                ) : (
                  <ContentDataRow>
                    <NoContentTitle>기록이 없습니다</NoContentTitle>
                  </ContentDataRow>
                )}
              </ContentRowCon>
            </ContentsSec>
          </MembershipLogSection>
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
