import { gql } from "apollo-boost";

export const GET_REQUEST_MEMBERSHIPS = gql`
  query getRequestMemberships {
    UserGetRequest {
      ok
      error
      requestMemberships {
        id
        branch {
          id
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
        status
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

export const CREATE_PAYMENT = gql`
  mutation createPayment($userId: Int, $payMethod: CreatePaymentMethodOption!) {
    CreatePayment(userId: $userId, payMethod: $payMethod) {
      ok
      error
      payment {
        id
      }
    }
  }
`;

export const GET_BRANCH_FOR_IMP = gql`
  query getBranchForImp($branchId: Int!) {
    GuestGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        impId
      }
    }
  }
`;

export const GET_PAYMENT = gql`
  query getPayment($paymentId: Int!) {
    UserGetPayment(paymentId: $paymentId) {
      ok
      error
      payment {
        id
        user {
          name
          phoneNumber
        }
        payMethod
        merchant_uid
        amount
      }
    }
  }
`;

export const COMPLETE_PAYMENT = gql`
  mutation completePayment(
    $paymentId: Int!
    $imp_uid: String!
    $merchant_uid: String!
  ) {
    CompletePayment(
      paymentId: $paymentId
      imp_uid: $imp_uid
      merchant_uid: $merchant_uid
    ) {
      ok
      error
    }
  }
`;
