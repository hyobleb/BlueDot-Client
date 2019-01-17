import moment from "moment-timezone";
import { Moment } from "moment-timezone";
// import moment, { Moment } from "moment";
import React from "react";
import Datetime from "react-datetime";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import SearchUserPopUp from "src/Components/SearchUserPopUp";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { managerGetSeatLogs_ManagerGetSeatLogs_seat } from "src/types/api";

const Back = styled(DefaultBack)``;
const Section = styled.section``;
const TitleSection = styled(Section)`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;
const PeriodBtnSection = styled(Section)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const Button = styled(SmallButton)``;
const PeriodBtn = styled(Button)`
  margin: 0 2px;
  font-size: 12px;
`;

const PeriodCalendarSection = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
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

const InqueryBtn = styled(Button)`
  margin-left: 10px;
  font-size: 12px;
  width: 20px;
`;

const LogsSection = styled(Section)``;
const LogsContainer = styled.div``;
const ActionBtnSection = styled(Section)`
  text-align: center;
  margin-top: 20px;
`;
const LogsRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:nth-child(2n) {
    background-color: #dedede;
  }
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.greyColor};
    color: white;
  }
`;
const LogsRowCon = styled.div``;
const LogsTitleRowCon = styled(LogsRowCon)`
  background-color: ${props => props.theme.lightBlueColor};
  color: white;
`;
const LogsBodyRowCon = styled(LogsRowCon)`
  max-height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
`;
const LogsTitleRow = styled(LogsRow)``;
const LogsCol = styled.div`
  text-align: center;
  padding: 5px 0;
`;
const DatetimeCol = styled(LogsCol)`
  flex-basis: 60%;
`;
const NameCol = styled(LogsCol)`
  flex-basis: 20%;
`;
const ActionCol = styled(LogsCol)`
  flex-basis: 20%;
`;
const ReturnBtn = styled(Button)``;
const AssignBtn = styled(Button)``;
const NoDataText = styled.div`
  padding: 15px 0;
`;

interface IProps {
  startDatetime: Moment;
  endDatetime: Moment;
  onBackClick: () => void;
  onStartDatetimeChange: (startDatetimeValue: Moment) => void;
  onEndDatetimeChange: (endDatetimeValue: Moment) => void;
  seatLogsLoading: boolean;
  seatLogs: any[];
  onLogClick: (userId: number) => void;
  seat?: managerGetSeatLogs_ManagerGetSeatLogs_seat;
  onPeriodBtnClick: (days: number) => void;
  toggleShowSearchUserPopUp: () => void;
  showSearchUserPopUp: boolean;
  onUserClick: (userId: number) => Promise<void>;
  onReturnClick: () => Promise<void>;
}

const ManageSeatPresenter: React.SFC<IProps> = ({
  startDatetime,
  endDatetime,
  onBackClick,
  onStartDatetimeChange,
  onEndDatetimeChange,
  seatLogsLoading,
  seatLogs,
  onLogClick,
  seat,
  onPeriodBtnClick,
  toggleShowSearchUserPopUp,
  showSearchUserPopUp,
  onUserClick,
  onReturnClick
}) => (
  <Back title={"manage-seat"} backFn={onBackClick}>
    {seatLogsLoading ? (
      <Loading />
    ) : (
      <>
        <TitleSection>
          {seat && seat.branch.name} {seat && seat.seatNumber}번 좌석
        </TitleSection>
        <PeriodBtnSection>
          <PeriodBtn value={"오늘"} onClick={() => onPeriodBtnClick(0)} />
          <PeriodBtn value={"일주일"} onClick={() => onPeriodBtnClick(7)} />
          <PeriodBtn value={"1개월"} onClick={() => onPeriodBtnClick(30)} />
          <PeriodBtn value={"3개월"} onClick={() => onPeriodBtnClick(90)} />
          <PeriodBtn value={"6개월"} onClick={() => onPeriodBtnClick(180)} />
        </PeriodBtnSection>
        <PeriodCalendarSection>
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
          <InqueryBtn value={"조회"} />
        </PeriodCalendarSection>
        <LogsSection>
          <LogsContainer>
            <LogsTitleRowCon>
              <LogsTitleRow>
                <DatetimeCol>처리 일시</DatetimeCol>
                <NameCol>이름</NameCol>
                <ActionCol>처리</ActionCol>
              </LogsTitleRow>
            </LogsTitleRowCon>
            <LogsBodyRowCon>
              {seatLogs.length > 0 ? (
                seatLogs.map(log => {
                  const updatedAt = log.updatedAt;
                  console.log({ updatedAt });
                  const updatedDate = new Date(updatedAt);
                  console.log({ updatedDate });
                  const utcString = updatedDate.toUTCString();
                  console.log({ utcString });

                  const momentVal = moment(utcString)
                    .tz("Asia/Seoul")
                    .format("YYYY-MM-DD HH:mm:ss");
                  return (
                    <LogsRow
                      key={log.id}
                      onClick={() => onLogClick(log.user.id)}
                    >
                      <DatetimeCol>
                        {/* {moment(new Date(log.updatedAt).toUTCString()).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )} */}
                        {momentVal}
                      </DatetimeCol>
                      <NameCol>{log.user.name}</NameCol>
                      <ActionCol>
                        {log.status === "ASSIGN"
                          ? "배정"
                          : log.status === "RETURN"
                          ? "반납"
                          : ""}
                      </ActionCol>
                    </LogsRow>
                  );
                })
              ) : (
                <NoDataText>좌석 이용 기록이 없습니다</NoDataText>
              )}
            </LogsBodyRowCon>
          </LogsContainer>
        </LogsSection>
        <ActionBtnSection>
          {seatLogs.length > 0 &&
          (seatLogs[0].status === "ASSIGN" &&
            moment(seatLogs[0].endDatetime) > moment()) ? (
            <ReturnBtn value={"반납"} onClick={onReturnClick} />
          ) : (
            <AssignBtn value={"배정"} onClick={toggleShowSearchUserPopUp} />
          )}
        </ActionBtnSection>
      </>
    )}

    {showSearchUserPopUp ? (
      <SearchUserPopUp
        closeFunc={toggleShowSearchUserPopUp}
        onUserClick={onUserClick}
      />
    ) : (
      ""
    )}
  </Back>
);

export default ManageSeatPresenter;
