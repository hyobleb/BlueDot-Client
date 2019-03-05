import { gql } from "apollo-boost";

export const MANAGER_GET_SEAT_V2 = gql`
  query managerGetSeatV2($seatId: Int!) {
    ManagerGetSeatV2(seatId: $seatId) {
      ok
      error
      seat {
        id
        rotate
        top
        left
        isFlip
        discard
        isDoor
        usable
        maleUsable
        femaleUsable
        seatNumber
      }
    }
  }
`;
