import React from "react";
import BranchSearchPopUp from "src/Components/BranchSearchPopUp";
import CabinetDisplay from "src/Components/CabinetDisplay";
import CabinetSetsContainer from "src/Components/CabinetSetsContainer";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  getBranchForEnrollCabinet_UserGetBranch_branch,
  managerGetManagingBranches_GetManagingBranches_branches
} from "src/types/api";

const Back = styled(DefaultBack)``;
const Section = styled.section``;
const HeadSection = styled(Section)``;
const LoungeTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const LoungeSection = styled(Section)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoungeCol = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
const Button = styled(SmallButton)``;
const BranchSearchBtn = styled(Button)`
  width: 150px;
`;

const SetTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SetTitleItem = styled.div`
  border: 1px solid #dedede;
  padding: 10px;
  width: 100px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.blueColor};
    color: white;
  }
`;

const CabinetDisplayTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
`;
const BranchBtn = styled(Button)`
  font-size: 13px;
  width: 140px;
  margin-left: 3px;
  margin-right: 3px;
`;

interface IProps {
  showBranchSearchPopUp: boolean;
  toggleSearchBranchPopUpShow: () => void;
  branch?: getBranchForEnrollCabinet_UserGetBranch_branch;
  selBranchId: number;
  getBranchLoading: boolean;
  onBranchClick: (branchId: number) => void;
  tempSetId: number;
  selSetId: number;
  onSetHover: (setId: number) => void;
  onSetHoverOut: () => void;
  onSetClick: (selSetId: number) => void;
  cabinets: any;
  horizontalNumber: number;
  onCabinetClick: (cabinetId: number) => void;
  cabinetNumber: number;
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
  managingBranches?: Array<managerGetManagingBranches_GetManagingBranches_branches | null>;
  isManStaff: boolean;
  isCleanStaff: boolean;
  verticalNumber: number;
}

const ManageCabinetsPresenter: React.SFC<IProps> = ({
  showBranchSearchPopUp,
  toggleSearchBranchPopUpShow,
  selBranchId,
  getBranchLoading,
  branch,
  onBranchClick,
  tempSetId,
  selSetId,
  onSetHover,
  onSetHoverOut,
  onSetClick,
  cabinets,
  horizontalNumber,
  onCabinetClick,
  cabinetNumber,
  isHead,
  isFranchiser,
  isSupervisor,
  managingBranches,
  isManStaff,
  isCleanStaff,
  verticalNumber
}) => (
  <Back title={"manage-cabinets"} backUrl={"/"}>
    <HeadSection>
      {isHead && (
        <BranchSearchBtn
          value={"지점 검색"}
          onClick={toggleSearchBranchPopUpShow}
        />
      )}
      {(isSupervisor || isFranchiser || isManStaff || isCleanStaff) &&
        managingBranches &&
        managingBranches.map(
          managingBanch =>
            managingBanch && (
              <BranchBtn
                key={managingBanch.id}
                value={managingBanch.name}
                onClick={() => {
                  onBranchClick(managingBanch.id);
                }}
              />
            )
        )}
    </HeadSection>
    {getBranchLoading ? (
      selBranchId ? (
        <Loading />
      ) : (
        isHead && <LoungeSection>지점을 검색해주세요</LoungeSection>
      )
    ) : (
      <LoungeSection>
        {branch && branch.cabinetSets ? (
          <>
            <LoungeTitle>
              선택하신 지점은 {branch.name}
              입니다
            </LoungeTitle>
            <LoungeCol>
              <CabinetSetsContainer
                imgUrl={branch.cabinetLoungeImage}
                showTempCabinetSet={false}
                cabinetSets={branch.cabinetSets}
                tempSelCabinetSetId={tempSetId}
                selectedCabinetId={selSetId}
                onCabinetSetHover={onSetHover}
                onCabinetSetHoverOut={onSetHoverOut}
                onCabinetSetClick={onSetClick}
              />
              <SetTitleContainer>
                {branch.cabinetSets.map(
                  set =>
                    set && (
                      <SetTitleItem
                        key={set.id}
                        style={{
                          backgroundColor:
                            tempSetId === set.id
                              ? "#1abc9c"
                              : selSetId === set.id
                              ? "#1abc9c"
                              : "",
                          color:
                            tempSetId === set.id
                              ? "white"
                              : selSetId === set.id
                              ? "white"
                              : ""
                        }}
                        onClick={() => onSetClick(set.id)}
                        onMouseOver={() => onSetHover(set.id)}
                        onMouseLeave={onSetHoverOut}
                      >
                        {set.title}
                      </SetTitleItem>
                    )
                )}
              </SetTitleContainer>
              {cabinets ? (
                <>
                  <CabinetDisplayTitle>
                    사물함을 선택해주세요!
                  </CabinetDisplayTitle>
                  <CabinetDisplay
                    cabinets={cabinets}
                    verticalNumber={verticalNumber}
                    onCabinetClick={onCabinetClick}
                    isMan={true}
                  />
                </>
              ) : (
                ""
              )}{" "}
            </LoungeCol>
          </>
        ) : (
          ""
        )}
      </LoungeSection>
    )}
    {showBranchSearchPopUp && (
      <BranchSearchPopUp
        closeFunc={toggleSearchBranchPopUpShow}
        onBranchClick={onBranchClick}
      />
    )}
  </Back>
);

export default ManageCabinetsPresenter;
