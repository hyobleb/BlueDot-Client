import { gql } from "apollo-boost";

export const HEAD_GET_MEMBERSHIP_LOGS = gql`
  query headGetMembershipLogs($branchId: Int, $date: String!) {
    HeadGetMembershipLogs(branchId: $branchId, date: $date) {
      ok
      error
      membershipLogs {
        id
        status
        target
        createdAt
        startDatetime
        endDatetime
        cabinet {
          id
          cabinetNumber
        }
        user {
          id
          name
          userId
          phoneNumber
          birthYear
          birthMonth
          birthDay
        }
        branch {
          id
          name
        }
      }
      branch {
        id
        name
      }
    }
  }
`;
