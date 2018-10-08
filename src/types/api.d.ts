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
  isMaleAvailable: boolean;
  isFemaleAvailable: boolean;
  isBoyAvailable: boolean;
  isGirlAvailable: boolean;
  manMax: number;
  womanMax: number;
  directManage: boolean;
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

//==============================================================
// END Enums and Input Objects
//==============================================================
