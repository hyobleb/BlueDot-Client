import { gql } from "apollo-boost";
export const MANAGER_REFUND = gql`
  mutation managerRefund(
    $paymentId: Int!
    $refundAmount: Int
    $refundBank: String
    $refundHolder: String
    $refundAccount: String
  ) {
    ManagerRefund(
      paymentId: $paymentId
      refundAmount: $refundAmount
      refundBank: $refundBank
      refundHolder: $refundHolder
      refundAccount: $refundAccount
    ) {
      ok
      error
    }
  }
`;

// userIdSiginIn 은 graphql-apollo에게 주는 이름, 변수들을 넣어줄 때 사용
// UserIdSignIn은 api호출 이름
