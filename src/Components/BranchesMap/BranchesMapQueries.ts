import { gql } from "apollo-boost";

export const USER_GET_BRANCHES = gql`
  query userGetBranches {
    UserGetBranches {
      ok
      error
      branches {
        id
        name
        address
        detailAddress
        descriptionPosition
        comment
        branchImage
        loungeImage
        alliedBranches {
          id
          name
        }
        manAcceptable
        womanAcceptable
        boyAcceptable
        girlAcceptable
        maleMax
        femaleMax
        available
        lat
        lng
      }
    }
  }
`;
