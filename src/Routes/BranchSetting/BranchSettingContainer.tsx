import React from "react";
import { ApolloConsumer } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { searchBranch } from "src/types/api";
import { SEARCH_BRANCH } from "../../Components/sharedQueries";
import BranchSettingPresenter from "./BranchSettingPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchInput: string;
  data: searchBranch | null;
}

class BranchSettingContainer extends React.Component<IProps, IState> {
  public getBranch;
  constructor(props: IProps) {
    super(props);
    this.state = {
      branchInput: props.location.state
        ? props.location.state.addBranchName
        : "",
      data: null
    };
  }

  public async componentDidMount() {
    if (this.state.branchInput) {
      const data = await this.getBranch();
      this.setState({
        data
      });
    }
  }

  public render() {
    return (
      <ApolloConsumer>
        {client => {
          this.getBranch = async () => {
            const { data } = await client.query({
              query: SEARCH_BRANCH,
              variables: { text: this.state.branchInput }
            });
            return data;
          };

          return (
            <BranchSettingPresenter
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              data={this.state.data}
              branchInput={this.state.branchInput}
              onBranchModifyClick={this.onBranchModifyClick}
              onLoungeSettingClick={this.onLoungeSettingClick}
              onCainbetSettingClick={this.onCainbetSettingClick}
              onProductSettingClick={this.onProductSettingClick}
              onCabLockSettingClick={this.onCabLockSettingClick}
              onStaffSettingClick={this.onStaffSettingClick}
            />
          );
        }}
      </ApolloConsumer>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    const data = await this.getBranch();
    this.setState({
      data
    });
    // this.signInMutation();
  };

  public onBranchModifyClick = branchId => {
    const { history } = this.props;
    history.push({
      pathname: "/branch-modfiy",
      state: {
        branchId
      }
    });
  };

  public onLoungeSettingClick = branchId => {
    const { history } = this.props;
    history.push({
      pathname: "/lounge-setting",
      state: {
        branchId
      }
    });
  };

  public onCainbetSettingClick = branchId => {
    const { history } = this.props;
    history.push({
      pathname: "/set-setting",
      state: {
        branchId
      }
    });
  };

  public onProductSettingClick = (branchId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/setting-product",
      state: {
        branchId
      }
    });
  };

  public onCabLockSettingClick = (branchId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "setting-cablock",
      state: {
        branchId
      }
    });
  };

  public onStaffSettingClick = (branchId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "setting-staff",
      state: {
        branchId
      }
    });
  };
}

export default BranchSettingContainer;
