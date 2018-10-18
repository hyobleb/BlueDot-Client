import { gql } from "apollo-boost";

export const HEAD_MODIFY_PRODUCT = gql`
  mutation headModfiyProduct(
    $productId: Int!
    $title: String
    $amount: Int
    $target: membershipOptions
    $hours: Int
    $available: Boolean
    $discard: Boolean
  ) {
    HeadModifyProduct(
      productId: $productId
      title: $title
      amount: $amount
      target: $target
      hours: $hours
      available: $available
      discard: $discard
    ) {
      ok
      error
    }
  }
`;

export const HEAD_GET_PRODUCT = gql`
  query headGetProduct($productId: Int!) {
    HeadGetProduct(productId: $productId) {
      ok
      error
      product {
        id
        title
        amount
        target
        hours
        available
      }
    }
  }
`;
