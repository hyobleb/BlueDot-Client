import { gql } from "apollo-boost";

export const HEAD_REMOVE_PRODUCT = gql`
  mutation headRemoveProduct($productId: Int!) {
    HeadModifyProduct(productId: $productId, discard: true) {
      ok
      error
    }
  }
`;
