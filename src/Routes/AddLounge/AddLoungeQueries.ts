import { gql } from "apollo-boost";

export const GET_BRANCH_FOR_UPDATE_LOUNGE = gql`
  query getBranch($branchId: Int!) {
    HeadGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        loungeImage
        rooms {
          id
          width
          height
          xpos
          ypos
        }
      }
    }
  }
`;
