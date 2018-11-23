import { gql } from "apollo-boost";

export const MANAGER_CREATE_MEMBERSHIP = gql`
  mutation managerCreateMembership(
    $userId: Int!
    $branchId: Int!
    $startDatetime: String!
    $endDatetime: String!
    $products: [Int]
    $payMethod: CreatePaymentMethodOption
  ) {
    ManagerCreateMembership(
      userId: $userId
      branchId: $branchId
      startDatetime: $startDatetime
      endDatetime: $endDatetime
      products: $products
      payMethod: $payMethod
    ) {
      ok
      error
    }
  }
`;
