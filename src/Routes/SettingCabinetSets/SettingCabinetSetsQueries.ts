import { gql } from "apollo-boost";

export const HEAD_GET_BRANCH_FOR_CABINETS_SETTING = gql`
  query headGetBranchForCabinetsSetting($branchId: Int!) {
    ManagerGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        id
        cabinetLoungeImage
        cabinetSets {
          id
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

export const HEAD_CREATE_CABINET_SET = gql`
  mutation headCreateCabinetSet(
    $branchId: Int!
    $title: String!
    $width: Float!
    $height: Float!
    $xpos: Float!
    $ypos: Float!
    $setNumber: Int!
    $horizontalNumber: Int!
    $verticalNumber: Int!
    $startNumber: Int!
  ) {
    HeadCreateCabinetSet(
      branchId: $branchId
      title: $title
      width: $width
      height: $height
      xpos: $xpos
      ypos: $ypos
      setNumber: $setNumber
      horizontalNumber: $horizontalNumber
      verticalNumber: $verticalNumber
      startNumber: $startNumber
    ) {
      ok
      error
    }
  }
`;
