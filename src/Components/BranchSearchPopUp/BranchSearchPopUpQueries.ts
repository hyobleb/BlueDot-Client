import { gql } from "apollo-boost";

export const GET_BRANCHES_BY_DISTRICT = gql`
  query getBranchesByDistrict($city: String!, $district: String!) {
    GetBranchesByDistrict(city: $city, district: $district) {
      ok
      error
      branches {
        id
        name
        address
        detailAddress
        descriptionPosition
        alliedBranches {
          id
          name
        }
      }
    }
  }
`;
