import { gql } from "apollo-boost";
export const GET_USER_WITH_USER_ID = gql`
  mutation getUserWithUserId($userId: String!) {
    GetUserWithUserId(userId: $userId) {
      ok
      error
      user {
        id
        password
        baseBranch {
          id
          impId
        }
      }
    }
  }
`;

export const CHECK_ONESELF = gql`
  mutation checkOneself($userId: Int!, $impUid: String!, $branchId: Int!) {
    CheckOneself(userId: $userId, impUid: $impUid, branchId: $branchId) {
      ok
      error
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($userId: Int!, $newPassword: String!) {
    ChangePassword(userId: $userId, newPassword: $newPassword) {
      ok
      error
    }
  }
`;
