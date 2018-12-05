import { gql } from "apollo-boost";

export const MANAGER_GET_USER_DETAIL = gql`
  query managerGetUserDetail($userId: Int!) {
    ManagerGetUserDetail(userId: $userId) {
      ok
      error
      user {
        id
        name
        userId
        phoneNumber
        profilePhoto
        gender
        birthYear
        birthMonth
        birthDay
        email
        isHead
        isSupervisor
        isFranchiser
        baseBranch {
          id
          name
        }
        memberships {
          id
          startDatetime
          endDatetime
          status
          usable
          cabinetId
          cabinet {
            id
            cabinetNumber
            lock {
              id
              password
            }
          }
        }

        membershipLogs {
          id
          branch {
            id
            name
          }
          cabinet {
            id
            cabinetNumber
          }
          status
          startDatetime
          endDatetime
          updatedAt
        }
      }
    }
  }
`;

export const GET_MEMBERSHIP_LOGS_BY_ID = gql`
  query getMembershipLogsById($userId: Int!) {
    GetMembershipLogsById(userId: $userId) {
      ok
      error
      membershipLogs {
        id
        startDatetime
        actualStartDatetime
        endDatetime
        status
        target
        hours
        updatedAt
        paymentId
        cabinet {
          id
          cabinetNumber
        }
        branch {
          id
          name
        }
        payment {
          id
        }
      }
    }
  }
`;
