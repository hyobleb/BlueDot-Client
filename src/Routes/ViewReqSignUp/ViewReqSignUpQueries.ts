import { gql } from "apollo-boost";

export const GET_REQUEST_SIGN_UPS = gql`
  query getRequestSignUps($branchId: Int) {
    ManagerGetRequestSignUps(branchId: $branchId) {
      ok
      error
      requestSignUps {
        id
        inputUserId
        email
        phoneNumber
        birthYear
        birthMonth
        birthDay
        name
        gender
        baseBranch {
          id
          name
        }
        updatedAt
      }
      branch {
        id
        name
      }
    }
  }
`;

export const ACCEPT_REQUEST_SIGN_UP = gql`
  mutation acceptRequestSignUp($reqSignUpId: Int!) {
    ManagerAcceptReqSignUp(reqSignUpId: $reqSignUpId) {
      ok
      error
    }
  }
`;

export const REJECT_REQUEST_SIGN_UP = gql`
  mutation rejectRequestSignUp($reqSignUpId: Int!) {
    ManagerRejectReqSignUp(reqSignUpId: $reqSignUpId) {
      ok
      error
    }
  }
`;
