import BranchSetting from "../../Routes/BranchSetting";

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddBranch from "../../Routes/AddBranch";
import EditAccount from "../../Routes/EditAccount";
import FindId from "../../Routes/FindId";
import FindPassword from "../../Routes/FindPassword";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import ModifyBranch from "../../Routes/ModifyBranch";
import PhoneLogin from "../../Routes/PhoneLogin";
import SettingCabinets from "../../Routes/SettingCabinets";
import SettingLounge from "../../Routes/SettingLounge";
import Settings from "../../Routes/Settings";
import SettingSeats from "../../Routes/SettingSeats";
import SignUp from "../../Routes/SignUp";
import SignUpDetail from "../../Routes/SignUpDetail";
import SocialLogin from "../../Routes/SocialLogin";
import UpdateLounge from "../../Routes/UpdateLounge";

interface IProps {
  isLoggedIn: boolean;
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
}

interface ILoginRouteProps {
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
}

const AppPresenter: React.SFC<IProps> = ({
  isLoggedIn,
  isHead,
  isSupervisor,
  isFranchiser
}) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <LoggedInRoute
          isHead={isHead}
          isSupervisor={isSupervisor}
          isFranchiser={isFranchiser}
        />
      ) : (
        <LoggedOutRoute />
      )}
    </BrowserRouter>
  );
};

const LoggedOutRoute: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Login} />
    <Route path={"/sign-up"} component={SignUp} />
    <Route path={"/sign-up-detail"} component={SignUpDetail} />

    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/find-id"} component={FindId} />
    <Route path={"/find-password"} component={FindPassword} />
    {/* <Route path={"/verify-phone/:number"} component={VerifyPhone} /> */}
    {/* ex) /verify-phone/01021231222 */}
    <Route path={"/social-phone"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoute: React.SFC<ILoginRouteProps> = ({
  isHead,
  isSupervisor,
  isFranchiser
}) => {
  return (
    <Switch>
      <Route path={"/"} exact={true} component={Home} />
      {/* <Route path={"/ride"} exact={true} component={Ride} /> */}
      {/* ride also need id so wen can user '/ride:rideID' but we use method to using memory */}
      <Route path={"/edit-account"} exact={true} component={EditAccount} />
      <Route path={"/settings"} exact={true} component={Settings} />
      {/* <Route path={"/places"} exact={true} component={Places} />
    <Route path={"/add-place"} exact={true} component={AddPlace} />
    <Route path={"/find-address"} exact={true} component={FindAddress} /> */}
      {isHead && [
        <Route
          key={1}
          path={"/branch-setting"}
          exact={true}
          component={BranchSetting}
        />,
        <Route
          key={2}
          path={"/add-branch"}
          exact={true}
          component={AddBranch}
        />,
        <Route
          key={3}
          path={"/lounge-setting"}
          exact={true}
          component={SettingLounge}
        />,
        <Route
          key={4}
          path={"/lounge-modify"}
          exact={true}
          component={UpdateLounge}
        />,
        <Route
          key={5}
          path={"/branch-modfiy"}
          exact={true}
          component={ModifyBranch}
        />,
        <Route
          key={6}
          path={"/seat-setting"}
          exact={true}
          component={SettingSeats}
        />,
        <Route
          key={7}
          path={"/cabinets-setting"}
          exact={true}
          component={SettingCabinets}
        />
      ]}

      <Redirect from={"*"} to={"/"} />
      {/* redirect는 맨 마지막에! 해당되는 라우트가 없다면 reidrect 될수있도록*/}
    </Switch>
  );
};

export default AppPresenter;
