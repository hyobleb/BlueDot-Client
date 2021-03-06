import React from "react";
import Dropdown from "react-dropdown";
import Helmet from "react-helmet";
import Switch from "react-toggle-switch";
import Input from "../../Components/Input";
import Loading from "../../Components/Loading";
import LoungeContainer from "../../Components/LoungeContainer";
import {
  roomTypeDropDownOptions,
  roomTypeOptions
} from "../../Components/shareOptions";
import SmallButton from "../../Components/SmallButton";
import styled from "../../typed-components";
import { getBranchForUpdateLounge } from "../../types/api";

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

interface IProps {
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  title: string;
  roomNumber: number;
  usable: boolean;
  roomType: roomTypeOptions;
  branchLoading: boolean;
  branchData?: getBranchForUpdateLounge;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onOptionChange: (arg: any) => void;
  topArrowClick: () => void;
  bottomArrowClick: () => void;
  rightArrowClick: () => void;
  leftArrowClick: () => void;
  toggleUsable: () => void;
  onConfirmClick: () => void;
  onCancleClick: () => void;
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
}

const UpdateLoungePresenter: React.SFC<IProps> = ({
  width,
  height,
  xpos,
  ypos,
  title,
  roomNumber,
  usable,
  roomType,
  branchLoading,
  branchData,
  topArrowClick,
  bottomArrowClick,
  rightArrowClick,
  leftArrowClick,
  onInputChange,
  onOptionChange,
  toggleUsable,
  onConfirmClick,
  onCancleClick,
  isFranchiser,
  isHead,
  isSupervisor
}) => (
  <Container>
    <Helmet>
      <title>AddLounge | BlueDot</title>
    </Helmet>

    {branchLoading ? (
      <Loading />
    ) : (
      <>
        {branchData &&
          branchData.ManagerGetBranch &&
          branchData.ManagerGetBranch.branch &&
          branchData.ManagerGetBranch.branch.loungeImage && (
            <LoungeContainer
              imgUrl={branchData.ManagerGetBranch.branch.loungeImage}
              tempRoomHegiht={height}
              tempRoomWidth={width}
              tempRoomXpos={xpos}
              tempRoomYpos={ypos}
              showTempRoom={true}
            />
          )}

        <ControllerBackContainer>
          <ControlContainer>
            {isHead && (
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
            )}

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
            <ConfirmButton value={"수정"} onClick={onConfirmClick} />
            <CancleButton value={"취소"} onClick={onCancleClick} />
          </ButtonContainer>
        </ControllerBackContainer>
      </>
    )}
  </Container>
);

export default UpdateLoungePresenter;
