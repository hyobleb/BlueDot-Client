import { gql } from "apollo-boost";

export const MANAGER_GET_CABINET_LOGS = gql`
  query managerGetCabinetLogs(
    $cabinetId: Int!
    $startDatetime: String!
    $endDatetime: String!
  ) {
    ManagerGetCabinetLogs(
      cabinetId: $cabinetId
      startDatetime: $startDatetime
      endDatetime: $endDatetime
    ) {
      ok
      error
      cabinetLogs {
        id
        user {
          id
          name
        }
        status
        endDatetime
        updatedAt
        membershipId
      }
      cabinet {
        id
        cabinetNumber
        nowUsing
        status
        reservedDatetime
        startDatetime
        endDatetime
        updatedAt
        usable
        memberships {
          id
          endDatetime
        }
        lock {
          id
          lockNumber
          password
        }
        user {
          id
          name
          userId
        }
        branch {
          id
          name
        }
      }
    }
  }
`;

export const MANAGER_GET_CABINET_MEMBERSHIP = gql`
  query managerGetCabinetMembership($cabinetId: Int!) {
    ManagerGetCabinetMembership(cabinetId: $cabinetId) {
      ok
      error
      membership {
        id
      }
    }
  }
`;

export const CLEAR_CABINET = gql`
  mutation clearCabinet($cabinetId: Int!) {
    ClearCabinet(cabinetId: $cabinetId) {
      ok
      error
    }
  }
`;
