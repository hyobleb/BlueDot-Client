import { gql } from "apollo-boost";

export const GET_MEMBERSHIP_LOGS = gql`
  query getMembershipLogs($branchId: Int, $target: targetOptions) {
    GetMembershipLogs(branchId: $branchId, target: $target) {
      ok
      error
      membershipLogs {
        id
        status
        target
        updatedAt
        hours
        actualStartDatetime
        user {
          id
          birthYear
          birthMonth
          birthDay
          gender
        }
      }
    }
  }
`;
