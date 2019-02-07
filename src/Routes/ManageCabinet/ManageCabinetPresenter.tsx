import moment from "moment";
import React from "react";
import AlertPopUp from "src/Components/AlertPopUp";
import BranchSearchPopUp from "src/Components/BranchSearchPopUp";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import SearchUserPopUp from "src/Components/SearchUserPopUp";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet } from "src/types/api";
import DatetimePicker from "../../Components/DatetimePicker";

const Back = styled(DefaultBack)``;

const Section = styled.section``;
const TitleSec = styled(Section)`
  font-size: 21px;
  text-align: center;
`;
const NowUserSec = styled(Section)`
  margin-top: 20px;
  border: 1px solid #dedede;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`;
const NoUserTitle = styled.div`
  text-align: center;
`;
const ButtonSec = styled(Section)`
  text-align: center;
  margin-bottom: 10px;
`;
const Button = styled(SmallButton)``;

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
const ContentsSec = styled(Section)``;
const ContentRow = styled.div`
  justify-content: center;
  display: flex;
  font-size: 13px;
`;
const ContentCon = styled.div``;
const TopRowCon = styled(ContentCon)``;
const ContentRowCon = styled(ContentCon)`
  max-height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;
const ContentTopRow = styled(ContentRow)`
  background-color: ${props => props.theme.lightBlueColor};
  color: white;
`;
const ContentDataRow = styled(ContentRow)`
  &:nth-child(2n) {
    background-color: #dedede;
  }
  text-align: center;
`;
const ContentCol = styled.div`
  text-align: center;
  padding: 5px 0;
`;
const DatetimeCol = styled(ContentCol)`
  flex-basis: 60%;
`;
const NameCol = styled(ContentCol)`
  flex-basis: 20%;
`;
const ActionCol = styled(ContentCol)`
  flex-basis: 20%;
`;
const EnrollBtnSec = styled(Section)`
  text-align: center;
  margin-top: 30px;
`;
const EnrollBtn = styled(Button)``;

const NoContentTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NowUserCon = styled.div``;
const NowUserTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;
const NowUserContent = styled.div``;
const NowUserRow = styled.div`
  background-color: #dedede;
  margin-bottom: 10px;
  padding: 10px;
  margin-left: 10px;
  &:nth-child(1) {
    box-shadow: -10px 0px ${props => props.theme.orangeColor};
  }
  &:nth-child(2) {
    box-shadow: -10px 0px ${props => props.theme.lightBlueColor};
  }
  &:nth-child(3) {
    box-shadow: -10px 0px ${props => props.theme.purpleColor};
  }
  &:nth-child(4) {
    box-shadow: -10px 0px ${props => props.theme.pinkColor};
  }
`;
const NowUserRowTitle = styled.div`
  font-size: 10px;
  color: ${props => props.theme.lightBlueColor};
  margin-bottom: 5px;
`;
const NowUserRowVal = styled.div``;
const NowUserBtnCon = styled.div`
  display: flex;
  justify-content: center;
`;
const CabButton = styled(Button)`
  margin: 0 2px;
`;

const ExtBtn = styled(CabButton)`
  background-color: ${props => props.theme.greenColor};
`;
const ExpBtn = styled(CabButton)`
  background-color: ${props => props.theme.redColor};
`;
const SftBtn = styled(CabButton)`
  background-color: ${props => props.theme.orangeColor};
`;

const ClrBtn = styled(CabButton)`
  background-color: ${props => props.theme.lightBlueColor};
`;
// const ModBtn = styled(CabButton)`
//   background-color: ${props => props.theme.lightBlueColor};
// `;

interface IProps {
  endDatetime: Date;
  startDatetime: Date;
  onStartDatetimeChange: (startDatetimeValue: Date) => void;
  onEndDatetimeChange: (endDatetimeValue: Date) => void;
  onBackClick: () => void;
  cabinetLogs?: any;
  getCabinetLogsLoading: boolean;
  branchName: string;
  onPeriodBtnClick: (hours: number) => void;
  cabinet?: managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet;
  showUserSearchPopUp: boolean;
  toggleShowUserSearchPopUp: () => void;
  onUserClick: (userId: number) => Promise<void>;
  onExtendBtnClick: () => void;
  showExpireConfirmPopUp: boolean;
  toggleShowExpireConfirmPopUp: () => void;
  expireCabinet: () => Promise<void>;
  toggleShowBranchSearchPopUp: () => void;
  showBranchSearchPopUp: boolean;
  onBranchClick: (branchId: number) => void;
  showClearConfirmPopUp: boolean;
  toggleShowClearConfirmPopUp: () => void;
  onClearCabinetClick: () => Promise<void>;
}

