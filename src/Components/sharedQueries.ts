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
        products {
          id
          title
          amount
          target
          hours
          available
          discard
        }
      }
    }
  }
`;

export const GET_BRANCH_FOR_UPDATE_LOUNGE = gql`
  query getBranchForUpdateLounge($branchId: Int!) {
    HeadGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        loungeImage
        rooms {
          id
          width
          height
          xpos
          ypos
          title
          roomNumber
          roomType
          usable
        }
      }
    }
  }
`;

export const HEAD_GET_ROOM = gql`
  query headGetRoom($roomId: Int!) {
    HeadGetRoom(roomId: $roomId) {
      ok
      error
      room {
        id
        width
        height
        xpos
        ypos
        title
        roomNumber
        roomType
        usable
        seats {
          id
          seatNumber
          usable
          rotate
          xpos
          ypos
          discard
          nowUsing
          endDatetime
          maleUsable
          femaleUsable
        }
      }
    }
  }
`;

export const MANAGER_GET_SEAT = gql`
  query managerGetSeat($seatId: Int!) {
    ManagerGetSeat(seatId: $seatId) {
      ok
      error
      seat {
        id
        seatNumber
        usable
        rotate
        xpos
        ypos
        userId
        user {
          name
        }
        nowUsing
        startDatetime
        endDatetime
        maleUsable
        femaleUsable
        discard
        logs {
          user {
            name
          }
          startDatetime
          endDatetime
          status
        }
      }
    }
  }
`;

export const GET_CABINET_SET = gql`
  query getCabinetSet($cabinetSetId: Int!) {
    GetCabinetSet(cabinetSetId: $cabinetSetId) {
      ok
      error
      cabinetSet {
        title
        width
        height
        xpos
        ypos
        setNumber
      }
    }
  }
`;

export const USER_GET_PRODUCTS = gql`
  query userGetProducts($branchId: Int!) {
    UserGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        id
        name
        products {
          id
          title
          amount
          target
          hours
          available
          discard
        }
      }
    }
  }
`;

export const USER_REQUEST_MEMBERSHIP = gql`
  mutation userRequestMembership(
    $branchId: Int!
    $startDatetime: String!
    $productId: Int!
  ) {
    RequestRegistMembership(
      branchId: $branchId
      startDatetime: $startDatetime
      productId: $productId
    ) {
      ok
      error
    }
  }
`;

export const USER_REQUEST_CABINET = gql`
  mutation userRequestCabinet(
    $branchId: Int!
    $startDatetime: String!
    $cabinetId: Int!
    $productId: Int!
  ) {
    RequestRegistCabinet(
      branchId: $branchId
      startDatetime: $startDatetime
      cabinetId: $cabinetId
      productId: $productId
    ) {
      ok
      error
    }
  }
`;

export const GET_USABLE_MY_MEMBERSHIPS = gql`
  query getUsableMyMemberships {
    GetMyUsableMemberships {
      ok
      error
      memberships {
        id
        startDatetime
        endDatetime
        branch {
          name
        }
        cabinet {
          cabinetNumber
        }
      }
    }
  }
`;

export const GET_CABINETS = gql`
  query getCabinets($cabinetSetId: Int!) {
    GetCabinetSet(cabinetSetId: $cabinetSetId) {
      ok
      error
      cabinetSet {
        title
        width
        height
        xpos
        ypos
        setNumber
        horizontalNumber
        verticalNumber
        cabinets {
          id
          cabinetNumber
          xpos
          ypos
          usable
          nowUsing
          status
          reservedDatetime
          startDatetime
          endDatetime
        }
      }
    }
  }
`;

export const GET_CABINET = gql`
  query getCabinet($cabinetId: Int!) {
    UserGetCabinet(cabinetId: $cabinetId) {
      ok
      error
      cabinet {
        id
        cabinetNumber
        usable
        nowUsing
        status
        reservedDatetime
        endDatetime
      }
    }
  }
`;
