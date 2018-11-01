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
            rotate
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

export const USER_RETURN_SEAT = gql`
  mutation userReturnSeat {
    UserReturnSeat {
      ok
      error
    }
  }
`;

export const GET_MY_USING_SEAT = gql`
  query getMyUsingSeat {
    GetMyUsingSeat {
      ok
      error
      seat {
        id
      }
    }
  }
`;
