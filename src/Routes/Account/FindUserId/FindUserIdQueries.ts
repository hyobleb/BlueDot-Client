import { gql } from "apollo-boost";
export const GET_USER_ID = gql`
  query getUserId($name: String!, $phoneNumber: String!) {
    GetUserId(name: $name, phoneNumber: $phoneNumber) {
      ok
      error
      userId
    }
  }
`;
