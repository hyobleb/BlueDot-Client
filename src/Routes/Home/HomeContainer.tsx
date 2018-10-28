import ip from "ip";
import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from "../../Components/sharedQueries";
import {
  getBranchByIp,
  getBranchByIp_UserGetBranchByIP_branch_rooms,
  getBranchByIpVariables,
  userProfile
} from "../../types/api";
import HomePresenter from "./HomePresenter";
import { GET_BRANCH_BY_IP } from "./HomeQueries";

interface IState {
  isMenuOpen: boolean;
  nowIp: string;
  nowBranchId: number | null;
  loungeImage: string;
  minimapImage: string;
  rooms: getBranchByIp_UserGetBranchByIP_branch_rooms | null;
  branchLoaded: boolean;
}
interface IProps extends RouteComponentProps<any> {}

class GetBranchByIpQuery extends Query<getBranchByIp, getBranchByIpVariables> {}
class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      branchLoaded: false,
      isMenuOpen: false,
      loungeImage: "",
      minimapImage: "",
      nowBranchId: null,
      nowIp: ip.address(),
      rooms: null
    };
  }

  public render() {
    const {
      isMenuOpen,
      nowIp,
      branchLoaded,
      loungeImage,
      minimapImage,
      rooms
    } = this.state;
    return (
      <GetBranchByIpQuery
        query={GET_BRANCH_BY_IP}
        variables={{ ip: nowIp }}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {({ loading: branchLoading }) => (
          <ProfileQuery query={USER_PROFILE}>
            {({ loading: profileLoading }) => (
              <HomePresenter
                profileLoading={profileLoading}
                branchLoading={branchLoading}
                isMenuOpen={isMenuOpen}
                toggleMenu={this.toggleMenu}
                branchLoaded={branchLoaded}
                loungeImage={loungeImage}
                minimapImage={minimapImage}
                rooms={rooms}
                onRoomClick={this.onRoomClick}
              />
            )}
          </ProfileQuery>
        )}
      </GetBranchByIpQuery>
    );
  }
  // 자동으로 실행되는 query를 skip하고 싶으면 query 속성에 skip을 추가해주면 됨
  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public updateFields = (data: {} | getBranchByIp) => {
    if ("UserGetBranchByIP" in data) {
      const {
        UserGetBranchByIP: { branch }
      } = data;

      if (branch !== null) {
        const { loungeImage, minimapImage, rooms } = branch;
        this.setState({
          branchLoaded: true,
          loungeImage,
          minimapImage,
          rooms
        } as any);
      }
    }
  };

  public onRoomClick = (roomId: number) => {
    console.log({ roomId });
  };
}
export default HomeContainer;
