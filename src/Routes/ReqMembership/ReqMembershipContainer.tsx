import moment from "moment";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  USER_GET_PRODUCTS,
  USER_REQUEST_MEMBERSHIP
} from "src/Components/sharedQueries";
import {
  userGetProducts,
  userGetProductsVariables,
  userRequestMembership,
  userRequestMembershipVariables
} from "src/types/api";
import ReqMembershipPresenter from "./ReqMembershipPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  productId: number;
  productTitle: string;
  branchPopUpShow: boolean;
  flatPickrDate: Date;
}

class GetBranchQuery extends Query<userGetProducts, userGetProductsVariables> {}
class RequestMutation extends Mutation<
  userRequestMembership,
  userRequestMembershipVariables
> {}

class ReqMembershipContainer extends React.Component<IProps, IState> {
  public reqMembershipFn;
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchId: props.location.state.branchId,
      branchPopUpShow: false,
      flatPickrDate: new Date(),
      productId: 0,
      productTitle: ""
    };
  }

  public render() {
    const {
      branchId,
      productId,
      productTitle,
      branchPopUpShow,
      flatPickrDate
    } = this.state;
    return (
      <RequestMutation
        mutation={USER_REQUEST_MEMBERSHIP}
        variables={{
          branchId,
          productId,
          startDatetime: moment(flatPickrDate).format("YYYY-MM-DD HH:mm:ss")
        }}
      >
        {userReqMembershipMutationFn => {
          this.reqMembershipFn = userReqMembershipMutationFn;
          return (
            <GetBranchQuery
              query={USER_GET_PRODUCTS}
              variables={{ branchId }}
              fetchPolicy={"cache-and-network"}
              onCompleted={data => {
                this.setState({
                  productId: 0,
                  productTitle: ""
                });
              }}
            >
              {({ data: productDatas, loading: productsLoading }) => (
                <ReqMembershipPresenter
                  productId={productId}
                  onSubmit={this.onSubmit}
                  productDatas={productDatas}
                  productsLoading={productsLoading}
                  onOptionChange={this.onOptionChange}
                  productTitle={productTitle}
                  branchPopUpShow={branchPopUpShow}
                  setTrueBranchPopUpShow={this.setTrueBranchPopUpShow}
                  setFalseBranchPopUpShow={this.setFalseBranchPopUpShow}
                  onBranchClick={this.onBranchClick}
                  onThrowBasketButtonClick={this.onThrowBasketButtonClick}
                  onCancelClick={this.onCancelClick}
                  onFlatPickrChange={this.onFlatPickrChange}
                  flatPickrDate={flatPickrDate}
                />
              )}
            </GetBranchQuery>
          );
        }}
      </RequestMutation>
    );
  }

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { branchId, flatPickrDate, productId } = this.state;

    if (!branchId) {
      toast.error("지점정보가 입력되지 않았습니다!");
    } else if (!flatPickrDate) {
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

  public onFlatPickrChange = (datetimeValue: Date) => {
    this.setState({
      flatPickrDate: datetimeValue
    });
  };

  public onThrowBasketButtonClick = async () => {
    const { branchId, flatPickrDate, productId } = this.state;
    const { history } = this.props;
    if (!branchId) {
      toast.error("지점 선택이 이루어지지 않았습니다");
    } else if (!flatPickrDate) {
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
          pathname: "/basket"
        });
      } else {
        toast.error(RequestRegistMembership.error);
      }
    }
  };

  public onCancelClick = () => {
    const { history } = this.props;
    history.push({
      pathname: "/membership"
    });
  };
}

export default ReqMembershipContainer;
