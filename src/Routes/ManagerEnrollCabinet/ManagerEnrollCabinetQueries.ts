import { gql } from "apollo-boost";

export const MANAGER_ENROLL_CABINET = gql`
  mutation managerEnrollCabinet(
    $userId: Int!
    $branchId: Int!
    $startDatetime: String!
    $endDatetime: String!
    $cabinetId: Int!
  ) {
    ManagerCreateCabMembership(
      userId: $userId
      branchId: $branchId
      startDatetime: $startDatetime
      endDatetime: $endDatetime
      cabinetId: $cabinetId
    ) {
      ok
      error
    }
  }
`;
