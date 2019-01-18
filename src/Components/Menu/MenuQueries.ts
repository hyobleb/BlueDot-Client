import { gql } from "apollo-boost";

export const CHECK_VBANK_PAYMENT = gql`
  query checkVbankPayment {
    CheckVbankPayment {
      ok
      error
      haveVbank
    }
  }
`;
