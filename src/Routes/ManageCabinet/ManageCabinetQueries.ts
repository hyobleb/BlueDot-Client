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
