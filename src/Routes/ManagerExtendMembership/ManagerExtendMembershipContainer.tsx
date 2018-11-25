// import { Moment } from "moment";
import moment from "moment";
import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MEMBERSHIP_FOR_EXTEND,
  GET_MY_MEMBERSHIPS,
  MANAGER_EXTEND_MEMBERSHIP,
  USER_GET_PRODUCTS
} from "src/Components/sharedQueries";
import {
  CreatePaymentMethodOption,
  modifyOptions
} from "src/Components/shareOptions";
import {
  getMembershipForExtend,
  getMyMemberships,
  managerExtendMembership,
  managerExtendMembershipVariables,
  userGetProducts,
  userGetProducts_UserGetBranch_branch_products,
  userGetProductsVariables
} from "src/types/api";
import ManagerExtendMembershipPresenter from "./ManagerExtendMembershipPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  selMembership?: any;
  products: any;
  selProductTitle: string;
  selStartDatetime: string;
  selEndDatetime: string;
  totalExtHours: number;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
}

class GetMembershipsQuery extends Query<getMyMemberships> {}
class GetProductsQuery extends Query<
  userGetProducts,
  userGetProductsVariables
> {}

class ExtendMembershipMutation extends Mutation<
  managerExtendMembership,
  managerExtendMembershipVariables
> {}

class ManagerExtendMembershipContainer extends React.Component<IProps, IState> {
  public getMembershipFn;
  public extMembershipFn: MutationFn;

  constructor(props) {
    super(props);
    this.state = {
      products: null,
      selEndDatetime: "",
      selProductTitle: "",
      selProducts: [],
      selStartDatetime: "",
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
            selMembership: membership,
            selStartDatetime: membership.startDatetime
          });
        }
      }
    }
  }

  public render() {
    const { history } = this.props;
    const {
      selMembership,
      products,
      selProductTitle,
      selEndDatetime,
      selStartDatetime,
      totalExtHours,
      selProducts
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
            <ExtendMembershipMutation
              mutation={MANAGER_EXTEND_MEMBERSHIP}
              onCompleted={data => {
                if (data.ManagerUpdateMembershipEndDatetime.ok) {
                  toast.success("기간을 연장했습니다");
                  history.push({
                    pathname: "/user-detail",
                    state: { userId: selMembership.userId }
                  });
                } else {
                  toast.error(data.ManagerUpdateMembershipEndDatetime.error);
                }
              }}
            >
              {extendMembershipMutation => {
                this.extMembershipFn = extendMembershipMutation;
                return (
                  <GetProductsQuery
                    query={USER_GET_PRODUCTS}
                    variables={{
                      branchId: selMembership ? selMembership.branch.id : 0
                    }}
                    skip={!selMembership}
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
                              <ManagerExtendMembershipPresenter
                                selMembership={selMembership}
                                products={products}
                                selProductTitle={selProductTitle}
                                extendMembership={this.extendMembership}
                                selEndDatetime={selEndDatetime}
                                selStartDatetime={selStartDatetime}
                                onDateTimeAddClick={this.onDateTimeAddClick}
                                totalExtHours={totalExtHours}
                                onResetClick={this.onResetClick}
                                selProducts={selProducts}
                                // onStartDatetimeChange={
                                //   this.onStartDatetimeChange
                                // }
                                // onEndDatetimeChange={this.onEndDatetimeChange}
                              />
                            );
                          }}
                        </GetMembershipsQuery>
                      );
                    }}
                  </GetProductsQuery>
                );
              }}
            </ExtendMembershipMutation>
          );
        }}
      </ApolloConsumer>
    );
  }

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

  public extendMembership = async (payMethod?: CreatePaymentMethodOption) => {
    const {
      selMembership,
      totalExtHours,
      selEndDatetime,
      selProducts
    } = this.state;
    if (!selMembership) {
      toast.error("연장할 멤버쉽을 선택하지 않았습니다");
      return;
    } else if (!totalExtHours) {
      toast.error("연장 시간이 입력되지 않았습니다");
    } else {
      await this.extMembershipFn({
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

  public onResetClick = () => {
    this.setState({
      selEndDatetime: this.state.selMembership.endDatetime,
      totalExtHours: 0
    });
  };

  // public onStartDatetimeChange = (datetimeValue: Moment) => {
  //   this.setState({
  //     selStartDatetime: datetimeValue.format("YYYY-MM-DD HH:mm:ss")
  //   });
  // };

  // public onEndDatetimeChange = (datetimeValue: Moment) => {
  //   this.setState({
  //     selEndDatetime: datetimeValue.format("YYYY-MM-DD HH:mm:ss")
  //   });
  // };
}

export default ManagerExtendMembershipContainer;
