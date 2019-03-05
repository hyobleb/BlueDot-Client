import Button from "@atlaskit/button";
import React from "react";
import Switch from "react-toggle-switch";
import DefaultBack from "../../Components/DefaultBack";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Loading from "../../Components/Loading";
import SeatBox from "../../Components/SeatBox";
import SmallButton from "../../Components/SmallButton";
import styled from "../../typed-components";
import { getSeatsV2_GetSeatsV2_seats } from "../../types/api";

const Back = styled(DefaultBack)``;

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
// const TitleContainer = styled.div``;
// const RoomContainer = styled.div``;
// const AddSeatButton = styled(SmallButton)`
//   margin: 5px;
// `;
// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 15px;
// `;

const ConfirmButton = styled(SmallButton)`
  background-color: ${props => props.theme.blueColor};
  margin: 5px;
`;

const CancleButton = styled(SmallButton)`
  background-color: ${props => props.theme.redColor};
  margin: 5px;
`;

// const CreateDoorButton = styled(SmallButton)`
//   background-color: ${props => props.theme.orangeColor};
//   margin: 5px;
// `;

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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ButtonCloth = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;

interface IProps {
  roomId: number;
  forAdmin: boolean;
  onSeatClick: (seatId: number) => Promise<void>;
  onDoorClick: (doorId: number) => void;
  selSeatId?: number;
  selDoorId?: number;
  onConfirmClick: () => Promise<void>;
  left?: number;
  top?: number;
  rotate?: number;
  isFlip?: boolean;
  usable?: boolean;
  seatNumber?: number;
  discard?: boolean;
  maleUsable?: boolean;
  femaleUsable?: boolean;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  toggleSwitch: (name: string) => void;
  onCancelClick: () => void;
  updateSeatLoading: boolean;
  onBackClick: () => void;
  seats: Array<getSeatsV2_GetSeatsV2_seats | null> | null;
  getSeatsLoading: boolean;
  onCreateSeatClick: () => void;
  newSeat?: boolean;
  newTop?: number;
  newLeft?: number;
  newRotate?: number;
  newIsFlip?: boolean;
  newSeatNumber?: number;
  newIsDoor?: boolean;
  newUsable?: boolean;
  newMaleUsable?: boolean;
  newFemaleUsable?: boolean;
}

