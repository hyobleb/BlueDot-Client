import { gql } from "apollo-boost";

export const GET_PAYMENTS_BY_IMPUID = gql`
  query getPaymentsByImpUid($impUid: String!) {
    GetPaymentByImpUid(impUid: $impUid) {
      ok
      error
      payments {
        id
        status
        payMethod
        refunded
        amount
        merchant_uid
        impUid
        updatedAt
        user {
          id
          userId
          name
        }
        membershipLogs {
          id
          hours
          actualStartDatetime
          endDatetime
          status
          updatedAt
          target
          branch {
            id
            name
          }
          cabinet {
            id
            cabinetNumber
          }
        }
      }
    }
  }
`;
