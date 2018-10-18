import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { HEAD_GET_BRANCH } from "src/Components/sharedQueries";
import { membershipOptions } from "src/Components/shareOptions";
import {
  headGetProduct,
  headGetProductVariables,
  headModfiyProduct,
  headModfiyProductVariables
} from "src/types/api";
import ModifyProductPresenter from "./ModifyProductPresenter";
import { HEAD_GET_PRODUCT, HEAD_MODIFY_PRODUCT } from "./ModifyProductQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  productTitle: string;
  price: number;
  productId: number;
  type: membershipOptions;
  period: number;
  isSale: boolean;
}

class GetProductQuery extends Query<headGetProduct, headGetProductVariables> {}
class ModifyProductMutation extends Mutation<
  headModfiyProduct,
  headModfiyProductVariables
> {}

class ModifyProductContainer extends React.Component<IProps, IState> {
  public modifyProductFn;

  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      branchId: props.location.state.branchId,
      isSale: false,
      period: 0,
      price: 0,
      productId: props.location.state.productId,
      productTitle: "",
      type: membershipOptions.MEMBERSHIP
    };
  }

  public render() {
    const {
      isSale,
      period,
      price,
      productTitle,
      type,
      branchId,
      productId
    } = this.state;
    const { history } = this.props;
    return (
      <GetProductQuery
        query={HEAD_GET_PRODUCT}
        variables={{ productId }}
        onCompleted={data => this.updateFields(data)}
        fetchPolicy={"cache-and-network"}
      >
        {({ data: productData, loading: productLoading }) => (
          <ModifyProductMutation
            mutation={HEAD_MODIFY_PRODUCT}
            variables={{
              amount: price,
              available: isSale,
              hours: period,
              productId,
              target: type,
              title: productTitle
            }}
            onCompleted={data => {
              const { HeadModifyProduct } = data;
              if (HeadModifyProduct.ok) {
                toast.success("상품을 수정했습니다!");
                setTimeout(() => {
                  history.push({
                    pathname: "/setting-product",
                    state: {
                      branchId
                    }
                  });
                }, 2000);
              } else {
                toast.error(HeadModifyProduct.error);
              }
            }}
            refetchQueries={[
              { query: HEAD_GET_BRANCH, variables: { branchId } }
            ]}
          >
            {modifyProductMutationFn => {
              this.modifyProductFn = modifyProductMutationFn;
              return (
                <ModifyProductPresenter
                  isSale={isSale}
                  period={period}
                  price={price}
                  productTitle={productTitle}
                  type={type}
                  onSubmit={this.onSubmit}
                  onInputChange={this.onInputChange}
                  onOptionChange={this.onOptionChange}
                  toggleSwitch={this.toggleSwitch}
                  onCancelClick={this.onCancelClick}
                  productLoading={productLoading}
                />
              );
            }}
          </ModifyProductMutation>
        )}
      </GetProductQuery>
    );
  }

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    this.modifyProductFn();
  };

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

  public onOptionChange = (arg: any) => {
    this.setState({
      ...this.state,
      type: arg.value
    });
  };

  public toggleSwitch = (name: string) => {
    switch (name) {
      case "isSale":
        this.setState({
          ...this.state,
          [name]: !this.state.isSale
        } as any);
        break;

      default:
        break;
    }
  };

  public onCancelClick = () => {
    const { history } = this.props;
    const { branchId } = this.state;
    history.push({
      pathname: "/setting-product",
      state: {
        branchId
      }
    });
  };
  public updateFields = (data: {} | headGetProduct) => {
    if ("HeadGetProduct" in data) {
      const {
        HeadGetProduct: { product }
      } = data;

      if (product !== null) {
        const { title, id, amount, target, hours, available } = product;
        this.setState({
          isSale: available,
          period: hours,
          price: amount,
          productId: id,
          productTitle: title,
          type: target
        } as any);
      }
    }
  };
}

export default ModifyProductContainer;
