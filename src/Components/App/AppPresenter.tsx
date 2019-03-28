import React from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "react-sidebar";
import FindAccount from "../../Routes/Account/FindAccount";
import FindPassword from "../../Routes/Account/FindPassword";
import FindUserId from "../../Routes/Account/FindUserId";
import AddBranch from "../../Routes/AddBranch";
import AddProduct from "../../Routes/AddProduct";
import Basket from "../../Routes/Basket";
import BasketV2 from "../../Routes/BasketV2";
import BranchSetting from "../../Routes/BranchSetting";
import Chart from "../../Routes/Chart";
import PrivateInfo from "../../Routes/Danal/PrivateInfo";
import RefundInfo from "../../Routes/Danal/RefundInfo";
import ServiceRule from "../../Routes/Danal/ServiceRule";
import EditProfile from "../../Routes/EditProfile";
import FindId from "../../Routes/FindId";
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
import {
  getMyUsingSeat,
  getMyUsingSeat_GetMyUsingSeat_seat,
  getMyUsingSeatId
} from "../../types/api";
import Menu from "../Menu";
import SmallLoading from "../SmallLoading";

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

const SideTagContainer = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SideTagItem = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  display: flex;

  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #dedede;
  }
  margin-top: 5px;
`;

const LogoutTag = styled(SideTagItem)`
  background-color: ${props => props.theme.orangeColor};
`;

const ReturnSeatTag = styled(SideTagItem)`
  background-color: ${props => props.theme.pinkColor};
`;

const EnrollTag = styled(Link)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  display: flex;

  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #dedede;
  }
  margin-top: 5px;
  background-color: ${props => props.theme.lightBlueColor};
  color: white;
`;

const SideItemText = styled.div``;

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
  onLogoutBtnClick: () => Promise<void>;
  userUsingSeat?: getMyUsingSeat_GetMyUsingSeat_seat | null;
  appUpdateFields: (data: {} | getMyUsingSeatId | getMyUsingSeat) => void;
  onReturnSeatClick: () => Promise<void>;
  returnSeatLoading: boolean;
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
  onLogoutBtnClick: () => Promise<void>;
  userUsingSeat?: getMyUsingSeat_GetMyUsingSeat_seat | null;
  appUpdateFields: (data: {} | getMyUsingSeatId | getMyUsingSeat) => void;
  onReturnSeatClick: () => Promise<void>;
  returnSeatLoading: boolean;
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
  stopLogoutFn,
  onLogoutBtnClick,
  userUsingSeat,
  appUpdateFields,
  onReturnSeatClick,
  returnSeatLoading
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
          onLogoutBtnClick={onLogoutBtnClick}
          userUsingSeat={userUsingSeat}
          appUpdateFields={appUpdateFields}
          onReturnSeatClick={onReturnSeatClick}
          returnSeatLoading={returnSeatLoading}
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
    <Route path={"/find-account"} component={FindAccount} />
    <Route path={"/find-userid"} component={FindUserId} />
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
  stopLogoutFn,
  onLogoutBtnClick,
  userUsingSeat,
  appUpdateFields,
  onReturnSeatClick,
  returnSeatLoading
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
        {
          <SideTagContainer>
            {/* <SmallLoading width={50} height={50} /> */}

            {userUsingSeat ? (
              returnSeatLoading ? (
                <SmallLoading width={40} height={40} padding={5} />
              ) : (
                <ReturnSeatTag>
                  <SideItemText onClick={onReturnSeatClick}>
                    반납하기
                  </SideItemText>
                </ReturnSeatTag>
              )
            ) : (
              ""
            )}
            <EnrollTag to={"/basket2"}>
              <SideItemText>등록하기</SideItemText>
            </EnrollTag>

            <LogoutTag onClick={onLogoutBtnClick}>
              <SideItemText>로그아웃</SideItemText>
            </LogoutTag>
          </SideTagContainer>
        }
        <Switch>
          <Route
            path={"/"}
            exact={true}
            render={props => (
              <Home {...props} appUpdateFields={appUpdateFields} />
            )}
          />
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
          <Route path={"/basket2"} exact={true} component={BasketV2} />
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
