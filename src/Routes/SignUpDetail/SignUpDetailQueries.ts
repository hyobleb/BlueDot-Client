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
