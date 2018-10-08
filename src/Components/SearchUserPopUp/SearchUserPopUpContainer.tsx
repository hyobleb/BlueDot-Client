import React from "react";
import { Query } from "react-apollo";
import { searchUsers } from "../../types/api";
import SearchUserPopUpPresenter from "./SearchUserPopUpPresenter";
import { SEARCH_USERS } from "./SearchUserPopUpQueries";

interface IProps {
  closFunc: any;
}

interface IState {
  inputValue: string;
  searchText: string;
}


class SearchUsersQuery extends Query<searchUsers> {}

class BranchSearchPopUpContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      searchText: ""
    };
  }

  public render() {
    const { inputValue, searchText } = this.state;
    const { closFunc } = this.props;
    return (
      <SearchUsersQuery
        query={SEARCH_USERS}
        variables={{ text: searchText }}
        skip={!Boolean(searchText)}
      >
        {({ loading, error, data }) => (
          <SearchUserPopUpPresenter
            inputValue={inputValue}
            onInputChange={this.onInputChange}
            closFunc={closFunc}
            data={data}
            error={error}
            loading={loading}
            setSearchText={this.setSearchText}
            onUserClick={this.onUserClick}
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

  public onUserClick = (id: number) => {
    console.log(id);
  };
}

export default BranchSearchPopUpContainer;
