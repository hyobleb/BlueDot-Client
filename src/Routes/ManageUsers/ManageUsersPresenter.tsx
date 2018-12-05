import moment, { Moment } from "moment";
import React from "react";
import Datetime from "react-datetime";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import BranchSearchPopUp from "src/Components/BranchSearchPopUp";
import Loading from "src/Components/Loading";
import SearchUserPopUp from "src/Components/SearchUserPopUp";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { managerGetManagingBranches_GetManagingBranches_branches } from "src/types/api";

const BackContainer = styled.div``;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 100px;
`;
const Section = styled.section``;
const HeadButtonSection = styled(Section)`
  text-align: center;
`;
const Button = styled(SmallButton)`
  margin-left: 5px;
  margin-right: 5px;
`;
const SearchBranchButton = styled(Button)`
  background-color: ${props => props.theme.blueColor};
`;
const TotalBranchButton = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const BranchButton = styled(Button)`
  background-color: ${props => props.theme.blueColor};
`;

const BranchTitleSection = styled(Section)`
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
`;
const BranchTitle = styled.h1`
  font-size: 22px;
`;
const DatetimePicker = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const DatetimeExtended = styled(Datetime)`
  input {
    width: 100%;
    height: 35px;
    text-align: center;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.blueColor};
      color: white;
    }
  }
  .rdtPicker {
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
`;

const DateMemberSection = styled(Section)``;
const DatetimeSelRow = styled.div`
  margin-bottom: 5px;
`;
const DateMembersRow = styled.div``;
const RegistMembersContainer = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 50%;
  max-height: 300px;
  border: 2px solid #dedede;
  padding: 15px;
  border-radius: 5px;
`;
const RegistMemberList = styled.div`
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    background-color: ${props => props.theme.lightBlueColor};
    color: white;
  }
`;
const RegistMemberDataRow = styled.div``;
const RegistMemberDataCol = styled.div`
  padding: 5px 0;
  display: flex;
  font-size: 12px;
`;
const DataItemTitle = styled.div`
  width: 50px;
`;
const DataItemValue = styled.div`
  width: 200px;
`;
const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const StatusTitle = styled.div`
  width: 100%;
`;

const StatusDisplay = styled.div`
  padding: 10px;
  text-align: center;
`;

const RegistStatus = styled(StatusDisplay)`
  background-color: ${props => props.theme.greenColor};
  color: white;
`;

const ExtendStatus = styled(StatusDisplay)`
  background-color: ${props => props.theme.blueColor};
  color: white;
`;

const DatetimeModStatus = styled(StatusDisplay)`
  background-color: ${props => props.theme.orangeColor};
  color: white;
`;
const ExpireStatus = styled(StatusDisplay)`
  background-color: ${props => props.theme.greyColor};
  color: white;
`;
const TotalMembersSection = styled.div`
  margin-top: 20px;
`;
const TotalMembersHead = styled.div`
  margin-bottom: 10px;
`;
const TotalMembersBody = styled.div``;
const TotalMembersContainer = styled(RegistMembersContainer)``;
const TotalMemberList = styled(RegistMemberList)``;
const TotalMemberCol = styled(RegistMemberDataCol)``;

const UserSearchSection = styled(Section)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MoreInfoBtn = styled(Button)`
  width: 80%;
  min-width: 200px;
  max-width: 500px;
  padding: 15px 0;
  margin-bottom: 10px;
`;

const UserSearchButton = styled(MoreInfoBtn)`
  background-color: ${props => props.theme.orangeColor};
`;
const AnalysisButton = styled(MoreInfoBtn)`
  background-color: ${props => props.theme.pinkColor};
`;

const OfflineReqButton = styled(MoreInfoBtn)``;

interface IProps {
  selDate: Moment;
  onDatetimeChange: (datetimeValue: Moment) => void;
  membershipLogsByDate: any[];
  branchSearchPopupShow: boolean;
  toggleBranchPopUpShow: () => void;
  onBranchClick: (branchId: number) => void;
  membershipLogsLoading: boolean;
  usingUsersLoading: boolean;
  nowUsingUsers: any[];
  onAllBranchClick: () => void;
  toggleShowUserSearchPopUp: () => void;
  showUserSearchPopUp: boolean;
  onUserClick: (userId: number) => Promise<void>;
  branchName?: string;
  onChartBtnClick: () => void;
  onOfflineReqBtnClick: () => void;
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
  managingBranches?: Array<managerGetManagingBranches_GetManagingBranches_branches | null>;
  onBranchBtnClick: (branchId: number) => void;
  isManStaff: boolean;
  isCleanStaff: boolean;
}

const ManageUsersPresenter: React.SFC<IProps> = ({
  selDate,
  onDatetimeChange,
  membershipLogsByDate,
  branchSearchPopupShow,
  toggleBranchPopUpShow,
  onBranchClick,
  membershipLogsLoading,
  usingUsersLoading,
  nowUsingUsers,
  onAllBranchClick,
  toggleShowUserSearchPopUp,
  showUserSearchPopUp,
  onUserClick,
  branchName,
  onChartBtnClick,
  onOfflineReqBtnClick,
  isHead,
  isFranchiser,
  isSupervisor,
  managingBranches,
  onBranchBtnClick,
  isManStaff,
isCleanStaff
}) => (
  <BackContainer>
    <Helmet>
      <title>membership | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/home" />
    {membershipLogsLoading || usingUsersLoading ? (
      <Loading />
    ) : (
      <Container>
        <HeadButtonSection>
          {isHead && (
            <SearchBranchButton
              value={"지점 검색"}
              onClick={toggleBranchPopUpShow}
            />
          )}

          {isHead ? (
            <TotalBranchButton value={"전체 지점"} onClick={onAllBranchClick} />
          ) : (
            (isSupervisor || isFranchiser) &&
            managingBranches &&
            managingBranches.length >= 2 && (
              <TotalBranchButton
                value={"전체 지점"}
                onClick={onAllBranchClick}
              />
            )
          )}

          {managingBranches &&
            managingBranches.map(
              branch =>
                branch && (
                  <BranchButton
                    key={branch.id}
                    value={`${branch.name}`}
                    onClick={() => onBranchBtnClick(branch.id)}
                  />
                )
            )}
        </HeadButtonSection>
        <BranchTitleSection>
          <BranchTitle>{branchName ? branchName : "전체 지점"}</BranchTitle>
        </BranchTitleSection>
        <DateMemberSection>
          <DatetimeSelRow>
            <DatetimePicker>
              <DatetimeExtended
                value={selDate}
                dateFormat="YYYY년 MMMM Do"
                timeFormat={false}
                viewMode="days"
                closeOnSelect={true}
                onChange={onDatetimeChange}
              />
            </DatetimePicker>
          </DatetimeSelRow>
          <DateMembersRow>
            <RegistMembersContainer>
              {membershipLogsByDate.length
                ? membershipLogsByDate.map(membershipLog => {
                    return (
                      <RegistMemberList
                        key={membershipLog.id}
                        onClick={async () =>
                          await onUserClick(membershipLog.userId)
                        }
                      >
                        <RegistMemberDataRow>
                          <RegistMemberDataCol>
                            <StatusTitle>
                              {membershipLog.status === "REGIST" ? (
                                <RegistStatus>등록</RegistStatus>
                              ) : membershipLog.status === "EXTENDED" ? (
                                <ExtendStatus>연장</ExtendStatus>
                              ) : membershipLog.status ===
                                "DATETIME_MODIFIED" ? (
                                <DatetimeModStatus>수정</DatetimeModStatus>
                              ) : membershipLog.status === "EXPIRED" ? (
                                <ExpireStatus>만료</ExpireStatus>
                              ) : (
                                membershipLog.status
                              )}
                            </StatusTitle>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>지점 :</DataItemTitle>
                            <DataItemValue>
                              {membershipLog.branch.name}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>등록대상 :</DataItemTitle>
                            <DataItemValue>
                              {membershipLog.cabinetId ? "사물함" : "멤버쉽"}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          {membershipLog.cabinetId && (
                            <RegistMemberDataCol>
                              <DataItemTitle>사물함 :</DataItemTitle>
                              <DataItemValue>
                                {membershipLog.cabinet.cabinetNumber}번
                              </DataItemValue>
                            </RegistMemberDataCol>
                          )}

                          <RegistMemberDataCol>
                            <DataItemTitle>이름 :</DataItemTitle>
                            <DataItemValue>
                              {membershipLog.user.name}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>아이디 :</DataItemTitle>
                            <DataItemValue>
                              {membershipLog.user.userId}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>전화번호 :</DataItemTitle>
                            <DataItemValue>
                              {membershipLog.user.phoneNumber}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>생년월일 :</DataItemTitle>
                            <DataItemValue>
                              {moment()
                                .set("year", membershipLog.user.birthYear)
                                .set("month", membershipLog.user.birthMonth - 1)
                                .set("date", membershipLog.user.birthDay)
                                .format("YYYY-MM-DD")}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>등록일시 :</DataItemTitle>
                            <DataItemValue>
                              {moment(
                                new Date(membershipLog.createdAt).toUTCString()
                              ).format("YYYY-MM-DD HH:mm:ss")}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>시작 :</DataItemTitle>
                            <DataItemValue>
                              {membershipLog.startDatetime}
                            </DataItemValue>
                          </RegistMemberDataCol>
                          <RegistMemberDataCol>
                            <DataItemTitle>종료 :</DataItemTitle>
                            <DataItemValue>
                              {membershipLog.endDatetime}
                            </DataItemValue>
                          </RegistMemberDataCol>
                        </RegistMemberDataRow>
                      </RegistMemberList>
                    );
                  })
                : "해당 날짜의 등록자가 없습니다"}
            </RegistMembersContainer>
          </DateMembersRow>
        </DateMemberSection>
        <TotalMembersSection>
          <TotalMembersHead>전체 회원</TotalMembersHead>
          <TotalMembersBody>
            <TotalMembersContainer>
              {nowUsingUsers.length
                ? nowUsingUsers.map(user => (
                    <TotalMemberList
                      key={user.id}
                      onClick={() => onUserClick(user.id)}
                    >
                      <TotalMemberCol>
                        <DataItemTitle>이름 :</DataItemTitle>
                        <DataItemValue>{user.name}</DataItemValue>
                      </TotalMemberCol>
                      <TotalMemberCol>
                        <DataItemTitle>생년월일 :</DataItemTitle>
                        <DataItemValue>
                          {moment()
                            .set("year", user.birthYear)
                            .set("month", user.birthMonth - 1)
                            .set("date", user.birthDay)
                            .format("YYYY-MM-DD")}
                        </DataItemValue>
                      </TotalMemberCol>
                      <TotalMemberCol>
                        <DataItemTitle>아이디 :</DataItemTitle>
                        <DataItemValue>{user.userId}</DataItemValue>
                      </TotalMemberCol>
                      <TotalMemberCol>
                        <DataItemTitle>전화번호 :</DataItemTitle>
                        <DataItemValue>{user.phoneNumber}</DataItemValue>
                      </TotalMemberCol>
                    </TotalMemberList>
                  ))
                : "현재 회원이 없습니다"}
            </TotalMembersContainer>
          </TotalMembersBody>
        </TotalMembersSection>
        <UserSearchSection>
          <UserSearchButton
            value={"사용자 검색"}
            onClick={toggleShowUserSearchPopUp}
          />
          <AnalysisButton
            value={"통계 보기"}
            onClick={() => onChartBtnClick()}
          />
          <OfflineReqButton
            value={"오프라인 가입자"}
            onClick={onOfflineReqBtnClick}
          />
        </UserSearchSection>
      </Container>
    )}

    {branchSearchPopupShow && (
      <BranchSearchPopUp
        closeFunc={toggleBranchPopUpShow}
        onBranchClick={onBranchClick}
      />
    )}
    {showUserSearchPopUp && (
      <SearchUserPopUp
        closeFunc={toggleShowUserSearchPopUp}
        onUserClick={onUserClick}
      />
    )}
  </BackContainer>
);

export default ManageUsersPresenter;
