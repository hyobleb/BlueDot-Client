import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import EditAccount from "../../Routes/EditAccount";
import FindId from "../../Routes/FindId";
import FindPassword from "../../Routes/FindPassword";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import Settings from "../../Routes/Settings";
import SignUp from "../../Routes/SignUp";
import SocialLogin from "../../Routes/SocialLogin";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoute /> : <LoggedOutRoute />}
  </BrowserRouter>
);

const LoggedOutRoute: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Login} />
    <Route path={"/sign-up"} component={SignUp} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/find-id"} component={FindId} />
    <Route path={"/find-password"} component={FindPassword} />
    {/* <Route path={"/verify-phone/:number"} component={VerifyPhone} /> */}
    {/* ex) /verify-phone/01021231222 */}
    <Route path={"/social-phone"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoute: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    {/* <Route path={"/ride"} exact={true} component={Ride} /> */}
    {/* ride also need id so wen can user '/ride:rideID' but we use method to using memory */}
    <Route path={"/edit-account"} exact={true} component={EditAccount} />
    <Route path={"/settings"} exact={true} component={Settings} />
    {/* <Route path={"/places"} exact={true} component={Places} />
    <Route path={"/add-place"} exact={true} component={AddPlace} />
    <Route path={"/find-address"} exact={true} component={FindAddress} /> */}
    <Redirect from={"*"} to={"/"} />
    {/* redirect는 맨 마지막에! 해당되는 라우트가 없다면 reidrect 될수있도록*/}
  </Switch>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
