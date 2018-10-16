import { gql } from "apollo-boost";

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
