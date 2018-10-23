import { gql } from "apollo-boost";

export const CREATE_CABINET_LOCK = gql`
  mutation createCabinetLock(
    $branchId: Int!
    $cabinetNumber: Int!
    $lockNumber: Int!
    $password: String!
  ) {
    ManagerCreateCabinetLock(
      branchId: $branchId
      cabinetNumber: $cabinetNumber
      lockNumber: $lockNumber
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const MODIFY_CABINET_LOCK = gql`
  mutation modifyCabinetLock(
    $cabinetLockId: Int!
    $cabinetNumber: Int
    $lockNumber: Int
    $password: String
  ) {
    ManagerUpdateCabinetLock(
      cabinetLockId: $cabinetLockId
      cabinetNumber: $cabinetNumber
      lockNumber: $lockNumber
      password: $password
    ) {
      ok
      error
    }
  }
`;
