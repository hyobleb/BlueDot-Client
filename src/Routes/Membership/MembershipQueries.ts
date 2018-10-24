import { gql } from "apollo-boost";

export const GET_MY_MEMBERSHIPS = gql`
  query getMyMemberships {
    GetMyMemberships {
      ok
      error
      memberships {
        id
        branch {
          name
        }
        startDatetime
        endDatetime
        cabinet {
          cabinetNumber
        }
      }
    }
  }
`;
