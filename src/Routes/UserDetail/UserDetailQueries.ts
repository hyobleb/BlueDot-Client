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
        managingBranches {
          id
          name
        }
        cleaningBranches {
          id
          name
        }
        staffManangingBranches {
          id
          name
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
        seatLogs {
          id
          seat {
            id
            seatNumber
          }
        }
        payments {
          id
          amount
          updatedAt
          payMethod
          status
        }
      }
    }
  }
`;
