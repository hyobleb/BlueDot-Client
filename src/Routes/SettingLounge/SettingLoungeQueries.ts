import { gql } from "apollo-boost";

export const HEAD_CREATE_ROOM = gql`
  mutation headCreateRoom(
    $branchId: Int!
    $title: String!
    $roomNumber: Int!
    $roomType: roomTypeOptions!
    $width: Float!
    $height: Float!
    $xpos: Float!
    $ypos: Float!
    $usable: Boolean!
  ) {
    HeadCreateRoom(
      branchId: $branchId
      title: $title
      roomNumber: $roomNumber
      roomType: $roomType
      width: $width
      height: $height
      xpos: $xpos
      ypos: $ypos
      usable: $usable
    ) {
      ok
      error
    }
  }
`;
