import moment, { Moment } from "moment";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_GET_PRODUCTS } from "src/Components/sharedQueries";

import {
  managerCreateMembership,
  managerCreateMembershipVariables,
  userGetProducts,
  userGetProductsVariables
} from "src/types/api";
import ManagerEnrollMembershipPresenter from "./ManagerEnrollMembershipPresenter";
import { MANAGER_CREATE_MEMBERSHIP } from "./ManagerEnrollMembershipQueries";

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
      productId: 0,
      productTitle: "",
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
      userIdName
    } = this.state;
    return (
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
                />
              )}
            </GetBranchQuery>
          );
        }}
      </CreateMembershipMutation>
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

  public onDatetimeChange = (datetimeValue: Moment) => {
    this.setState({
      datetimeValue: datetimeValue.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public onEndDatetimeChange = (datetimeValue: Moment) => {
    this.setState({
      endDatetimeValue: datetimeValue.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public onCreateMembershipClick = async () => {
    const { branchId, datetimeValue, userId, endDatetimeValue } = this.state;
    if (!branchId) {
      toast.error("지점 선택이 이루어지지 않았습니다");
    } else if (!datetimeValue) {
      toast.error("날짜 선택이 이루어지지 않았습니다");
    } else if (!endDatetimeValue) {
      toast.error("종료 시각이 선택되지 않았습니다");
    } else {
      const result = await this.createMembershipFn({
        variables: {
          branchId,
          endDatetime: endDatetimeValue,
          startDatetime: datetimeValue,
          userId
        }
      });

      const {
        data: { ManagerCreateMembership }
      } = result;
      if (ManagerCreateMembership.ok) {
        toast.success("해당 회원을 멤버쉽에 무사히 등록되었습니다");
        this.onBackClick();
      } else {
        toast.error(ManagerCreateMembership.error);
      }
    }
  };

  public onDateTimeAddClick = (hours: number) => {
    this.setState({
      endDatetimeValue: moment(this.state.endDatetimeValue)
        .add(hours, "h")
        .format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public onBackClick = () => {
    const { history } = this.props;
    const { userId } = this.state;

    history.push({
      pathname: "/user-detail",
      state: { userId }
    });
  };
  public setDatetimeValueNow = () => {
    this.setState({
      datetimeValue: moment().format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public setEndDatetimeToStart = () => {
    this.setState({
      endDatetimeValue: this.state.datetimeValue
    });
  };
}

export default ManagerEnrollMembershipContainer;
