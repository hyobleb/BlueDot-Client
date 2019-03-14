import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { Option } from "react-dropdown";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MEMBERSHIP_FOR_EXTEND,
  USER_GET_PRODUCTS,
  USER_REQUEST_EXTEND_CABINET
} from "src/Components/sharedQueries";
import { targetOptions } from "src/Components/shareOptions";
import {
  getExtendableMemberships,
  getExtendableMembershipsVariables,
  getMembershipForExtend,
  getMembershipForExtendVariables,
  userGetProducts,
  userGetProductsVariables,
  userRequestCabinetVariables,
  userRequestExtendCabinet
} from "src/types/api";
import ReqExtendCabinetPresenter from "./ReqExtendCabinetPresenter";
import { GET_EXTENDABLE_MEMBERSHIPS } from "./ReqExtendCabinetQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  showMembershipPopUp: boolean;
  exstingMemberships: any;
  selMembership: any;
  products: any;
  selProductId: number | null;
  selProductTitle: string;
  membershipId: number;
}

class GetMembershipsForExtendQuery extends Query<
  getMembershipForExtend,
  getMembershipForExtendVariables
> {}

class GetMyExtendableMemberships extends Query<
  getExtendableMemberships,
  getExtendableMembershipsVariables
> {}
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
      membershipId:
        (props.location.state && props.location.state.selMembershipId) || 0,
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
      selProductTitle,
      membershipId
    } = this.state;
    return (
      <GetMembershipsForExtendQuery
        query={GET_MEMBERSHIP_FOR_EXTEND}
        variables={{ membershipId, target: targetOptions.CABINET }}
        skip={!membershipId}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <RequestExtendCabinet
            mutation={USER_REQUEST_EXTEND_CABINET}
            onCompleted={data => {
              if (data.RequestExtendCabinet.ok) {
                toast.success("장바구니에 담았습니다");
                history.push("/basket2");
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
                      <GetMyExtendableMemberships
                        query={GET_EXTENDABLE_MEMBERSHIPS}
                        onCompleted={this.updateFields}
                        fetchPolicy={"cache-and-network"}
                        variables={{ target: targetOptions.CABINET }}
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
                      </GetMyExtendableMemberships>
                    );
                  }}
                </GetProductsQuery>
              );
            }}
          </RequestExtendCabinet>
        )}
      </GetMembershipsForExtendQuery>
    );
  }

  public toggleShowMembershipPopUp = () => {
    this.setState({
      showMembershipPopUp: !this.state.showMembershipPopUp
    });
  };

  public updateFields = (
    data:
      | {}
      | getExtendableMemberships
      | userGetProducts
      | getMembershipForExtend
  ) => {
    const { history } = this.props;
    if ("GetExtendableMemberships" in data) {
      const {
        GetExtendableMemberships: { memberships }
      } = data;

      if (memberships !== null) {
        const filteredMemberships = memberships.filter(
          membership => membership && membership.cabinetId
        );
        if (filteredMemberships.length === 0) {
          toast.error("연장할 멤버쉽이 없습니다");
          history.push("/basket2");
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
    } else if ("GetMembership" in data) {
      const {
        GetMembership: { membership }
      } = data;
      if (membership) {
        this.setState({
          selMembership: membership
        });
      }
    }
  };
  public onMembershipClick = async (membershipId: number) => {
    this.setState(
      {
        membershipId
      },
      () => {
        this.toggleShowMembershipPopUp();
      }
    );
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
