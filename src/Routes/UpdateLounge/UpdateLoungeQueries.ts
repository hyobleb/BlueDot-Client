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

export const MANAGER_UPDATE_ROOM = gql`
  mutation managerUpdateRoom(
    $roomId: Int!
    $title: String
    $roomNumber: Int
    $roomType: roomTypeOptions
    $usable: Boolean
  ) {
    ManagerUpdateRoom(
      roomId: $roomId
      title: $title
      roomNumber: $roomNumber
      roomType: $roomType
      usable: $usable
    ) {
      ok
      error
    }
  }
`;

export const MANAGER_GET_ROOM = gql`
  query managerGetRoom($roomId: Int!) {
    ManagerGetRoom(roomId: $roomId) {
      ok
      error
      room {
        id
        width
        height
        xpos
        ypos
        title
        roomNumber
        roomType
        usable
        seats {
          id
          seatNumber
          usable
          rotate
          xpos
          ypos
          discard
          nowUsing
          endDatetime
          maleUsable
          femaleUsable
          isDoor
          isFlip
        }
      }
    }
  }
`;
