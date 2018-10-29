import { gql } from "apollo-boost";

export const GET_BRANCH_BY_IP = gql`
  query getBranchByIp($ip: String!) {
    UserGetBranchByIP(ip: $ip) {
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
          }
        }
      }
    }
  }
`;

export const USER_ASSIGN_SEAT = gql`
  mutation userAssignSeat($seatId: Int!) {
    UserAssignSeat(seatId: $seatId) {
      ok
      error
    }
  }
`;
