import { gql } from "apollo-boost";

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $title: String!
    $amount: Int!
    $target: membershipOptions!
    $hours: Int!
    $branchId: Int!
    $available: Boolean!
  ) {
    HeadCreateProduct(
      title: $title
      amount: $amount
      target: $target
      hours: $hours
      branchId: $branchId
      available: $available
    ) {
      ok
      error
    }
  }
`;
