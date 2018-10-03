import React from "react";
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
const Rating = styled.h5`
  font-size: 18px;
  color: white;
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
}
const ToggleAuthor = styled<IToggleProps, any>("button")`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isFrenchiser
      ? props.theme.yellowColor
      : props.isHead
        ? props.theme.greenColor
        : ""};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
`;

interface IProps {
  data?: userProfile;
  loading: boolean;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = null } = {} } = {},
  loading
}) => (
  <Container>
    {!loading &&
      user &&
      user.name && (
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
                <Rating>4.5</Rating>
              </Text>
            </Grid>
          </Header>
          <SLink to="/trips">Your Trips</SLink>
          <SLink to="/settings">Settings</SLink>
          {user.isFranchiser || user.isHead ? (
            <ToggleAuthor isHead={user.isHead} isFrenchiser={user.isFranchiser}>
              {user.isFranchiser ? "관리자" : user.isHead ? "슈퍼 관리자" : ""}
            </ToggleAuthor>
          ) : (
            ""
          )}
          <SLink to="/settings">Settings</SLink>
        </React.Fragment>
      )}
  </Container>
);
export default MenuPresenter;
