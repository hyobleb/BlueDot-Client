import React from "react";
import { Query } from "react-apollo";
import { Option } from "react-dropdown";
import { searchUsers } from "../../types/api";
import SearchUserPopUpPresenter from "./SearchUserPopUpPresenter";
import { SEARCH_USERS } from "./SearchUserPopUpQueries";

interface IProps {
  closeFunc: any;
  onUserClick: (userId: number) => Promise<void> | void;
}

interface IState {
  inputValue: string;
  searchText: string;
  searchType: string;
  onUserClick: (userId: number) => Promise<void> | void;
}

class SearchUsersQuery extends Query<searchUsers> {}

class BranchSearchPopUpContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      onUserClick: props.onUserClick,
      searchText: "",
      searchType: "NAME"
    };
  }

  public render() {
    const { inputValue, searchText, searchType, onUserClick } = this.state;
    const { closeFunc } = this.props;
    return (
      <SearchUsersQuery
        query={SEARCH_USERS}
        variables={{ text: searchText, searchType }}
        skip={!Boolean(searchText)}
      >
        {({ data }) => (
          <SearchUserPopUpPresenter
            inputValue={inputValue}
            onInputChange={this.onInputChange}
            closeFunc={closeFunc}
            data={data}
            setSearchText={this.setSearchText}
            onUserClick={onUserClick}
            onSerachTypeChange={this.onSerachTypeChange}
            searchType={searchType}
          />
        )}
      </SearchUsersQuery>
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
      searchText: this.state.inputValue
    });
  };

  public onSerachTypeChange = (arg: Option) => {
    this.setState({
      searchType: arg.value
    });
  };
}

export default BranchSearchPopUpContainer;
