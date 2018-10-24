import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from "src/Components/sharedQueries";
import { getMyMemberships, userProfile } from "src/types/api";
import MembershipPresenter from "./MembershipPresenter";
import { GET_MY_MEMBERSHIPS } from "./MembershipQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  name: string;
  profilePhoto: string;
  popUpShow: boolean;
  popUpCloseFunc: () => void;
  onBranchClick: (branchId: number) => void;
}

class GetProfileQuery extends Query<userProfile> {}
class GetMyMembershipsQuery extends Query<getMyMemberships> {}

class MembershipContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      onBranchClick: branchId => {
        return;
      },
      popUpCloseFunc: () => {
        return;
      },
      popUpShow: false,
      profilePhoto: ""
    };
  }

  public render() {
    const {
      name,
      profilePhoto,
      popUpShow,
      popUpCloseFunc,
      onBranchClick
    } = this.state;
    return (
      <GetMyMembershipsQuery query={GET_MY_MEMBERSHIPS}>
        {({ data: myMembershipDatas, loading: myMembershipDatasLoading }) => (
          <GetProfileQuery
            query={USER_PROFILE}
            fetchPolicy={"cache-and-network"}
            onCompleted={this.updateFields}
          >
            {({ loading: profileLoading }) => (
              <MembershipPresenter
                name={name}
                profilePhoto={profilePhoto}
                profileLoading={profileLoading}
                popUpShow={popUpShow}
                membershipPopUpShow={this.membershipPopUpShow}
                cabinetPopUpShow={this.cabinetPopUpShow}
                popUpCloseFunc={popUpCloseFunc}
                onBranchClick={onBranchClick}
                myMembershipDatas={myMembershipDatas}
                myMembershipDatasLoading={myMembershipDatasLoading}
              />
            )}
          </GetProfileQuery>
        )}
      </GetMyMembershipsQuery>
    );
  }

  public updateFields = (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { profilePhoto, name } = user;
        this.setState({
          name,
          profilePhoto
        } as any);
      }
    }
  };

  public membershipPopUpShow = () => {
    this.setState({
      onBranchClick: this.onMembershipBranchClick,
      popUpCloseFunc: this.membershipPopUpNoShow,
      popUpShow: true
    });
  };

  public membershipPopUpNoShow = () => {
    this.setState({
      popUpShow: false
    });
  };

  public cabinetPopUpShow = () => {
    this.setState({
      onBranchClick: this.onCabinetBranchClick,
      popUpCloseFunc: this.cabinetPopUpNoShow,
      popUpShow: true
    });
  };

  public cabinetPopUpNoShow = () => {
    this.setState({
      popUpShow: false
    });
  };

  public onMembershipBranchClick = branchId => {
    const { history } = this.props;
    history.push({
      pathname: "/request-membership",
      state: {
        branchId
      }
    });
  };

  public onCabinetBranchClick = branchId => {
    const { history } = this.props;
    history.push({
      pathname: "/enroll-req-cabinet",
      state: {
        branchId
      }
    });
  };
}

export default MembershipContainer;
