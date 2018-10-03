import { gql } from "apollo-boost";
export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
      isHead @client
      isSupervisor @client
      isFranchiser @client
    }
  }
`;
// 자동으로 실행될 쿼리
