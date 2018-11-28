import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { MANAGER_EXPIRE_MEMBERSHIP } from "src/Components/sharedQueries";
import {
  managerExpireMembership,
  managerExpireMembershipVariables,
  managerGetUserDetail,
  managerGetUserDetail_ManagerGetUserDetail_user,
  managerGetUserDetailVariables
} from "src/types/api";
import UserDetailPresenter from "./UserDetailPresenter";
import { MANAGER_GET_USER_DETAIL } from "./UserDetailQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  userId: number;
  user?: managerGetUserDetail_ManagerGetUserDetail_user;
  showExpirePopUp: boolean;
  tempSelMembershipId?: number;
  backUrl: string;
  backInfo?: any;
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
}

class ExpireMembershipMutation extends Mutation<
  managerExpireMembership,
  managerExpireMembershipVariables
> {}

class GetUserDetailQuery extends Query<
  managerGetUserDetail,
  managerGetUserDetailVariables
> {}

class UserDetailContainer extends React.Component<IProps, IState> {
  public expireMembershipFn: MutationFn;
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      backInfo: props.location.state.backInfo
        ? {
            ...props.location.state.backInfo
          }
        : undefined,
      backUrl: props.location.state.backUrl || "/manage-users",
      isFranchiser: props.location.state.isFranchiser || false,
      isHead: props.location.state.isHead || false,
      isSupervisor: props.location.state.isSupervisor || false,
      showExpirePopUp: false,
      userId: props.location.state.userId
    };
  }
  public render() {
    const { userId, user, showExpirePopUp, tempSelMembershipId } = this.state;
    return (
      <ExpireMembershipMutation
        mutation={MANAGER_EXPIRE_MEMBERSHIP}
        onCompleted={data => {
          const { ManagerExpireMembership } = data;
          if (ManagerExpireMembership.ok) {
            toast.success("해당 멤버쉽이 만료되었습니다");
            this.setState({
              showExpirePopUp: !this.state.showExpirePopUp
            });
          } else {
            toast.error(ManagerExpireMembership.error);
          }
        }}
        refetchQueries={[
          { query: MANAGER_GET_USER_DETAIL, variables: { userId } }
        ]}
      >
        {expireMembershipMutationFn => {
          this.expireMembershipFn = expireMembershipMutationFn;
          return (
            <GetUserDetailQuery
              query={MANAGER_GET_USER_DETAIL}
              variables={{ userId }}
              onCompleted={this.updateFields}
              onError={err => toast.error(err)}
              fetchPolicy={"cache-and-network"}
              skip={!userId}
            >
              {({ loading: getUserDetailLoading }) => {
                return (
                  <UserDetailPresenter
                    getUserDetailLoading={getUserDetailLoading}
                    user={user}
                    enrollMembershipClick={this.enrollMembershipClick}
                    enrollCabinetClick={this.enrollCabinetClick}
                    onMembershipExtendClick={this.onMembershipExtendClick}
                    showExpirePopUp={showExpirePopUp}
                    showExpirePopUpToggle={this.showExpirePopUpToggle}
                    tempSelMembershipId={tempSelMembershipId}
                    onMembershipExpireClick={this.onMembershipExpireClick}
                    onExpireConfirmClick={this.onExpireConfirmClick}
                    onExtendCabinetClick={this.onExtendCabinetClick}
                    onBackClick={this.onBackClick}
                  />
                );
              }}
            </GetUserDetailQuery>
          );
        }}
      </ExpireMembershipMutation>
    );
  }

  public updateFields = (data: {} | managerGetUserDetail) => {
    if ("ManagerGetUserDetail" in data) {
      const {
        ManagerGetUserDetail: { user }
      } = data;

      if (user !== null) {
        this.setState({
          user
        });
      }
    }
  };

  public enrollMembershipClick = (userId: number) => {
    const { history } = this.props;
    const { user, isHead, isFranchiser, isSupervisor } = this.state;

    history.push({
      pathname: "/manager-enroll-membership",
      state: {
        backUrl: "/user-detail",
        isFranchiser,
        isHead,
        isSupervisor,
        userId,
        userIdName: user && user.userId,
        userName: user && user.name
      }
    });
  };
  public enrollCabinetClick = (userId: number) => {
    const { history } = this.props;
    const { user, isHead, isFranchiser, isSupervisor } = this.state;

    history.push({
      pathname: "/manager-enroll-cabinet",
      state: {
        backUrl: "/user-detail",
        isFranchiser,
        isHead,
        isSupervisor,
        userId,
        userIdName: user && user.userId,
        userName: user && user.name
      }
    });
  };

  public onMembershipExtendClick = (membershipId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/manager-extend-membership",
      state: {
        selMembershipId: membershipId
      }
    });
  };

  public onMembershipExpireClick = (membershipId: number) => {
    this.setState(
      {
        tempSelMembershipId: membershipId
      },
      this.showExpirePopUpToggle
    );
  };

  public showExpirePopUpToggle = () => {
    this.setState({
      showExpirePopUp: !this.state.showExpirePopUp
    });
  };

  public onExpireConfirmClick = async () => {
    const { tempSelMembershipId } = this.state;
    await this.expireMembershipFn({
      variables: { membershipId: tempSelMembershipId }
    });
  };

  public onExtendCabinetClick = (membershipId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/manager-extend-cabinet",
      state: {
        selMembershipId: membershipId
      }
    });
  };

  public onBackClick = () => {
    const { history } = this.props;
    const { backUrl, backInfo } = this.state;
    history.push({
      pathname: backUrl,
      state: {
        ...backInfo
      }
    });
  };
}

export default UserDetailContainer;
