import { gql } from "apollo-boost";

export const GET_REQUEST_MEMBERSHIPS = gql`
  query getRequestMemberships {
    UserGetRequest {
      ok
      error
      requestMemberships {
        id
        branch {
          name
        }
        product {
          title
          amount
          target
          hours
        }
        startDatetime
        exstingMembership {
          startDatetime
          endDatetime
        }
        cabinet {
          cabinetNumber
        }
      }
    }
  }
`;

export const DELETE_REQUEST_MEMBERSHIP = gql`
  mutation deleteRequestMembership($RequestMembershipId: Int!) {
    UserDeleteRequest(RequestMembershipId: $RequestMembershipId) {
      ok
      error
    }
  }
`;
