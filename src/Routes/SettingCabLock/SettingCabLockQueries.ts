import { gql } from "apollo-boost";

export const MANAGER_GET_CABLOCKS = gql`
  query managerGetCablocks($branchId: Int!) {
    ManagerGetCabinetLocks(branchId: $branchId) {
      ok
      error
      cabinetLocks {
        id
        lockNumber
        password
        cabinet {
          cabinetNumber
        }
      }
    }
  }
`;

export const REMOVE_CABINET_LOCK = gql`
  mutation removeCabinetLock($cabinetLockId: Int!) {
    ManagerRemoveCabinetLock(cabinetLockId: $cabinetLockId) {
      ok
      error
    }
  }
`;

export const GET_CABINET_LOCK = gql`
  query getCabinetLock($lockId: Int!) {
    ManagerGetCabinetLock(lockId: $lockId) {
      ok
      error
      cabinetLock {
        id
        lockNumber
        password
        cabinet {
          cabinetNumber
        }
      }
    }
  }
`;
