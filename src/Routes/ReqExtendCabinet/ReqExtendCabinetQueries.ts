import { gql } from "apollo-boost";

export const GET_EXTENDABLE_MEMBERSHIPS = gql`
  query getExtendableMemberships($userId: Int, $target: targetOptions!) {
    GetExtendableMemberships(userId: $userId, target: $target) {
      ok
      error
      memberships {
        id
        branch {
          id
          name
        }
        startDatetime
        endDatetime
        cabinet {
          id
          cabinetNumber
        }
        cabinetId
      }
    }
  }
`;
