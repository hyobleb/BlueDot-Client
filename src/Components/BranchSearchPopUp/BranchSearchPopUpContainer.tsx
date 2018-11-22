import React from "react";
import { Query } from "react-apollo";
import { searchBranch } from "../../types/api";
import { SEARCH_BRANCH } from "../sharedQueries";
import BranchSearchPopUpPresenter from "./BranchSearchPopUpPresenter";

interface IProps {
  closeFunc: any;
  onBranchClick: (branchId: number) => void;
  title?: string;
}

interface IState {
  inputBranch: string;
  searchText: string;
}

class BranchSearchQuery extends Query<searchBranch> {}

class BranchSearchPopUpContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      inputBranch: "",
      searchText: ""
    };
  }

  public render() {
    const { inputBranch, searchText } = this.state;
    const { closeFunc, title } = this.props;
    return (
      <BranchSearchQuery
        query={SEARCH_BRANCH}
        skip={!Boolean(searchText)}
        onCompleted={data => {
          this.setState({
            ...this.state,
            inputBranch: "",
            searchText: ""
          });
        }}
        variables={{ text: this.state.searchText }}
      >
        {({ loading, error, data }) => (
          <BranchSearchPopUpPresenter
            inputBranch={inputBranch}
            onInputChange={this.onInputChange}
            closeFunc={closeFunc}
            data={data}
            error={error}
            loading={loading}
            setSearchText={this.setSearchText}
            onBranchClick={this.onBranchClick}
            title={title}
          />
        )}
      </BranchSearchQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public setSearchText = () => {
    this.setState({
      ...this.state,
      searchText: this.state.inputBranch
    });
  };

  public onBranchClick = (branchId: number) => {
    this.props.onBranchClick(branchId);
  };
}

export default BranchSearchPopUpContainer;
