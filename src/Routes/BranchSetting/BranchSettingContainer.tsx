import React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import {
  getManaingBranches,
  getManaingBranches_GetManagingBranches_branches,
  searchBranch
} from "src/types/api";
import {
  GET_MANAGING_BRANCHES,
  SEARCH_BRANCH
} from "../../Components/sharedQueries";
import BranchSettingPresenter from "./BranchSettingPresenter";

class GetManagingBranches extends Query<getManaingBranches> {}

interface IProps extends RouteComponentProps<any> {
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
}
interface IState {
  branchInput: string;
  data: searchBranch | null;
  managingBranches: Array<getManaingBranches_GetManagingBranches_branches | null>;
}

class BranchSettingContainer extends React.Component<IProps, IState> {
  public getBranch;
  constructor(props: IProps) {
    super(props);
    this.state = {
      branchInput: props.location.state
        ? props.location.state.addBranchName
        : "",
      data: null,
      managingBranches: []
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
    const { isHead, isFranchiser, isSupervisor } = this.props;
    const { managingBranches } = this.state;
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
            <GetManagingBranches
              query={GET_MANAGING_BRANCHES}
              onCompleted={this.updateFields}
              fetchPolicy={"cache-and-network"}
            >
              {managingBranchesLoading => (
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
                  onCoBranchSettingClick={this.onCoBranchSettingClick}
                  isHead={isHead}
                  isFranchiser={isFranchiser}
                  isSupervisor={isSupervisor}
                  managingBranches={managingBranches}
                />
              )}
            </GetManagingBranches>
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
    const { history, isHead, isFranchiser, isSupervisor } = this.props;
    history.push({
      pathname: "/branch-modfiy",
      state: {
        branchId,
        isFranchiser,
        isHead,
        isSupervisor
      }
    });
  };

  public onLoungeSettingClick = branchId => {
    const { history, isFranchiser, isHead, isSupervisor } = this.props;
    history.push({
      pathname: "/lounge-setting",
      state: {
        branchId,
        isFranchiser,
        isHead,
        isSupervisor
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
      pathname: "/setting-cablock",
      state: {
        branchId
      }
    });
  };

  public onStaffSettingClick = (branchId: number) => {
    const { history, isHead, isFranchiser, isSupervisor } = this.props;
    history.push({
      pathname: "/setting-staff",
      state: {
        branchId,
        isFranchiser,
        isHead,
        isSupervisor
      }
    });
  };

  public onCoBranchSettingClick = (branchId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/setting-cobranch",
      state: {
        branchId
      }
    });
  };

  public updateFields = (data: {} | getManaingBranches) => {
    if ("GetManagingBranches" in data) {
      const {
        GetManagingBranches: { branches }
      } = data;
      if (branches) {
        this.setState({
          managingBranches: branches
        });
      }
    }
  };
}

export default BranchSettingContainer;
