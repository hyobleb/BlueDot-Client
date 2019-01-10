import { gql } from "apollo-boost";

export const MANAGER_GET_MEMBERSHIP_LOGS = gql`
  query managerGetMembershipLogs($branchId: Int, $date: String!) {
    ManagerGetMembershipLogs(branchId: $branchId, date: $date) {
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

export const MANAGER_GET_NOW_USING_USERS = gql`
  query managerGetNowUsingUsers($branchId: Int) {
    ManagerGetNowUsingUsers(branchId: $branchId) {
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
        gender
        memberships {
          id
          startDatetime
          endDatetime
          status
          usable
          target
        }
      }
    }
  }
`;

export const MANAGER_GET_MANAGING_BRANCHES = gql`
  query managerGetManagingBranches {
    GetManagingBranches {
      ok
      error
      branches {
        id
        name
      }
    }
  }
`;
