import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "src/Components/sharedQueries";
import { userProfile } from "src/types/api";
import MembershipPresenter from "./MembershipPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  name: string;
  profilePhoto: string;
}

class GetProfileQuery extends Query<userProfile> {}

class MembershipContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePhoto: ""
    };
  }

  public render() {
    const { name, profilePhoto } = this.state;
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
          />
        )}
      </GetProfileQuery>
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
}

export default MembershipContainer;
