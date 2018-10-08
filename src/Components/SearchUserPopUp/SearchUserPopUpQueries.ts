import { gql } from "apollo-boost";
export const SEARCH_USERS = gql`
  query searchUsers(
    $name: String
    $phoneNumber: String
    $userId: String
    $searchType: SearchType!
  ) {
    ManagerSearchUsers(
      name: $name
      phoneNumber: $phoneNumber
      userId: $userId
      searchType: $searchType
    ) {
      ok
      error
      users {
        id
        userId
        name
        gender
        phoneNumber
      }
    }
  }
`;
