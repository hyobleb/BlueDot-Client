import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import Loading from "src/Components/Loading";
import LoungeContainer from "src/Components/LoungeContainer";
import { getBranchByIp_UserGetBranchByIP_branch_rooms } from "src/types/api";
import Menu from "../../Components/Menu";
import SeatsPopUp from "../../Components/SeatsPopUp";
import styled from "../../typed-components";

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const BackContainer = styled.div`
  margin-top: 80px;
`;

const Container = styled.div``;
const Section = styled.div``;
const HeadSection = styled(Section)`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const LoungeSection = styled(Section)`
  display: flex;
  justify-content: center;
`;
const LoungeCol = styled.div`
  width: 100%;
`;

interface IProps {
  isMenuOpen: boolean;
  branchLoading: boolean;
  profileLoading: boolean;
  toggleMenu: () => void;
  branchLoaded: boolean;
  loungeImage: string;
  minimapImage: string;
  rooms: [getBranchByIp_UserGetBranchByIP_branch_rooms] | null;
  onRoomClick: (roomId: number) => void;
  nowRoomId: number;
  onSeatsPopUpCloseClick: () => void;
  onSeatClick: (seatId: number) => void;
  assignSeatId: number | null;
  assignSeatLoading: boolean;
  onEntranceClick: () => void;
  onReturnClick: () => Promise<void>;
  branchName: string;
  myUsingSeatId: number | null;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  profileLoading,
  branchLoading,
  branchLoaded,
  loungeImage,
  minimapImage,
  rooms,
  onRoomClick,
  nowRoomId,
  onSeatsPopUpCloseClick,
  onSeatClick,
  assignSeatId,
  assignSeatLoading,
  onEntranceClick,
  branchName,
  myUsingSeatId,
  onReturnClick
}) =>
  profileLoading || branchLoading ? (
    <Loading />
  ) : (
    <BackContainer>
      <Sidebar
        sidebar={<Menu />}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        pullRight={true}
        styles={{
          sidebar: {
            backgroundColor: "white",
            width: "80%",
            zIndex: "10"
          }
        }}
      >
        {!profileLoading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      </Sidebar>
      <Helmet>
        <title>Home | BlueDot</title>
      </Helmet>
      {branchLoaded ? (
        <Container>
          <HeadSection>
            현재 있는 곳은 {branchName}
            입니다
          </HeadSection>
          <LoungeSection>
            <LoungeCol>
              <LoungeContainer
                imgUrl={loungeImage}
                showTempRoom={false}
                rooms={rooms}
                minimapImg={minimapImage}
                onRoomClick={onRoomClick}
              />
            </LoungeCol>
          </LoungeSection>
          {nowRoomId > 0 && (
            <SeatsPopUp
              closeFunc={onSeatsPopUpCloseClick}
              roomId={nowRoomId}
              onSeatClick={onSeatClick}
              assignSeatId={assignSeatId}
              assignSeatLoading={assignSeatLoading}
              onEntranceClick={onEntranceClick}
              canReturn={myUsingSeatId ? true : false}
              returnFn={onReturnClick}
            />
          )}
        </Container>
      ) : (
        "블루닷라운지 지점 내의 인터넷(와이파이) 사용 안하고 있음"
      )}
    </BackContainer>
  );
export default HomePresenter;
