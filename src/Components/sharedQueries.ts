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

export const HEAD_GET_BRANCH = gql`
  query headGetBranch($branchId: Int!) {
    HeadGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        id
        name
        impId
        impKey
        impSecret
        branchNumber
        postalCode
        address
        detailAddress
        descriptionPosition
        comment
        branchImage
        loungeImage
        minimapImage
        ips
        directManaged
        maleMax
        femaleMax
        manAcceptable
        womanAcceptable
        boyAcceptable
        girlAcceptable
      }
    }
  }
`;
