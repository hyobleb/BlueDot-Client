import ApolloClient, { Operation } from "apollo-boost";

// AppolloClient는 config object를 가져야됨
// * clientState : defaultState, 언어선택,화폐 등등의 일을 할 수있음
//   clientState의 resolver는 state(clientState)를 조정할 수 있음
// * request : 클라이언트가 request할 때마다 생기게 함
// * uri : 서버의 graphqlAPI를 가지고 있음을 보여줌

// const isDev = process.env.NODE_ENV === "development";

// const httpLink = isDev
//   ? "http://localhost:4000/graphql"
//   : "https://bluedotserver.now.sh/graphql";

const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isCleanStaff: Boolean(localStorage.getItem("isCleanStaff")) || false,
        isFranchiser: Boolean(localStorage.getItem("isFranchiser")) || false,
        isHead: Boolean(localStorage.getItem("isHead")) || false,
        isLoggedIn: Boolean(localStorage.getItem("jwt")) || false,
        isManStaff: Boolean(localStorage.getItem("isManStaff")) || false,
        isSupervisor: Boolean(localStorage.getItem("isSupervisor")) || false
      }
    },
    resolvers: {
      Mutation: {
        // cache는 clientState를 defaults를 뜻함
        // cache object가 resovler의 컨텍스트 위에 있는 형태
        // token은 args가 된다

        logUserIn: (
          _,
          {
            token,
            isHead,
            isSupervisor,
            isFranchiser,
            isManStaff,
            isCleanStaff
          },
          { cache }
        ) => {
          localStorage.setItem("jwt", token);
          if (isHead) {
            localStorage.setItem("isHead", token);
          }
          if (isSupervisor) {
            localStorage.setItem("isSupervisor", token);
          }
          if (isFranchiser) {
            localStorage.setItem("isFranchiser", token);
          }
          if (isManStaff) {
            localStorage.setItem("isManStaff", token);
          }
          if (isCleanStaff) {
            localStorage.setItem("isCleanStaff", token);
          }

          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isCleanStaff,
                isFranchiser,
                isHead,
                isLoggedIn: true,
                isManStaff,
                isSupervisor
              }
            }
          });
          return null;
        },
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          localStorage.removeItem("isHead");
          localStorage.removeItem("isSupervisor");
          localStorage.removeItem("isFranchiser");
          localStorage.removeItem("isManStaff");
          localStorage.removeItem("isCleanStaff");
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isCleanStaff: false,
                isHead: null,
                isLoggedIn: false,
                isManStaff: false,
                isManager: false
              }
            }
          });
          return null;
        }
      }
    }
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  // 클라이언트가 request할 떄마다 생김
  // operation은 client의 탑레벨에 있는 configuration
  // 채어 갈수도 수정도 가능
  // 지금은 operation의 context를 세팅
  // operation이라고 함은 mutation, subscription, query를 말함
  // uri: httpLink
  uri: "http://localhost:4000/graphql"
});

export default client;
