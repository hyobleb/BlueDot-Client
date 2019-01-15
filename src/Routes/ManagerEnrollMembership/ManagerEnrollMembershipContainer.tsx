import moment, { Moment } from "moment";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MANAGING_BRANCHES,
  USER_GET_PRODUCTS
} from "src/Components/sharedQueries";

import {
  CreatePaymentMethodOption,
  getManaingBranches,
  getManaingBranches_GetManagingBranches_branches,
  managerCreateMembership,
  managerCreateMembershipVariables,
  userGetProducts,
  userGetProducts_UserGetBranch_branch_products,
  userGetProductsVariables
} from "src/types/api";
import ManagerEnrollMembershipPresenter from "./ManagerEnrollMembershipPresenter";
import { MANAGER_CREATE_MEMBERSHIP } from "./ManagerEnrollMembershipQueries";

class GetManagingBranches extends Query<getManaingBranches> {}

class CreateMembershipMutation extends Mutation<
  managerCreateMembership,
  managerCreateMembershipVariables
> {}

class GetBranchQuery extends Query<userGetProducts, userGetProductsVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  branchId: number;
  datetimeValue: string;
  productId: number;
  productTitle: string;
  branchPopUpShow: boolean;
  userId: number;
  endDatetimeValue: string;
  backUrl: string;
  userName: string;
  userIdName: string;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
  managingBranches?: Array<getManaingBranches_GetManagingBranches_branches | null>;
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
  isCleanStaff: boolean;
  isManStaff: boolean;
}

