import { gql } from "apollo-boost";

export const HEAD_GET_BRANCH_EMPLOYEE = gql`
  query headGetBranchEmployee($branchId: Int!) {
    HeadGetBranchEmployee(branchId: $branchId) {
      ok
      error
      branch {
        id
        name
        managers {
          id
          name
          phoneNumber
          isSupervisor
          isFranchiser
        }
        cleanStaffs {
          id
          name
          phoneNumber
        }
        managingStaffs {
          id
          name
          phoneNumber
        }
      }
    }
  }
`;

export const HEAD_SET_BRANCH_MANGER = gql`
  mutation headSetBranchManager(
    $userId: Int!
    $managerType: HeadSetBranchManagerType!
    $action: HeadSetBranchManagerAction!
    $branchId: Int!
  ) {
    HeadSetBranchManager(
      userId: $userId
      managerType: $managerType
      action: $action
      branchId: $branchId
    ) {
      ok
      error
    }
  }
`;

export const MANAGER_SET_BRANCH_STAFF = gql`
  mutation managerSetBranchStaff(
    $userId: Int!
    $branchId: Int!
    $staffType: ManagerSetStaffType!
    $action: ManagerSetBranchStaffAction!
  ) {
    ManagerSetStaff(
      userId: $userId
      branchId: $branchId
      staffType: $staffType
      action: $action
    ) {
      ok
      error
    }
  }
`;
