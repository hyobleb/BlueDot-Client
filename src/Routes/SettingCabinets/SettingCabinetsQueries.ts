import { gql } from "apollo-boost";

export const HEAD_GET_BRANCH_FOR_CABINETS_SETTING = gql`
  query headGetBranchForCabinetsSetting($branchId: Int!) {
    HeadGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        loungeImage
        cabinetSets {
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
