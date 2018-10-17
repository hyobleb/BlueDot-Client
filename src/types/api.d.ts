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
  name?: string | null;
  phoneNumber?: string | null;
  userId?: string | null;
  searchType: SearchType;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  profilePhoto: string | null;
  name: string | null;
  email: string | null;
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
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
// GraphQL query operation: headGetBranch
// ====================================================

export interface headGetBranch_HeadGetBranch_branch_products {
  __typename: "Product";
  id: number;
  title: string;
  amount: number;
  target: string;
  hours: number;
  available: boolean;
  discard: boolean;
}

export interface headGetBranch_HeadGetBranch_branch {
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
  minimapImage: string;
  ips: (string | null)[] | null;
  directManaged: boolean | null;
  maleMax: number;
  femaleMax: number;
  manAcceptable: boolean | null;
  womanAcceptable: boolean | null;
  boyAcceptable: boolean | null;
  girlAcceptable: boolean | null;
  products: (headGetBranch_HeadGetBranch_branch_products | null)[] | null;
}

export interface headGetBranch_HeadGetBranch {
  __typename: "HeadGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: headGetBranch_HeadGetBranch_branch | null;
}

export interface headGetBranch {
  HeadGetBranch: headGetBranch_HeadGetBranch;
}

export interface headGetBranchVariables {
  branchId: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBranchForUpdateLounge
// ====================================================

export interface getBranchForUpdateLounge_HeadGetBranch_branch_rooms {
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

export interface getBranchForUpdateLounge_HeadGetBranch_branch {
  __typename: "Branch";
  loungeImage: string;
  rooms: (getBranchForUpdateLounge_HeadGetBranch_branch_rooms | null)[] | null;
}

export interface getBranchForUpdateLounge_HeadGetBranch {
  __typename: "HeadGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: getBranchForUpdateLounge_HeadGetBranch_branch | null;
}

export interface getBranchForUpdateLounge {
  HeadGetBranch: getBranchForUpdateLounge_HeadGetBranch;
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
// GraphQL mutation operation: userIdSignIn
// ====================================================

export interface userIdSignIn_UserIdSignIn_user {
  __typename: "User";
  isHead: boolean;
  isSupervisor: boolean;
  isFranchiser: boolean;
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
// GraphQL query operation: headGetBranchForCabinetsSetting
// ====================================================

export interface headGetBranchForCabinetsSetting_HeadGetBranch_branch_cabinetSets {
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

export interface headGetBranchForCabinetsSetting_HeadGetBranch_branch {
  __typename: "Branch";
  cabinetLoungeImage: string;
  cabinetSets: (headGetBranchForCabinetsSetting_HeadGetBranch_branch_cabinetSets | null)[] | null;
}

export interface headGetBranchForCabinetsSetting_HeadGetBranch {
  __typename: "HeadGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: headGetBranchForCabinetsSetting_HeadGetBranch_branch | null;
}

export interface headGetBranchForCabinetsSetting {
  HeadGetBranch: headGetBranchForCabinetsSetting_HeadGetBranch;
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
// GraphQL query operation: guetGetBranch
// ====================================================

export interface guetGetBranch_GuestGetBranch_branch {
  __typename: "SimpleBranch";
  id: number;
  name: string | null;
  impKey: string | null;
  impId: string | null;
}

export interface guetGetBranch_GuestGetBranch {
  __typename: "GuestGetBranchResponse";
  ok: boolean;
  error: string | null;
  branch: guetGetBranch_GuestGetBranch_branch | null;
}

export interface guetGetBranch {
  GuestGetBranch: guetGetBranch_GuestGetBranch;
}

export interface guetGetBranchVariables {
  branchId: number;
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
  email?: string | null;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export enum roomTypeOptions {
  FOCUS = "FOCUS",
  OPEN = "OPEN",
  SINGLE = "SINGLE",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
