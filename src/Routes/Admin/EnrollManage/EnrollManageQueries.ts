import { gql } from "apollo-boost";
export const SHOPKEEPER_GET_BRANCH_INFO = gql`
  query shopkeeprGetBranchInfo($branchId: Int) {
    ShopkeeperGetBranchInfo(branchId: $branchId) {
      ok
      error
      branch {
        id
        memberships {
          id
          startDatetime
          endDatetime
          status
          usable
          target
          userId
          branch {
            id
            name
          }
          cabinet {
            id
            cabinetNumber
          }
          user {
            id
            name
            gender
            birthYear
          }
          stoppedAt
          createdAt
          updatedAt
        }
      }
      branches {
        id
        name
      }
    }
  }
`;
