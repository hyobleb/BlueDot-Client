import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { searchBranch, searchBranchVariables } from "../../types/api";
import BranchSettingPresenter from "./BranchSettingPresenter";
import { SEARCH_BRANCH } from "./BranchSettingQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchInput: string;
  tempInput: string;
}

class BranchSearchQuery extends Query<searchBranch, searchBranchVariables> {}

class BranchSettingContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      branchInput: props.location.state
        ? props.location.state.addBranchName
        : "",
      tempInput: ""
    };
  }

  public render() {
    return (
      <BranchSearchQuery
        query={SEARCH_BRANCH}
        skip={!Boolean(this.state.branchInput)}
        variables={{ text: this.state.branchInput }}
        onCompleted={data => {
          this.setState({
            ...this.state,
            branchInput: "",
            tempInput: ""
          });
        }}
      >
        {({ data, error }) => {
          if (error) {
            toast.error(error.message);
          }
          return (
            <BranchSettingPresenter
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              data={data}
              tempInput={this.state.tempInput}
              onLoungeSettingClick={this.onLoungeSettingClick}
            />
          );
        }}
      </BranchSearchQuery>
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    this.setState({
      ...this.state,
      branchInput: this.state.tempInput
    });
    // this.signInMutation();
  };

  public onLoungeSettingClick = branchId => {
    const { history } = this.props;
    history.push({
      pathname: "/add-lounge",
      state: {
        branchId
      }
    });
  };
}

export default BranchSettingContainer;
