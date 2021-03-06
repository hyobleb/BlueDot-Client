import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import {
  checkVbankPayment,
  userProfile,
  userProfile_GetMyProfile_user
} from "../../types/api";
const Container = styled.div`
  height: 100%;
`;
const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;
const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const MenuItem = styled.div`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;
const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;
interface IToggleProps {
  isHead: boolean;
  isFrenchiser: boolean;
  isSupervisor: boolean;
  isManStaff: boolean;
  isCleanStaff: boolean;
}
const ToggleAuthor = styled<IToggleProps, any>("button")`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isFrenchiser
      ? props.theme.yellowColor
      : props.isSupervisor
      ? props.theme.orangeColor
      : props.isHead
      ? props.theme.blueColor
      : props.isManStaff
      ? props.theme.pinkColor
      : props.isCleanStaff
      ? props.theme.greenColor
      : ""};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  margin-bottom: 15px;
`;

interface IProps {
  data?: userProfile;
  profileLoading: boolean;
  logUserOutMutation: MutationFn;
  getVbankDataLoading: boolean;
  checkVbankData?: checkVbankPayment;
  toggleMenu: () => void;
  user?: userProfile_GetMyProfile_user | null;
}

const MenuPresenter: React.SFC<IProps> = ({
  user,
  profileLoading,
  logUserOutMutation,
  checkVbankData,
  toggleMenu
}) => {
  return (
    <Container>
      {!profileLoading && user && user.name && (
        <React.Fragment>
          <Header>
            <Grid>
              <Link to={"/edit-account"} onClick={toggleMenu}>
                <Image
                  src={
                    user.profilePhoto ||
                    require("src/images/default_profile.png")
                  }
                />
              </Link>
              <Text>
                <Name>{user.name}</Name>
              </Text>
            </Grid>
          </Header>
          <SLink to="/membership" onClick={toggleMenu}>
            멤버쉽 정보
          </SLink>
          <SLink to="/basket2" onClick={toggleMenu}>
            등록/결제하기
          </SLink>
          {checkVbankData &&
            checkVbankData.CheckVbankPayment &&
            checkVbankData.CheckVbankPayment.haveVbank && (
              <SLink to="/vbank-list" onClick={toggleMenu}>
                무통장 결제
              </SLink>
            )}
          <MenuItem
            onClick={() => {
              logUserOutMutation();
              toggleMenu();
            }}
          >
            로그아웃
          </MenuItem>

          {user.isFranchiser ||
          user.isSupervisor ||
          user.isHead ||
          user.isManStaff ||
          user.isCleanStaff ? (
            <>
              <ToggleAuthor
                isHead={user.isHead}
                isFrenchiser={user.isFranchiser}
                isManStaff={user.isManStaff}
                isCleanStaff={user.isCleanStaff}
              >
                {user.isFranchiser
                  ? "관리자"
                  : user.isHead
                  ? "슈퍼 관리자"
                  : user.isManStaff
                  ? "관리 스탭"
                  : user.isCleanStaff
                  ? "환경 스탭"
                  : ""}
              </ToggleAuthor>
              {(user.isFranchiser || user.isHead || user.isSupervisor) && (
                <>
                  <SLink to="/branch-setting" onClick={toggleMenu}>
                    지점 관리
                  </SLink>
                </>
              )}
              {(user.isFranchiser ||
                user.isHead ||
                user.isSupervisor ||
                user.isManStaff) && (
                <>
                  <SLink to="/manage-users" onClick={toggleMenu}>
                    회원 관리
                  </SLink>
                </>
              )}
              {(user.isFranchiser ||
                user.isHead ||
                user.isSupervisor ||
                user.isManStaff ||
                user.isCleanStaff) && (
                <>
                  <SLink to="/manage-cabinets" onClick={toggleMenu}>
                    사물함 관리
                  </SLink>
                  <SLink to="/manage-seats" onClick={toggleMenu}>
                    좌석 관리
                  </SLink>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </React.Fragment>
      )}
    </Container>
  );
};
export default MenuPresenter;
