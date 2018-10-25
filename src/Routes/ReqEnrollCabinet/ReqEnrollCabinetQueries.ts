import { gql } from "apollo-boost";

export const GET_BRANCH_FOR_ERNOLL_CABINET = gql`
  query getBranchForEnrollCabinet($branchId: Int!) {
    UserGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        id
        cabinetLoungeImage
        cabinetSets {
          id
          cabinets {
            id
          }
          title
          width
          height
          xpos
          ypos
          setNumber
          horizontalNumber
          verticalNumber
        }
      }
    }
  }
`;
