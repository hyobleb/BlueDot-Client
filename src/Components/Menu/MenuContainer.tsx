import React from "react";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import {
  checkVbankPayment,
  userProfile,
  userProfile_GetMyProfile_user
} from "../../types/api";
import { USER_PROFILE } from "../sharedQueries";
import MenuPresenter from "./MenuPresenter";
import { CHECK_VBANK_PAYMENT } from "./MenuQueries";

interface IProps {
  toggleMenu: () => void;
}

interface IState {
  user?: userProfile_GetMyProfile_user | null;
}

class ProfileQuery extends Query<userProfile> {}
class CheckVBankQuery extends Query<checkVbankPayment> {}

class MenuContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  public render() {
    const { toggleMenu } = this.props;
    const { user } = this.state;
    return (
      <CheckVBankQuery
        query={CHECK_VBANK_PAYMENT}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {({ data: checkVbankData, loading: getVbankDataLoading }) => (
          <Mutation mutation={LOG_USER_OUT}>
            {logUserOutMutation => {
              return (
                <ProfileQuery
                  query={USER_PROFILE}
                  fetchPolicy={"cache-and-network"}
                  onCompleted={this.updateFields}
                >
                  {({ loading: profileLoading }) => (
                    <MenuPresenter
                      profileLoading={profileLoading}
                      logUserOutMutation={logUserOutMutation}
                      getVbankDataLoading={getVbankDataLoading}
                      checkVbankData={checkVbankData}
                      toggleMenu={toggleMenu}
                      user={user}
                    />
                  )}
                </ProfileQuery>
              );
            }}
          </Mutation>
        )}
      </CheckVBankQuery>
    );
  }

  public updateFields = (data: {} | checkVbankPayment | userProfile) => {
    if ("CheckVbankPayment" in data) {
      const {
        CheckVbankPayment: { haveVbank }
      } = data;
      if (haveVbank) {
        toast.info("메뉴의 무통장 결제를 진행해주세요!");
      }
    } else if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user) {
        this.setState({
          user
        });
      }
    }
  };

  public onMenuClick = () => {
    const { toggleMenu } = this.props;
    toggleMenu();
  };
}

export default MenuContainer;
