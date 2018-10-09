import { gql } from "apollo-boost";
export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        profilePhoto
        name
        email
        isHead
        isSupervisor
        isFranchiser
      }
    }
  }
`;

export const SEARCH_BRANCH = gql`
  query searchBranch($text: String!) {
    SearchBranch(text: $text) {
      ok
      error
      branches {
        id
        name
        descriptionPosition
        address
        detailAddress
        alliedBranches {
          name
        }
      }
    }
  }
`;

export const CERTIFICATE_USER = gql`
  query certificateUser($imp_uid: String!, $branchId: Int!) {
    CertificateUser(imp_uid: $imp_uid, branchId: $branchId) {
      ok
      error
    }
  }
`;
