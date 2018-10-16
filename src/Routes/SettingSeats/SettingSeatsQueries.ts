import { gql } from "apollo-boost";

export const HEAD_CREATE_SEAT = gql`
  mutation headCreateSeat(
    $branchId: Int!
    $roomId: Int!
    $seatNumber: Int!
    $usable: Boolean!
    $rotate: Float!
    $xpos: Int!
    $ypos: Int!
    $maleUsable: Boolean!
    $femaleUsable: Boolean!
  ) {
    HeadCreateSeat(
      branchId: $branchId
      roomId: $roomId
      seatNumber: $seatNumber
      usable: $usable
      rotate: $rotate
      xpos: $xpos
      ypos: $ypos
      maleUsable: $maleUsable
      femaleUsable: $femaleUsable
    ) {
      ok
      error
    }
  }
`;

export const HEAD_UPDATE_SEAT = gql`
  mutation headUpdateSeat(
    $seatId: Int!
    $seatNumber: Int
    $usable: Boolean
    $rotate: Float
    $xpos: Int
    $ypos: Int
    $maleUsable: Boolean
    $femaleUsable: Boolean
    $discard: Boolean
  ) {
    HeadUpdateSeat(
      seatId: $seatId
      seatNumber: $seatNumber
      usable: $usable
      rotate: $rotate
      xpos: $xpos
      ypos: $ypos
      maleUsable: $maleUsable
      femaleUsable: $femaleUsable
      discard: $discard
    ) {
      ok
      error
    }
  }
`;