import { gql } from "apollo-boost";

export const HEAD_UPDATE_CABINET_SET = gql`
  mutation headUpdateCabinetSet(
    $cabinetSetId: Int!
    $title: String
    $width: Float
    $height: Float
    $xpos: Float
    $ypos: Float
    $setNumber: Int
  ) {
    HeadUpdateCabinetSet(
      cabinetSetId: $cabinetSetId
      title: $title
      width: $width
      height: $height
      xpos: $xpos
      ypos: $ypos
      setNumber: $setNumber
    ) {
      ok
      error
    }
  }
`;
