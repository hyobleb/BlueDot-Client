import { gql } from "apollo-boost";

export const MANAGER_ENROLL_CABINET = gql`
  mutation managerEnrollCabinet(
    $userId: Int!
    $branchId: Int!
    $startDatetime: String!
    $endDatetime: String!
    $cabinetId: Int!
    $products: [Int]
    $payMethod: CreatePaymentMethodOption
  ) {
    ManagerCreateCabMembership(
      userId: $userId
      branchId: $branchId
      startDatetime: $startDatetime
      endDatetime: $endDatetime
      cabinetId: $cabinetId
      products: $products
      payMethod: $payMethod
    ) {
      ok
      error
    }
  }
`;

export const MANAGER_SHIFT_CABINET = gql`
  mutation managerShiftCabinet($membershipId: Int!, $targetCabinetId: Int!) {
    ManagerShiftCabinetMembership(
      membershipId: $membershipId
      targetCabinetId: $targetCabinetId
    ) {
      ok
      error
    }
  }
`;
