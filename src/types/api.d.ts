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
  manMax: number;
  womanMax: number;
  directManage: boolean;
  ips?: (string | null)[] | null;
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

export enum roomTypeOptions {
  FOCUS = "FOCUS",
  OPEN = "OPEN",
  SINGLE = "SINGLE",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
