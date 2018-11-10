import moment = require("moment");
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
import { modifyOptions } from "src/Components/shareOptions";
import {
  getMembershipForExtend,
  getMyMemberships,
  managerExtendMembership,
  managerExtendMembershipVariables,
  userGetProducts,
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
}

class GetMembershipsQuery extends Query<getMyMemberships> {}
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
    const { history } = this.props;
    const {
      showMembershipPopUp,
      exstingMemberships,
      selMembership,
      products,
      totalExtHours,
      selEndDatetime
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
                if (data.ManagerUpdateMembershipDatetime.ok) {
                  toast.success("해당 사물함을 연장했습니다");
                  history.push({
                    pathname: "/user-detail",
                    state: { userId: selMembership.userId }
                  });
                } else {
                  toast.error(data.ManagerUpdateMembershipDatetime.error);
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
                        <GetMembershipsQuery
                          query={GET_MY_MEMBERSHIPS}
                          onCompleted={this.updateFields}
                          fetchPolicy={"cache-and-network"}
                        >
                          {() => {
                            return (
                              <ManagerExtendCabinetPresenter
                                showMembershipPopUp={showMembershipPopUp}
                                exstingMemberships={exstingMemberships}
                                selMembership={selMembership}
                                onMembershipClick={this.onMembershipClick}
                                products={products}
                                onExtendConfirmClick={this.onExtendConfirmClick}
                                totalExtHours={totalExtHours}
                                onResetClick={this.onResetClick}
                                onDateTimeAddClick={this.onDateTimeAddClick}
                                selEndDatetime={selEndDatetime}
                              />
                            );
                          }}
                        </GetMembershipsQuery>
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

  public onExtendConfirmClick = async () => {
    const { selEndDatetime, selMembership } = this.state;
    if (moment(selEndDatetime) <= moment(selMembership.endDatetime)) {
      toast.error("기간이 연장되지 않았습니다!");
      return;
    } else {
      await this.extendCabinetFn({
        variables: {
          endDatetime: selEndDatetime,
          membershipId: this.props.location.state.selMembershipId,
          modifyType: modifyOptions.EXTENDED
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

  public onDateTimeAddClick = (hours: number) => {
    this.setState({
      selEndDatetime: moment(this.state.selEndDatetime)
        .add(hours, "h")
        .format("YYYY-MM-DD HH:mm:ss"),
      totalExtHours: this.state.totalExtHours + hours
    });
  };
}

export default ManagerExtendCabinetContainer;
