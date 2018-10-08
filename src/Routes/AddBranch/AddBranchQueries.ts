import { gql } from "apollo-boost";
export const ADD_BRANCH = gql`
  mutation addBranch(
    $branchName: String!
    $branchNumber: Int!
    $postCode: String!
    $address: String!
    $detailAddress: String!
    $branchComment: String!
    $branchPhotos: [String]!
    $descriptionPosition: String!
    $loungeImg: String!
    $minimapImg: String!
    $isMaleAvailable: Boolean!
    $isFemaleAvailable: Boolean!
    $isBoyAvailable: Boolean!
    $isGirlAvailable: Boolean!
    $manMax: Int!
    $womanMax: Int!
    $directManage: Boolean!
  ) {
    HeadCreateBranch(
      name: $branchName
      branchNumber: $branchNumber
      postalCode: $postCode
      address: $address
      detailAddress: $detailAddress
      comment: $branchComment
      branchImage: $branchPhotos
      descriptionPosition: $descriptionPosition
      loungeImage: $loungeImg
      minimapImage: $minimapImg
      manAcceptable: $isMaleAvailable
      womanAcceptable: $isFemaleAvailable
      boyAcceptable: $isBoyAvailable
      girlAcceptable: $isGirlAvailable
      maleMax: $manMax
      femaleMax: $womanMax
      directManaged: $directManage
    ) {
      ok
      error
    }
  }
`;
