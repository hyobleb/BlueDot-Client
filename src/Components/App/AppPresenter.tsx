import BranchSetting from "../../Routes/BranchSetting";

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddBranch from "../../Routes/AddBranch";
import AddLounge from "../../Routes/AddLounge";
import EditAccount from "../../Routes/EditAccount";
import FindId from "../../Routes/FindId";
import FindPassword from "../../Routes/FindPassword";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import Settings from "../../Routes/Settings";
import SignUp from "../../Routes/SignUp";
import SignUpDetail from "../../Routes/SignUpDetail";
import SocialLogin from "../../Routes/SocialLogin";

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
          path={"/add-lounge"}
          exact={true}
          component={AddLounge}
        />
      ]}

      <Redirect from={"*"} to={"/"} />
      {/* redirect는 맨 마지막에! 해당되는 라우트가 없다면 reidrect 될수있도록*/}
    </Switch>
  );
};

export default AppPresenter;
