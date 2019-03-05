import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "react-sidebar";
import AddBranch from "../../Routes/AddBranch";
import AddProduct from "../../Routes/AddProduct";
import Basket from "../../Routes/Basket";
import BranchSetting from "../../Routes/BranchSetting";
import Chart from "../../Routes/Chart";
import PrivateInfo from "../../Routes/Danal/PrivateInfo";
import RefundInfo from "../../Routes/Danal/RefundInfo";
import ServiceRule from "../../Routes/Danal/ServiceRule";
import EditProfile from "../../Routes/EditProfile";
import FindId from "../../Routes/FindId";
import FindPassword from "../../Routes/FindPassword";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import ManageCabinet from "../../Routes/ManageCabinet";
import ManageCabinets from "../../Routes/ManageCabinets";
import ManagerEnrollCabinet from "../../Routes/ManagerEnrollCabinet";
import ManagerEnrollMembership from "../../Routes/ManagerEnrollMembership";
import ManagerExtendCabinet from "../../Routes/ManagerExtendCabinet";
import ManagerExtendMembership from "../../Routes/ManagerExtendMembership";
import ManageSeat from "../../Routes/ManageSeat";
import ManageSeats from "../../Routes/ManageSeats";
import ManageUsers from "../../Routes/ManageUsers";
import Membership from "../../Routes/Membership";
import ModifyBranch from "../../Routes/ModifyBranch";
import ModifyProduct from "../../Routes/ModifyProduct";
import MyInfo from "../../Routes/MyInfo";
import PhoneLogin from "../../Routes/PhoneLogin";
import ReqEnrollCabinet from "../../Routes/ReqEnrollCabinet";
import ReqEnrollMembership from "../../Routes/ReqEnrollMembership";
import ReqExtendCabinet from "../../Routes/ReqExtendCabinet";
import ReqExtendMembership from "../../Routes/ReqExtendMembership";
import ReqMembership from "../../Routes/ReqMembership";
import ReqSignUp from "../../Routes/ReqSignUp";
import SettingCabinets from "../../Routes/SettingCabinets";
import SettingCabinetSets from "../../Routes/SettingCabinetSets";
import SettingCabLock from "../../Routes/SettingCabLock";
import SettingCoBranch from "../../Routes/SettingCoBranch";
import SettingLounge from "../../Routes/SettingLounge";
import SettingProduct from "../../Routes/SettingProduct";
import SettingSeats from "../../Routes/SettingSeats";
import SettingSeatsV2 from "../../Routes/SettingSeatsV2";
import SettingStaff from "../../Routes/SettingStaff";
import SignUp from "../../Routes/SignUp";
import SignUpDetail from "../../Routes/SignUpDetail";
import SocialLogin from "../../Routes/SocialLogin";
import Test from "../../Routes/Test";
import UpdateCabinetSet from "../../Routes/UpdateCabinetSet";
import UpdateLounge from "../../Routes/UpdateLounge";
import UserDetail from "../../Routes/UserDetail";
import VbankList from "../../Routes/VbankList";
import ViewPayInfo from "../../Routes/ViewPayInfo";
import ViewReqSignUp from "../../Routes/ViewReqSignUp";
import styled from "../../typed-components";
import Menu from "../Menu";

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

interface IProps {
  isLoggedIn: boolean;
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
  isCleanStaff: boolean;
  isManStaff: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setTimeLogout: () => void;
  stopLogoutFn: () => void;
}

interface ILoginRouteProps {
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
  isManStaff: boolean;
  isCleanStaff: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setTimeLogout: () => void;
  stopLogoutFn: () => void;
}

