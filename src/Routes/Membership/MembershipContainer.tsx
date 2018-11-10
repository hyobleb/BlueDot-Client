import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_USABLE_MY_MEMBERSHIPS,
  USER_PROFILE
} from "src/Components/sharedQueries";
import { getUsableMyMemberships, userProfile } from "src/types/api";
import MembershipPresenter from "./MembershipPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  name: string;
  profilePhoto: string;
  popUpShow: boolean;
  popUpCloseFunc: () => void;
  onBranchClick: (branchId: number) => void;
}

class GetProfileQuery extends Query<userProfile> {}
class GetMyMembershipsQuery extends Query<getUsableMyMemberships> {}

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
      <GetMyMembershipsQuery
        query={GET_USABLE_MY_MEMBERSHIPS}
        fetchPolicy={"cache-and-network"}
        onError={error => toast.error(error)}
      >
        {({ data: myMembershipDatas, loading: myMembershipDatasLoading }) => {
          console.log({ myMembershipDatas });
          return (
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
                  onMembershipExtendClick={this.onMembershipExtendClick}
                  onCabinetExtendClick={this.onCabinetExtendClick}
                />
              )}
            </GetProfileQuery>
          );
        }}
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

  public onMembershipExtendClick = (selMembershipId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/extend-req-membership",
      state: {
        selMembershipId
      }
    });
  };

  public onCabinetExtendClick = (selMembershipId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/extend-req-cabinet",
      state: {
        selMembershipId
      }
    });
  };
}

export default MembershipContainer;
