import { gql } from "apollo-boost";

export const GET_CERTIFICATION = gql`
  query getCertification($imp_uid: String!, $branchId: Int!) {
    GetCertification(imp_uid: $imp_uid, branchId: $branchId) {
      ok
      error
      unique_key
      name
      gender
      birthYear
      birthMonth
      birthDay
    }
  }
`;

export const USER_ID_SIGN_UP_MUTATION = gql`
  mutation userIdsignUpMutation(
    $userId: String!
    $password: String!
    $phoneNumber: String!
    $unique_key: String!
    $name: String!
    $gender: UserIdSignUpGender!
    $birthYear: Int!
    $birthMonth: Int!
    $birthDay: Int!
    $baseBranchId: Int!
    $imp_uid: String!
    $email: String!
  ) {
    UserIdSignUp(
      userId: $userId
      password: $password
      phoneNumber: $phoneNumber
      unique_key: $unique_key
      name: $name
      gender: $gender
      birthYear: $birthYear
      birthMonth: $birthMonth
      birthDay: $birthDay
      baseBranchId: $baseBranchId
      imp_uid: $imp_uid
      email: $email
    ) {
      ok
      error
      token
    }
  }
`;

export const TEMP_USER_ID_SIGN_UP_MUTATION = gql`
  mutation tempUserIdSignUpMutation(
    $userId: String!
    $password: String!
    $phoneNumber: String!
    $unique_key: String!
    $name: String!
    $gender: UserIdSignUpGender!
    $birthYear: Int!
    $birthMonth: Int!
    $birthDay: Int!
    $baseBranchId: Int!
    $imp_uid: String!
  ) {
    TempUserIdSignUp(
      userId: $userId
      password: $password
      phoneNumber: $phoneNumber
      unique_key: $unique_key
      name: $name
      gender: $gender
      birthYear: $birthYear
      birthMonth: $birthMonth
      birthDay: $birthDay
      baseBranchId: $baseBranchId
      imp_uid: $imp_uid
    ) {
      ok
      error
      token
    }
  }
`;
