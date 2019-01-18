import { gql } from "apollo-boost";

export const MANAGER_GET_SEAT_LOGS = gql`
  query managerGetSeatLogs(
    $seatId: Int!
    $startDatetime: String!
    $endDatetime: String!
  ) {
    ManagerGetSeatLogs(
      seatId: $seatId
      startDatetime: $startDatetime
      endDatetime: $endDatetime
    ) {
      ok
      error
      seatLogs {
        id
        user {
          id
          name
        }
        status
        endDatetime
        updatedAt
      }
      seat {
        id
        seatNumber
        nowUsing
        endDatetime
        branch {
          id
          name
        }
      }
    }
  }
`;

export const MANAGER_ASSIGN_USER = gql`
  mutation managerAssignUser(
    $userId: Int!
    $seatId: Int!
    $startDatetime: String
    $endDatetime: String
  ) {
    ManagerAssignUser(
      userId: $userId
      seatId: $seatId
      startDatetime: $startDatetime
      endDatetime: $endDatetime
    ) {
      ok
      error
    }
  }
`;

export const MANAGER_RETURN_SEAT = gql`
  mutation managerReturnSeat($seatId: Int!) {
    ManagerReturnSeat(seatId: $seatId) {
      ok
      error
    }
  }
`;
