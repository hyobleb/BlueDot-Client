import React from "react";
import BranchSearchPopUp from "src/Components/BranchSearchPopUp";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import LoungeContainer from "src/Components/LoungeContainer";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  getBranchForManSeat_GetBranchForManSeat_branch_rooms,
  getManaingBranches_GetManagingBranches_branches,
  getSeatsV2_GetSeatsV2_seats
} from "src/types/api";
import RoomPopUp from "../../Components/RoomPopUp";

const Back = styled(DefaultBack)``;
const Section = styled.section``;
const HeadSection = styled(Section)`
  text-align: center;
`;
const LoungeTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;
const LoungeSection = styled(Section)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const LoungeCol = styled.div`
  width: 100%;
`;
const Button = styled(SmallButton)``;
const BranchSearchBtn = styled(Button)``;
const BranchBtn = styled(Button)`
  margin-left: 3px;
  margin-right: 3px;
`;

interface IProps {
  showBranchSearchPopUp: boolean;
  toggleSearchBranchPopUpShow: () => void;
  onBranchClick: (branchId: number) => void;
  getBranchLoading: boolean;
  selBranchId: number;
  loungeImage: string;
  minimapImage: string;
  rooms: [getBranchForManSeat_GetBranchForManSeat_branch_rooms] | null;
  branchName: string;
  onRoomClick: (roomId: number) => void;
  nowRoomId: number;
  onSeatsPopUpCloseClick: () => void;
  onSeatClick: (seatId: number) => Promise<void>;
  onEntranceClick: () => void;
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
  managingBranches?: Array<getManaingBranches_GetManagingBranches_branches | null>;
  onBranchBtnClick: (branchId: number) => void;
  isManStaff: boolean;
  isCleanStaff: boolean;
  seats: Array<getSeatsV2_GetSeatsV2_seats | null> | null;
  getSeatsLoading: boolean;
}

const ManageSeatsPresenter: React.SFC<IProps> = ({
  showBranchSearchPopUp,
  toggleSearchBranchPopUpShow,
  onBranchClick,
  getBranchLoading,
  selBranchId,
  loungeImage,
  minimapImage,
  rooms,
  branchName,
  onRoomClick,
  nowRoomId,
  onSeatsPopUpCloseClick,
  onSeatClick,
  onEntranceClick,
  isHead,
  isFranchiser,
  isSupervisor,
  managingBranches,
  onBranchBtnClick,
  isManStaff,
  isCleanStaff,
  seats,
  getSeatsLoading
}) => (
  <Back title={"manage-seats"} backUrl={"/"}>
    <HeadSection>
      {(isHead && (
        <BranchSearchBtn
          value={"지점 검색"}
          onClick={toggleSearchBranchPopUpShow}
        />
      )) ||
        ((isSupervisor || isFranchiser || isManStaff || isCleanStaff) &&
          managingBranches &&
          managingBranches.map(
            branch =>
              branch && (
                <BranchBtn
                  key={branch.id}
                  value={branch.name}
                  onClick={() => onBranchBtnClick(branch.id)}
                />
              )
          ))}
    </HeadSection>

    {Boolean(selBranchId) && getBranchLoading && <Loading />}

    {(!getBranchLoading &&
      (!selBranchId &&
        (isHead && <LoungeSection>지점을 검색해주세요</LoungeSection>))) ||
      ((isSupervisor || isFranchiser || isManStaff) && !selBranchId && (
        <LoungeSection>지점을 클릭해주세요</LoungeSection>
      ))}

    {!getBranchLoading && Boolean(selBranchId) && (
      <LoungeSection>
        <LoungeTitle>
          선택하신 지점은 {branchName}
          입니다
        </LoungeTitle>
        <LoungeCol>
          <LoungeContainer
            imgUrl={loungeImage}
            showTempRoom={false}
            rooms={rooms}
            minimapImg={minimapImage}
            onRoomClick={onRoomClick}
          />
        </LoungeCol>
      </LoungeSection>
    )}

    {showBranchSearchPopUp && (
      <BranchSearchPopUp
        closeFunc={toggleSearchBranchPopUpShow}
        onBranchClick={onBranchClick}
      />
    )}
    {nowRoomId > 0 && (
      <RoomPopUp
        closeFunc={onSeatsPopUpCloseClick}
        roomId={nowRoomId}
        onSeatClick={onSeatClick}
        onEntranceClick={onEntranceClick}
        title={"관리할 좌석을 클릭해주세요"}
        seats={seats}
        getSeatsLoading={getSeatsLoading}
        forAdmin={true}
      />
    )}
  </Back>
);

export default ManageSeatsPresenter;

// <SeatBox
// roomId={roomId}
// forAdmin={forAdmin}
// onSeatClick={onSeatClick}
// onDoorClick={onEntranceClick}

// tempSeatNumber={seatNumber}
// seats={seats}
// getSeatsLoading={Boolean(
//   (getSeatsLoading && (selSeatId || selDoorId)) || updateSeatLoading
// )}
// />
