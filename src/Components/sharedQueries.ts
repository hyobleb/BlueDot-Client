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
        isManStaff
        isCleanStaff
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
        lat
        lng
        alliedBranches {
          name
        }
      }
    }
  }
`;

export const MANAGER_GET_BRANCH = gql`
  query managerGetBranch($branchId: Int!) {
    ManagerGetBranch(branchId: $branchId) {
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
        cabinetLoungeImage
        minimapImage
        ips
        directManaged
        maleMax
        femaleMax
        manAcceptable
        womanAcceptable
        boyAcceptable
        girlAcceptable
        lat
        lng
        thumbEnrollId
        thumbEnrollPs
        tempEnterId
        tempEnterPs
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
    ManagerGetBranch(branchId: $branchId) {
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
        target
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

export const GET_MANAGING_BRANCHES = gql`
  query getManaingBranches {
    GetManagingBranches {
      ok
      error
      branches {
        id
        name
        descriptionPosition
        address
        detailAddress
        alliedBranches {
          id
          name
        }
      }
    }
  }
`;

export const GET_PAYMENT_INFO = gql`
  query getPaymentInfo($paymentId: Int!) {
    GetPayment(paymentId: $paymentId) {
      ok
      error
      payment {
        id
        status
        payMethod
        refunded
        amount
        merchant_uid
        impUid
        updatedAt
        user {
          id
          userId
          name
        }
        membershipLogs {
          id
          hours
          actualStartDatetime
          endDatetime
          status
          updatedAt
          target
          branch {
            id
            name
          }
          cabinet {
            id
            cabinetNumber
          }
        }
      }
    }
  }
`;

export const GET_VBNAK_PAYMENTS = gql`
  query getVbankPayments {
    GetVbankPayments {
      ok
      error
      payments {
        id
        amount
        vbankNum
        vbankDate
        vbankName
        createdAt
        requestMemberships {
          id
          startDatetime
          product {
            id
            title
            hours
            amount
          }
          branch {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_ALL_BRANCHES = gql`
  query getAllBranches {
    GetAllBranches {
      ok
      error
      branches {
        id
        name
        address
        city
        district
        descriptionPosition
        detailAddress
        alliedBranches {
          id
          name
        }
      }
    }
  }
`;

export const GET_SEATS = gql`
  query getSeats($roomId: Int!) {
    GetSeats(roomId: $roomId) {
      ok
      error
      seats {
        id
        seatNumber
        rotate
        xpos
        ypos
        left
        top
        isFlip
        discard
        isDoor
        user {
          id
          gender
        }
        userName
        usable
        nowUsing
        endDatetime
        maleUsable
        femaleUsable
        seatImg
      }
    }
  }
`;

export const GET_SEATS_V2 = gql`
  query getSeatsV2($roomId: Int!) {
    GetSeatsV2(roomId: $roomId) {
      ok
      error
      seats {
        id
        seatNumber
        rotate
        xpos
        ypos
        left
        top
        isFlip
        discard
        isDoor
        userName
        usable
        nowUsing
        endDatetime
        maleUsable
        femaleUsable
        seatImg
      }
    }
  }
`;

export const USER_GET_BRANCH_PRODUCTS = gql`
  query userGetBranchProducts($branchId: Int!) {
    UserGetBranchProducts(branchId: $branchId) {
      ok
      error
      products {
        id
        title
        amount
        target
        hours
        available
        discard
        branchName
      }
      branchName
    }
  }
`;

export const GET_MY_USING_SEAT_ID = gql`
  query getMyUsingSeatId {
    GetMyUsingSeatId {
      ok
      error
      seat {
        id
      }
    }
  }
`;
