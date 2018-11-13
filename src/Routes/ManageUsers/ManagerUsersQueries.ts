import { gql } from "apollo-boost";

export const HEAD_GET_MEMBERSHIP_LOGS = gql`
  query headGetMembershipLogs($branchId: Int, $date: String!) {
    HeadGetMembershipLogs(branchId: $branchId, date: $date) {
      ok
      error
      membershipLogs {
        id
        userId
        status
        target
        createdAt
        startDatetime
        endDatetime
        cabinetId
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

export const HEAD_GET_NOW_USING_USERS = gql`
  query headGetNowUsingUsers($branchId: Int) {
    HeadGetNowUsingUsers(branchId: $branchId) {
      ok
      error
      users {
        id
        name
        userId
        birthYear
        birthMonth
        birthDay
        phoneNumber
      }
    }
  }
`;
