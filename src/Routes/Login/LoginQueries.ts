import { gql } from "apollo-boost";

export const USER_ID_SIGN_IN = gql`
  mutation userIdSignIn($userId: String!, $password: String!) {
    UserIdSignIn(userId: $phoneNumber, password; $password) {
      ok
      error
    }
  }
`;