const ManageCabinetPresenter: React.SFC<IProps> = ({
  endDatetime,
  startDatetime,
  onStartDatetimeChange,
  onEndDatetimeChange,
  onBackClick,
  cabinetLogs,
  getCabinetLogsLoading,
  branchName,
  onPeriodBtnClick,
  cabinet,
  showUserSearchPopUp,
  toggleShowUserSearchPopUp,
  onUserClick,
  onExtendBtnClick,
  showExpireConfirmPopUp,
  toggleShowExpireConfirmPopUp,
  expireCabinet,
  toggleShowBranchSearchPopUp,
  showBranchSearchPopUp,
  onBranchClick,
  showClearConfirmPopUp,
  toggleShowClearConfirmPopUp,
  onClearCabinetClick
}) => (
  <Back title={"manage-cabinet"} backFn={onBackClick}>
    {getCabinetLogsLoading ? (
      <Loading />
    ) : (
      cabinet && (
        <>
          <TitleSec>
            {branchName} {cabinet.cabinetNumber}번 사물함
          </TitleSec>
          <NowUserSec>
            {(cabinet.endDatetime && cabinet.nowUsing && cabinet.user && (
              <NowUserCon>
                <NowUserTitle>현재 이용자 정보</NowUserTitle>
                <NowUserContent>
                  <NowUserRow>
                    <NowUserRowTitle>이용자 이름</NowUserRowTitle>
                    <NowUserRowVal>{cabinet.user.name}</NowUserRowVal>
                  </NowUserRow>
                  <NowUserRow>
                    <NowUserRowTitle>등록일시</NowUserRowTitle>
                    <NowUserRowVal>
                      {moment(new Date(cabinet.updatedAt).toUTCString()).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </NowUserRowVal>
                  </NowUserRow>
                  <NowUserRow>
                    <NowUserRowTitle>시작일시</NowUserRowTitle>
                    <NowUserRowVal>{cabinet.startDatetime}</NowUserRowVal>
                  </NowUserRow>
                  <NowUserRow>
                    <NowUserRowTitle>종료일시</NowUserRowTitle>
                    <NowUserRowVal>{cabinet.endDatetime}</NowUserRowVal>
                  </NowUserRow>
                </NowUserContent>
                <NowUserBtnCon>
                  <ExtBtn value={"연장"} onClick={onExtendBtnClick} />
                  {moment(cabinet.endDatetime) >= moment() && (
                    <ExpBtn
                      value={"만료"}
                      onClick={toggleShowExpireConfirmPopUp}
                    />
                  )}
                  {moment(cabinet.endDatetime) < moment() && (
                    <ClrBtn
                      value={"정리"}
                      onClick={toggleShowClearConfirmPopUp}
                    />
                  )}

                  <SftBtn
                    value={"이동"}
                    onClick={toggleShowBranchSearchPopUp}
                  />
                  {/* <ModBtn value={"수정"} /> */}
                </NowUserBtnCon>
              </NowUserCon>
            )) ||
              (cabinet.reservedDatetime &&
                moment(cabinet.reservedDatetime) > moment() &&
                cabinet.nowUsing &&
                "현재 예약자가 있습니다") || (
                <>
                  <NoUserTitle>현재 이용자가 없습니다</NoUserTitle>
                  <EnrollBtnSec>
                    <EnrollBtn
                      value={"등록"}
                      onClick={toggleShowUserSearchPopUp}
                    />
                  </EnrollBtnSec>
                </>
              )}
          </NowUserSec>
          <ButtonSec>
            <PeriodButton value={"오늘"} onClick={() => onPeriodBtnClick(0)} />
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
            <DatetimePicker
              flatPickrDate={startDatetime}
              onFlatPickrChange={onStartDatetimeChange}
              dateFormat={"Y년 m월 d일"}
              enableTime={false}
            />
            -
            <DatetimePicker
              flatPickrDate={endDatetime}
              onFlatPickrChange={onEndDatetimeChange}
              dateFormat={"Y년 m월 d일"}
              enableTime={false}
            />
          </PeriodSec>
          <ContentsSec>
            <TopRowCon>
              <ContentTopRow>
                <DatetimeCol>처리일시</DatetimeCol>
                <NameCol>이름</NameCol>
                <ActionCol>처리</ActionCol>
              </ContentTopRow>
            </TopRowCon>
            <ContentRowCon>
              {cabinetLogs.length > 0 ? (
                cabinetLogs.map(log => (
                  <ContentDataRow key={log.id}>
                    <DatetimeCol>
                      {moment(new Date(log.updatedAt).toUTCString()).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </DatetimeCol>
                    <NameCol>{log.user.name}</NameCol>
                    <ActionCol>
                      {log.status === "REGIST"
                        ? "등록"
                        : log.status === "EXTENDED"
                        ? "연장"
                        : log.status === "EXPIRED"
                        ? "만료"
                        : log.status === "CABINET_SHIFT"
                        ? "이동"
                        : ""}
                    </ActionCol>
                  </ContentDataRow>
                ))
              ) : (
                <ContentDataRow>
                  <NoContentTitle>기록이 없습니다</NoContentTitle>
                </ContentDataRow>
              )}
            </ContentRowCon>
          </ContentsSec>
        </>
      )
    )}
    {showUserSearchPopUp ? (
      <SearchUserPopUp
        closeFunc={toggleShowUserSearchPopUp}
        onUserClick={onUserClick}
      />
    ) : (
      ""
    )}

    {showExpireConfirmPopUp ? (
      <AlertPopUp
        closeFunc={toggleShowExpireConfirmPopUp}
        message={"해당 사물함을 만료시키시겠습니까?"}
        onOkClick={expireCabinet}
      />
    ) : (
      ""
    )}
    {showBranchSearchPopUp ? (
      <BranchSearchPopUp
        closeFunc={toggleShowBranchSearchPopUp}
        onBranchClick={onBranchClick}
        title={"이동할 지점 선택하기"}
      />
    ) : (
      ""
    )}

    {showClearConfirmPopUp ? (
      <AlertPopUp
        closeFunc={toggleShowClearConfirmPopUp}
        message={"해당 사물함을 정리하겠습니까?"}
        onOkClick={onClearCabinetClick}
      />
    ) : (
      ""
    )}
  </Back>
);
export default ManageCabinetPresenter;
