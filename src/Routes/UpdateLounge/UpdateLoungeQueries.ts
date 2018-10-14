import { gql } from "apollo-boost";

export const HEAD_UPDATE_ROOM = gql`
  mutation headUpdateRoom(
    $roomId: Int!
    $title: String
    $roomNumber: Int
    $roomType: roomTypeOptions
    $width: Float
    $height: Float
    $xpos: Float
    $ypos: Float
    $usable: Boolean
  ) {
    HeadUpdateRoom(
      roomId: $roomId
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
