import React from "react";
import Switch from "react-toggle-switch";
import SmallButton from "../../Components/SmallButton";
import styled from "../../typed-components";
const BackContainer = styled.div``;
const Container = styled.div``;
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Room from "../../Components/Room";

const TitleContainer = styled.div``;
const RoomContainer = styled.div``;
const AddSeatButton = styled(SmallButton)`
  margin: 5px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const ConfirmButton = styled(SmallButton)`
  background-color: ${props => props.theme.blueColor};
  margin: 5px;
`;

const CancleButton = styled(SmallButton)`
  background-color: ${props => props.theme.redColor};
  margin: 5px;
`;

const CreateDoorButton = styled(SmallButton)`
  background-color: ${props => props.theme.orangeColor};
  margin: 5px;
`;

const AddButtonContainer = styled.div``;
const InputLabel = styled.label`
  margin: 5px 0px;
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
  width: 100px;
  margin-left: 10px;
`;

const FormExtended = styled(Form)`
  margin-top: 13px;
  width: 90%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const SwitchBox = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SwitchRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwitchItem = styled.div``;

const SwitchTitle = styled.div`
  margin: 5px;
  flex-basis: 130px;
`;

const FormTitle = styled.h2``;

interface IProps {
  roomId: number;
  addSeatMode: boolean;
  toggleAddSeatMode: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  seatNumber: number;
  usable: boolean;
  rotate: number;
  xpos: number;
  ypos: number;
  maleUsable: boolean;
  femaleUsable: boolean;
  toggleSwitch: (name: any) => void;
  onSeatClick: (seatId: number) => void;
  onConfirmClick: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancelButtonClick: () => void;

  selSeatNumber: number;
  selSeatId: number;
  selSeatXpos: number;
  selSeatYpos: number;
  selSeatDiscard: boolean;
  selSeatMaleUsable: boolean;
  selSeatFemaleUsable: boolean;
  selSeatUsable: boolean;
  selSeatRotate: number;

  onSeatEditCancelClick: () => void;
  onUpdateSeatClick: () => void;

  isAddDoorMode: boolean;
  onAddDoorMode: () => void;
  isFlip: boolean;
  toggleIsFlip: () => void;
  doorEditMode: boolean;
}

