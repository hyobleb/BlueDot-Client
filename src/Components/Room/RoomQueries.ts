import { gql } from "apollo-boost";

export const GET_SEATS = gql`
  query getSeats($roomId: Int!) {
    GetSeats(roomId: $roomId) {
      ok
      error
      seats {
        id
        seatNumber
        rotate
        xpos
        ypos
        isFlip
        discard
        isDoor
        user {
          id
          gender
        }
        usable
        nowUsing
        endDatetime
        maleUsable
        femaleUsable
      }
    }
  }
`;
