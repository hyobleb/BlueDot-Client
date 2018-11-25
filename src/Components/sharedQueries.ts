import { gql } from "apollo-boost";
export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        name
        email
        isHead
        isSupervisor
        isFranchiser
        managingBranches {
          id
        }
        cleaningBranches {
          id
        }
        staffManangingBranches {
          id
        }
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
        id
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
          isDoor
          isFlip
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
        isDoor
        isFlip
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

export const USER_REQUEST_EXTEND_MEMBERSHIP = gql`
  mutation userRequestExtendMembership(
    $exstingMembershipId: Int!
    $productId: Int!
  ) {
    RequestExtendMembership(
      exstingMembershipId: $exstingMembershipId
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

export const USER_REQUEST_EXTEND_CABINET = gql`
  mutation userRequestExtendCabinet(
    $exstingMembershipId: Int!
    $productId: Int!
  ) {
    RequestExtendCabinet(
      exstingMembershipId: $exstingMembershipId
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
          id
          name
        }
        cabinet {
          id
          cabinetNumber
          lockId
          lock {
            id
            lockNumber
            password
          }
        }
        cabinetId
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
          lockId
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

export const GET_MY_MEMBERSHIPS = gql`
  query getMyMemberships {
    GetMyMemberships {
      ok
      error
      memberships {
        id
        branch {
          id
          name
        }
        startDatetime
        endDatetime
        cabinet {
          id
          cabinetNumber
          lock {
            id
            lockNumber
            password
          }
        }
        cabinetId
      }
    }
  }
`;

export const GET_MEMBERSHIP_FOR_EXTEND = gql`
  query getMembershipForExtend($membershipId: Int!, $target: targetOptions) {
    GetMembership(membershipId: $membershipId, target: $target) {
      ok
      error
      membership {
        id
        branch {
          id
        }
        userId
        startDatetime
        endDatetime
        status
        usable
        target
        cabinet {
          id
          cabinetNumber
        }
        cabinetId
      }
    }
  }
`;

export const GUEST_GET_BRANCH = gql`
  query guestGetBranch($branchId: Int!) {
    GuestGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        id
        name
        impId
      }
    }
  }
`;

export const GET_BRANCH_FOR_ERNOLL_CABINET = gql`
  query getBranchForEnrollCabinet($branchId: Int!) {
    UserGetBranch(branchId: $branchId) {
      ok
      error
      branch {
        id
        name
        cabinetLoungeImage
        cabinetSets {
          id
          cabinets {
            id
          }
          title
          width
          height
          xpos
          ypos
          setNumber
          horizontalNumber
          verticalNumber
        }
      }
    }
  }
`;

export const MANAGER_EXTEND_MEMBERSHIP = gql`
  mutation managerExtendMembership(
    $membershipId: Int!
    $endDatetime: String!
    $status: modifyOptions!
    $products: [Int]
    $payMethod: CreatePaymentMethodOption
  ) {
    ManagerUpdateMembershipEndDatetime(
      membershipId: $membershipId
      endDatetime: $endDatetime
      status: $status
      products: $products
      payMethod: $payMethod
    ) {
      ok
      error
    }
  }
`;

export const MANAGER_EXPIRE_MEMBERSHIP = gql`
  mutation managerExpireMembership($membershipId: Int!) {
    ManagerExpireMembership(membershipId: $membershipId) {
      ok
      error
    }
  }
`;
