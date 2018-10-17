import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { HEAD_GET_BRANCH } from "src/Components/sharedQueries";
import { headGetBranch, headGetBranchVariables } from "src/types/api";
import SettingProductPresenter from "./SettingProductPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
}

class GetBranchQuery extends Query<headGetBranch, headGetBranchVariables> {}

class SettingProductContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchId: props.location.state.branchId
    };
  }

  public render() {
    const { branchId } = this.state;
    return (
      <GetBranchQuery query={HEAD_GET_BRANCH} variables={{ branchId }}>
        {({ data: branchData, loading: branchLoading }) => (
          <SettingProductPresenter
            onAddButtonClick={this.onAddButtonClick}
            branchData={branchData}
            branchLoading={branchLoading}
          />
        )}
      </GetBranchQuery>
    );
  }

  public onAddButtonClick = () => {
    const { history } = this.props;
    const { branchId } = this.state;
    history.push({
      pathname: "/add-product",
      state: {
        branchId
      }
    });
  };
}

export default SettingProductContainer;