const AppPresenter: React.SFC<IProps> = ({
  isLoggedIn,
  isHead,
  isCleanStaff,
  isSupervisor,
  isManStaff,
  isFranchiser,
  isMenuOpen,
  toggleMenu,
  setTimeLogout,
  stopLogoutFn
}) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <LoggedInRoute
          isHead={isHead}
          isSupervisor={isSupervisor}
          isFranchiser={isFranchiser}
          isManStaff={isManStaff}
          isCleanStaff={isCleanStaff}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          setTimeLogout={setTimeLogout}
          stopLogoutFn={stopLogoutFn}
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
    <Route path={"/req-sign-up"} component={ReqSignUp} />
    <Route path={"/private-info-rule"} component={PrivateInfo} />
    <Route path={"/service-rule"} component={ServiceRule} />
    <Route path={"/refund-rule"} component={RefundInfo} />

    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoute: React.SFC<ILoginRouteProps> = ({
  isHead,
  isSupervisor,
  isFranchiser,
  isManStaff,
  isCleanStaff,
  isMenuOpen,
  toggleMenu,
  setTimeLogout,
  stopLogoutFn
}) => {
  return (
    <>
      <Sidebar
        sidebar={<Menu toggleMenu={toggleMenu} />}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        pullRight={true}
        styles={{
          sidebar: {
            backgroundColor: "white",
            width: "80%",
            zIndex: "10"
          }
        }}
      >
        {<MenuButton onClick={toggleMenu}>|||</MenuButton>}
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/membership"} exact={true} component={Membership} />
          <Route
            path={"/request-membership"}
            exact={true}
            component={ReqMembership}
          />
          <Route
            path={"/basket"}
            exact={true}
            render={props => (
              <Basket
                setTimeLogout={setTimeLogout}
                stopLogoutFn={stopLogoutFn}
                {...props}
              />
            )}
          />
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
          <Route
            path={"/extend-req-cabinet"}
            exact={true}
            component={ReqExtendCabinet}
          />
          <Route path={"/edit-profile"} exact={true} component={EditProfile} />
          <Route path={"/vbank-list"} exact={true} component={VbankList} />
          {(isHead ||
            isFranchiser ||
            isSupervisor ||
            isManStaff ||
            isCleanStaff) && [
            <Route
              key={23}
              path={"/manage-seats"}
              exact={true}
              render={props => (
                <ManageSeats
                  {...props}
                  isHead={isHead}
                  isFranchiser={isFranchiser}
                  isSupervisor={isSupervisor}
                  isManStaff={isManStaff}
                  isCleanStaff={isCleanStaff}
                />
              )}
            />,
            <Route
              key={24}
              path={"/manage-seat"}
              exact={true}
              component={ManageSeat}
            />,
            <Route
              key={25}
              path={"/manage-cabinets"}
              exact={true}
              render={props => (
                <ManageCabinets
                  {...props}
                  isHead={isHead}
                  isFranchiser={isFranchiser}
                  isSupervisor={isSupervisor}
                  isManStaff={isManStaff}
                  isCleanStaff={isCleanStaff}
                />
              )}
            />,
            <Route
              key={26}
              path={"/manage-cabinet"}
              exact={true}
              component={ManageCabinet}
            />,
            <Route key={27} path={"/myinfo"} exact={true} component={MyInfo} />
          ]}
          {(isHead || isFranchiser || isSupervisor || isManStaff) && [
            <Route
              key={14}
              path={"/manage-users"}
              exact={true}
              render={props => (
                <ManageUsers
                  {...props}
                  isHead={isHead}
                  isFranchiser={isFranchiser}
                  isSupervisor={isSupervisor}
                  isManStaff={isManStaff}
                  isCleanStaff={isCleanStaff}
                />
              )}
            />,
            <Route
              key={15}
              path={"/user-detail"}
              exact={true}
              component={UserDetail}
            />,
            <Route
              key={16}
              path={"/manager-enroll-membership"}
              exact={true}
              component={ManagerEnrollMembership}
            />,
            <Route
              key={17}
              path={"/manager-enroll-cabinet"}
              exact={true}
              component={ManagerEnrollCabinet}
            />,
            <Route
              key={18}
              path={"/manager-extend-membership"}
              exact={true}
              component={ManagerExtendMembership}
            />,
            <Route
              key={19}
              path={"/manager-extend-cabinet"}
              exact={true}
              component={ManagerExtendCabinet}
            />,
            <Route
              key={21}
              path={"/view-req-sign-up"}
              exact={true}
              component={ViewReqSignUp}
            />
          ]}
          {(isHead || isFranchiser || isSupervisor) && [
            <Route
              key={1}
              path={"/branch-setting"}
              exact={true}
              render={props => (
                <BranchSetting
                  {...props}
                  isHead={isHead}
                  isFranchiser={isFranchiser}
                  isSupervisor={isSupervisor}
                />
              )}
            />,
            <Route
              key={5}
              path={"/branch-modfiy"}
              exact={true}
              component={ModifyBranch}
            />,
            <Route
              key={13}
              path={"/setting-cablock"}
              exact={true}
              component={SettingCabLock}
            />,
            <Route
              key={13}
              path={"/setting-staff"}
              exact={true}
              component={SettingStaff}
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
            />
          ]}
          {isHead && [
            <Route
              key={2}
              path={"/add-branch"}
              exact={true}
              component={AddBranch}
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

            <Route key={20} path={"/chart"} exact={true} component={Chart} />,

            <Route
              key={22}
              path={"/setting-cobranch"}
              exact={true}
              component={SettingCoBranch}
            />,
            <Route
              key={23}
              path={"/view-payinfo"}
              exact={true}
              component={ViewPayInfo}
            />,
            <Route
              key={24}
              path={"/seat-setting_v2"}
              exact={true}
              component={SettingSeatsV2}
            />,
            <Route key={24} path={"/test"} exact={true} component={Test} />
          ]}
          <Redirect from={"*"} to={"/"} />
          {/* redirect는 맨 마지막에! 해당되는 라우트가 없다면 reidrect 될수있도록*/}
        </Switch>
      </Sidebar>
    </>
  );
};

export default AppPresenter;
