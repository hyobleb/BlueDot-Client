import React from "react";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import Loading from "src/Components/Loading";
import SearchUserPopUp from "src/Components/SearchUserPopUp";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

const BackContainer = styled.div``;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`;
const Section = styled.section``;
const HeadSection = styled(Section)`
  font-size: 20px;
`;
const MemberSection = styled(Section)`
  margin-top: 20px;
  margin-bottom: 40px;
`;
const MemberRow = styled.div``;
const MemberHeadRow = styled(MemberRow)`
  display: flex;
  align-items: center;
`;
const MemberHeadTitle = styled.div`
  flex-basis: 100px;
`;
const MemberHeadButtonContainer = styled.div``;
const Button = styled(SmallButton)`
  width: 30px;
  font-size: 12px;
`;
const EnrollButton = styled(Button)`
  background-color: ${props => props.theme.blueColor};
  margin-left: 20px;
`;
const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;
const MemberContentRow = styled(MemberRow)`
  border: 1px solid #dedede;
  padding: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  margin-top: 10px;
`;
const MemberContent = styled.div``;
const MemberList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dedede;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  brachEmployeeLoading: boolean;
  showUserSearchPopUp: boolean;
  branchName: string;
  closeSearchUserPopUp: () => void;
  onFranchiserEnrollClick: () => void;
  onUserClick: (userId: number) => Promise<void>;
  managers?: any;
  cleanStaffs?: any;
  managingStaffs?: any;
  delFranchiser: (userId: number) => Promise<void>;
  onSupervisorEnrollClick: () => void;
  delSupervisor: (userId: number) => Promise<void>;
  onCleanStaffEnrollClick: () => void;
  delCleanStaff: (userId: number) => Promise<void>;
  onManagingStaffEnrollClick: () => void;
  delManaingStaff: (userId: number) => Promise<void>;
}

const SettingStaffPresenter: React.SFC<IProps> = ({
  brachEmployeeLoading,
  branchName,
  showUserSearchPopUp,
  closeSearchUserPopUp,
  onFranchiserEnrollClick,
  onUserClick,
  managers,
  delFranchiser,
  cleanStaffs,
  managingStaffs,
  onSupervisorEnrollClick,
  delSupervisor,
  onCleanStaffEnrollClick,
  delCleanStaff,
  onManagingStaffEnrollClick,
  delManaingStaff
}) => (
  <BackContainer>
    <Helmet>
      <title>Setting-staff | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/branch-setting" />
    {brachEmployeeLoading ? (
      <Loading />
    ) : (
      <Container>
        <HeadSection>{branchName}</HeadSection>
        <MemberSection>
          <MemberHeadRow>
            <MemberHeadTitle>점주</MemberHeadTitle>
            <MemberHeadButtonContainer>
              <EnrollButton value={"등록"} onClick={onFranchiserEnrollClick} />
            </MemberHeadButtonContainer>
          </MemberHeadRow>
          <MemberContentRow>
            {managers.filter(manager => manager.isFranchiser).length > 0 ? (
              managers
                .filter(manager => manager.isFranchiser)
                .map(franchiser => (
                  <MemberList key={franchiser.id}>
                    <MemberContent>
                      {franchiser.name} {franchiser.phone}
                    </MemberContent>
                    <DeleteButton
                      value={"삭제"}
                      onClick={async () => await delFranchiser(franchiser.id)}
                    />
                  </MemberList>
                ))
            ) : (
              <MemberList>
                <MemberContent>현재 점주가 없습니다</MemberContent>
              </MemberList>
            )}
          </MemberContentRow>
        </MemberSection>

        <MemberSection>
          <MemberHeadRow>
            <MemberHeadTitle>슈퍼바이저</MemberHeadTitle>
            <MemberHeadButtonContainer>
              <EnrollButton value={"등록"} onClick={onSupervisorEnrollClick} />
            </MemberHeadButtonContainer>
          </MemberHeadRow>
          <MemberContentRow>
            {managers.filter(manager => manager.isSupervisor).length > 0 ? (
              managers
                .filter(manager => manager.isSupervisor)
                .map(supervisor => (
                  <MemberList key={supervisor.id}>
                    <MemberContent>
                      {supervisor.name} {supervisor.phone}
                    </MemberContent>
                    <DeleteButton
                      value={"삭제"}
                      onClick={async () => await delSupervisor(supervisor.id)}
                    />
                  </MemberList>
                ))
            ) : (
              <MemberList>
                <MemberContent>현재 슈퍼바이저가 없습니다</MemberContent>
              </MemberList>
            )}
          </MemberContentRow>
        </MemberSection>

        <MemberSection>
          <MemberHeadRow>
            <MemberHeadTitle>오픈 / 마감스탭</MemberHeadTitle>
            <MemberHeadButtonContainer>
              <EnrollButton value={"등록"} onClick={onCleanStaffEnrollClick} />
            </MemberHeadButtonContainer>
          </MemberHeadRow>
          <MemberContentRow>
            {cleanStaffs.length > 0 ? (
              cleanStaffs.map(cleanStaff => (
                <MemberList key={cleanStaff.id}>
                  <MemberContent>
                    {cleanStaff.name} {cleanStaff.phone}
                  </MemberContent>
                  <DeleteButton
                    value={"삭제"}
                    onClick={async () => await delCleanStaff(cleanStaff.id)}
                  />
                </MemberList>
              ))
            ) : (
              <MemberList>
                <MemberContent>현재 오픈/마감 스탭이 없습니다</MemberContent>
              </MemberList>
            )}
          </MemberContentRow>
        </MemberSection>

        <MemberSection>
          <MemberHeadRow>
            <MemberHeadTitle>관리 스탭</MemberHeadTitle>
            <MemberHeadButtonContainer>
              <EnrollButton
                value={"등록"}
                onClick={onManagingStaffEnrollClick}
              />
            </MemberHeadButtonContainer>
          </MemberHeadRow>
          <MemberContentRow>
            {managingStaffs.length > 0 ? (
              managingStaffs.map(managingStaff => (
                <MemberList key={managingStaff.id}>
                  <MemberContent>
                    {managingStaff.name} {managingStaff.phone}
                  </MemberContent>
                  <DeleteButton
                    value={"삭제"}
                    onClick={async () =>
                      await delManaingStaff(managingStaff.id)
                    }
                  />
                </MemberList>
              ))
            ) : (
              <MemberList>
                <MemberContent>관리 스탭이 없습니다</MemberContent>
              </MemberList>
            )}
          </MemberContentRow>
        </MemberSection>
      </Container>
    )}

    {showUserSearchPopUp ? (
      <SearchUserPopUp
        closeFunc={closeSearchUserPopUp}
        onUserClick={onUserClick}
      />
    ) : (
      ""
    )}
  </BackContainer>
);

export default SettingStaffPresenter;
