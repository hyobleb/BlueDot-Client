import { gql } from "apollo-boost";

export const GET_MEMBERSHIP_FOR_EXTEND = gql`
  query getMembershipForExtend($membershipId: Int!) {
    GetMembership(membershipId: $membershipId) {
      ok
      error
      membership {
        id
        branch {
          id
        }
        startDatetime
        endDatetime
        status
        usable
        target
        cabinet {
          id
          cabinetNumber
        }
      }
    }
  }
`;
