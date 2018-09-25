import { gql } from "apollo-boost";
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $email: String!
    $password: String! # $profilePhoto: String!
  ) {
    UpdateMyProfile(
      email: $email
      password: $password
    ) # profilePhoto: $profilePhoto
    {
      ok
      error
    }
  }
`;
