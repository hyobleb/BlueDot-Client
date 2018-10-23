import React from "react";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import Loading from "src/Components/Loading";
import { cabinetLockMode } from "src/Components/shareOptions";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { managerGetCablocks } from "src/types/api";
import CabLockPopUp from "../../Components/CabLockPopUp";

const BackContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;
const Section = styled.div``;
const HeadSection = styled(Section)`
  margin-bottom: 10px;
`;
const BodySection = styled(Section)``;
const RowContainer = styled.div``;
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 13px;
  padding: 10px 0;
  text-align: center;
  align-items: center;
`;
const TitleRow = styled(Row)`
  background-color: ${props => props.theme.lightBlueColor};
  color: white;
`;
const DataRow = styled(Row)``;
const CabNumCol = styled.div`
  width: 70px;
`;
const LockNumCol = styled.div`
  width: 70px;
`;
const PasswordCol = styled.div`
  width: 55px;
`;
const ButtonCol = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
`;
const LockButton = styled(SmallButton)`
  width: 30px;
  font-size: 12px;
  margin-left: 3px;
  margin-right: 3px;
`;
const ModifyButton = styled(LockButton)`
  background-color: ${props => props.theme.greenColor};
  color: white;
`;
const DelButton = styled(LockButton)`
  background-color: ${props => props.theme.redColor};
  color: white;
`;
const AddButton = styled(LockButton)`
  width: 100px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  popUpShow: boolean;
  togglePopUpShow: () => void;
  addButtonClick: () => void;
  branchId: number;
  lockDatas?: managerGetCablocks;
  lockDatasLoading: boolean;
  onRemoveClick: (lockId: number) => Promise<void>;
  onModifyClick: (lockId: number) => Promise<void>;
  cabinetNumber?: number;
  lockNumber?: number;
  lockPassword?: string;
  cabinetId?: number;
  lockId?: number;
}

const SettingCabLockPresenter: React.SFC<IProps> = ({
  popUpShow,
  togglePopUpShow,
  addButtonClick,
  branchId,
  lockDatas,
  lockDatasLoading,
  onRemoveClick,
  onModifyClick,
  cabinetNumber,
  lockNumber,
  lockPassword,
  lockId
}) => {
  return lockDatasLoading ? (
    <Loading />
  ) : (
    <BackContainer>
      <Helmet>
        <title>Setting-CabLock | BlueDot</title>
      </Helmet>
      <BackArrowExtended backTo="/branch-setting" />
      <Container>
        <HeadSection>
          <AddButton value={"자물쇠 추가"} onClick={addButtonClick} />
        </HeadSection>
        <BodySection>
          <RowContainer>
            <TitleRow>
              <CabNumCol>사물함 번호</CabNumCol>
              <LockNumCol>자물쇠 번호</LockNumCol>
              <PasswordCol>비밀번호</PasswordCol>
              <ButtonCol>수정 / 삭제</ButtonCol>
            </TitleRow>
          </RowContainer>
          {lockDatas &&
            lockDatas.ManagerGetCabinetLocks &&
            lockDatas.ManagerGetCabinetLocks.cabinetLocks &&
            lockDatas.ManagerGetCabinetLocks.cabinetLocks.map(
              lock =>
                lock && (
                  <RowContainer key={lock.id}>
                    <DataRow>
                      <CabNumCol>
                        {lock.cabinet && lock.cabinet.cabinetNumber}
                      </CabNumCol>
                      <LockNumCol>{lock.lockNumber}</LockNumCol>
                      <PasswordCol>{lock.password}</PasswordCol>
                      <ButtonCol>
                        <ModifyButton
                          value={"수정"}
                          onClick={() => onModifyClick(lock.id)}
                        />
                        <DelButton
                          value={"삭제"}
                          onClick={() => onRemoveClick(lock.id)}
                        />
                      </ButtonCol>
                    </DataRow>
                  </RowContainer>
                )
            )}
        </BodySection>
      </Container>
      {popUpShow ? (
        lockId ? (
          <CabLockPopUp
            title={"자물쇠 수정"}
            closeFunc={togglePopUpShow}
            branchId={branchId}
            mode={cabinetLockMode.MODIFY}
            lockId={lockId}
            cabinetNumber={cabinetNumber}
            lockNumber={lockNumber}
            lockPassword={lockPassword}
          />
        ) : (
          <CabLockPopUp
            title={"자물쇠 추가"}
            closeFunc={togglePopUpShow}
            branchId={branchId}
            mode={cabinetLockMode.CREATE}
          />
        )
      ) : (
        ""
      )}
    </BackContainer>
  );
};

export default SettingCabLockPresenter;
