import { gql } from "apollo-boost";

export const REQ_SIGN_UP = gql`
  mutation reqSignUp(
    $inputUserId: String!
    $phoneNumber: String!
    $email: String!
    $birthYear: Int!
    $birthMonth: Int!
    $birthDay: Int!
    $password: String!
    $name: String!
    $gender: CustomerRequestSignUpGender!
    $branchId: Int!
  ) {
    CustomerRequestSignUp(
      inputUserId: $inputUserId
      phoneNumber: $phoneNumber
      email: $email
      birthYear: $birthYear
      birthMonth: $birthMonth
      birthDay: $birthDay
      password: $password
      name: $name
      gender: $gender
      branchId: $branchId
    ) {
      ok
      error
    }
  }
`;
