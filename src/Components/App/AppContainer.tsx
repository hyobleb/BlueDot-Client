import publicIp from "public-ip";
import React from "react";
import { graphql, Mutation, MutationFn, Query } from "react-apollo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  GET_BRANCH_BY_IP,
  GET_MY_USING_SEAT,
  USER_RETURN_SEAT
} from "../../Routes/Home/HomeQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import {
  getMyUsingSeat,
  getMyUsingSeat_GetMyUsingSeat_seat,
  getMyUsingSeatId,
  userReturnSeat
} from "../../types/api";
import { GET_MY_USING_SEAT_ID } from "../sharedQueries";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

interface IProps {
  data: any;
}

interface IState {
  isMenuOpen: boolean;
  userUsingSeat?: getMyUsingSeat_GetMyUsingSeat_seat | null;
  nowIp?: string;
}
class GetMyUsingSeatIdQuery extends Query<getMyUsingSeatId> {}
class ReturnSeatMutation extends Mutation<userReturnSeat> {}

class AppContainer extends React.Component<IProps, IState> {
  public timeoutLogout;
  public logoutMutationFn: MutationFn;
  public returnSeatFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  public componentWillUpdate() {
    this.stopLogoutFn();
    this.setTimeLogout();
  }

  public async componentDidMount() {
    const publicIpAddress = await publicIp.v4();
    this.setState({
      nowIp: publicIpAddress
    });
  }

  public render() {
    const { data } = this.props;
    const { isMenuOpen, userUsingSeat, nowIp } = this.state;
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <ReturnSeatMutation
            mutation={USER_RETURN_SEAT}
            refetchQueries={[
              {
                query: GET_BRANCH_BY_IP,
                variables: { ip: nowIp }
              },
              { query: GET_MY_USING_SEAT }
            ]}
            onCompleted={returnSeatData => {
              const { UserReturnSeat } = returnSeatData;
              if (UserReturnSeat.ok) {
                toast.success("좌석을 반납했습니다!");
              } else {
                toast.error(UserReturnSeat.error);
              }
            }}
          >
            {(userReturnSeatMutation, { loading: returnSeatLoading }) => {
              this.returnSeatFn = userReturnSeatMutation;

              return (
                <GetMyUsingSeatIdQuery
                  query={GET_MY_USING_SEAT_ID}
                  onCompleted={this.updateFields}
                  fetchPolicy={"cache-and-network"}
                >
                  {() => (
                    <Mutation mutation={LOG_USER_OUT}>
                      {logUserOutMutation => {
                        this.logoutMutationFn = logUserOutMutation;
                        return (
                          <AppPresenter
                            isLoggedIn={data.auth.isLoggedIn}
                            isHead={data.auth.isHead}
                            isSupervisor={data.auth.isSupervisor}
                            isFranchiser={data.auth.isFranchiser}
                            isCleanStaff={data.auth.isCleanStaff}
                            isManStaff={data.auth.isManStaff}
                            isMenuOpen={isMenuOpen}
                            toggleMenu={this.toggleMenu}
                            setTimeLogout={this.setTimeLogout}
                            stopLogoutFn={this.stopLogoutFn}
                            onLogoutBtnClick={this.onLogoutBtnClick}
                            userUsingSeat={userUsingSeat}
                            appUpdateFields={this.updateFields}
                            onReturnSeatClick={this.onReturnSeatClick}
                            returnSeatLoading={returnSeatLoading}
                          />
                        );
                      }}
                    </Mutation>
                  )}
                </GetMyUsingSeatIdQuery>
              );
            }}
          </ReturnSeatMutation>
        </ThemeProvider>
        <ToastContainer
          draggable={true}
          position={toast.POSITION.BOTTOM_CENTER}
        />
      </React.Fragment>
    );
  }

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public setTimeLogout = () => {
    // const filter = "win16|win32|win64|mac|macintel";
    // if (navigator.platform) {
    //   if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
    //     // 모바일일 경우
    //     return;
    //   } else {
    //     this.timeoutLogout = setTimeout(() => {
    //       this.logoutMutationFn();
    //     }, 600000);
    //   }
    // }
  };

  public stopLogoutFn = () => {
    // clearTimeout(this.timeoutLogout);
  };

  public onLogoutBtnClick = async () => {
    await this.logoutMutationFn();
  };

  public updateFields = (data: {} | getMyUsingSeatId | getMyUsingSeat) => {
    if ("GetMyUsingSeatId" in data) {
      const { GetMyUsingSeatId } = data;
      if (GetMyUsingSeatId.ok) {
        this.setState({
          userUsingSeat: GetMyUsingSeatId.seat
        });
      } else {
        toast.error(GetMyUsingSeatId.error);
      }
    } else if ("GetMyUsingSeat" in data) {
      const { GetMyUsingSeat } = data;
      if (GetMyUsingSeat.ok) {
        this.setState({
          userUsingSeat: GetMyUsingSeat.seat
        });
      }
    }
  };

  public onReturnSeatClick = async () => {
    await this.returnSeatFn();
  };
}
// const AppContainer = ({ data }) => {
//   return (
//     <React.Fragment>
//       <ThemeProvider theme={theme}>
//         <AppPresenter
//           isLoggedIn={data.auth.isLoggedIn}
//           isHead={data.auth.isHead}
//           isSupervisor={data.auth.isSupervisor}
//           isFranchiser={data.auth.isFranchiser}
//           isCleanStaff={data.auth.isCleanStaff}
//           isManStaff={data.auth.isManStaff}
//         />
//       </ThemeProvider>
//       <ToastContainer
//         draggable={true}
//         position={toast.POSITION.BOTTOM_CENTER}
//       />
//     </React.Fragment>
//   );
// };

export default graphql(IS_LOGGED_IN)(AppContainer);
