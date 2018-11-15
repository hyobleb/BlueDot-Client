import { gql } from "apollo-boost";

export const USER_GET_OVERTIME_CABINET_MEMBERSHIPS = gql`
  query userGetOvertimeCabinetMemberships($userId: Int!) {
    GetOvertimeCabinetMemberships(userId: $userId) {
      ok
      error
      memberships {
        id
        startDatetime
        endDatetime
        cabinet {
          id
          cabinetNumber
          branch {
            id
            name
          }
        }
      }
    }
  }
`;
