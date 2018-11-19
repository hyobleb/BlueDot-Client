import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { MANAGER_EXPIRE_MEMBERSHIP } from "src/Components/sharedQueries";
import {
  headGetUserDetail,
  headGetUserDetail_HeadGetUserDetail_user,
  headGetUserDetailVariables,
  managerExpireMembership,
  managerExpireMembershipVariables
} from "src/types/api";
import UserDetailPresenter from "./UserDetailPresenter";
import { HEAD_GET_USER_DETAIL } from "./UserDetailQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  userId: number;
  user?: headGetUserDetail_HeadGetUserDetail_user;
  showExpirePopUp: boolean;
  tempSelMembershipId?: number;
  backUrl: string;
  backInfo?: any;
}

class ExpireMembershipMutation extends Mutation<
  managerExpireMembership,
  managerExpireMembershipVariables
> {}

class GetUserDetailQuery extends Query<
  headGetUserDetail,
  headGetUserDetailVariables
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
      showExpirePopUp: false,
      userId: this.props.location.state.userId
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
          { query: HEAD_GET_USER_DETAIL, variables: { userId } }
        ]}
      >
        {expireMembershipMutationFn => {
          this.expireMembershipFn = expireMembershipMutationFn;
          return (
            <GetUserDetailQuery
              query={HEAD_GET_USER_DETAIL}
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

  public updateFields = (data: {} | headGetUserDetail) => {
    if ("HeadGetUserDetail" in data) {
      const {
        HeadGetUserDetail: { user }
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
    const { user } = this.state;

    history.push({
      pathname: "/manager-enroll-membership",
      state: {
        backUrl: "/user-detail",
        userId,
        userIdName: user && user.userId,
        userName: user && user.name
      }
    });
  };
  public enrollCabinetClick = (userId: number) => {
    const { history } = this.props;
    const { user } = this.state;

    history.push({
      pathname: "/manager-enroll-cabinet",
      state: {
        backUrl: "/user-detail",
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
