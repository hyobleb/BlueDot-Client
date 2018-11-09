import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import {
  headGetUserDetail,
  headGetUserDetail_HeadGetUserDetail_user,
  headGetUserDetailVariables
} from "src/types/api";
import UserDetailPresenter from "./UserDetailPresenter";
import { HEAD_GET_USER_DETAIL } from "./UserDetailQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  userId: number;
  user?: headGetUserDetail_HeadGetUserDetail_user;
}

class GetUserDetailQuery extends Query<
  headGetUserDetail,
  headGetUserDetailVariables
> {}

class UserDetailContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      userId: this.props.location.state.userId
    };
  }
  public render() {
    const { userId, user } = this.state;
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
            />
          );
        }}
      </GetUserDetailQuery>
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
}

export default UserDetailContainer;
