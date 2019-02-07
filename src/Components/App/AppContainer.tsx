import React from "react";
import { graphql } from "react-apollo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
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
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  public render() {
    const { data } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <AppPresenter
            isLoggedIn={data.auth.isLoggedIn}
            isHead={data.auth.isHead}
            isSupervisor={data.auth.isSupervisor}
            isFranchiser={data.auth.isFranchiser}
            isCleanStaff={data.auth.isCleanStaff}
            isManStaff={data.auth.isManStaff}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
          />
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
