import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Helmet from "react-helmet";
import Switch from "react-toggle-switch";
import BackArrow from "../../Components/BackArrow";
import Input from "../../Components/Input";
import Loading from "../../Components/Loading";
import LoungeContainer from "../../Components/LoungeContainer";
import SmallButton from "../../Components/SmallButton";
import theme from "../../theme";
import styled from "../../typed-components";
import { getBranchForUpdateLounge, roomTypeOptions } from "../../types/api";

const Container = styled.div``;
const ControlContainer = styled.div`
  display: flex;
  width: 40%;
  min-width: 320px;
  flex-direction: column;
`;
const ArrowContainer = styled.div`
  position: relative;
  height: 80px;
  width: 80px;
  margin: 20px;
  flex-shrink: 0;
`;
const Arrow = styled.div`
  position: absolute;
  cursor: pointer;
`;

const UpArrow = styled(Arrow)`
  top: 0;
  left: 30px;
`;
const DownArrow = styled(Arrow)`
  bottom: 0%;
  left: 30px;
`;
const LeftArrow = styled(Arrow)`
  left: 0;
  top: 25px;
`;
const RightArrow = styled(Arrow)`
  right: 0;
  top: 25px;
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

const AddRoomButton = styled(SmallButton)``;

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
  width: 100px;
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
  data?: getBranchForUpdateLounge;
  loading: boolean;
  height: number;
  width: number;
  xpos: number;
  ypos: number;
  showTempRoom: boolean;
  toggleShowRoom: () => void;
  topArrowClick: () => void;
  bottomArrowClick: () => void;
  rightArrowClick: () => void;
  leftArrowClick: () => void;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  title: string;
  roomNumber: number;
  usable: boolean;
  onOptionChange: (arg: any) => void;
  roomTypeDropDownOptions: any;
  roomType: roomTypeOptions;
  toggleUsable: () => void;
  onConfirmClick: () => void;
  onRoomClick: (roomId: number) => void;
  onRoomHover: (roomId: number) => void;
  tempRoomId: number;
  onRoomHoverOut: () => void;
  onEditSeatClick: (roomId: number) => void;
}

const AddLoungePresenter: React.SFC<IProps> = ({
  data,
  height,
  width,
  xpos,
  ypos,
  showTempRoom,
  toggleShowRoom,
  loading,
  topArrowClick,
  bottomArrowClick,
  rightArrowClick,
  leftArrowClick,
  onInputChange,
  title,
  roomNumber,
  usable,
  onOptionChange,
  roomTypeDropDownOptions,
  roomType,
  toggleUsable,
  onConfirmClick,
  onRoomClick,
  onRoomHover,
  tempRoomId,
  onRoomHoverOut,
  onEditSeatClick
}) => {
  return (
    <Container>
      <Helmet>
        <title>AddLounge | BlueDot</title>
      </Helmet>
      <BackArrowExtended backTo="/branch-setting" />

      {loading ? (
        <Loading />
      ) : (
        <>
          {data &&
            data.HeadGetBranch &&
            data.HeadGetBranch.branch &&
            data.HeadGetBranch.branch.loungeImage && (
              <LoungeContainer
                imgUrl={data.HeadGetBranch.branch.loungeImage}
                tempRoomHegiht={height}
                tempRoomWidth={width}
                tempRoomXpos={xpos}
                tempRoomYpos={ypos}
                showTempRoom={showTempRoom}
                onRoomClick={onRoomClick}
                rooms={data.HeadGetBranch.branch.rooms}
                onRoomHover={onRoomHover}
                tempSelRoomId={tempRoomId}
                onRoomHoverOut={onRoomHoverOut}
              />
            )}

          {showTempRoom ? (
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
                    </ScaleControlInput>
                  </InputContainer>

                  <ArrowContainer>
                    <UpArrow onClick={topArrowClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0l8 9h-6v15h-4v-15h-6z" />
                      </svg>
                    </UpArrow>
                    <DownArrow onClick={bottomArrowClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 24l-8-9h6v-15h4v15h6z" />
                      </svg>
                    </DownArrow>
                    <LeftArrow onClick={leftArrowClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 12l9-8v6h15v4h-15v6z" />
                      </svg>
                    </LeftArrow>
                    <RightArrow onClick={rightArrowClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12l-9-8v6h-15v4h15v6z" />
                      </svg>
                    </RightArrow>
                  </ArrowContainer>
                </TopInputContainer>
                <SubInputContainer>
                  <InputLabel>
                    <InputTitle>열람실 이름 : </InputTitle>
                    <InputExtended
                      value={title}
                      name={"title"}
                      onChange={onInputChange}
                      type={"text"}
                    />
                  </InputLabel>
                  <InputLabel>
                    <InputTitle>열람실 번호 : </InputTitle>
                    <InputExtended
                      value={roomNumber}
                      name={"roomNumber"}
                      onChange={onInputChange}
                      type={"number"}
                    />
                  </InputLabel>

                  <Dropdown
                    options={roomTypeDropDownOptions}
                    onChange={onOptionChange}
                    value={roomType}
                    placeholder="Select an option"
                  />

                  <SwitchBox>
                    <SwitchRow>
                      <SwitchTitle>이용 가능</SwitchTitle>
                      <SwitchItem>
                        <Switch onClick={toggleUsable} on={usable}>
                          <i className="some-icon" />
                        </Switch>
                      </SwitchItem>
                    </SwitchRow>
                  </SwitchBox>
                </SubInputContainer>
              </ControlContainer>

              <ButtonContainer>
                <ConfirmButton value={"등록"} onClick={onConfirmClick} />
                <CancleButton value={"취소"} onClick={toggleShowRoom} />
              </ButtonContainer>
            </ControllerBackContainer>
          ) : (
            <AddRoomContainer>
              <AddRoomButton value={"열람실 추가"} onClick={toggleShowRoom} />
              <RoomDataBackContainer>
                {data &&
                  data.HeadGetBranch &&
                  data.HeadGetBranch.branch &&
                  data.HeadGetBranch.branch.rooms &&
                  data.HeadGetBranch.branch.rooms.length > 0 &&
                  data.HeadGetBranch.branch.rooms.map(
                    room =>
                      room && (
                        <RoomDataContainer
                          key={room.id}
                          onMouseOver={() => onRoomHover(room.id)}
                          onMouseOut={onRoomHoverOut}
                          style={{
                            backgroundColor: `${
                              room.id === tempRoomId
                                ? theme.redColor
                                : theme.blueColor
                            }`
                          }}
                        >
                          <RoomDataRow>
                            <RoomDataTitle>
                              {room.title} ({room.roomNumber}번 열람실)
                            </RoomDataTitle>
                            <RoomDataContents>
                              <RoomDataRow>
                                <RoomDataCol>
                                  열람실 타입 : {room.roomType}
                                </RoomDataCol>
                                <RoomDataCol>
                                  {room.usable ? "이용가능" : "이용불가능"}
                                </RoomDataCol>
                                <RoomDataCol>
                                  <ModifyLoungeButton
                                    value={"열람실 수정"}
                                    onClick={() => onRoomClick(room.id)}
                                  />
                                </RoomDataCol>
                                <RoomDataCol>
                                  <EditSeatButton
                                    value={"열람실 좌석"}
                                    onClick={() => onEditSeatClick(room.id)}
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
};

export default AddLoungePresenter;
