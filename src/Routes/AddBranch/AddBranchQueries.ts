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
    $cabinetLoungeImg: String!
    $manMax: Int!
    $womanMax: Int!
    $directManage: Boolean!
    $ips: [String]
    $lat: Float!
    $lng: Float!
    $thumbEnrollId: String!
    $thumbEnrollPs: String!
    $tempEnterId: String!
    $tempEnterPs: String!
    $plusTokUrl: String!
    $plustTokTempleteCode: String!
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
      maleMax: $manMax
      femaleMax: $womanMax
      directManaged: $directManage
      ips: $ips
      cabinetLoungeImage: $cabinetLoungeImg
      lat: $lat
      lng: $lng
      thumbEnrollId: $thumbEnrollId
      thumbEnrollPs: $thumbEnrollPs
      tempEnterId: $tempEnterId
      tempEnterPs: $tempEnterPs
      plusTokUrl: $plusTokUrl
      plustTokTempleteCode: $plustTokTempleteCode
    ) {
      ok
      error
    }
  }
`;
