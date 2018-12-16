import React from "react";
import styled from "../../typed-components";
import Room from "../Room";
import SmallButton from "../SmallButton";

interface IProps {
  closeFunc: any;
  roomId: number;
  onSeatClick: (seatId: number) => void;
  assignSeatId?: number | null;
  assignSeatLoading?: boolean;
  onEntranceClick?: () => void;
  canReturn?: boolean;
  returnFn?: () => void;
  title?: string;
  returnSeatLoading?: boolean;
}
const Container = styled.div`
  -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  background-color: white;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 320px;
  height: 80%;
  z-index: 9;
  padding: 20px;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BodyContainer = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;

const Button = styled(SmallButton)``;
const ReturnButton = styled(Button)``;

const SeatsPopUpPresenter: React.SFC<IProps> = ({
  closeFunc,
  roomId,
  onSeatClick,
  assignSeatId,
  assignSeatLoading,
  onEntranceClick,
  canReturn,
  returnFn,
  title = "좌석을 배정/반납해주세요!",
  returnSeatLoading
}) => {
  return (
    <Container>
      <HeadContainer>{title}</HeadContainer>
      <BodyContainer>
        <Room
          roomId={roomId}
          onSeatClick={onSeatClick}
          assignSeatId={assignSeatId}
          assignSeatLoading={assignSeatLoading}
          onEntranceClick={onEntranceClick}
        />
        <ButtonContainer>
          {canReturn && (
            <ReturnButton
              value={returnSeatLoading ? "반납중..." : "반납"}
              onClick={returnFn}
            />
          )}
        </ButtonContainer>
      </BodyContainer>
      <CloseButton onClick={closeFunc}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z" />
        </svg>
      </CloseButton>
    </Container>
  );
};
export default SeatsPopUpPresenter;
