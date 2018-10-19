import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { HEAD_GET_BRANCH } from "src/Components/sharedQueries";
import { membershipOptions } from "src/Components/shareOptions";
import { addProduct, addProductVariables } from "src/types/api";
import AddProductPresenter from "./AddProductPresenter";
import { ADD_PRODUCT } from "./AddProductQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  productTitle: string;
  price: number;
  type: membershipOptions;
  period: number;
  isSale: boolean;
}

class AddProductMutation extends Mutation<addProduct, addProductVariables> {}

class AddProductContainer extends React.Component<IProps, IState> {
  public addProductFn;

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
      productTitle: "",
      type: membershipOptions.MEMBERSHIP
    };
  }

  public render() {
    const { isSale, period, price, productTitle, type, branchId } = this.state;
    const { history } = this.props;
    return (
      <AddProductMutation
        mutation={ADD_PRODUCT}
        variables={{
          amount: price,
          available: isSale,
          branchId,
          hours: period,
          target: type,
          title: productTitle
        }}
        onCompleted={data => {
          const { HeadCreateProduct } = data;
          if (HeadCreateProduct.ok) {
            toast.success("상품을 추가했습니다!");
            setTimeout(() => {
              history.push({
                pathname: "/setting-product",
                state: {
                  branchId
                }
              });
            }, 2000);
          } else {
            toast.error(HeadCreateProduct.error);
          }
        }}
        refetchQueries={[{ query: HEAD_GET_BRANCH, variables: { branchId } }]}
      >
        {addProductMutationFn => {
          this.addProductFn = addProductMutationFn;
          return (
            <AddProductPresenter
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
            />
          );
        }}
      </AddProductMutation>
    );
  }

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    this.addProductFn();
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
}

export default AddProductContainer;
