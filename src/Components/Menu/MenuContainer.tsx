import React from "react";
import { Query } from "react-apollo";
import { userProfile } from "../../types/api";
import { USER_PROFILE } from "../sharedQueries";
import MenuPresenter from "./MenuPresenter";

class ProfileQuery extends Query<userProfile> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data, loading }) => <MenuPresenter data={data} loading={loading} />}
      </ProfileQuery>
    );
  }
}
export default MenuContainer;
