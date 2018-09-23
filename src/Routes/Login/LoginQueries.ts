import { gql } from "apollo-boost";
export const USER_ID_SIGN_IN = gql`
  mutation userIdSignIn($userId: String!, $password: String!) {
    UserIdSignIn(userId: $userId, password: $password) {
      ok
      error
    }
  }
`;

// userIdSiginIn 은 graphql-apollo에게 주는 이름, 변수들을 넣어줄 때 사용
// UserIdSignIn은 api호출 이름
