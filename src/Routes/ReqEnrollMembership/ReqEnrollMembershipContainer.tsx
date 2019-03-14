import moment from "moment";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  USER_GET_BRANCH_PRODUCTS,
  USER_REQUEST_MEMBERSHIP
} from "src/Components/sharedQueries";

import {
  userGetBranchProducts,
  userGetBranchProducts_UserGetBranchProducts_products,
  userGetBranchProductsVariables,
  userRequestMembership,
  userRequestMembershipVariables
} from "src/types/api";
import ReqEnrollMembershipPresenter from "./ReqEnrollMembershipPresenter";

class RequestMutation extends Mutation<
  userRequestMembership,
  userRequestMembershipVariables
> {}

class GetBranchProducts extends Query<
  userGetBranchProducts,
  userGetBranchProductsVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  branchId: number;
  datetimeValue: Date;
  productId: number;
  productTitle: string;
  branchPopUpShow: boolean;
  branchProducts: Array<userGetBranchProducts_UserGetBranchProducts_products | null> | null;
  selBranchName?: string | null;
}

class ReqEnrollMembershipContainer extends React.Component<IProps, IState> {
  public reqMembershipFn;
  constructor(props) {
    super(props);
    this.state = {
      branchId:
        (props.location &&
          props.location.state &&
          props.location.state.branchId) ||
        0,
      branchPopUpShow: false,
      branchProducts: null,
      datetimeValue: new Date(),
      productId: 0,
      productTitle: ""
    };
  }

  public render() {
    const {
      branchId,
      branchPopUpShow,
      datetimeValue,
      productId,
      productTitle,
      branchProducts,
      selBranchName
    } = this.state;
    return (
      <RequestMutation
        mutation={USER_REQUEST_MEMBERSHIP}
        variables={{
          branchId,
          productId,
          startDatetime: moment(datetimeValue).format("YYYY-MM-DD HH:mm:ss")
        }}
      >
        {(userReqMembershipMutationFn, { loading: reqMembershipLoading }) => {
          this.reqMembershipFn = userReqMembershipMutationFn;
          return (
            <GetBranchProducts
              query={USER_GET_BRANCH_PRODUCTS}
              variables={{ branchId }}
              fetchPolicy={"cache-and-network"}
              onCompleted={this.updateFields}
              skip={branchId === 0}
            >
              {({ loading: productsLoading }) => (
                <ReqEnrollMembershipPresenter
                  productId={productId}
                  datetimeValue={datetimeValue}
                  onSubmit={this.onSubmit}
                  branchProducts={branchProducts}
                  productsLoading={productsLoading}
                  onOptionChange={this.onOptionChange}
                  productTitle={productTitle}
                  branchPopUpShow={branchPopUpShow}
                  setTrueBranchPopUpShow={this.setTrueBranchPopUpShow}
                  setFalseBranchPopUpShow={this.setFalseBranchPopUpShow}
                  onBranchClick={this.onBranchClick}
                  onDatetimeChange={this.onDatetimeChange}
                  onThrowBasketButtonClick={this.onThrowBasketButtonClick}
                  onCancelClick={this.onCancelClick}
                  reqMembershipLoading={reqMembershipLoading}
                  branchId={branchId}
                  selBranchName={selBranchName}
                />
              )}
            </GetBranchProducts>
          );
        }}
      </RequestMutation>
    );
  }

  public updateFields = (data: {} | userGetBranchProducts) => {
    if ("UserGetBranchProducts" in data) {
      const {
        UserGetBranchProducts: { products, branchName }
      } = data;

      if (products !== null) {
        this.setState(
          {
            branchProducts: products,
            selBranchName: branchName
          },
          () => {
            this.setState({
              productId: 0,
              productTitle: ""
            });
          }
        );
      }
    }
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { branchId, datetimeValue, productId } = this.state;

    if (!branchId) {
      toast.error("지점정보가 입력되지 않았습니다!");
    } else if (!datetimeValue) {
      toast.error("시작기간을 입력해주세요");
    } else if (!productId) {
      toast.error("이용기간을 선택해주세요");
    }
  };

  public onOptionChange = (arg: any) => {
    this.setState({
      ...this.state,
      productId: arg.value,
      productTitle: arg.label
    });
  };

  public setTrueBranchPopUpShow = () => {
    this.setState({
      branchPopUpShow: true
    });
  };

  public setFalseBranchPopUpShow = () => {
    this.setState({
      branchPopUpShow: false
    });
  };

  public onBranchClick = (branchId: number) => {
    this.setState({
      branchId,
      branchPopUpShow: false
    });
  };

  public onDatetimeChange = (datetimeValue: Date) => {
    this.setState({
      datetimeValue
    });
  };

  public onThrowBasketButtonClick = async () => {
    const { branchId, datetimeValue, productId } = this.state;
    const { history } = this.props;
    if (!branchId) {
      toast.error("지점 선택이 이루어지지 않았습니다");
    } else if (!datetimeValue) {
      toast.error("날짜 선택이 이루어지지 않았습니다");
    } else if (!productId) {
      toast.error("기간 선택이 이루어지지 않았습니다");
    } else {
      const result = await this.reqMembershipFn();
      const {
        data: { RequestRegistMembership }
      } = result;
      if (RequestRegistMembership.ok) {
        toast.success("장바구니에 무사히 담겼습니다!");
        history.push({
          pathname: "/basket2"
        });
      } else {
        toast.error(RequestRegistMembership.error);
      }
    }
  };

  public onCancelClick = () => {
    const { history } = this.props;
    history.push({
      pathname: "/basket2"
    });
  };
}

export default ReqEnrollMembershipContainer;