const SettingSeatsV2Presenter: React.SFC<IProps> = ({
  roomId,
  forAdmin,
  onSeatClick,
  onDoorClick,
  selSeatId,
  selDoorId,
  onConfirmClick,
  left,
  top,
  rotate,
  isFlip,
  usable,
  seatNumber,
  discard,
  maleUsable,
  femaleUsable,
  onInputChange,
  toggleSwitch,
  onCancelClick,
  updateSeatLoading,
  onBackClick,
  seats,
  getSeatsLoading,
  onCreateSeatClick,
  newSeat,
  newTop,
  newLeft,
  newRotate,
  newIsFlip,
  newSeatNumber,
  newIsDoor,
  newUsable,
  newMaleUsable,
  newFemaleUsable
}) => (
  <Back title={"SettingSeats | BlueDot"} backFn={onBackClick}>
    <SeatBox
      roomId={roomId}
      forAdmin={forAdmin}
      onSeatClick={onSeatClick}
      onDoorClick={onDoorClick}
      selSeatId={selSeatId}
      selDoorId={selDoorId}
      tempLeft={left}
      tempTop={top}
      tempRotate={rotate}
      tempFlip={isFlip}
      tempSeatNumber={seatNumber}
      seats={seats}
      getSeatsLoading={Boolean(
        (getSeatsLoading && (selSeatId || selDoorId)) || updateSeatLoading
      )}
      editMode={true}
      newSeat={newSeat}
      newTop={newTop}
      newLeft={newLeft}
      newRotate={newRotate}
      newIsFlip={newIsFlip}
      newSeatNumber={newSeatNumber}
      newIsDoor={newIsDoor}
    />

    {(((getSeatsLoading && (selSeatId || selDoorId)) || updateSeatLoading) && (
      <Loading />
    )) || (
      <>
        {
          <ButtonsContainer>
            <ButtonCloth>
              {!newSeat && (
                <Button
                  spacing={"compact"}
                  appearance={"primary"}
                  onClick={onCreateSeatClick}
                >
                  추가
                </Button>
              )}
            </ButtonCloth>
          </ButtonsContainer>
        }
        <FormExtended submitFn={onConfirmClick}>
          <FormTitle>
            {selDoorId
              ? "출입구 수정"
              : selSeatId
              ? "좌석 수정"
              : newSeat
              ? "좌석 추가"
              : "좌석 또는 출입구를 선택해주세요"}
          </FormTitle>
          {(selSeatId || (newSeat && !newIsDoor)) && (
            <InputLabel>
              <InputTitle>좌석번호 : </InputTitle>
              <InputExtended
                value={newSeat ? newSeatNumber : seatNumber}
                name={newSeat ? "newSeatNumber" : "seatNumber"}
                onChange={onInputChange}
                type={"number"}
              />
            </InputLabel>
          )}
          {(selSeatId || selDoorId || newSeat) && (
            <>
              <InputLabel>
                <InputTitle>가로 위치 : </InputTitle>
                <InputExtended
                  value={newSeat ? newLeft : left}
                  name={newSeat ? "newLeft" : "left"}
                  onChange={onInputChange}
                  type={"number"}
                />
              </InputLabel>
              <InputLabel>
                <InputTitle>세로 위치 : </InputTitle>
                <InputExtended
                  value={newSeat ? newTop : top}
                  name={newSeat ? "newTop" : "top"}
                  onChange={onInputChange}
                  type={"number"}
                />
              </InputLabel>
              <InputLabel>
                <InputTitle>회전 값 : </InputTitle>
                <InputExtended
                  value={newSeat ? newRotate : rotate}
                  name={newSeat ? "newRotate" : "rotate"}
                  onChange={onInputChange}
                  type={"number"}
                />
              </InputLabel>
            </>
          )}

          <SwitchBox>
            {(selSeatId || newSeat) &&
              (usable !== undefined || newUsable !== undefined) &&
              (maleUsable !== undefined || newMaleUsable !== undefined) &&
              (femaleUsable !== undefined || newFemaleUsable !== undefined) && (
                <>
                  <SwitchRow>
                    <SwitchTitle>이용 가능</SwitchTitle>
                    <SwitchItem>
                      <Switch
                        onClick={() =>
                          toggleSwitch(newSeat ? "newUsable" : "usable")
                        }
                        on={newSeat ? newUsable : usable}
                      >
                        <i className="some-icon" />
                      </Switch>
                    </SwitchItem>
                  </SwitchRow>
                  <SwitchRow>
                    <SwitchTitle>남자 이용 가능</SwitchTitle>
                    <SwitchItem>
                      <Switch
                        onClick={() =>
                          toggleSwitch(newSeat ? "newMaleUsable" : "maleUsable")
                        }
                        on={newSeat ? newMaleUsable : maleUsable}
                      >
                        <i className="some-icon" />
                      </Switch>
                    </SwitchItem>
                  </SwitchRow>
                  <SwitchRow>
                    <SwitchTitle>여자 이용 가능</SwitchTitle>
                    <SwitchItem>
                      <Switch
                        onClick={() =>
                          toggleSwitch(
                            newSeat ? "newFemaleUsable" : "femaleUsable"
                          )
                        }
                        on={newSeat ? newFemaleUsable : femaleUsable}
                      >
                        <i className="some-icon" />
                      </Switch>
                    </SwitchItem>
                  </SwitchRow>
                </>
              )}
            {newSeat && (
              <SwitchRow>
                <SwitchTitle>출입구로 변경</SwitchTitle>
                <SwitchItem>
                  <Switch
                    onClick={() => toggleSwitch("newIsDoor")}
                    on={newIsDoor}
                  >
                    <i className="some-icon" />
                  </Switch>
                </SwitchItem>
              </SwitchRow>
            )}

            {(selDoorId && isFlip !== undefined) ||
              (newSeat && newIsDoor && newIsFlip !== undefined && (
                <SwitchRow>
                  <SwitchTitle>좌우반전</SwitchTitle>
                  <SwitchItem>
                    <Switch
                      onClick={() =>
                        toggleSwitch(newSeat ? "newIsFlip" : "isFlip")
                      }
                      on={newSeat ? newIsFlip : isFlip}
                    >
                      <i className="some-icon" />
                    </Switch>
                  </SwitchItem>
                </SwitchRow>
              ))}

            {(selSeatId || selDoorId) && discard !== undefined && (
              <SwitchRow>
                <SwitchTitle>폐기 처리</SwitchTitle>
                <SwitchItem>
                  <Switch onClick={() => toggleSwitch("discard")} on={discard}>
                    <i className="some-icon" />
                  </Switch>
                </SwitchItem>
              </SwitchRow>
            )}
          </SwitchBox>
          {(selSeatId || selDoorId || newSeat) && (
            <AddButtonContainer>
              <ConfirmButton
                value={newSeat ? "추가" : "수정"}
                onClick={onConfirmClick}
              />
              <CancleButton value={"취소"} onClick={onCancelClick} />
            </AddButtonContainer>
          )}
        </FormExtended>
      </>
    )}
  </Back>
);

export default SettingSeatsV2Presenter;
