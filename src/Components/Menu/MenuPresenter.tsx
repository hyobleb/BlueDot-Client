import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import { userProfile } from "../../types/api";
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
  loading: boolean;
  logUserOutMutation: MutationFn;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = null } = {} } = {},
  loading,
  logUserOutMutation
}) => {
  return (
    <Container>
      {!loading && user && user.name && (
        <React.Fragment>
          <Header>
            <Grid>
              <Link to={"/edit-account"}>
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
          <SLink to="/membership">멤버쉽 정보</SLink>
          <SLink to="/basket">장바구니</SLink>
          <MenuItem onClick={() => logUserOutMutation()}>로그아웃</MenuItem>

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
                  <SLink to="/branch-setting">지점 관리</SLink>
                </>
              )}
              {(user.isFranchiser ||
                user.isHead ||
                user.isSupervisor ||
                user.isManStaff) && (
                <>
                  <SLink to="/manage-users">회원 관리</SLink>
                  <SLink to="/manage-cabinets">사물함 관리</SLink>
                </>
              )}
              {(user.isFranchiser ||
                user.isHead ||
                user.isSupervisor ||
                user.isManStaff ||
                user.isCleanStaff) && (
                <SLink to="/manage-seats">좌석 관리</SLink>
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
