/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userGetBranches
// ====================================================

export interface userGetBranches_UserGetBranches_branches_alliedBranches {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface userGetBranches_UserGetBranches_branches {
  __typename: "Branch";
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  descriptionPosition: string;
  comment: string | null;
  branchImage: (string | null)[];
  loungeImage: string;
  alliedBranches: (userGetBranches_UserGetBranches_branches_alliedBranches | null)[] | null;
  manAcceptable: boolean | null;
  womanAcceptable: boolean | null;
  boyAcceptable: boolean | null;
  girlAcceptable: boolean | null;
  maleMax: number;
  femaleMax: number;
  available: boolean;
  lat: number;
  lng: number;
}

export interface userGetBranches_UserGetBranches {
  __typename: "UserGetBranchesResponse";
  ok: boolean;
  error: string | null;
  branches: (userGetBranches_UserGetBranches_branches | null)[] | null;
}

export interface userGetBranches {
  UserGetBranches: userGetBranches_UserGetBranches;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCabinetLock
// ====================================================

export interface createCabinetLock_ManagerCreateCabinetLock {
  __typename: "ManagerCreateCabinetLockResponse";
  ok: boolean;
  error: string | null;
}

export interface createCabinetLock {
  ManagerCreateCabinetLock: createCabinetLock_ManagerCreateCabinetLock;
}

export interface createCabinetLockVariables {
  branchId: number;
  cabinetNumber: number;
  lockNumber: number;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: modifyCabinetLock
// ====================================================

export interface modifyCabinetLock_ManagerUpdateCabinetLock {
  __typename: "ManagerUpdateCabinetLockResponse";
  ok: boolean;
  error: string | null;
}

export interface modifyCabinetLock {
  ManagerUpdateCabinetLock: modifyCabinetLock_ManagerUpdateCabinetLock;
}

export interface modifyCabinetLockVariables {
  cabinetLockId: number;
  cabinetNumber?: number | null;
  lockNumber?: number | null;
  password?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerRefund
// ====================================================

export interface managerRefund_ManagerRefund {
  __typename: "ManagerRefundResponse";
  ok: boolean;
  error: string | null;
}

export interface managerRefund {
  ManagerRefund: managerRefund_ManagerRefund;
}

export interface managerRefundVariables {
  paymentId: number;
  refundAmount?: number | null;
  refundBank?: string | null;
  refundHolder?: string | null;
  refundAccount?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSeats
// ====================================================

export interface getSeats_GetSeats_seats_user {
  __typename: "User";
  id: number;
  gender: string | null;
}

export interface getSeats_GetSeats_seats {
  __typename: "Seat";
  id: number;
  seatNumber: number;
  rotate: number;
  xpos: number;
  ypos: number;
  isFlip: boolean;
  discard: boolean;
  isDoor: boolean;
  user: getSeats_GetSeats_seats_user | null;
  usable: boolean;
  nowUsing: boolean;
  endDatetime: string | null;
  maleUsable: boolean;
  femaleUsable: boolean;
}

export interface getSeats_GetSeats {
  __typename: "GetSeatsResponse";
  ok: boolean;
  error: string | null;
  seats: (getSeats_GetSeats_seats | null)[] | null;
}

export interface getSeats {
  GetSeats: getSeats_GetSeats;
}

export interface getSeatsVariables {
  roomId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchUsers
// ====================================================

export interface searchUsers_ManagerSearchUsers_users {
  __typename: "User";
  id: number;
  userId: string | null;
  name: string | null;
  gender: string | null;
  phoneNumber: string | null;
}

export interface searchUsers_ManagerSearchUsers {
  __typename: "ManagerSearchUsersResponse";
  ok: boolean;
  error: string | null;
  users: (searchUsers_ManagerSearchUsers_users | null)[] | null;
}

export interface searchUsers {
  ManagerSearchUsers: searchUsers_ManagerSearchUsers;
}

export interface searchUsersVariables {
  text: string;
  searchType: SearchType;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user_managingBranches {
  __typename: "Branch";
  id: number;
}

export interface userProfile_GetMyProfile_user_cleaningBranches {
  __typename: "Branch";
  id: number;
}

export interface userProfile_GetMyProfile_user_staffManangingBranches {
  __typename: "Branch";
  id: number;
}

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  profilePhoto: string | null;
  name: string | null;
  email: string;
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
  isManStaff: boolean;
  isCleanStaff: boolean;
  managingBranches: (userProfile_GetMyProfile_user_managingBranches | null)[];
  cleaningBranches: (userProfile_GetMyProfile_user_cleaningBranches | null)[];
  staffManangingBranches: (userProfile_GetMyProfile_user_staffManangingBranches | null)[];
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchBranch
// ====================================================

export interface searchBranch_SearchBranch_branches_alliedBranches {
  __typename: "Branch";
  name: string;
}

export interface searchBranch_SearchBranch_branches {
  __typename: "Branch";
  id: number;
  name: string;
  descriptionPosition: string;
  address: string;
  detailAddress: string;
  lat: number;
  lng: number;
  alliedBranches: (searchBranch_SearchBranch_branches_alliedBranches | null)[] | null;
}

export interface searchBranch_SearchBranch {
  __typename: "SearchBranchResponse";
  ok: boolean;
  error: string | null;
  branches: (searchBranch_SearchBranch_branches | null)[] | null;
}

export interface searchBranch {
  SearchBranch: searchBranch_SearchBranch;
}

export interface searchBranchVariables {
  text: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: certificateUser
// ====================================================

export interface certificateUser_CertificateUser {
  __typename: "CertificateUserResponse";
  ok: boolean;
  error: string | null;
}

export interface certificateUser {
  CertificateUser: certificateUser_CertificateUser;
}

export interface certificateUserVariables {
  imp_uid: string;
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetBranch
// ====================================================

export interface managerGetBranch_ManagerGetBranch_branch_products {
  __typename: "Product";
  id: number;
  title: string;
  amount: number;
  target: string;
  hours: number;
  available: boolean;
  discard: boolean;
}

export interface managerGetBranch_ManagerGetBranch_branch {
  __typename: "Branch";
  id: number;
  name: string;
  impId: string | null;
  impKey: string | null;
  impSecret: string | null;
  branchNumber: number;
  postalCode: string;
  address: string;
  detailAddress: string;
  descriptionPosition: string;
  comment: string | null;
  branchImage: (string | null)[];
  loungeImage: string;
  cabinetLoungeImage: string;
  minimapImage: string;
  ips: (string | null)[] | null;
  directManaged: boolean | null;
  maleMax: number;
  femaleMax: number;
  manAcceptable: boolean | null;
  womanAcceptable: boolean | null;
  boyAcceptable: boolean | null;
  girlAcceptable: boolean | null;
  lat: number;
  lng: number;
  products: (managerGetBranch_ManagerGetBranch_branch_products | null)[] | null;
}

export interface managerGetBranch_ManagerGetBranch {
  __typename: "ManagerGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: managerGetBranch_ManagerGetBranch_branch | null;
}

export interface managerGetBranch {
  ManagerGetBranch: managerGetBranch_ManagerGetBranch;
}

export interface managerGetBranchVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBranchForUpdateLounge
// ====================================================

export interface getBranchForUpdateLounge_ManagerGetBranch_branch_rooms {
  __typename: "Room";
  id: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  title: string;
  roomNumber: number;
  roomType: string;
  usable: boolean;
}

export interface getBranchForUpdateLounge_ManagerGetBranch_branch {
  __typename: "Branch";
  id: number;
  loungeImage: string;
  rooms: (getBranchForUpdateLounge_ManagerGetBranch_branch_rooms | null)[] | null;
}

export interface getBranchForUpdateLounge_ManagerGetBranch {
  __typename: "ManagerGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: getBranchForUpdateLounge_ManagerGetBranch_branch | null;
}

export interface getBranchForUpdateLounge {
  ManagerGetBranch: getBranchForUpdateLounge_ManagerGetBranch;
}

export interface getBranchForUpdateLoungeVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: headGetRoom
// ====================================================

export interface headGetRoom_HeadGetRoom_room_seats {
  __typename: "Seat";
  id: number;
  seatNumber: number;
  usable: boolean;
  rotate: number;
  xpos: number;
  ypos: number;
  discard: boolean;
  nowUsing: boolean;
  endDatetime: string | null;
  maleUsable: boolean;
  femaleUsable: boolean;
  isDoor: boolean;
  isFlip: boolean;
}

export interface headGetRoom_HeadGetRoom_room {
  __typename: "Room";
  id: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  title: string;
  roomNumber: number;
  roomType: string;
  usable: boolean;
  seats: (headGetRoom_HeadGetRoom_room_seats | null)[] | null;
}

export interface headGetRoom_HeadGetRoom {
  __typename: "HeadGetRoomResponse";
  ok: boolean;
  error: string | null;
  room: headGetRoom_HeadGetRoom_room | null;
}

export interface headGetRoom {
  HeadGetRoom: headGetRoom_HeadGetRoom;
}

export interface headGetRoomVariables {
  roomId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetSeat
// ====================================================

export interface managerGetSeat_ManagerGetSeat_seat_user {
  __typename: "User";
  name: string | null;
}

export interface managerGetSeat_ManagerGetSeat_seat_logs_user {
  __typename: "User";
  name: string | null;
}

export interface managerGetSeat_ManagerGetSeat_seat_logs {
  __typename: "SeatLog";
  user: managerGetSeat_ManagerGetSeat_seat_logs_user;
  startDatetime: string;
  endDatetime: string;
  status: string;
}

export interface managerGetSeat_ManagerGetSeat_seat {
  __typename: "Seat";
  id: number;
  seatNumber: number;
  usable: boolean;
  rotate: number;
  xpos: number;
  ypos: number;
  userId: number | null;
  user: managerGetSeat_ManagerGetSeat_seat_user | null;
  nowUsing: boolean;
  startDatetime: string | null;
  endDatetime: string | null;
  maleUsable: boolean;
  femaleUsable: boolean;
  discard: boolean;
  isDoor: boolean;
  isFlip: boolean;
  logs: (managerGetSeat_ManagerGetSeat_seat_logs | null)[] | null;
}

export interface managerGetSeat_ManagerGetSeat {
  __typename: "ManagerGetSeatResponse";
  ok: boolean;
  error: string | null;
  seat: managerGetSeat_ManagerGetSeat_seat | null;
}

export interface managerGetSeat {
  ManagerGetSeat: managerGetSeat_ManagerGetSeat;
}

export interface managerGetSeatVariables {
  seatId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCabinetSet
// ====================================================

export interface getCabinetSet_GetCabinetSet_cabinetSet {
  __typename: "CabinetSet";
  title: string;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  setNumber: number;
}

export interface getCabinetSet_GetCabinetSet {
  __typename: "GetCabinetSetResponse";
  ok: boolean;
  error: string | null;
  cabinetSet: getCabinetSet_GetCabinetSet_cabinetSet | null;
}

export interface getCabinetSet {
  GetCabinetSet: getCabinetSet_GetCabinetSet;
}

export interface getCabinetSetVariables {
  cabinetSetId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userGetProducts
// ====================================================

export interface userGetProducts_UserGetBranch_branch_products {
  __typename: "Product";
  id: number;
  title: string;
  amount: number;
  target: string;
  hours: number;
  available: boolean;
  discard: boolean;
}

export interface userGetProducts_UserGetBranch_branch {
  __typename: "Branch";
  id: number;
  name: string;
  products: (userGetProducts_UserGetBranch_branch_products | null)[] | null;
}

export interface userGetProducts_UserGetBranch {
  __typename: "UserGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: userGetProducts_UserGetBranch_branch | null;
}

export interface userGetProducts {
  UserGetBranch: userGetProducts_UserGetBranch;
}

export interface userGetProductsVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userRequestMembership
// ====================================================

export interface userRequestMembership_RequestRegistMembership {
  __typename: "RequestRegistMembershipResponse";
  ok: boolean;
  error: string | null;
}

export interface userRequestMembership {
  RequestRegistMembership: userRequestMembership_RequestRegistMembership;
}

export interface userRequestMembershipVariables {
  branchId: number;
  startDatetime: string;
  productId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userRequestExtendMembership
// ====================================================

export interface userRequestExtendMembership_RequestExtendMembership {
  __typename: "RequestExtendMembershipResponse";
  ok: boolean;
  error: string | null;
}

export interface userRequestExtendMembership {
  RequestExtendMembership: userRequestExtendMembership_RequestExtendMembership;
}

export interface userRequestExtendMembershipVariables {
  exstingMembershipId: number;
  productId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userRequestCabinet
// ====================================================

export interface userRequestCabinet_RequestRegistCabinet {
  __typename: "RequestRegistCabinetResponse";
  ok: boolean;
  error: string | null;
}

export interface userRequestCabinet {
  RequestRegistCabinet: userRequestCabinet_RequestRegistCabinet;
}

export interface userRequestCabinetVariables {
  branchId: number;
  startDatetime: string;
  cabinetId: number;
  productId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userRequestExtendCabinet
// ====================================================

export interface userRequestExtendCabinet_RequestExtendCabinet {
  __typename: "RequestExtendCabinetResponse";
  ok: boolean;
  error: string | null;
}

export interface userRequestExtendCabinet {
  RequestExtendCabinet: userRequestExtendCabinet_RequestExtendCabinet;
}

export interface userRequestExtendCabinetVariables {
  exstingMembershipId: number;
  productId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUsableMyMemberships
// ====================================================

export interface getUsableMyMemberships_GetMyUsableMemberships_memberships_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getUsableMyMemberships_GetMyUsableMemberships_memberships_cabinet_lock {
  __typename: "CabinetLock";
  id: number;
  lockNumber: number;
  password: string;
}

export interface getUsableMyMemberships_GetMyUsableMemberships_memberships_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
  lockId: number | null;
  lock: getUsableMyMemberships_GetMyUsableMemberships_memberships_cabinet_lock | null;
}

export interface getUsableMyMemberships_GetMyUsableMemberships_memberships {
  __typename: "Membership";
  id: number;
  startDatetime: string;
  endDatetime: string;
  branch: getUsableMyMemberships_GetMyUsableMemberships_memberships_branch;
  cabinet: getUsableMyMemberships_GetMyUsableMemberships_memberships_cabinet | null;
  cabinetId: number | null;
}

export interface getUsableMyMemberships_GetMyUsableMemberships {
  __typename: "GetMyUsableMembershipsResponse";
  ok: boolean;
  error: string | null;
  memberships: (getUsableMyMemberships_GetMyUsableMemberships_memberships | null)[] | null;
}

export interface getUsableMyMemberships {
  GetMyUsableMemberships: getUsableMyMemberships_GetMyUsableMemberships;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCabinets
// ====================================================

export interface getCabinets_GetCabinetSet_cabinetSet_cabinets {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
  xpos: number;
  ypos: number;
  usable: boolean;
  nowUsing: boolean;
  status: string | null;
  reservedDatetime: string | null;
  startDatetime: string | null;
  endDatetime: string | null;
  lockId: number | null;
}

export interface getCabinets_GetCabinetSet_cabinetSet {
  __typename: "CabinetSet";
  title: string;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  setNumber: number;
  horizontalNumber: number;
  verticalNumber: number;
  cabinets: (getCabinets_GetCabinetSet_cabinetSet_cabinets | null)[] | null;
}

export interface getCabinets_GetCabinetSet {
  __typename: "GetCabinetSetResponse";
  ok: boolean;
  error: string | null;
  cabinetSet: getCabinets_GetCabinetSet_cabinetSet | null;
}

export interface getCabinets {
  GetCabinetSet: getCabinets_GetCabinetSet;
}

export interface getCabinetsVariables {
  cabinetSetId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCabinet
// ====================================================

export interface getCabinet_UserGetCabinet_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
  usable: boolean;
  nowUsing: boolean;
  status: string | null;
  reservedDatetime: string | null;
  endDatetime: string | null;
}

export interface getCabinet_UserGetCabinet {
  __typename: "UserGetCabinetResponse";
  ok: boolean;
  error: string | null;
  cabinet: getCabinet_UserGetCabinet_cabinet | null;
}

export interface getCabinet {
  UserGetCabinet: getCabinet_UserGetCabinet;
}

export interface getCabinetVariables {
  cabinetId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyMemberships
// ====================================================

export interface getMyMemberships_GetMyMemberships_memberships_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getMyMemberships_GetMyMemberships_memberships_cabinet_lock {
  __typename: "CabinetLock";
  id: number;
  lockNumber: number;
  password: string;
}

export interface getMyMemberships_GetMyMemberships_memberships_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
  lock: getMyMemberships_GetMyMemberships_memberships_cabinet_lock | null;
}

export interface getMyMemberships_GetMyMemberships_memberships {
  __typename: "Membership";
  id: number;
  branch: getMyMemberships_GetMyMemberships_memberships_branch;
  startDatetime: string;
  endDatetime: string;
  cabinet: getMyMemberships_GetMyMemberships_memberships_cabinet | null;
  cabinetId: number | null;
}

export interface getMyMemberships_GetMyMemberships {
  __typename: "GetMyMembershipsResponse";
  ok: boolean | null;
  error: string | null;
  memberships: (getMyMemberships_GetMyMemberships_memberships | null)[] | null;
}

export interface getMyMemberships {
  GetMyMemberships: getMyMemberships_GetMyMemberships;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMembershipForExtend
// ====================================================

export interface getMembershipForExtend_GetMembership_membership_branch {
  __typename: "Branch";
  id: number;
}

export interface getMembershipForExtend_GetMembership_membership_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
}

export interface getMembershipForExtend_GetMembership_membership {
  __typename: "Membership";
  id: number;
  branch: getMembershipForExtend_GetMembership_membership_branch;
  userId: number | null;
  startDatetime: string;
  endDatetime: string;
  status: string;
  usable: boolean;
  target: string;
  cabinet: getMembershipForExtend_GetMembership_membership_cabinet | null;
  cabinetId: number | null;
}

export interface getMembershipForExtend_GetMembership {
  __typename: "GetMembershipResponse";
  ok: boolean | null;
  error: string | null;
  membership: getMembershipForExtend_GetMembership_membership | null;
}

export interface getMembershipForExtend {
  GetMembership: getMembershipForExtend_GetMembership;
}

export interface getMembershipForExtendVariables {
  membershipId: number;
  target?: targetOptions | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: guestGetBranch
// ====================================================

export interface guestGetBranch_GuestGetBranch_branch {
  __typename: "SimpleBranch";
  id: number;
  name: string | null;
  impId: string | null;
}

export interface guestGetBranch_GuestGetBranch {
  __typename: "GuestGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: guestGetBranch_GuestGetBranch_branch | null;
}

export interface guestGetBranch {
  GuestGetBranch: guestGetBranch_GuestGetBranch;
}

export interface guestGetBranchVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBranchForEnrollCabinet
// ====================================================

export interface getBranchForEnrollCabinet_UserGetBranch_branch_cabinetSets_cabinets {
  __typename: "Cabinet";
  id: number;
}

export interface getBranchForEnrollCabinet_UserGetBranch_branch_cabinetSets {
  __typename: "CabinetSet";
  id: number;
  cabinets: (getBranchForEnrollCabinet_UserGetBranch_branch_cabinetSets_cabinets | null)[] | null;
  title: string;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  setNumber: number;
  horizontalNumber: number;
  verticalNumber: number;
}

export interface getBranchForEnrollCabinet_UserGetBranch_branch {
  __typename: "Branch";
  id: number;
  name: string;
  cabinetLoungeImage: string;
  cabinetSets: (getBranchForEnrollCabinet_UserGetBranch_branch_cabinetSets | null)[] | null;
}

export interface getBranchForEnrollCabinet_UserGetBranch {
  __typename: "UserGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: getBranchForEnrollCabinet_UserGetBranch_branch | null;
}

export interface getBranchForEnrollCabinet {
  UserGetBranch: getBranchForEnrollCabinet_UserGetBranch;
}

export interface getBranchForEnrollCabinetVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerExtendMembership
// ====================================================

export interface managerExtendMembership_ManagerUpdateMembershipEndDatetime {
  __typename: "ManagerUpdateMembershipEndDatetimeReseponse";
  ok: boolean;
  error: string | null;
}

export interface managerExtendMembership {
  ManagerUpdateMembershipEndDatetime: managerExtendMembership_ManagerUpdateMembershipEndDatetime;
}

export interface managerExtendMembershipVariables {
  membershipId: number;
  endDatetime: string;
  status: modifyOptions;
  products?: (number | null)[] | null;
  payMethod?: CreatePaymentMethodOption | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerExpireMembership
// ====================================================

export interface managerExpireMembership_ManagerExpireMembership {
  __typename: "ManagerExpireMembershipResponse";
  ok: boolean;
  error: string | null;
}

export interface managerExpireMembership {
  ManagerExpireMembership: managerExpireMembership_ManagerExpireMembership;
}

export interface managerExpireMembershipVariables {
  membershipId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getManaingBranches
// ====================================================

export interface getManaingBranches_GetManagingBranches_branches_alliedBranches {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getManaingBranches_GetManagingBranches_branches {
  __typename: "Branch";
  id: number;
  name: string;
  descriptionPosition: string;
  address: string;
  detailAddress: string;
  alliedBranches: (getManaingBranches_GetManagingBranches_branches_alliedBranches | null)[] | null;
}

export interface getManaingBranches_GetManagingBranches {
  __typename: "GetManagingBranchesResponse";
  ok: boolean;
  error: string | null;
  branches: (getManaingBranches_GetManagingBranches_branches | null)[] | null;
}

export interface getManaingBranches {
  GetManagingBranches: getManaingBranches_GetManagingBranches;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPaymentInfo
// ====================================================

export interface getPaymentInfo_GetPayment_payment_user {
  __typename: "User";
  id: number;
  userId: string | null;
  name: string | null;
}

export interface getPaymentInfo_GetPayment_payment_membershipLogs_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getPaymentInfo_GetPayment_payment_membershipLogs_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
}

export interface getPaymentInfo_GetPayment_payment_membershipLogs {
  __typename: "MembershipLog";
  id: number;
  hours: number;
  actualStartDatetime: string;
  endDatetime: string;
  status: string;
  updatedAt: string;
  target: string;
  branch: getPaymentInfo_GetPayment_payment_membershipLogs_branch;
  cabinet: getPaymentInfo_GetPayment_payment_membershipLogs_cabinet | null;
}

export interface getPaymentInfo_GetPayment_payment {
  __typename: "Payment";
  id: number;
  status: string;
  payMethod: string | null;
  refunded: boolean;
  amount: number;
  merchant_uid: string;
  impUid: string | null;
  updatedAt: string | null;
  user: getPaymentInfo_GetPayment_payment_user;
  membershipLogs: (getPaymentInfo_GetPayment_payment_membershipLogs | null)[] | null;
}

export interface getPaymentInfo_GetPayment {
  __typename: "GetPaymentResponse";
  ok: boolean;
  error: string | null;
  payment: getPaymentInfo_GetPayment_payment | null;
}

export interface getPaymentInfo {
  GetPayment: getPaymentInfo_GetPayment;
}

export interface getPaymentInfoVariables {
  paymentId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addBranch
// ====================================================

export interface addBranch_HeadCreateBranch {
  __typename: "HeadCreateBranchResponse";
  ok: boolean;
  error: string | null;
}

export interface addBranch {
  HeadCreateBranch: addBranch_HeadCreateBranch;
}

export interface addBranchVariables {
  branchName: string;
  branchNumber: number;
  postCode: string;
  address: string;
  detailAddress: string;
  branchComment: string;
  branchPhotos: (string | null)[];
  descriptionPosition: string;
  loungeImg: string;
  minimapImg: string;
  cabinetLoungeImg: string;
  manMax: number;
  womanMax: number;
  directManage: boolean;
  ips?: (string | null)[] | null;
  lat: number;
  lng: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addProduct
// ====================================================

export interface addProduct_HeadCreateProduct {
  __typename: "HeadCreateProductResponse";
  ok: boolean;
  error: string | null;
}

export interface addProduct {
  HeadCreateProduct: addProduct_HeadCreateProduct;
}

export interface addProductVariables {
  title: string;
  amount: number;
  target: membershipOptions;
  hours: number;
  branchId: number;
  available: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRequestMemberships
// ====================================================

export interface getRequestMemberships_UserGetRequest_requestMemberships_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getRequestMemberships_UserGetRequest_requestMemberships_product {
  __typename: "Product";
  title: string;
  amount: number;
  target: string;
  hours: number;
}

export interface getRequestMemberships_UserGetRequest_requestMemberships_exstingMembership {
  __typename: "Membership";
  startDatetime: string;
  endDatetime: string;
}

export interface getRequestMemberships_UserGetRequest_requestMemberships_cabinet {
  __typename: "Cabinet";
  cabinetNumber: number;
}

export interface getRequestMemberships_UserGetRequest_requestMemberships {
  __typename: "RequestMembership";
  id: number;
  branch: getRequestMemberships_UserGetRequest_requestMemberships_branch;
  product: getRequestMemberships_UserGetRequest_requestMemberships_product;
  startDatetime: string | null;
  exstingMembership: getRequestMemberships_UserGetRequest_requestMemberships_exstingMembership | null;
  cabinet: getRequestMemberships_UserGetRequest_requestMemberships_cabinet | null;
  status: string;
}

export interface getRequestMemberships_UserGetRequest {
  __typename: "UserGetRequestResponse";
  ok: boolean;
  error: string | null;
  requestMemberships: (getRequestMemberships_UserGetRequest_requestMemberships | null)[] | null;
}

export interface getRequestMemberships {
  UserGetRequest: getRequestMemberships_UserGetRequest;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteRequestMembership
// ====================================================

export interface deleteRequestMembership_UserDeleteRequest {
  __typename: "UserDeleteRequestResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteRequestMembership {
  UserDeleteRequest: deleteRequestMembership_UserDeleteRequest;
}

export interface deleteRequestMembershipVariables {
  RequestMembershipId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPayment
// ====================================================

export interface createPayment_CreatePayment_payment {
  __typename: "Payment";
  id: number;
}

export interface createPayment_CreatePayment {
  __typename: "CreatePaymentResponse";
  ok: boolean;
  error: string | null;
  payment: createPayment_CreatePayment_payment | null;
}

export interface createPayment {
  CreatePayment: createPayment_CreatePayment;
}

export interface createPaymentVariables {
  userId?: number | null;
  payMethod: CreatePaymentMethodOption;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBranchForImp
// ====================================================

export interface getBranchForImp_GuestGetBranch_branch {
  __typename: "SimpleBranch";
  impId: string | null;
}

export interface getBranchForImp_GuestGetBranch {
  __typename: "GuestGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: getBranchForImp_GuestGetBranch_branch | null;
}

export interface getBranchForImp {
  GuestGetBranch: getBranchForImp_GuestGetBranch;
}

export interface getBranchForImpVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPayment
// ====================================================

export interface getPayment_GetPayment_payment_user {
  __typename: "User";
  name: string | null;
  phoneNumber: string | null;
}

export interface getPayment_GetPayment_payment {
  __typename: "Payment";
  id: number;
  user: getPayment_GetPayment_payment_user;
  payMethod: string | null;
  merchant_uid: string;
  amount: number;
}

export interface getPayment_GetPayment {
  __typename: "GetPaymentResponse";
  ok: boolean;
  error: string | null;
  payment: getPayment_GetPayment_payment | null;
}

export interface getPayment {
  GetPayment: getPayment_GetPayment;
}

export interface getPaymentVariables {
  paymentId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: completePayment
// ====================================================

export interface completePayment_CompletePayment {
  __typename: "CompletePaymentResponse";
  ok: boolean;
  error: string | null;
}

export interface completePayment {
  CompletePayment: completePayment_CompletePayment;
}

export interface completePaymentVariables {
  paymentId: number;
  imp_uid: string;
  merchant_uid: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMembershipLogs
// ====================================================

export interface getMembershipLogs_GetMembershipLogs_membershipLogs_user {
  __typename: "User";
  id: number;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: string | null;
}

export interface getMembershipLogs_GetMembershipLogs_membershipLogs {
  __typename: "MembershipLog";
  id: number;
  status: string;
  target: string;
  updatedAt: string;
  hours: number;
  actualStartDatetime: string;
  user: getMembershipLogs_GetMembershipLogs_membershipLogs_user;
}

export interface getMembershipLogs_GetMembershipLogs {
  __typename: "GetMembershipLogsResponse";
  ok: boolean;
  error: string | null;
  membershipLogs: (getMembershipLogs_GetMembershipLogs_membershipLogs | null)[] | null;
}

export interface getMembershipLogs {
  GetMembershipLogs: getMembershipLogs_GetMembershipLogs;
}

export interface getMembershipLogsVariables {
  branchId?: number | null;
  target?: targetOptions | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateProfile {
  UpdateMyProfile: updateProfile_UpdateMyProfile;
}

export interface updateProfileVariables {
  email: string;
  password: string;
  profilePhoto: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userGetBranch
// ====================================================

export interface userGetBranch_UserGetBranch_branch_rooms_seats {
  __typename: "Seat";
  id: number;
  xpos: number;
  ypos: number;
  discard: boolean;
  nowUsing: boolean;
  endDatetime: string | null;
  usable: boolean;
  rotate: number;
}

export interface userGetBranch_UserGetBranch_branch_rooms {
  __typename: "Room";
  id: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  usable: boolean;
  seats: (userGetBranch_UserGetBranch_branch_rooms_seats | null)[] | null;
}

export interface userGetBranch_UserGetBranch_branch {
  __typename: "Branch";
  id: number;
  name: string;
  loungeImage: string;
  minimapImage: string;
  rooms: (userGetBranch_UserGetBranch_branch_rooms | null)[] | null;
}

export interface userGetBranch_UserGetBranch {
  __typename: "UserGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: userGetBranch_UserGetBranch_branch | null;
}

export interface userGetBranch {
  UserGetBranch: userGetBranch_UserGetBranch;
}

export interface userGetBranchVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBranchByIp
// ====================================================

export interface getBranchByIp_UserGetBranchByIP_branch_rooms_seats {
  __typename: "Seat";
  id: number;
  xpos: number;
  ypos: number;
  discard: boolean;
  nowUsing: boolean;
  endDatetime: string | null;
  usable: boolean;
  rotate: number;
}

export interface getBranchByIp_UserGetBranchByIP_branch_rooms {
  __typename: "Room";
  id: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  usable: boolean;
  seats: (getBranchByIp_UserGetBranchByIP_branch_rooms_seats | null)[] | null;
}

export interface getBranchByIp_UserGetBranchByIP_branch {
  __typename: "Branch";
  id: number;
  name: string;
  loungeImage: string;
  minimapImage: string;
  rooms: (getBranchByIp_UserGetBranchByIP_branch_rooms | null)[] | null;
}

export interface getBranchByIp_UserGetBranchByIP {
  __typename: "UserGetBranchByIpResponse";
  ok: boolean;
  error: string | null;
  branch: getBranchByIp_UserGetBranchByIP_branch | null;
}

export interface getBranchByIp {
  UserGetBranchByIP: getBranchByIp_UserGetBranchByIP;
}

export interface getBranchByIpVariables {
  ip: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userAssignSeat
// ====================================================

export interface userAssignSeat_UserAssignSeat {
  __typename: "UserAssignSeatResponse";
  ok: boolean;
  error: string | null;
}

export interface userAssignSeat {
  UserAssignSeat: userAssignSeat_UserAssignSeat;
}

export interface userAssignSeatVariables {
  seatId: number;
  endDatetime: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userReturnSeat
// ====================================================

export interface userReturnSeat_UserReturnSeat {
  __typename: "UserReturnSeatResponse";
  ok: boolean;
  error: string | null;
}

export interface userReturnSeat {
  UserReturnSeat: userReturnSeat_UserReturnSeat;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyUsingSeat
// ====================================================

export interface getMyUsingSeat_GetMyUsingSeat_seat {
  __typename: "Seat";
  id: number;
}

export interface getMyUsingSeat_GetMyUsingSeat {
  __typename: "GetMyUsingSeatResponse";
  ok: boolean;
  error: string | null;
  seat: getMyUsingSeat_GetMyUsingSeat_seat | null;
}

export interface getMyUsingSeat {
  GetMyUsingSeat: getMyUsingSeat_GetMyUsingSeat;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userIdSignIn
// ====================================================

export interface userIdSignIn_UserIdSignIn_user {
  __typename: "User";
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
  isCleanStaff: boolean;
  isManStaff: boolean;
}

export interface userIdSignIn_UserIdSignIn {
  __typename: "UserIdSignInResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
  user: userIdSignIn_UserIdSignIn_user | null;
}

export interface userIdSignIn {
  UserIdSignIn: userIdSignIn_UserIdSignIn;
}

export interface userIdSignInVariables {
  userId: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetCabinetLogs
// ====================================================

export interface managerGetCabinetLogs_ManagerGetCabinetLogs_cabinetLogs_user {
  __typename: "User";
  id: number;
  name: string | null;
}

export interface managerGetCabinetLogs_ManagerGetCabinetLogs_cabinetLogs {
  __typename: "MembershipLog";
  id: number;
  user: managerGetCabinetLogs_ManagerGetCabinetLogs_cabinetLogs_user;
  status: string;
  endDatetime: string;
  updatedAt: string;
  membershipId: number;
}

export interface managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_memberships {
  __typename: "Membership";
  id: number;
  endDatetime: string;
}

export interface managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_lock {
  __typename: "CabinetLock";
  id: number;
  lockNumber: number;
  password: string;
}

export interface managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_user {
  __typename: "User";
  id: number;
  name: string | null;
  userId: string | null;
}

export interface managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
  nowUsing: boolean;
  status: string | null;
  reservedDatetime: string | null;
  startDatetime: string | null;
  endDatetime: string | null;
  updatedAt: string;
  usable: boolean;
  memberships: (managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_memberships | null)[];
  lock: managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_lock | null;
  user: managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_user | null;
  branch: managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet_branch;
}

export interface managerGetCabinetLogs_ManagerGetCabinetLogs {
  __typename: "ManagerGetCabinetLogsResponse";
  ok: boolean;
  error: string | null;
  cabinetLogs: (managerGetCabinetLogs_ManagerGetCabinetLogs_cabinetLogs | null)[] | null;
  cabinet: managerGetCabinetLogs_ManagerGetCabinetLogs_cabinet | null;
}

export interface managerGetCabinetLogs {
  ManagerGetCabinetLogs: managerGetCabinetLogs_ManagerGetCabinetLogs;
}

export interface managerGetCabinetLogsVariables {
  cabinetId: number;
  startDatetime: string;
  endDatetime: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetCabinetMembership
// ====================================================

export interface managerGetCabinetMembership_ManagerGetCabinetMembership_membership {
  __typename: "Membership";
  id: number;
}

export interface managerGetCabinetMembership_ManagerGetCabinetMembership {
  __typename: "ManagerGetCabinetMembershipResponse";
  ok: boolean;
  error: string | null;
  membership: managerGetCabinetMembership_ManagerGetCabinetMembership_membership | null;
}

export interface managerGetCabinetMembership {
  ManagerGetCabinetMembership: managerGetCabinetMembership_ManagerGetCabinetMembership;
}

export interface managerGetCabinetMembershipVariables {
  cabinetId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: clearCabinet
// ====================================================

export interface clearCabinet_ClearCabinet {
  __typename: "ClearCabinetResponse";
  ok: boolean;
  error: string | null;
}

export interface clearCabinet {
  ClearCabinet: clearCabinet_ClearCabinet;
}

export interface clearCabinetVariables {
  cabinetId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerEnrollCabinet
// ====================================================

export interface managerEnrollCabinet_ManagerCreateCabMembership {
  __typename: "ManagerCreateCabMembershipResponse";
  ok: boolean;
  error: string | null;
}

export interface managerEnrollCabinet {
  ManagerCreateCabMembership: managerEnrollCabinet_ManagerCreateCabMembership;
}

export interface managerEnrollCabinetVariables {
  userId: number;
  branchId: number;
  startDatetime: string;
  endDatetime: string;
  cabinetId: number;
  products?: (number | null)[] | null;
  payMethod?: CreatePaymentMethodOption | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerShiftCabinet
// ====================================================

export interface managerShiftCabinet_ManagerShiftCabinetMembership {
  __typename: "ManagerShiftCabinetResponse";
  ok: boolean;
  error: string | null;
}

export interface managerShiftCabinet {
  ManagerShiftCabinetMembership: managerShiftCabinet_ManagerShiftCabinetMembership;
}

export interface managerShiftCabinetVariables {
  membershipId: number;
  targetCabinetId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerCreateMembership
// ====================================================

export interface managerCreateMembership_ManagerCreateMembership {
  __typename: "ManagerCreateMembershipResponse";
  ok: boolean;
  error: string | null;
}

export interface managerCreateMembership {
  ManagerCreateMembership: managerCreateMembership_ManagerCreateMembership;
}

export interface managerCreateMembershipVariables {
  userId: number;
  branchId: number;
  startDatetime: string;
  endDatetime: string;
  products?: (number | null)[] | null;
  payMethod?: CreatePaymentMethodOption | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetSeatLogs
// ====================================================

export interface managerGetSeatLogs_ManagerGetSeatLogs_seatLogs_user {
  __typename: "User";
  id: number;
  name: string | null;
}

export interface managerGetSeatLogs_ManagerGetSeatLogs_seatLogs {
  __typename: "SeatLog";
  id: number;
  user: managerGetSeatLogs_ManagerGetSeatLogs_seatLogs_user;
  status: string;
  endDatetime: string;
  updatedAt: string | null;
}

export interface managerGetSeatLogs_ManagerGetSeatLogs_seat_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface managerGetSeatLogs_ManagerGetSeatLogs_seat {
  __typename: "Seat";
  id: number;
  seatNumber: number;
  branch: managerGetSeatLogs_ManagerGetSeatLogs_seat_branch;
}

export interface managerGetSeatLogs_ManagerGetSeatLogs {
  __typename: "ManagerGetSeatLogsResponse";
  ok: boolean;
  error: string | null;
  seatLogs: (managerGetSeatLogs_ManagerGetSeatLogs_seatLogs | null)[] | null;
  seat: managerGetSeatLogs_ManagerGetSeatLogs_seat | null;
}

export interface managerGetSeatLogs {
  ManagerGetSeatLogs: managerGetSeatLogs_ManagerGetSeatLogs;
}

export interface managerGetSeatLogsVariables {
  seatId: number;
  startDatetime: string;
  endDatetime: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerAssignUser
// ====================================================

export interface managerAssignUser_ManagerAssignUser {
  __typename: "ManagerAssignUserResponse";
  ok: boolean;
  error: string | null;
}

export interface managerAssignUser {
  ManagerAssignUser: managerAssignUser_ManagerAssignUser;
}

export interface managerAssignUserVariables {
  userId: number;
  seatId: number;
  startDatetime?: string | null;
  endDatetime?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerReturnSeat
// ====================================================

export interface managerReturnSeat_ManagerReturnSeat {
  __typename: "ManagerReturnSeatResponse";
  ok: boolean;
  error: string | null;
}

export interface managerReturnSeat {
  ManagerReturnSeat: managerReturnSeat_ManagerReturnSeat;
}

export interface managerReturnSeatVariables {
  seatId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBranchForManSeat
// ====================================================

export interface getBranchForManSeat_GetBranchForManSeat_branch_rooms_seats {
  __typename: "Seat";
  id: number;
  xpos: number;
  ypos: number;
  discard: boolean;
  nowUsing: boolean;
  endDatetime: string | null;
  usable: boolean;
  rotate: number;
}

export interface getBranchForManSeat_GetBranchForManSeat_branch_rooms {
  __typename: "Room";
  id: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  usable: boolean;
  seats: (getBranchForManSeat_GetBranchForManSeat_branch_rooms_seats | null)[] | null;
}

export interface getBranchForManSeat_GetBranchForManSeat_branch {
  __typename: "Branch";
  id: number;
  name: string;
  loungeImage: string;
  minimapImage: string;
  rooms: (getBranchForManSeat_GetBranchForManSeat_branch_rooms | null)[] | null;
}

export interface getBranchForManSeat_GetBranchForManSeat {
  __typename: "GetBranchForManSeatResponse";
  ok: boolean;
  error: string | null;
  branch: getBranchForManSeat_GetBranchForManSeat_branch | null;
}

export interface getBranchForManSeat {
  GetBranchForManSeat: getBranchForManSeat_GetBranchForManSeat;
}

export interface getBranchForManSeatVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetMembershipLogs
// ====================================================

export interface managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
}

export interface managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs_user {
  __typename: "User";
  id: number;
  name: string | null;
  userId: string | null;
  phoneNumber: string | null;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
}

export interface managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs {
  __typename: "MembershipLog";
  id: number;
  userId: number;
  status: string;
  target: string;
  createdAt: string;
  startDatetime: string;
  endDatetime: string;
  cabinetId: number | null;
  cabinet: managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs_cabinet | null;
  user: managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs_user;
  branch: managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs_branch;
}

export interface managerGetMembershipLogs_ManagerGetMembershipLogs_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface managerGetMembershipLogs_ManagerGetMembershipLogs {
  __typename: "ManagerGetMembershipLogsResponse";
  ok: boolean;
  error: string | null;
  membershipLogs: (managerGetMembershipLogs_ManagerGetMembershipLogs_membershipLogs | null)[] | null;
  branch: managerGetMembershipLogs_ManagerGetMembershipLogs_branch | null;
}

export interface managerGetMembershipLogs {
  ManagerGetMembershipLogs: managerGetMembershipLogs_ManagerGetMembershipLogs;
}

export interface managerGetMembershipLogsVariables {
  branchId?: number | null;
  date: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetNowUsingUsers
// ====================================================

export interface managerGetNowUsingUsers_ManagerGetNowUsingUsers_users {
  __typename: "User";
  id: number;
  name: string | null;
  userId: string | null;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  phoneNumber: string | null;
}

export interface managerGetNowUsingUsers_ManagerGetNowUsingUsers {
  __typename: "ManagerGetNowUsingUsersResponse";
  ok: boolean;
  error: string | null;
  users: (managerGetNowUsingUsers_ManagerGetNowUsingUsers_users | null)[] | null;
}

export interface managerGetNowUsingUsers {
  ManagerGetNowUsingUsers: managerGetNowUsingUsers_ManagerGetNowUsingUsers;
}

export interface managerGetNowUsingUsersVariables {
  branchId?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetManagingBranches
// ====================================================

export interface managerGetManagingBranches_GetManagingBranches_branches {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface managerGetManagingBranches_GetManagingBranches {
  __typename: "GetManagingBranchesResponse";
  ok: boolean;
  error: string | null;
  branches: (managerGetManagingBranches_GetManagingBranches_branches | null)[] | null;
}

export interface managerGetManagingBranches {
  GetManagingBranches: managerGetManagingBranches_GetManagingBranches;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userGetOvertimeCabinetMemberships
// ====================================================

export interface userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships_memberships_cabinet_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships_memberships_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
  branch: userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships_memberships_cabinet_branch;
}

export interface userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships_memberships {
  __typename: "Membership";
  id: number;
  startDatetime: string;
  endDatetime: string;
  cabinet: userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships_memberships_cabinet | null;
}

export interface userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships {
  __typename: "GetOvertimeCabinetMembershipsResponse";
  ok: boolean;
  error: string | null;
  memberships: (userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships_memberships | null)[] | null;
}

export interface userGetOvertimeCabinetMemberships {
  GetOvertimeCabinetMemberships: userGetOvertimeCabinetMemberships_GetOvertimeCabinetMemberships;
}

export interface userGetOvertimeCabinetMembershipsVariables {
  userId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateBranch
// ====================================================

export interface updateBranch_HeadUpdateBranch {
  __typename: "HeadUpdateBranchResponse";
  ok: boolean;
  error: string | null;
}

export interface updateBranch {
  HeadUpdateBranch: updateBranch_HeadUpdateBranch;
}

export interface updateBranchVariables {
  branchId: number;
  branchName: string;
  branchNumber: number;
  postCode: string;
  address: string;
  detailAddress: string;
  branchComment: string;
  branchPhotos: (string | null)[];
  descriptionPosition: string;
  loungeImg: string;
  minimapImg: string;
  manMax: number;
  womanMax: number;
  directManage: boolean;
  ips?: (string | null)[] | null;
  manAcceptable: boolean;
  womanAcceptable: boolean;
  boyAcceptable: boolean;
  girlAcceptable: boolean;
  impId?: string | null;
  impKey?: string | null;
  impSecret?: string | null;
  lat?: number | null;
  lng?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerUpdateBranch
// ====================================================

export interface managerUpdateBranch_ManagerUpdateBranch {
  __typename: "ManagerUpdateBranchResponse";
  ok: boolean;
  error: string | null;
}

export interface managerUpdateBranch {
  ManagerUpdateBranch: managerUpdateBranch_ManagerUpdateBranch;
}

export interface managerUpdateBranchVariables {
  branchId: number;
  detailAddress?: string | null;
  descriptionPosition?: string | null;
  ips?: (string | null)[] | null;
  manAcceptable?: boolean | null;
  womanAcceptable?: boolean | null;
  boyAcceptable?: boolean | null;
  girlAcceptable?: boolean | null;
  maleMax?: number | null;
  femaleMax?: number | null;
  available?: boolean | null;
  lat?: number | null;
  lng?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headModfiyProduct
// ====================================================

export interface headModfiyProduct_HeadModifyProduct {
  __typename: "HeadModifyProductResponse";
  ok: boolean;
  error: string | null;
}

export interface headModfiyProduct {
  HeadModifyProduct: headModfiyProduct_HeadModifyProduct;
}

export interface headModfiyProductVariables {
  productId: number;
  title?: string | null;
  amount?: number | null;
  target?: membershipOptions | null;
  hours?: number | null;
  available?: boolean | null;
  discard?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: headGetProduct
// ====================================================

export interface headGetProduct_HeadGetProduct_product {
  __typename: "Product";
  id: number;
  title: string;
  amount: number;
  target: string;
  hours: number;
  available: boolean;
}

export interface headGetProduct_HeadGetProduct {
  __typename: "HeadGetProductResponse";
  ok: boolean;
  error: string | null;
  product: headGetProduct_HeadGetProduct_product | null;
}

export interface headGetProduct {
  HeadGetProduct: headGetProduct_HeadGetProduct;
}

export interface headGetProductVariables {
  productId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getExtendableMemberships
// ====================================================

export interface getExtendableMemberships_GetExtendableMemberships_memberships_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getExtendableMemberships_GetExtendableMemberships_memberships_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
}

export interface getExtendableMemberships_GetExtendableMemberships_memberships {
  __typename: "Membership";
  id: number;
  branch: getExtendableMemberships_GetExtendableMemberships_memberships_branch;
  startDatetime: string;
  endDatetime: string;
  cabinet: getExtendableMemberships_GetExtendableMemberships_memberships_cabinet | null;
  cabinetId: number | null;
}

export interface getExtendableMemberships_GetExtendableMemberships {
  __typename: "GetExtendableMembershipsResponse";
  ok: boolean | null;
  error: string | null;
  memberships: (getExtendableMemberships_GetExtendableMemberships_memberships | null)[] | null;
}

export interface getExtendableMemberships {
  GetExtendableMemberships: getExtendableMemberships_GetExtendableMemberships;
}

export interface getExtendableMembershipsVariables {
  userId?: number | null;
  target: targetOptions;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reqSignUp
// ====================================================

export interface reqSignUp_CustomerRequestSignUp {
  __typename: "CustomerRequestSignUpResponse";
  ok: boolean;
  error: string | null;
}

export interface reqSignUp {
  CustomerRequestSignUp: reqSignUp_CustomerRequestSignUp;
}

export interface reqSignUpVariables {
  inputUserId: string;
  phoneNumber: string;
  email: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  password: string;
  name: string;
  gender: CustomerRequestSignUpGender;
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: headGetBranchForCabinetsSetting
// ====================================================

export interface headGetBranchForCabinetsSetting_ManagerGetBranch_branch_cabinetSets {
  __typename: "CabinetSet";
  id: number;
  title: string;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  setNumber: number;
  horizontalNumber: number;
  verticalNumber: number;
}

export interface headGetBranchForCabinetsSetting_ManagerGetBranch_branch {
  __typename: "Branch";
  id: number;
  cabinetLoungeImage: string;
  cabinetSets: (headGetBranchForCabinetsSetting_ManagerGetBranch_branch_cabinetSets | null)[] | null;
}

export interface headGetBranchForCabinetsSetting_ManagerGetBranch {
  __typename: "ManagerGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: headGetBranchForCabinetsSetting_ManagerGetBranch_branch | null;
}

export interface headGetBranchForCabinetsSetting {
  ManagerGetBranch: headGetBranchForCabinetsSetting_ManagerGetBranch;
}

export interface headGetBranchForCabinetsSettingVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headCreateCabinetSet
// ====================================================

export interface headCreateCabinetSet_HeadCreateCabinetSet {
  __typename: "HeadCreateCabinetSetResponse";
  ok: boolean;
  error: string | null;
}

export interface headCreateCabinetSet {
  HeadCreateCabinetSet: headCreateCabinetSet_HeadCreateCabinetSet;
}

export interface headCreateCabinetSetVariables {
  branchId: number;
  title: string;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  setNumber: number;
  horizontalNumber: number;
  verticalNumber: number;
  startNumber: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetCablocks
// ====================================================

export interface managerGetCablocks_ManagerGetCabinetLocks_cabinetLocks_cabinet {
  __typename: "Cabinet";
  cabinetNumber: number;
}

export interface managerGetCablocks_ManagerGetCabinetLocks_cabinetLocks {
  __typename: "CabinetLock";
  id: number;
  lockNumber: number;
  password: string;
  cabinet: managerGetCablocks_ManagerGetCabinetLocks_cabinetLocks_cabinet | null;
}

export interface managerGetCablocks_ManagerGetCabinetLocks {
  __typename: "ManagerGetCabinetLocksResponse";
  ok: boolean;
  error: string | null;
  cabinetLocks: (managerGetCablocks_ManagerGetCabinetLocks_cabinetLocks | null)[] | null;
}

export interface managerGetCablocks {
  ManagerGetCabinetLocks: managerGetCablocks_ManagerGetCabinetLocks;
}

export interface managerGetCablocksVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeCabinetLock
// ====================================================

export interface removeCabinetLock_ManagerRemoveCabinetLock {
  __typename: "ManagerRemoveCabinetLockResponse";
  ok: boolean;
  error: string | null;
}

export interface removeCabinetLock {
  ManagerRemoveCabinetLock: removeCabinetLock_ManagerRemoveCabinetLock;
}

export interface removeCabinetLockVariables {
  cabinetLockId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCabinetLock
// ====================================================

export interface getCabinetLock_ManagerGetCabinetLock_cabinetLock_cabinet {
  __typename: "Cabinet";
  cabinetNumber: number;
}

export interface getCabinetLock_ManagerGetCabinetLock_cabinetLock {
  __typename: "CabinetLock";
  id: number;
  lockNumber: number;
  password: string;
  cabinet: getCabinetLock_ManagerGetCabinetLock_cabinetLock_cabinet | null;
}

export interface getCabinetLock_ManagerGetCabinetLock {
  __typename: "ManagerGetCabinetLockResponse";
  ok: boolean;
  error: string | null;
  cabinetLock: getCabinetLock_ManagerGetCabinetLock_cabinetLock | null;
}

export interface getCabinetLock {
  ManagerGetCabinetLock: getCabinetLock_ManagerGetCabinetLock;
}

export interface getCabinetLockVariables {
  lockId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCoBranches
// ====================================================

export interface getCoBranches_HeadGetCoBranches_branches_alliedBranches {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getCoBranches_HeadGetCoBranches_branches {
  __typename: "Branch";
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  descriptionPosition: string;
  branchImage: (string | null)[];
  alliedBranches: (getCoBranches_HeadGetCoBranches_branches_alliedBranches | null)[] | null;
}

export interface getCoBranches_HeadGetCoBranches {
  __typename: "HeadGetCoBranchesResponse";
  ok: boolean;
  error: string | null;
  branches: (getCoBranches_HeadGetCoBranches_branches | null)[] | null;
}

export interface getCoBranches {
  HeadGetCoBranches: getCoBranches_HeadGetCoBranches;
}

export interface getCoBranchesVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setCoBranch
// ====================================================

export interface setCoBranch_HeadSetCoBranch {
  __typename: "HeadSetCoBranchResponse";
  ok: boolean;
  error: string | null;
}

export interface setCoBranch {
  HeadSetCoBranch: setCoBranch_HeadSetCoBranch;
}

export interface setCoBranchVariables {
  branchId: number;
  coBranchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delCoBranch
// ====================================================

export interface delCoBranch_HeadDelCoBranch {
  __typename: "HeadDelCoBranchResponse";
  ok: boolean;
  error: string | null;
}

export interface delCoBranch {
  HeadDelCoBranch: delCoBranch_HeadDelCoBranch;
}

export interface delCoBranchVariables {
  branchId: number;
  coBranchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headCreateRoom
// ====================================================

export interface headCreateRoom_HeadCreateRoom {
  __typename: "HeadCreateRoomResponse";
  ok: boolean;
  error: string | null;
}

export interface headCreateRoom {
  HeadCreateRoom: headCreateRoom_HeadCreateRoom;
}

export interface headCreateRoomVariables {
  branchId: number;
  title: string;
  roomNumber: number;
  roomType: roomTypeOptions;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  usable: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headRemoveProduct
// ====================================================

export interface headRemoveProduct_HeadModifyProduct {
  __typename: "HeadModifyProductResponse";
  ok: boolean;
  error: string | null;
}

export interface headRemoveProduct {
  HeadModifyProduct: headRemoveProduct_HeadModifyProduct;
}

export interface headRemoveProductVariables {
  productId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headCreateSeat
// ====================================================

export interface headCreateSeat_HeadCreateSeat {
  __typename: "HeadCreateSeatResponse";
  ok: boolean | null;
  error: string | null;
}

export interface headCreateSeat {
  HeadCreateSeat: headCreateSeat_HeadCreateSeat;
}

export interface headCreateSeatVariables {
  branchId: number;
  roomId: number;
  seatNumber: number;
  usable: boolean;
  rotate: number;
  xpos: number;
  ypos: number;
  maleUsable: boolean;
  femaleUsable: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headUpdateSeat
// ====================================================

export interface headUpdateSeat_HeadUpdateSeat {
  __typename: "HeadUpdateSeatResponse";
  ok: boolean | null;
  error: string | null;
}

export interface headUpdateSeat {
  HeadUpdateSeat: headUpdateSeat_HeadUpdateSeat;
}

export interface headUpdateSeatVariables {
  seatId: number;
  seatNumber?: number | null;
  usable?: boolean | null;
  rotate?: number | null;
  xpos?: number | null;
  ypos?: number | null;
  maleUsable?: boolean | null;
  femaleUsable?: boolean | null;
  discard?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headCreateDoor
// ====================================================

export interface headCreateDoor_HeadCreateDoor {
  __typename: "HeadCreateDoorResponse";
  ok: boolean | null;
  error: string | null;
}

export interface headCreateDoor {
  HeadCreateDoor: headCreateDoor_HeadCreateDoor;
}

export interface headCreateDoorVariables {
  branchId: number;
  roomId: number;
  rotate: number;
  xpos: number;
  ypos: number;
  isFlip: boolean;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headUpdateDoor
// ====================================================

export interface headUpdateDoor_HeadUpdateDoor {
  __typename: "HeadUpdateDoorResponse";
  ok: boolean;
  error: string | null;
}

export interface headUpdateDoor {
  HeadUpdateDoor: headUpdateDoor_HeadUpdateDoor;
}

export interface headUpdateDoorVariables {
  seatId: number;
  rotate?: number | null;
  xpos?: number | null;
  ypos?: number | null;
  discard?: boolean | null;
  isFlip?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetBranchEmployee
// ====================================================

export interface managerGetBranchEmployee_ManagerGetBranchEmployee_branch_managers {
  __typename: "User";
  id: number;
  name: string | null;
  phoneNumber: string | null;
  isSupervisor: boolean;
  isFranchiser: boolean;
}

export interface managerGetBranchEmployee_ManagerGetBranchEmployee_branch_cleanStaffs {
  __typename: "User";
  id: number;
  name: string | null;
  phoneNumber: string | null;
}

export interface managerGetBranchEmployee_ManagerGetBranchEmployee_branch_managingStaffs {
  __typename: "User";
  id: number;
  name: string | null;
  phoneNumber: string | null;
}

export interface managerGetBranchEmployee_ManagerGetBranchEmployee_branch {
  __typename: "Branch";
  id: number;
  name: string;
  managers: (managerGetBranchEmployee_ManagerGetBranchEmployee_branch_managers | null)[] | null;
  cleanStaffs: (managerGetBranchEmployee_ManagerGetBranchEmployee_branch_cleanStaffs | null)[] | null;
  managingStaffs: (managerGetBranchEmployee_ManagerGetBranchEmployee_branch_managingStaffs | null)[] | null;
}

export interface managerGetBranchEmployee_ManagerGetBranchEmployee {
  __typename: "ManagerGetBranchEmployeeResponse";
  ok: boolean;
  error: string | null;
  branch: managerGetBranchEmployee_ManagerGetBranchEmployee_branch | null;
}

export interface managerGetBranchEmployee {
  ManagerGetBranchEmployee: managerGetBranchEmployee_ManagerGetBranchEmployee;
}

export interface managerGetBranchEmployeeVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headSetBranchManager
// ====================================================

export interface headSetBranchManager_HeadSetBranchManager {
  __typename: "HeadSetBranchManagerResponse";
  ok: boolean | null;
  error: string | null;
}

export interface headSetBranchManager {
  HeadSetBranchManager: headSetBranchManager_HeadSetBranchManager;
}

export interface headSetBranchManagerVariables {
  userId: number;
  managerType: HeadSetBranchManagerType;
  action: HeadSetBranchManagerAction;
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerSetBranchStaff
// ====================================================

export interface managerSetBranchStaff_ManagerSetStaff {
  __typename: "ManagerSetStaffResponse";
  ok: boolean;
  error: string | null;
}

export interface managerSetBranchStaff {
  ManagerSetStaff: managerSetBranchStaff_ManagerSetStaff;
}

export interface managerSetBranchStaffVariables {
  userId: number;
  branchId: number;
  staffType: ManagerSetStaffType;
  action: ManagerSetBranchStaffAction;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCertification
// ====================================================

export interface getCertification_GetCertification {
  __typename: "GetCertificationResponse";
  ok: boolean;
  error: string | null;
  unique_key: string | null;
  name: string | null;
  gender: string | null;
  birthYear: number | null;
  birthMonth: number | null;
  birthDay: number | null;
}

export interface getCertification {
  GetCertification: getCertification_GetCertification;
}

export interface getCertificationVariables {
  imp_uid: string;
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userIdsignUpMutation
// ====================================================

export interface userIdsignUpMutation_UserIdSignUp {
  __typename: "UserIdSignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface userIdsignUpMutation {
  UserIdSignUp: userIdsignUpMutation_UserIdSignUp;
}

export interface userIdsignUpMutationVariables {
  userId: string;
  password: string;
  phoneNumber: string;
  unique_key: string;
  name: string;
  gender: UserIdSignUpGender;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  baseBranchId: number;
  imp_uid: string;
  email: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: tempUserIdSignUpMutation
// ====================================================

export interface tempUserIdSignUpMutation_TempUserIdSignUp {
  __typename: "TempUserIdSignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface tempUserIdSignUpMutation {
  TempUserIdSignUp: tempUserIdSignUpMutation_TempUserIdSignUp;
}

export interface tempUserIdSignUpMutationVariables {
  userId: string;
  password: string;
  phoneNumber: string;
  unique_key: string;
  name: string;
  gender: UserIdSignUpGender;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  baseBranchId: number;
  imp_uid: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  name: string;
  email: string;
  fbId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headUpdateCabinetSet
// ====================================================

export interface headUpdateCabinetSet_HeadUpdateCabinetSet {
  __typename: "HeadUpdateCabinetSetResponse";
  ok: boolean;
  error: string | null;
}

export interface headUpdateCabinetSet {
  HeadUpdateCabinetSet: headUpdateCabinetSet_HeadUpdateCabinetSet;
}

export interface headUpdateCabinetSetVariables {
  cabinetSetId: number;
  title?: string | null;
  width?: number | null;
  height?: number | null;
  xpos?: number | null;
  ypos?: number | null;
  setNumber?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: headUpdateRoom
// ====================================================

export interface headUpdateRoom_HeadUpdateRoom {
  __typename: "HeadUpdateRoomResponse";
  ok: boolean;
  error: string | null;
}

export interface headUpdateRoom {
  HeadUpdateRoom: headUpdateRoom_HeadUpdateRoom;
}

export interface headUpdateRoomVariables {
  roomId: number;
  title?: string | null;
  roomNumber?: number | null;
  roomType?: roomTypeOptions | null;
  width?: number | null;
  height?: number | null;
  xpos?: number | null;
  ypos?: number | null;
  usable?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: managerUpdateRoom
// ====================================================

export interface managerUpdateRoom_ManagerUpdateRoom {
  __typename: "ManagerUpdateRoomResponse";
  ok: boolean;
  error: string | null;
}

export interface managerUpdateRoom {
  ManagerUpdateRoom: managerUpdateRoom_ManagerUpdateRoom;
}

export interface managerUpdateRoomVariables {
  roomId: number;
  title?: string | null;
  roomNumber?: number | null;
  roomType?: roomTypeOptions | null;
  usable?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetRoom
// ====================================================

export interface managerGetRoom_ManagerGetRoom_room_seats {
  __typename: "Seat";
  id: number;
  seatNumber: number;
  usable: boolean;
  rotate: number;
  xpos: number;
  ypos: number;
  discard: boolean;
  nowUsing: boolean;
  endDatetime: string | null;
  maleUsable: boolean;
  femaleUsable: boolean;
  isDoor: boolean;
  isFlip: boolean;
}

export interface managerGetRoom_ManagerGetRoom_room {
  __typename: "Room";
  id: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  title: string;
  roomNumber: number;
  roomType: string;
  usable: boolean;
  seats: (managerGetRoom_ManagerGetRoom_room_seats | null)[] | null;
}

export interface managerGetRoom_ManagerGetRoom {
  __typename: "ManagerGetRoomResponse";
  ok: boolean;
  error: string | null;
  room: managerGetRoom_ManagerGetRoom_room | null;
}

export interface managerGetRoom {
  ManagerGetRoom: managerGetRoom_ManagerGetRoom;
}

export interface managerGetRoomVariables {
  roomId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: managerGetUserDetail
// ====================================================

export interface managerGetUserDetail_ManagerGetUserDetail_user_baseBranch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user_memberships_cabinet_lock {
  __typename: "CabinetLock";
  id: number;
  password: string;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user_memberships_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
  lock: managerGetUserDetail_ManagerGetUserDetail_user_memberships_cabinet_lock | null;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user_memberships {
  __typename: "Membership";
  id: number;
  startDatetime: string;
  endDatetime: string;
  status: string;
  usable: boolean;
  cabinetId: number | null;
  cabinet: managerGetUserDetail_ManagerGetUserDetail_user_memberships_cabinet | null;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user_membershipLogs_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user_membershipLogs_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user_membershipLogs {
  __typename: "MembershipLog";
  id: number;
  branch: managerGetUserDetail_ManagerGetUserDetail_user_membershipLogs_branch;
  cabinet: managerGetUserDetail_ManagerGetUserDetail_user_membershipLogs_cabinet | null;
  status: string;
  startDatetime: string;
  endDatetime: string;
  updatedAt: string;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user_seat {
  __typename: "Seat";
  id: number;
  seatNumber: number;
}

export interface managerGetUserDetail_ManagerGetUserDetail_user {
  __typename: "User";
  id: number;
  name: string | null;
  userId: string | null;
  phoneNumber: string | null;
  profilePhoto: string | null;
  gender: string | null;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  email: string;
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
  baseBranch: managerGetUserDetail_ManagerGetUserDetail_user_baseBranch;
  memberships: (managerGetUserDetail_ManagerGetUserDetail_user_memberships | null)[];
  membershipLogs: (managerGetUserDetail_ManagerGetUserDetail_user_membershipLogs | null)[] | null;
  seat: managerGetUserDetail_ManagerGetUserDetail_user_seat | null;
}

export interface managerGetUserDetail_ManagerGetUserDetail {
  __typename: "ManagerGetUserDetailResponse";
  ok: boolean;
  error: string | null;
  user: managerGetUserDetail_ManagerGetUserDetail_user | null;
}

export interface managerGetUserDetail {
  ManagerGetUserDetail: managerGetUserDetail_ManagerGetUserDetail;
}

export interface managerGetUserDetailVariables {
  userId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMembershipLogsById
// ====================================================

export interface getMembershipLogsById_GetMembershipLogsById_membershipLogs_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
}

export interface getMembershipLogsById_GetMembershipLogsById_membershipLogs_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getMembershipLogsById_GetMembershipLogsById_membershipLogs_payment {
  __typename: "Payment";
  id: number;
}

export interface getMembershipLogsById_GetMembershipLogsById_membershipLogs {
  __typename: "MembershipLog";
  id: number;
  startDatetime: string;
  actualStartDatetime: string;
  endDatetime: string;
  status: string;
  target: string;
  hours: number;
  updatedAt: string;
  paymentId: number | null;
  cabinet: getMembershipLogsById_GetMembershipLogsById_membershipLogs_cabinet | null;
  branch: getMembershipLogsById_GetMembershipLogsById_membershipLogs_branch;
  payment: getMembershipLogsById_GetMembershipLogsById_membershipLogs_payment | null;
}

export interface getMembershipLogsById_GetMembershipLogsById {
  __typename: "GetMembershipLogsByIdResponse";
  ok: boolean;
  error: string | null;
  membershipLogs: (getMembershipLogsById_GetMembershipLogsById_membershipLogs | null)[] | null;
}

export interface getMembershipLogsById {
  GetMembershipLogsById: getMembershipLogsById_GetMembershipLogsById;
}

export interface getMembershipLogsByIdVariables {
  userId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPaymentsByImpUid
// ====================================================

export interface getPaymentsByImpUid_GetPaymentByImpUid_payments_user {
  __typename: "User";
  id: number;
  userId: string | null;
  name: string | null;
}

export interface getPaymentsByImpUid_GetPaymentByImpUid_payments_membershipLogs_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getPaymentsByImpUid_GetPaymentByImpUid_payments_membershipLogs_cabinet {
  __typename: "Cabinet";
  id: number;
  cabinetNumber: number;
}

export interface getPaymentsByImpUid_GetPaymentByImpUid_payments_membershipLogs {
  __typename: "MembershipLog";
  id: number;
  hours: number;
  actualStartDatetime: string;
  endDatetime: string;
  status: string;
  updatedAt: string;
  target: string;
  branch: getPaymentsByImpUid_GetPaymentByImpUid_payments_membershipLogs_branch;
  cabinet: getPaymentsByImpUid_GetPaymentByImpUid_payments_membershipLogs_cabinet | null;
}

export interface getPaymentsByImpUid_GetPaymentByImpUid_payments {
  __typename: "Payment";
  id: number;
  status: string;
  payMethod: string | null;
  refunded: boolean;
  amount: number;
  merchant_uid: string;
  impUid: string | null;
  updatedAt: string | null;
  user: getPaymentsByImpUid_GetPaymentByImpUid_payments_user;
  membershipLogs: (getPaymentsByImpUid_GetPaymentByImpUid_payments_membershipLogs | null)[] | null;
}

export interface getPaymentsByImpUid_GetPaymentByImpUid {
  __typename: "GetPaymentByImpUidResponse";
  ok: boolean;
  error: string | null;
  payments: (getPaymentsByImpUid_GetPaymentByImpUid_payments | null)[] | null;
}

export interface getPaymentsByImpUid {
  GetPaymentByImpUid: getPaymentsByImpUid_GetPaymentByImpUid;
}

export interface getPaymentsByImpUidVariables {
  impUid: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRequestSignUps
// ====================================================

export interface getRequestSignUps_ManagerGetRequestSignUps_requestSignUps_baseBranch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getRequestSignUps_ManagerGetRequestSignUps_requestSignUps {
  __typename: "RequestSignUp";
  id: number;
  inputUserId: string;
  email: string;
  phoneNumber: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  name: string;
  gender: string;
  baseBranch: getRequestSignUps_ManagerGetRequestSignUps_requestSignUps_baseBranch;
  updatedAt: string | null;
}

export interface getRequestSignUps_ManagerGetRequestSignUps_branch {
  __typename: "Branch";
  id: number;
  name: string;
}

export interface getRequestSignUps_ManagerGetRequestSignUps {
  __typename: "ManagerGetRequestSignUpsResponse";
  ok: boolean;
  error: string | null;
  requestSignUps: (getRequestSignUps_ManagerGetRequestSignUps_requestSignUps | null)[] | null;
  branch: getRequestSignUps_ManagerGetRequestSignUps_branch | null;
}

export interface getRequestSignUps {
  ManagerGetRequestSignUps: getRequestSignUps_ManagerGetRequestSignUps;
}

export interface getRequestSignUpsVariables {
  branchId?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptRequestSignUp
// ====================================================

export interface acceptRequestSignUp_ManagerAcceptReqSignUp {
  __typename: "ManagerAcceptReqSignUpResponse";
  ok: boolean;
  error: string | null;
}

export interface acceptRequestSignUp {
  ManagerAcceptReqSignUp: acceptRequestSignUp_ManagerAcceptReqSignUp;
}

export interface acceptRequestSignUpVariables {
  reqSignUpId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: rejectRequestSignUp
// ====================================================

export interface rejectRequestSignUp_ManagerRejectReqSignUp {
  __typename: "ManagerRejectReqSignUpResponse";
  ok: boolean;
  error: string | null;
}

export interface rejectRequestSignUp {
  ManagerRejectReqSignUp: rejectRequestSignUp_ManagerRejectReqSignUp;
}

export interface rejectRequestSignUpVariables {
  reqSignUpId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CreatePaymentMethodOption {
  CARD = "CARD",
  CASH = "CASH",
  FIELD_CARD = "FIELD_CARD",
  PHONE = "PHONE",
  TRANS = "TRANS",
  VBANK = "VBANK",
}

export enum CustomerRequestSignUpGender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export enum HeadSetBranchManagerAction {
  ADD_BRANCH = "ADD_BRANCH",
  SUB_BRANCH = "SUB_BRANCH",
}

export enum HeadSetBranchManagerType {
  FRANCHISER = "FRANCHISER",
  HEAD = "HEAD",
  SUPERVISOR = "SUPERVISOR",
}

export enum ManagerSetBranchStaffAction {
  ADD_BRANCH = "ADD_BRANCH",
  SUB_BRANCH = "SUB_BRANCH",
}

export enum ManagerSetStaffType {
  CLEAN = "CLEAN",
  MANAGE = "MANAGE",
}

export enum SearchType {
  NAME = "NAME",
  PHONE = "PHONE",
  USERID = "USERID",
}

export enum UserIdSignUpGender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export enum membershipOptions {
  CABINET = "CABINET",
  MEMBERSHIP = "MEMBERSHIP",
}

export enum modifyOptions {
  DATETIME_MODIFIED = "DATETIME_MODIFIED",
  EXTENDED = "EXTENDED",
}

export enum roomTypeOptions {
  FOCUS = "FOCUS",
  FREE = "FREE",
  MIDDLE = "MIDDLE",
  OPEN = "OPEN",
  SINGLE = "SINGLE",
}

export enum targetOptions {
  CABINET = "CABINET",
  MEMBERSHIP = "MEMBERSHIP",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
