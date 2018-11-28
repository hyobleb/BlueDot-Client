import React from "react";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import Input from "src/Components/Input";
import SmallButton from "src/Components/SmallButton";
import theme from "src/theme";
import { headGetBranchForCabinetsSetting } from "src/types/api";
import CabinetSetsContainer from "../../Components/CabinetSetsContainer";
import Loading from "../../Components/Loading";
import styled from "../../typed-components";
const Container = styled.div``;

const ControlContainer = styled.div`
  display: flex;
  width: 40%;
  min-width: 320px;
  flex-direction: column;
`;

const InputContainer = styled.div``;
const ScaleControlInput = styled.div`
  flex-shrink: 1;
`;

const ControllerBackContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AddRoomButton = styled(SmallButton)`
  width: 200px;
`;

const InputLabel = styled.label`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
`;
const InputExtended = styled(Input)`
  width: 80%;
`;
const InputTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 130px;
  margin-left: 10px;
`;

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

const AddRoomContainer = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: auto;
  align-items: flex-end;
`;

const TopInputContainer = styled.div`
  display: flex;
`;
const SubInputContainer = styled.div``;

const RoomDataBackContainer = styled.div`
  margin-top: 15px;
  align-self: center;
  color: white;
  width: 70%;
  min-width: 320px;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const RoomDataContainer = styled.div`
  background-color: ${props => props.theme.greenColor};
  color: white;
  padding: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: 5px 5px;
  font-size: 13px;
  width: 150px;
`;
const RoomDataRow = styled.div``;
const RoomDataTitle = styled.div`
  font-size: 15px;
  padding-bottom: 5px;
`;
const RoomDataContents = styled.div``;
const RoomDataCol = styled.div`
  padding: 5px 0;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const ModifyLoungeButton = styled(SmallButton)`
  background-color: ${props => props.theme.orangeColor};
  width: 130px;
  &:hover {
    background-color: ${props => props.theme.greyColor};
  }
`;

const EditSeatButton = styled(SmallButton)`
  background-color: ${props => props.theme.greenColor};
  width: 130px;
  &:hover {
    background-color: ${props => props.theme.greyColor};
  }
`;

interface IProps {
  loading: boolean;
  data?: headGetBranchForCabinetsSetting;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  showTempCabinetSet: boolean;
  title: string;
  setNumber: number;
  tempSetId: number;
  onSetEditClick: (setId: number) => void;
  onSetHover: (setId: number) => void;
  onSetHoverOut: () => void;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onConfirmClick: () => void;
  toggleShowTempCabinetSet: () => void;
  onEditCabinetSetClick: (setId: number) => void;
  horizontalNumber: number;
  verticalNumber: number;
  startNumber: number;
}

const SettingCabinetSetsPresenter: React.SFC<IProps> = ({
  data,
  loading,
  width,
  height,
  xpos,
  ypos,
  showTempCabinetSet,
  title,
  setNumber,
  tempSetId,
  onSetEditClick,
  onSetHover,
  onSetHoverOut,
  onInputChange,
  onConfirmClick,
  toggleShowTempCabinetSet,
  onEditCabinetSetClick,
  horizontalNumber,
  verticalNumber,
  startNumber
}) => (
  <Container>
    <Helmet>
      <title>SettingCabinet | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/branch-setting" />

    {loading ? (
      <Loading />
    ) : (
      <>
        {data &&
          data.ManagerGetBranch &&
          data.ManagerGetBranch.branch &&
          data.ManagerGetBranch.branch.cabinetLoungeImage && (
            <CabinetSetsContainer
              imgUrl={data.ManagerGetBranch.branch.cabinetLoungeImage}
              tempCabinetSetHegiht={height}
              tempCabinetSetWidth={width}
              tempCabinetSetXpos={xpos}
              tempCabinetSetYpos={ypos}
              showTempCabinetSet={showTempCabinetSet}
              onCabinetSetClick={onSetEditClick}
              onCabinetSetHover={onSetHover}
              tempSelCabinetSetId={tempSetId}
              onCabinetSetHoverOut={onSetHoverOut}
              cabinetSets={data.ManagerGetBranch.branch.cabinetSets}
            />
          )}

        {showTempCabinetSet ? (
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
                    <InputLabel>
                      <InputTitle>가로 사물함 수 : </InputTitle>
                      <InputExtended
                        value={horizontalNumber}
                        name={"horizontalNumber"}
                        onChange={onInputChange}
                        type={"number"}
                      />
                    </InputLabel>
                    <InputLabel>
                      <InputTitle>세로 사물함 수 : </InputTitle>
                      <InputExtended
                        value={verticalNumber}
                        name={"verticalNumber"}
                        onChange={onInputChange}
                        type={"number"}
                      />
                    </InputLabel>
                    <InputLabel>
                      <InputTitle>시작 사물함 번호 : </InputTitle>
                      <InputExtended
                        value={startNumber}
                        name={"startNumber"}
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
              <CancleButton value={"취소"} onClick={toggleShowTempCabinetSet} />
            </ButtonContainer>
          </ControllerBackContainer>
        ) : (
          <AddRoomContainer>
            <AddRoomButton
              value={"사물함 세트 추가"}
              onClick={toggleShowTempCabinetSet}
            />
            <RoomDataBackContainer>
              {data &&
                data.ManagerGetBranch &&
                data.ManagerGetBranch.branch &&
                data.ManagerGetBranch.branch.cabinetSets &&
                data.ManagerGetBranch.branch.cabinetSets.length > 0 &&
                data.ManagerGetBranch.branch.cabinetSets.map(
                  cabinetSet =>
                    cabinetSet && (
                      <RoomDataContainer
                        key={cabinetSet.id}
                        onMouseOver={() => onSetHover(cabinetSet.id)}
                        onMouseOut={onSetHoverOut}
                        style={{
                          backgroundColor: `${
                            cabinetSet.id === tempSetId
                              ? theme.redColor
                              : theme.blueColor
                          }`
                        }}
                      >
                        <RoomDataRow>
                          <RoomDataTitle>
                            {cabinetSet.title} ({cabinetSet.setNumber}번 세트)
                          </RoomDataTitle>
                          <RoomDataContents>
                            <RoomDataRow>
                              <RoomDataCol>
                                <ModifyLoungeButton
                                  value={"세트 수정"}
                                  onClick={() => onSetEditClick(cabinetSet.id)}
                                />
                              </RoomDataCol>
                              <RoomDataCol>
                                <EditSeatButton
                                  value={"세트 사물함"}
                                  onClick={() =>
                                    onEditCabinetSetClick(cabinetSet.id)
                                  }
                                />
                              </RoomDataCol>
                            </RoomDataRow>
                          </RoomDataContents>
                        </RoomDataRow>
                      </RoomDataContainer>
                    )
                )}
            </RoomDataBackContainer>
          </AddRoomContainer>
        )}
      </>
    )}
  </Container>
);

export default SettingCabinetSetsPresenter;
