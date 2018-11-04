import { gql } from "apollo-boost";
export const SEARCH_USERS = gql`
  query searchUsers($text: String!, $searchType: SearchType!) {
    ManagerSearchUsers(text: $text, searchType: $searchType) {
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
