import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import { Option } from "react-dropdown";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MEMBERSHIP_FOR_EXTEND,
  GET_MY_MEMBERSHIPS,
  USER_GET_PRODUCTS,
  USER_REQUEST_EXTEND_CABINET
} from "src/Components/sharedQueries";
import {
  getMembershipForExtend,
  getMyMemberships,
  userGetProducts,
  userGetProductsVariables,
  userRequestCabinetVariables,
  userRequestExtendCabinet
} from "src/types/api";
import ReqExtendCabinetPresenter from "./ReqExtendCabinetPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  showMembershipPopUp: boolean;
  exstingMemberships: any;
  selMembership: any;
  products: any;
  selProductId: number | null;
  selProductTitle: string;
}

class GetMembershipsQuery extends Query<getMyMemberships> {}
class GetProductsQuery extends Query<
  userGetProducts,
  userGetProductsVariables
> {}

class RequestExtendCabinet extends Mutation<
  userRequestExtendCabinet,
  userRequestCabinetVariables
> {}

class ReqExtendMembershipContainer extends React.Component<IProps, IState> {
  public getMembershipFn;
  public reqExtCabinetFn: MutationFn;

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

  public async componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.selMembershipId
    ) {
      const result: {} | getMembershipForExtend = await this.getMembershipFn(
        this.props.location.state.selMembershipId
      );
      if ("GetMembership" in result) {
        const {
          GetMembership: { membership }
        } = result;
        if (membership !== null) {
          this.setState({
            selMembership: membership
          });
        }
      }
    }
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
            <RequestExtendCabinet
              mutation={USER_REQUEST_EXTEND_CABINET}
              onCompleted={data => {
                if (data.RequestExtendCabinet.ok) {
                  toast.success("장바구니에 담았습니다");
                  history.push("/basket");
                } else {
                  toast.error(data.RequestExtendCabinet.error);
                }
              }}
            >
              {reqExtendCabinetMutaiton => {
                this.reqExtCabinetFn = reqExtendCabinetMutaiton;
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
                        >
                          {() => {
                            return (
                              <ReqExtendCabinetPresenter
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
            </RequestExtendCabinet>
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

  public updateFields = (data: {} | getMyMemberships | userGetProducts) => {
    const { history } = this.props;
    if ("GetMyMemberships" in data) {
      const {
        GetMyMemberships: { memberships }
      } = data;

      if (memberships !== null) {
        const filteredMemberships = memberships.filter(
          membership => membership && membership.cabinetId
        );
        if (filteredMemberships.length === 0) {
          toast.error("연장할 멤버쉽이 없습니다");
          history.push("/basket");
        } else {
          this.setState({
            exstingMemberships: filteredMemberships
          });
        }
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
      await this.reqExtCabinetFn({
        variables: {
          exstingMembershipId: selMembership.id,
          productId: selProductId
        }
      });
    }
  };
}

export default ReqExtendMembershipContainer;
