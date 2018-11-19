import { gql } from "apollo-boost";

export const GET_BRANCH_FOR_MAN_SEAT = gql`
  query getBranchForManSeat($branchId: Int!) {
    GetBranchForManSeat(branchId: $branchId) {
      ok
      error
      branch {
        id
        name
        loungeImage
        minimapImage
        rooms {
          id
          width
          height
          xpos
          ypos
          usable
          seats {
            id
            xpos
            ypos
            discard
            nowUsing
            endDatetime
            usable
            rotate
          }
        }
      }
    }
  }
`;
