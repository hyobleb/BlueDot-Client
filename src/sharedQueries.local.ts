import { gql } from "apollo-boost";

export const LOG_USER_IN = gql`
  mutation logUserIn(
    $token: String!
    $isHead: Boolean!
    $isSupervisor: Boolean!
    $isFranchiser: Boolean!
  ) {
    logUserIn(
      token: $token
      isHead: $isHead
      isSupervisor: $isSupervisor
      isFranchiser: $isFranchiser
    ) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
