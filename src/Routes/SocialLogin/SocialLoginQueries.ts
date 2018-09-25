import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect($name: String!, $email: String, $fbId: String!) {
    FacebookConnect(name: $name, email: $email, fbId: $fbId) {
      ok
      error
      token
    }
  }
`;
