import moment = require("moment");
import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MEMBERSHIP_FOR_EXTEND,
  MANAGER_EXTEND_MEMBERSHIP,
  USER_GET_PRODUCTS
} from "src/Components/sharedQueries";
import {
  CreatePaymentMethodOption,
  modifyOptions
} from "src/Components/shareOptions";
import {
  getMembershipForExtend,
  managerExtendMembership,
  managerExtendMembershipVariables,
  userGetProducts,
  userGetProducts_UserGetBranch_branch_products,
  userGetProductsVariables
} from "src/types/api";
import ManagerExtendCabinetPresenter from "./ManagerExtendCabinetPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  showMembershipPopUp: boolean;
  exstingMemberships: any;
  selMembership: any;
  products: any;
  selProductId: number | null;
  selProductTitle: string;
  selEndDatetime: string;
  totalExtHours: number;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
}

class GetProductsQuery extends Query<
  userGetProducts,
  userGetProductsVariables
> {}

class ExtendCabinetMutation extends Mutation<
  managerExtendMembership,
  managerExtendMembershipVariables
> {}

class ManagerExtendCabinetContainer extends React.Component<IProps, IState> {
  public getMembershipFn;
  public extendCabinetFn: MutationFn;

  constructor(props) {
    super(props);
    this.state = {
      exstingMemberships: null,
      products: null,
      selEndDatetime: "",
      selMembership: null,
      selProductId: null,
      selProductTitle: "",
      selProducts: [],
      showMembershipPopUp: false,
      totalExtHours: 0
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
            selEndDatetime: membership.endDatetime,
            selMembership: membership
          });
        }
      }
    }
  }

  public render() {
    const {
      showMembershipPopUp,
      selMembership,
      products,
      totalExtHours,
      selEndDatetime,
      selProducts
    } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          this.getMembershipFn = async (membershipId: number) => {
            const { data } = await client.query({
              query: GET_MEMBERSHIP_FOR_EXTEND,
              variables: { membershipId, target: "CABINET" }
            });
            return data;
          };
          return (
            <ExtendCabinetMutation
              mutation={MANAGER_EXTEND_MEMBERSHIP}
              onCompleted={data => {
                if (data.ManagerUpdateMembershipEndDatetime.ok) {
                  toast.success("해당 사물함을 연장했습니다");
                  this.onBackClick();
                } else {
                  toast.error(data.ManagerUpdateMembershipEndDatetime.error);
                }
              }}
            >
              {extendCabinetMutation => {
                this.extendCabinetFn = extendCabinetMutation;
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
                        <ManagerExtendCabinetPresenter
                          showMembershipPopUp={showMembershipPopUp}
                          selMembership={selMembership}
                          onMembershipClick={this.onMembershipClick}
                          products={products}
                          onExtendConfirmClick={this.onExtendConfirmClick}
                          totalExtHours={totalExtHours}
                          onResetClick={this.onResetClick}
                          onDateTimeAddClick={this.onDateTimeAddClick}
                          selEndDatetime={selEndDatetime}
                          onBackClick={this.onBackClick}
                          selProducts={selProducts}
                        />
                      );
                    }}
                  </GetProductsQuery>
                );
              }}
            </ExtendCabinetMutation>
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

  public updateFields = (data: {} | userGetProducts) => {
    if ("UserGetBranch" in data) {
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

  public onExtendConfirmClick = async (
    payMethod?: CreatePaymentMethodOption
  ) => {
    const { selEndDatetime, selMembership, selProducts } = this.state;
    if (moment(selEndDatetime) <= moment(selMembership.endDatetime)) {
      toast.error("기간이 연장되지 않았습니다!");
      return;
    } else {
      await this.extendCabinetFn({
        variables: {
          endDatetime: selEndDatetime,
          membershipId: this.props.location.state.selMembershipId,
          payMethod,
          products: selProducts.map(product => product.id),
          status: modifyOptions.EXTENDED
        }
      });
    }
  };
  public onResetClick = () => {
    this.setState({
      selEndDatetime: this.state.selMembership.endDatetime,
      totalExtHours: 0
    });
  };

  public onDateTimeAddClick = (
    product: userGetProducts_UserGetBranch_branch_products,
    hours: number
  ) => {
    const { selProducts } = this.state;
    selProducts.push(product);
    this.setState({
      selEndDatetime: moment(this.state.selEndDatetime)
        .add(hours, "h")
        .format("YYYY-MM-DD HH:mm:ss"),
      selProducts,
      totalExtHours: this.state.totalExtHours + hours
    });
  };

  public onBackClick = () => {
    const { history, location } = this.props;
    const { selMembership } = this.state;
    const { backInfo } = location.state;

    if (backInfo) {
      history.push({
        pathname: backInfo.backUrl,
        state: {
          ...backInfo.content
        }
      });
    } else {
      history.push({
        pathname: "/user-detail",
        state: { userId: selMembership.userId }
      });
    }
  };
}

export default ManagerExtendCabinetContainer;
