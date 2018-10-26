import BranchSetting from "../../Routes/BranchSetting";

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddBranch from "../../Routes/AddBranch";
import AddProduct from "../../Routes/AddProduct";
import Basket from "../../Routes/Basket";
import FindId from "../../Routes/FindId";
import FindPassword from "../../Routes/FindPassword";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import Membership from "../../Routes/Membership";
import ModifyBranch from "../../Routes/ModifyBranch";
import ModifyProduct from "../../Routes/ModifyProduct";
import PhoneLogin from "../../Routes/PhoneLogin";
import ReqEnrollCabinet from "../../Routes/ReqEnrollCabinet";
import ReqEnrollMembership from "../../Routes/ReqEnrollMembership";
import ReqExtendMembership from "../../Routes/ReqExtendMembership";
import ReqMembership from "../../Routes/ReqMembership";
import SettingCabinets from "../../Routes/SettingCabinets";
import SettingCabinetSets from "../../Routes/SettingCabinetSets";
import SettingCabLock from "../../Routes/SettingCabLock";
import SettingLounge from "../../Routes/SettingLounge";
import SettingProduct from "../../Routes/SettingProduct";
import SettingSeats from "../../Routes/SettingSeats";
import SignUp from "../../Routes/SignUp";
import SignUpDetail from "../../Routes/SignUpDetail";
import SocialLogin from "../../Routes/SocialLogin";
import UpdateCabinetSet from "../../Routes/UpdateCabinetSet";
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
      <Route path={"/membership"} exact={true} component={Membership} />
      <Route
        path={"/request-membership"}
        exact={true}
        component={ReqMembership}
      />
      <Route path={"/basket"} exact={true} component={Basket} />
      <Route
        path={"/enroll-req-membership"}
        exact={true}
        component={ReqEnrollMembership}
      />
      <Route
        path={"/extend-req-membership"}
        exact={true}
        component={ReqExtendMembership}
      />
      <Route
        path={"/enroll-req-cabinet"}
        exact={true}
        component={ReqEnrollCabinet}
      />

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
          path={"/set-setting"}
          exact={true}
          component={SettingCabinetSets}
        />,
        <Route
          key={8}
          path={"/set-modify"}
          exact={true}
          component={UpdateCabinetSet}
        />,
        <Route
          key={9}
          path={"/set-cabinets"}
          exact={true}
          component={SettingCabinets}
        />,
        <Route
          key={10}
          path={"/setting-product"}
          exact={true}
          component={SettingProduct}
        />,
        <Route
          key={11}
          path={"/add-product"}
          exact={true}
          component={AddProduct}
        />,
        <Route
          key={12}
          path={"/modify-product"}
          exact={true}
          component={ModifyProduct}
        />,
        <Route
          key={13}
          path={"/setting-cablock"}
          exact={true}
          component={SettingCabLock}
        />
      ]}

      <Redirect from={"*"} to={"/"} />
      {/* redirect는 맨 마지막에! 해당되는 라우트가 없다면 reidrect 될수있도록*/}
    </Switch>
  );
};

export default AppPresenter;
