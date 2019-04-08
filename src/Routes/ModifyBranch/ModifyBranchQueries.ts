import { gql } from "apollo-boost";
export const UPDATE_BRANCH = gql`
  mutation updateBranch(
    $branchId: Int!
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
    $manMax: Int!
    $womanMax: Int!
    $directManage: Boolean!
    $ips: [String]
    $manAcceptable: Boolean!
    $womanAcceptable: Boolean!
    $boyAcceptable: Boolean!
    $girlAcceptable: Boolean!
    $impId: String
    $impKey: String
    $impSecret: String
    $lat: Float
    $lng: Float
    $thumbEnrollId: String!
    $thumbEnrollPs: String!
    $tempEnterId: String
    $tempEnterPs: String
    $plusTokUrl: String!
    $plusTokTempleteCode: String!
  ) {
    HeadUpdateBranch(
      branchId: $branchId
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
      manAcceptable: $manAcceptable
      womanAcceptable: $womanAcceptable
      boyAcceptable: $boyAcceptable
      girlAcceptable: $girlAcceptable
      impId: $impId
      impKey: $impKey
      impSecret: $impSecret
      lat: $lat
      lng: $lng
      thumbEnrollId: $thumbEnrollId
      thumbEnrollPs: $thumbEnrollPs
      tempEnterId: $tempEnterId
      tempEnterPs: $tempEnterPs
      plusTokUrl: $plusTokUrl
      plusTokTempleteCode: $plusTokTempleteCode
    ) {
      ok
      error
    }
  }
`;

export const MANAGER_UPDATE_BRANCH = gql`
  mutation managerUpdateBranch(
    $branchId: Int!
    $detailAddress: String
    $descriptionPosition: String
    $ips: [String]
    $manAcceptable: Boolean
    $womanAcceptable: Boolean
    $boyAcceptable: Boolean
    $girlAcceptable: Boolean
    $maleMax: Int
    $femaleMax: Int
    $available: Boolean
    $lat: Float
    $lng: Float
    $thumbEnrollId: String!
    $thumbEnrollPs: String!
    $tempEnterId: String!
    $tempEnterPs: String!
    $plusTokUrl: String!
    $plusTokTempleteCode: String!
  ) {
    ManagerUpdateBranch(
      branchId: $branchId
      detailAddress: $detailAddress
      descriptionPosition: $descriptionPosition
      ips: $ips
      manAcceptable: $manAcceptable
      womanAcceptable: $womanAcceptable
      boyAcceptable: $boyAcceptable
      girlAcceptable: $girlAcceptable
      maleMax: $maleMax
      femaleMax: $femaleMax
      available: $available
      lat: $lat
      lng: $lng
      thumbEnrollId: $thumbEnrollId
      thumbEnrollPs: $thumbEnrollPs
      tempEnterId: $tempEnterId
      tempEnterPs: $tempEnterPs
      plusTokUrl: $plusTokUrl
      plusTokTempleteCode: $plusTokTempleteCode
    ) {
      ok
      error
    }
  }
`;
