import React from "react";
import Helmet from "react-helmet";
import CabinetSetsContainer from "src/Components/CabinetSetsContainer";
import Input from "src/Components/Input";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { headGetBranchForCabinetsSetting } from "src/types/api";
import Loading from "../../Components/Loading";

const Container = styled.div``;
const ControllerBackContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ControlContainer = styled.div`
  display: flex;
  width: 40%;
  min-width: 320px;
  flex-direction: column;
`;

const TopInputContainer = styled.div`
  display: flex;
`;

const InputContainer = styled.div``;
const ScaleControlInput = styled.div`
  flex-shrink: 1;
`;

const InputLabel = styled.label`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
`;
const InputTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 130px;
  margin-left: 10px;
`;

const InputExtended = styled(Input)`
  width: 80%;
`;

const SubInputContainer = styled.div``;

const ButtonContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ConfirmButton = styled(SmallButton)`
  background-color: ${props => props.theme.lightBlueColor};
`;
const CancleButton = styled(SmallButton)`
  background-color: ${props => props.theme.redColor};
`;

interface IProps {
  branchData?: headGetBranchForCabinetsSetting;
  setId: number;
  branchLoading: boolean;
  getSetLoading: boolean;
  width: number;
  height: number;
  setNumber: number;
  xpos: number;
  ypos: number;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  title: string;

  onConfirmClick: () => void;
  onCancelClick: () => void;
}

const UpdateCabinetSetPresenter: React.SFC<IProps> = ({
  branchLoading,
  branchData,
  setId,
  getSetLoading,
  width,
  height,
  setNumber,
  xpos,
  ypos,
  onInputChange,
  title,
  onConfirmClick,
  onCancelClick
}) => (
  <Container>
    <Helmet>
      <title>SettingCabinet | BlueDot</title>
    </Helmet>

    {branchLoading || getSetLoading ? (
      <Loading />
    ) : (
      <>
        {branchData &&
          branchData.ManagerGetBranch &&
          branchData.ManagerGetBranch.branch &&
          branchData.ManagerGetBranch.branch.cabinetLoungeImage && (
            <CabinetSetsContainer
              imgUrl={branchData.ManagerGetBranch.branch.cabinetLoungeImage}
              showTempCabinetSet={false}
              targetCainbetSetHeight={height}
              targetCabinetSetWidth={width}
              targetCabinetSetXpos={xpos}
              targetCabinetSetYpos={ypos}
              cabinetSets={branchData.ManagerGetBranch.branch.cabinetSets}
              tempSelCabinetSetId={setId}
            />
          )}

        {}
        <ControllerBackContainer>
          <ControlContainer>
            <TopInputContainer>
              <InputContainer>
                <ScaleControlInput>
                  <InputLabel>
                    <InputTitle>가로크기 : </InputTitle>
                    <InputExtended
                      value={width}
                      name={"width"}
                      onChange={onInputChange}
                      type={"number"}
                    />
                  </InputLabel>
                  <InputLabel>
                    <InputTitle>세로크기 : </InputTitle>
                    <InputExtended
                      value={height}
                      name={"height"}
                      onChange={onInputChange}
                      type={"number"}
                    />
                  </InputLabel>
                  <InputLabel>
                    <InputTitle>가로 위치 : </InputTitle>
                    <InputExtended
                      value={xpos}
                      name={"xpos"}
                      onChange={onInputChange}
                      type={"number"}
                    />
                  </InputLabel>
                  <InputLabel>
                    <InputTitle>세로 위치 : </InputTitle>
                    <InputExtended
                      value={ypos}
                      name={"ypos"}
                      onChange={onInputChange}
                      type={"number"}
                    />
                  </InputLabel>
                </ScaleControlInput>
              </InputContainer>
            </TopInputContainer>
            <SubInputContainer>
              <InputLabel>
                <InputTitle>세트 이름 : </InputTitle>
                <InputExtended
                  value={title}
                  name={"title"}
                  onChange={onInputChange}
                  type={"text"}
                />
              </InputLabel>
              <InputLabel>
                <InputTitle>세트 번호 : </InputTitle>
                <InputExtended
                  value={setNumber}
                  name={"setNumber"}
                  onChange={onInputChange}
                  type={"number"}
                />
              </InputLabel>
            </SubInputContainer>
          </ControlContainer>

          <ButtonContainer>
            <ConfirmButton value={"등록"} onClick={onConfirmClick} />
            <CancleButton value={"취소"} onClick={onCancelClick} />
          </ButtonContainer>
        </ControllerBackContainer>
      </>
    )}
  </Container>
);

export default UpdateCabinetSetPresenter;