const SettingSeatsPresenter: React.SFC<IProps> = ({
  roomId,
  addSeatMode,
  toggleAddSeatMode,
  onSubmit,
  onInputChange,
  femaleUsable,
  maleUsable,
  rotate,
  seatNumber,
  usable,
  xpos,
  ypos,
  toggleSwitch,
  onSeatClick,
  onConfirmClick,
  onCancelButtonClick,
  selSeatNumber,
  selSeatId,
  selSeatXpos,
  selSeatYpos,
  selSeatDiscard,
  selSeatMaleUsable,
  selSeatFemaleUsable,
  selSeatUsable,
  selSeatRotate,
  onUpdateSeatClick,
  onSeatEditCancelClick,
  isAddDoorMode,
  onAddDoorMode,
  isFlip,
  toggleIsFlip,
  doorEditMode
}) => (
  <BackContainer>
    <Container>
      <TitleContainer />
      <RoomContainer>
        <Room
          roomId={roomId}
          onSeatClick={onSeatClick}
          showTempSeat={addSeatMode}
          isAddDoor={isAddDoorMode}
          isFlip={isFlip}
          tempSeatXpos={xpos}
          tempSeatYpos={ypos}
          tempSeatRotate={rotate}
          tempSeatNumber={seatNumber}
          tempSeatUsable={usable}
          tempSeatFemaleUsable={femaleUsable}
          tempSeatMaleUsable={maleUsable}
          selSeatNumber={selSeatNumber}
          selSeatId={selSeatId}
          selSeatXpos={selSeatXpos}
          selSeatYpos={selSeatYpos}
          selSeatDiscard={selSeatDiscard}
          selSeatMaleUsable={selSeatMaleUsable}
          selSeatFemaleUsable={selSeatFemaleUsable}
          selSeatUsable={selSeatUsable}
          selSeatRotate={selSeatRotate}
        />
      </RoomContainer>
    </Container>
    {addSeatMode && !selSeatId ? (
      <FormExtended submitFn={onSubmit}>
        <FormTitle>{isAddDoorMode ? "출입구 추가" : "좌석 추가"}</FormTitle>
        {!isAddDoorMode ? (
          <InputLabel>
            <InputTitle>좌석번호 : </InputTitle>
            <InputExtended
              value={seatNumber}
              name={"seatNumber"}
              onChange={onInputChange}
              type={"number"}
            />
          </InputLabel>
        ) : (
          ""
        )}

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
          <InputTitle>회전 값 : </InputTitle>
          <InputExtended
            value={rotate}
            name={"rotate"}
            onChange={onInputChange}
            type={"number"}
          />
        </InputLabel>

        {!isAddDoorMode ? (
          <SwitchBox>
            <SwitchRow>
              <SwitchTitle>이용 가능</SwitchTitle>
              <SwitchItem>
                <Switch onClick={() => toggleSwitch("usable")} on={usable}>
                  <i className="some-icon" />
                </Switch>
              </SwitchItem>
            </SwitchRow>
            <SwitchRow>
              <SwitchTitle>남자 이용 가능</SwitchTitle>
              <SwitchItem>
                <Switch
                  onClick={() => toggleSwitch("maleUsable")}
                  on={maleUsable}
                >
                  <i className="some-icon" />
                </Switch>
              </SwitchItem>
            </SwitchRow>
            <SwitchRow>
              <SwitchTitle>여자 이용 가능</SwitchTitle>
              <SwitchItem>
                <Switch
                  onClick={() => toggleSwitch("femaleUsable")}
                  on={femaleUsable}
                >
                  <i className="some-icon" />
                </Switch>
              </SwitchItem>
            </SwitchRow>
          </SwitchBox>
        ) : (
          <SwitchBox>
            <SwitchRow>
              <SwitchTitle>좌우반전</SwitchTitle>
              <SwitchItem>
                <Switch onClick={toggleIsFlip} on={isFlip}>
                  <i className="some-icon" />
                </Switch>
              </SwitchItem>
            </SwitchRow>
          </SwitchBox>
        )}

        <AddButtonContainer>
          <ConfirmButton value={"등록"} onClick={onConfirmClick} />
          <CancleButton value={"취소"} onClick={toggleAddSeatMode} />
        </AddButtonContainer>
      </FormExtended>
    ) : (
      !selSeatId && (
        <ButtonContainer>
          <CreateDoorButton value={"출입문 추가"} onClick={onAddDoorMode} />
          <AddSeatButton value={"추가하기"} onClick={toggleAddSeatMode} />
          <CancleButton value={"뒤로가기"} onClick={onCancelButtonClick} />
        </ButtonContainer>
      )
    )}

    {!!selSeatId && (
      <FormExtended submitFn={onSubmit}>
        <FormTitle>{doorEditMode ? "출입구 수정" : "좌석 수정"}</FormTitle>
        {!doorEditMode && (
          <InputLabel>
            <InputTitle>좌석번호 : </InputTitle>
            <InputExtended
              value={selSeatNumber}
              name={"selSeatNumber"}
              onChange={onInputChange}
              type={"number"}
            />
          </InputLabel>
        )}

        <InputLabel>
          <InputTitle>가로 위치 : </InputTitle>
          <InputExtended
            value={selSeatXpos}
            name={"selSeatXpos"}
            onChange={onInputChange}
            type={"number"}
          />
        </InputLabel>
        <InputLabel>
          <InputTitle>세로 위치 : </InputTitle>
          <InputExtended
            value={selSeatYpos}
            name={"selSeatYpos"}
            onChange={onInputChange}
            type={"number"}
          />
        </InputLabel>
        <InputLabel>
          <InputTitle>회전 값 : </InputTitle>
          <InputExtended
            value={selSeatRotate}
            name={"selSeatRotate"}
            onChange={onInputChange}
            type={"number"}
          />
        </InputLabel>

        <SwitchBox>
          {(!doorEditMode && (
            <>
              <SwitchRow>
                <SwitchTitle>이용 가능</SwitchTitle>
                <SwitchItem>
                  <Switch
                    onClick={() => toggleSwitch("selSeatUsable")}
                    on={selSeatUsable}
                  >
                    <i className="some-icon" />
                  </Switch>
                </SwitchItem>
              </SwitchRow>
              <SwitchRow>
                <SwitchTitle>남자 이용 가능</SwitchTitle>
                <SwitchItem>
                  <Switch
                    onClick={() => toggleSwitch("selSeatMaleUsable")}
                    on={selSeatMaleUsable}
                  >
                    <i className="some-icon" />
                  </Switch>
                </SwitchItem>
              </SwitchRow>
              <SwitchRow>
                <SwitchTitle>여자 이용 가능</SwitchTitle>
                <SwitchItem>
                  <Switch
                    onClick={() => toggleSwitch("selSeatFemaleUsable")}
                    on={selSeatFemaleUsable}
                  >
                    <i className="some-icon" />
                  </Switch>
                </SwitchItem>
              </SwitchRow>
            </>
          )) || (
            <SwitchRow>
              <SwitchTitle>좌우반전</SwitchTitle>
              <SwitchItem>
                <Switch onClick={toggleIsFlip} on={isFlip}>
                  <i className="some-icon" />
                </Switch>
              </SwitchItem>
            </SwitchRow>
          )}

          <SwitchRow>
            <SwitchTitle>폐기 처리</SwitchTitle>
            <SwitchItem>
              <Switch
                onClick={() => toggleSwitch("selSeatDiscard")}
                on={selSeatDiscard}
              >
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>

          {/* <SwitchRow>
            <SwitchTitle>좌석 폐기</SwitchTitle>
            <SwitchItem>
              <Switch onClick={null} on={discard}>
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow> */}
        </SwitchBox>

        <AddButtonContainer>
          <ConfirmButton value={"수정"} onClick={onUpdateSeatClick} />
          <CancleButton value={"취소"} onClick={onSeatEditCancelClick} />
        </AddButtonContainer>
      </FormExtended>
    )}
  </BackContainer>
);

export default SettingSeatsPresenter;
