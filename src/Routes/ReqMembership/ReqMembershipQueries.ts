import { gql } from "apollo-boost";

export const USER_GET_PRODUCTS = gql`
  query userGetProducts($branchId: Int!) {
    UserGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        id
        name
        products {
          id
          title
          amount
          target
          hours
          available
          discard
        }
      }
    }
  }
`;

export const USER_REQUEST_MEMBERSHIP = gql`
  mutation userRequestMembership(
    $branchId: Int!
    $startDatetime: String!
    $productId: Int!
  ) {
    RequestRegistMembership(
      branchId: $branchId
      startDatetime: $startDatetime
      productId: $productId
    ) {
      ok
      error
    }
  }
`;
