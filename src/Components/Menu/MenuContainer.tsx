import React from "react";
import { Mutation, Query } from "react-apollo";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { userProfile } from "../../types/api";
import { USER_PROFILE } from "../sharedQueries";
import MenuPresenter from "./MenuPresenter";

class ProfileQuery extends Query<userProfile> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOutMutation => {
          return (
            <ProfileQuery query={USER_PROFILE}>
              {({ data, loading }) => (
                <MenuPresenter
                  data={data}
                  loading={loading}
                  logUserOutMutation={logUserOutMutation}
                />
              )}
            </ProfileQuery>
          );
        }}
      </Mutation>
    );
  }
}
export default MenuContainer;
