import { gql } from "apollo-boost";

export const HEAD_GET_USER_DETAIL = gql`
  query headGetUserDetail($userId: Int!) {
    HeadGetUserDetail(userId: $userId) {
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
