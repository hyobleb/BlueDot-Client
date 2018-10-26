import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import { Option } from "react-dropdown";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MY_MEMBERSHIPS,
  USER_GET_PRODUCTS,
  USER_REQUEST_EXTEND_MEMBERSHIP
} from "src/Components/sharedQueries";
import {
  getMembershipForExtend,
  getMembershipsForExtend,
  userGetProducts,
  userGetProductsVariables,
  userRequestExtendMembership,
  userRequestExtendMembershipVariables
} from "src/types/api";
import ReqExtendMembershipPresenter from "./ReqExtendMembershipPresenter";
import { GET_MEMBERSHIP_FOR_EXTEND } from "./ReqExtendMembershipQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  showMembershipPopUp: boolean;
  exstingMemberships: any;
  selMembership: any;
  products: any;
  selProductId: number | null;
  selProductTitle: string;
}

class GetMembershipsQuery extends Query<getMembershipsForExtend> {}
class GetProductsQuery extends Query<
  userGetProducts,
  userGetProductsVariables
> {}

class RequesetExtendMembership extends Mutation<
  userRequestExtendMembership,
  userRequestExtendMembershipVariables
> {}

class ReqExtendMembershipContainer extends React.Component<IProps, IState> {
  public getMembershipFn;
  public reqExtMembershipFn: MutationFn;

  constructor(props) {
    super(props);
    this.state = {
      exstingMemberships: null,
      products: null,
      selMembership: null,
      selProductId: null,
      selProductTitle: "",
      showMembershipPopUp: false
    };
  }
  public render() {
    const { history } = this.props;
    const {
      showMembershipPopUp,
      exstingMemberships,
      selMembership,
      products,
      selProductTitle
    } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          this.getMembershipFn = async (membershipId: number) => {
            const { data } = await client.query({
              query: GET_MEMBERSHIP_FOR_EXTEND,
              variables: { membershipId }
            });
            return data;
          };
          return (
            <RequesetExtendMembership
              mutation={USER_REQUEST_EXTEND_MEMBERSHIP}
              onCompleted={data => {
                if (data.RequestExtendMembership.ok) {
                  toast.success("장바구니에 담았습니다");
                  history.push("/basket");
                } else {
                  toast.error(data.RequestExtendMembership.error);
                }
              }}
            >
              {reqExtendMembershipMutaiton => {
                this.reqExtMembershipFn = reqExtendMembershipMutaiton;
                return (
                  <GetProductsQuery
                    query={USER_GET_PRODUCTS}
                    skip={selMembership === null}
                    variables={{
                      branchId: selMembership ? selMembership.branch.id : 0
                    }}
                    onCompleted={this.updateFields}
                    fetchPolicy={"cache-and-network"}
                  >
                    {() => {
                      return (
                        <GetMembershipsQuery
                          query={GET_MY_MEMBERSHIPS}
                          onCompleted={this.updateFields}
                          fetchPolicy={"cache-and-network"}
                          onError={error => console.log(error)}
                        >
                          {() => {
                            return (
                              <ReqExtendMembershipPresenter
                                showMembershipPopUp={showMembershipPopUp}
                                toggleShowMembershipPopUp={
                                  this.toggleShowMembershipPopUp
                                }
                                exstingMemberships={exstingMemberships}
                                selMembership={selMembership}
                                onMembershipClick={this.onMembershipClick}
                                products={products}
                                onOptionChange={this.onOptionChange}
                                selProductTitle={selProductTitle}
                                onThrowBasketClick={this.onThrowBasketClick}
                              />
                            );
                          }}
                        </GetMembershipsQuery>
                      );
                    }}
                  </GetProductsQuery>
                );
              }}
            </RequesetExtendMembership>
          );
        }}
      </ApolloConsumer>
    );
  }

  public toggleShowMembershipPopUp = () => {
    this.setState({
      showMembershipPopUp: !this.state.showMembershipPopUp
    });
  };

  public updateFields = (
    data: {} | getMembershipsForExtend | userGetProducts
  ) => {
    if ("GetMyMemberships" in data) {
      const {
        GetMyMemberships: { memberships }
      } = data;

      if (memberships !== null) {
        this.setState({
          exstingMemberships: memberships
        });
      }
    } else if ("UserGetBranch" in data) {
      const {
        UserGetBranch: { branch }
      } = data;
      if (branch) {
        if ("products" in branch) {
          const { products } = branch;
          this.setState({
            products
          });
        }
      }
    }
  };
  public onMembershipClick = async (membershipId: number) => {
    const result: {} | getMembershipForExtend = await this.getMembershipFn(
      membershipId
    );
    if ("GetMembership" in result) {
      const {
        GetMembership: { membership }
      } = result;
      if (membership !== null) {
        this.setState(
          {
            selMembership: membership
          },
          () => {
            this.toggleShowMembershipPopUp();
          }
        );
      }
    }
  };

  public onOptionChange = (arg: Option) => {
    this.setState({
      selProductId: parseFloat(arg.value),
      selProductTitle: arg.label
    });
  };

  public onThrowBasketClick = async () => {
    const { selMembership, selProductId } = this.state;
    if (!selMembership) {
      toast.error("연장할 멤버쉽을 선택하지 않았습니다");
      return;
    } else if (!selProductId) {
      toast.error("연장 기간을 선택해주세요!");
      return;
    } else {
      await this.reqExtMembershipFn({
        variables: {
          exstingMembershipId: selMembership.id,
          productId: selProductId
        }
      });
    }
  };
}

export default ReqExtendMembershipContainer;