class ManagerEnrollMembershipContainer extends React.Component<IProps, IState> {
  public createMembershipFn;
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    } else {
      if (
        !props.location.state.userId ||
        !props.location.state.backUrl ||
        !props.location.state.userName ||
        !props.location.state.userIdName
      ) {
        props.history.push("/");
      }
    }

    this.state = {
      backUrl: props.location.state.backUrl,
      branchId: 0,
      branchPopUpShow: false,
      datetimeValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      endDatetimeValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      isCleanStaff: props.location.state.isCleanStaff || false,
      isFranchiser: props.location.state.isFranchiser || false,
      isHead: props.location.state.isHead || false,
      isManStaff: props.location.state.isManStaff || false,
      isSupervisor: props.location.state.isSupervisor || false,
      productId: 0,
      productTitle: "",
      selProducts: [],
      userId: props.location.state.userId,
      userIdName: props.location.state.userIdName,
      userName: props.location.state.userName
    };
  }

  public render() {
    const {
      branchId,
      branchPopUpShow,
      datetimeValue,
      productId,
      productTitle,
      backUrl,
      endDatetimeValue,
      userName,
      userIdName,
      selProducts,
      isFranchiser,
      isHead,
      isSupervisor,
      managingBranches,
      isCleanStaff,
      isManStaff
    } = this.state;

    return (
      <GetManagingBranches
        query={GET_MANAGING_BRANCHES}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <CreateMembershipMutation mutation={MANAGER_CREATE_MEMBERSHIP}>
            {userReqMembershipMutationFn => {
              this.createMembershipFn = userReqMembershipMutationFn;
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
                  skip={branchId === 0}
                >
                  {({ data: productDatas, loading: productsLoading }) => (
                    <ManagerEnrollMembershipPresenter
                      productId={productId}
                      datetimeValue={datetimeValue}
                      onSubmit={this.onSubmit}
                      productDatas={productDatas}
                      productsLoading={productsLoading}
                      onOptionChange={this.onOptionChange}
                      productTitle={productTitle}
                      branchPopUpShow={branchPopUpShow}
                      setTrueBranchPopUpShow={this.setTrueBranchPopUpShow}
                      setFalseBranchPopUpShow={this.setFalseBranchPopUpShow}
                      onBranchClick={this.onBranchClick}
                      onDatetimeChange={this.onDatetimeChange}
                      onCreateMembershipClick={this.onCreateMembershipClick}
                      backUrl={backUrl}
                      onEndDatetimeChange={this.onEndDatetimeChange}
                      endDatetimeValue={endDatetimeValue}
                      onDateTimeAddClick={this.onDateTimeAddClick}
                      onBackClick={this.onBackClick}
                      setDatetimeValueNow={this.setDatetimeValueNow}
                      setEndDatetimeToStart={this.setEndDatetimeToStart}
                      userName={userName}
                      userIdName={userIdName}
                      selProducts={selProducts}
                      isFranchiser={isFranchiser}
                      isHead={isHead}
                      isSupervisor={isSupervisor}
                      managingBranches={managingBranches}
                      onBranchBtnClick={this.onBranchBtnClick}
                      isCleanStaff={isCleanStaff}
                      isManStaff={isManStaff}
                    />
                  )}
                </GetBranchQuery>
              );
            }}
          </CreateMembershipMutation>
        )}
      </GetManagingBranches>
    );
  }

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

  public onBranchBtnClick = (branchId: number) => {
    this.setState({
      branchId
    });
  };

  public onDatetimeChange = (datetimeValue: Moment) => {
    this.setState({
      datetimeValue: datetimeValue.format("YYYY-MM-DD HH:mm:ss"),
      endDatetimeValue: datetimeValue.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public onEndDatetimeChange = (datetimeValue: Moment) => {
    this.setState({
      endDatetimeValue: datetimeValue.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public onCreateMembershipClick = async (
    payMethod?: CreatePaymentMethodOption
  ) => {
    const {
      branchId,
      datetimeValue,
      userId,
      endDatetimeValue,
      selProducts
    } = this.state;
    if (!branchId) {
      toast.error("지점 선택이 이루어지지 않았습니다");
    } else if (!datetimeValue) {
      toast.error("날짜 선택이 이루어지지 않았습니다");
    } else if (!endDatetimeValue) {
      toast.error("종료 시각이 선택되지 않았습니다");
    } else if (moment(endDatetimeValue) <= moment(datetimeValue)) {
      toast.error("시간 선택이 이루어지지 않았습니다");
    } else {
      const result = await this.createMembershipFn({
        variables: {
          branchId,
          endDatetime: endDatetimeValue,
          payMethod: payMethod ? payMethod : undefined,
          products: payMethod
            ? selProducts.map(product => product.id)
            : undefined,
          startDatetime: datetimeValue,
          userId
        }
      });

      const {
        data: { ManagerCreateMembership }
      } = result;
      if (ManagerCreateMembership.ok) {
        toast.success("해당 회원이 멤버쉽에 무사히 등록되었습니다");
        this.onBackClick();
      } else {
        toast.error(ManagerCreateMembership.error);
      }
    }
  };

  public onDateTimeAddClick = (
    product: userGetProducts_UserGetBranch_branch_products,
    hours: number
  ) => {
    const { selProducts } = this.state;
    selProducts.push(product);
    this.setState({
      endDatetimeValue: moment(this.state.endDatetimeValue)
        .add(hours, "h")
        .format("YYYY-MM-DD HH:mm:ss"),
      selProducts
    });
  };

  public onBackClick = () => {
    const { history } = this.props;
    const {
      userId,
      isFranchiser,
      isHead,
      isSupervisor,
      isCleanStaff,
      isManStaff
    } = this.state;

    history.push({
      pathname: "/user-detail",
      state: {
        isCleanStaff,
        isFranchiser,
        isHead,
        isManStaff,
        isSupervisor,
        userId
      }
    });
  };
  public setDatetimeValueNow = () => {
    this.setState({
      datetimeValue: moment().format("YYYY-MM-DD HH:mm:ss"),
      selProducts: []
    });
  };

  public setEndDatetimeToStart = () => {
    this.setState({
      endDatetimeValue: this.state.datetimeValue,
      selProducts: []
    });
  };

  public updateFields = (data: {} | getManaingBranches) => {
    if ("GetManagingBranches" in data) {
      const {
        GetManagingBranches: { branches }
      } = data;

      const { isHead, isSupervisor, isFranchiser } = this.state;

      if (branches !== null) {
        if (!isHead && (isSupervisor || isFranchiser) && branches !== null) {
          let oneBranchId = 0;
          if (branches.length === 1) {
            if (branches[0] !== null) {
              oneBranchId = branches[0]!.id;
            }
          }

          this.setState({
            branchId: oneBranchId,
            managingBranches: branches
          });
        }
      }
    }
  };
}

export default ManagerEnrollMembershipContainer;
