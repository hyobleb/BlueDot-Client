import { gql } from "apollo-boost";

export const GET_CO_BRANCHES = gql`
  query getCoBranches($branchId: Int!) {
    HeadGetCoBranches(branchId: $branchId) {
      ok
      error
      branches {
        id
        name
        address
        detailAddress
        descriptionPosition
        branchImage
        alliedBranches {
          id
          name
        }
      }
    }
  }
`;

export const SET_CO_BRANCH = gql`
  mutation setCoBranch($branchId: Int!, $coBranchId: Int!) {
    HeadSetCoBranch(branchId: $branchId, coBranchId: $coBranchId) {
      ok
      error
    }
  }
`;

export const DEL_CO_BRANCH = gql`
  mutation delCoBranch($branchId: Int!, $coBranchId: Int!) {
    HeadDelCoBranch(branchId: $branchId, coBranchId: $coBranchId) {
      ok
      error
    }
  }
`;
