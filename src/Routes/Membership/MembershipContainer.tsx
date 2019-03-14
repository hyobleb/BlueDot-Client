import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_USABLE_MY_MEMBERSHIPS,
  USER_PROFILE
} from "src/Components/sharedQueries";
import {
  getUsableMyMemberships,
  userGetOvertimeCabinetMemberships,
  userGetOvertimeCabinetMembershipsVariables,
  userProfile
} from "src/types/api";
import MembershipPresenter from "./MembershipPresenter";
import { USER_GET_OVERTIME_CABINET_MEMBERSHIPS } from "./MembershipQueries.ts";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  name: string;
  profilePhoto: string;
  popUpShow: boolean;
  popUpCloseFunc: () => void;
  onBranchClick: (branchId: number) => void;
  userId: number;
  overtimeCabinetMemberships: any[];
}

class GetOvertimeCabinetsQuery extends Query<
  userGetOvertimeCabinetMemberships,
  userGetOvertimeCabinetMembershipsVariables
> {}

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
      overtimeCabinetMemberships: [],
      popUpCloseFunc: () => {
        return;
      },
      popUpShow: false,
      profilePhoto: "",
      userId: 0
    };
  }

  public render() {
    const {
      name,
      profilePhoto,
      popUpShow,
      popUpCloseFunc,
      onBranchClick,
      userId,
      overtimeCabinetMemberships
    } = this.state;
    return (
      <GetOvertimeCabinetsQuery
        query={USER_GET_OVERTIME_CABINET_MEMBERSHIPS}
        variables={{ userId }}
        skip={!userId}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <GetMyMembershipsQuery
            query={GET_USABLE_MY_MEMBERSHIPS}
            fetchPolicy={"cache-and-network"}
            onError={error => toast.error(error)}
          >
            {({
              data: myMembershipDatas,
              loading: myMembershipDatasLoading
            }) => {
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
                      overtimeCabinetMemberships={overtimeCabinetMemberships}
                    />
                  )}
                </GetProfileQuery>
              );
            }}
          </GetMyMembershipsQuery>
        )}
      </GetOvertimeCabinetsQuery>
    );
  }

  public updateFields = (
    data: {} | userProfile | userGetOvertimeCabinetMemberships
  ) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { profilePhoto, name, id } = user;
        this.setState({
          name,
          profilePhoto,
          userId: id
        } as any);
      }
    } else if ("GetOvertimeCabinetMemberships" in data) {
      const {
        GetOvertimeCabinetMemberships: { memberships }
      } = data;

      if (memberships !== null) {
        this.setState({
          overtimeCabinetMemberships: memberships
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
      pathname: "/enroll-req-membership",
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
