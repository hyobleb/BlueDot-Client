import React from "react";
import Helmet from "react-helmet";
// import Sidebar from "react-sidebar";
import BackArrow from "src/Components/BackArrow";
import Loading from "src/Components/Loading";
import LoungeContainer from "src/Components/LoungeContainer";
import { getBranchByIp_UserGetBranchByIP_branch_rooms } from "src/types/api";
import BranchesMap from "../../Components/BranchesMap";
import Footer from "../../Components/Footer";
// import Menu from "../../Components/Menu";
import SeatsPopUp from "../../Components/SeatsPopUp";
import styled from "../../typed-components";

// const MenuButton = styled.button`
//   appearance: none;
//   padding: 10px;
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   text-align: center;
//   font-weight: 800;
//   border: 0;
//   cursor: pointer;
//   font-size: 20px;
//   transform: rotate(90deg);
//   z-index: 2;
//   background-color: transparent;
// `;

const BackContainer = styled.div`
  margin-top: 15vh;
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

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
`;

interface IProps {
  // isMenuOpen: boolean;
  branchLoading: boolean;
  profileLoading: boolean;
  // toggleMenu: () => void;
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
  onBranchClick: (
    branchId: number,
    transferredLat: number,
    transferredLng: number
  ) => void;
  onBackClick: () => void;
  transferredLat?: number;
  transferredLng?: number;
  returnSeatLoading: boolean;
}

class HomePresenter extends React.Component<IProps> {
  public render() {
    const {
      // isMenuOpen,
      // toggleMenu,
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
      onReturnClick,
      onBranchClick,
      onBackClick,
      transferredLat,
      transferredLng,
      returnSeatLoading
    } = this.props;

    return profileLoading || branchLoading ? (
      <Loading />
    ) : (
      <BackContainer>
        {branchLoaded ? <BackArrowExtended backFn={onBackClick} /> : ""}
        {/* <Sidebar
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
        </Sidebar> */}
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
                returnSeatLoading={returnSeatLoading}
              />
            )}
          </Container>
        ) : (
          <BranchesMap
            onBranchClick={onBranchClick}
            transferredLat={transferredLat}
            transferredLng={transferredLng}
          />
        )}
        <Footer />
      </BackContainer>
    );
  }
}

export default HomePresenter;
