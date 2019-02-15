import React from "react";
import { graphql, Mutation, MutationFn } from "react-apollo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

interface IProps {
  data: any;
}

interface IState {
  isMenuOpen: boolean;
}

class AppContainer extends React.Component<IProps, IState> {
  public timeoutLogout;
  public logoutMutationFn: MutationFn;
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

  public render() {
    const { data } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
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
                />
              );
            }}
          </Mutation>
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
    const filter = "win16|win32|win64|mac|macintel";

    if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        // 모바일일 경우
        return;
      } else {
        this.timeoutLogout = setTimeout(() => {
          this.logoutMutationFn();
        }, 600000);
      }
    }
  };

  public stopLogoutFn = () => {
    clearTimeout(this.timeoutLogout);
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
