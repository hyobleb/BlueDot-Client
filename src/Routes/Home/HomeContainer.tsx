import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "../../Components/sharedQueries";
import { userProfile } from "../../types/api";
import HomePresenter from "./HomePresenter";
interface IState {
  isMenuOpen: boolean;
}
interface IProps extends RouteComponentProps<any> {}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public state = {
    isMenuOpen: false
  };
  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
          />
        )}
      </ProfileQuery>
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
}
export default HomeContainer;
