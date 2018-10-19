import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { HEAD_GET_BRANCH } from "src/Components/sharedQueries";
import {
  headGetBranch,
  headGetBranchVariables,
  headRemoveProduct,
  headRemoveProductVariables
} from "src/types/api";
import SettingProductPresenter from "./SettingProductPresenter";
import { HEAD_REMOVE_PRODUCT } from "./SettingProductQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  showDeletePopUp: boolean;
  targetProductId: number;
}

class GetBranchQuery extends Query<headGetBranch, headGetBranchVariables> {}
class RemoveProductMutation extends Mutation<
  headRemoveProduct,
  headRemoveProductVariables
> {}

class SettingProductContainer extends React.Component<IProps, IState> {
  public removeProductFn: MutationFn;
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchId: props.location.state.branchId,
      showDeletePopUp: false,
      targetProductId: 0
    };
  }

  public render() {
    const { branchId, showDeletePopUp } = this.state;
    return (
      <RemoveProductMutation
        mutation={HEAD_REMOVE_PRODUCT}
        onCompleted={data => {
          const { HeadModifyProduct } = data;
          if (HeadModifyProduct.ok) {
            toast.success("해당 상품을 제거 했습니다");
            this.setFalseShowDeletePopUp();
          } else {
            toast.error(HeadModifyProduct.error);
          }
        }}
        refetchQueries={[{ query: HEAD_GET_BRANCH, variables: { branchId } }]}
      >
        {removeProductMutationFn => {
          this.removeProductFn = removeProductMutationFn;
          return (
            <GetBranchQuery query={HEAD_GET_BRANCH} variables={{ branchId }}>
              {({ data: branchData, loading: branchLoading }) => (
                <SettingProductPresenter
                  onAddButtonClick={this.onAddButtonClick}
                  branchData={branchData}
                  branchLoading={branchLoading}
                  onModifyClick={this.onModifyClick}
                  showDeletePopUp={showDeletePopUp}
                  setTrueShowDeletePopUp={this.setTrueShowDeletePopUp}
                  setFalseShowDeletePopUp={this.setFalseShowDeletePopUp}
                  removeProductClick={this.removeProductClick}
                />
              )}
            </GetBranchQuery>
          );
        }}
      </RemoveProductMutation>
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

  public onModifyClick = (productId: number) => {
    const { branchId } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "/modify-product",
      state: {
        branchId,
        productId
      }
    });
  };

  public setTrueShowDeletePopUp = (productId: number) => {
    this.setState({
      showDeletePopUp: true,
      targetProductId: productId
    });
  };

  public setFalseShowDeletePopUp = () => {
    this.setState({
      showDeletePopUp: false,
      targetProductId: 0
    });
  };

  public removeProductClick = () => {
    const { targetProductId } = this.state;
    this.removeProductFn({ variables: { productId: targetProductId } });
  };
}

export default SettingProductContainer;
