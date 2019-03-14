import moment from "moment";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_BRANCH_FOR_ERNOLL_CABINET,
  GET_CABINET,
  GET_CABINETS,
  USER_GET_BRANCH_PRODUCTS,
  USER_REQUEST_CABINET
} from "src/Components/sharedQueries";
import {
  getBranchForEnrollCabinet,
  getBranchForEnrollCabinet_UserGetBranch_branch_cabinetSets,
  getBranchForEnrollCabinetVariables,
  getCabinet,
  getCabinets,
  getCabinetsVariables,
  getCabinetVariables,
  userGetBranchProducts,
  userGetBranchProducts_UserGetBranchProducts_products,
  userGetBranchProductsVariables,
  userRequestCabinet,
  userRequestCabinetVariables
} from "src/types/api";
import ReqEnrollCabinetPresenter from "./ReqEnrollCabinetPresenter";

interface IState {
  branchId: number;
  branchPopUpShow: boolean;
  cabinetNumber: number;
  productId: number;
  productTitle: string;
  startDatetime: Date;
  cabinetId: number;
  tempSetId: number;
  setId: number;
  cabinets: any;
  horizontalNumber: number;
  isFirstLoaidng: boolean;
  verticalNumber: number;
  branchProducts: Array<userGetBranchProducts_UserGetBranchProducts_products | null> | null;
  selBranchName?: string | null;
  cabinetLoungeImage?: string;
  cabinetSets?: Array<getBranchForEnrollCabinet_UserGetBranch_branch_cabinetSets | null> | null;
}

interface IProps extends RouteComponentProps<any> {}

class GetBranchProductsQuery extends Query<
  userGetBranchProducts,
  userGetBranchProductsVariables
> {}
class UserReqCabinetMutation extends Mutation<
  userRequestCabinet,
  userRequestCabinetVariables
> {}
class GetCabinetSetsQuery extends Query<
  getBranchForEnrollCabinet,
  getBranchForEnrollCabinetVariables
> {}

class GetCabinetSetQuery extends Query<getCabinets, getCabinetsVariables> {}
class GetCabinetQuery extends Query<getCabinet, getCabinetVariables> {}

class ReqEnrollCabinetContainer extends React.Component<IProps, IState> {
  public reqCabinetFn;

  constructor(props) {
    super(props);
    this.state = {
      branchId: props.location.state
        ? props.location.state.branchId
          ? props.location.state.branchId
          : 0
        : 0,
      branchPopUpShow: false,
      branchProducts: null,
      cabinetId: 0,
      cabinetNumber: 0,
      cabinets: null,
      horizontalNumber: 0,
      isFirstLoaidng: true,
      productId: 0,
      productTitle: "",
      setId: 0,
      startDatetime: new Date(),
      tempSetId: 0,
      verticalNumber: 0
    };
  }

  public render() {
    const {
      branchId,
      branchPopUpShow,
      cabinetId,
      productId,
      productTitle,
      startDatetime,
      tempSetId,
      setId,
      cabinets,
      horizontalNumber,
      cabinetNumber,
      isFirstLoaidng,
      verticalNumber,
      selBranchName,
      branchProducts,
      cabinetLoungeImage,
      cabinetSets
    } = this.state;
    return (
      <GetCabinetQuery
        query={GET_CABINET}
        variables={{ cabinetId }}
        fetchPolicy={"cache-and-network"}
        onCompleted={data => {
          if ("UserGetCabinet" in data) {
            const {
              UserGetCabinet: { cabinet }
            } = data;

            if (cabinet !== null) {
              const {
                cabinetNumber: findCabinetNumber,
                usable,
                nowUsing,
                status,
                reservedDatetime,
                endDatetime
              } = cabinet;

              if (!usable) {
                toast.error("해당 사물함은 사용할 수 없는 상태입니다");
                this.setState({
                  cabinetId: 0
                });
              } else if (
                nowUsing ||
                (endDatetime && moment(endDatetime) > moment())
              ) {
                toast.error("해당 사물함은 현재 이용중입니다");
                this.setState({
                  cabinetId: 0
                });
              } else if (
                status === "RESERVED" &&
                (reservedDatetime && moment(reservedDatetime) > moment())
              ) {
                toast.error("해당 사물함은 현재 예약 중입니다");
                this.setState({
                  cabinetId: 0
                });
              } else {
                this.setState({
                  cabinetNumber: findCabinetNumber
                });
              }
            }
          }
        }}
        skip={cabinetId === 0}
      >
        {() => (
          <GetCabinetSetQuery
            query={GET_CABINETS}
            variables={{ cabinetSetId: setId }}
            onCompleted={this.updateFields}
            skip={setId === 0}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading: getCabinetSetLoading }) => {
              return (
                // sometimes this part is not excuted, I expected that it was excuted when render
                <GetCabinetSetsQuery
                  query={GET_BRANCH_FOR_ERNOLL_CABINET}
                  variables={{ branchId: this.state.branchId }}
                  fetchPolicy={"cache-and-network"}
                  onCompleted={this.updateFields}
                >
                  {({ loading: cabinetSetsLoading }) => {
                    return (
                      <UserReqCabinetMutation
                        mutation={USER_REQUEST_CABINET}
                        variables={{
                          branchId,
                          cabinetId,
                          productId,
                          startDatetime: moment(startDatetime).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        }}
                      >
                        {userRequestCabinetFn => {
                          this.reqCabinetFn = userRequestCabinetFn;
                          return (
                            <GetBranchProductsQuery
                              query={USER_GET_BRANCH_PRODUCTS}
                              variables={{ branchId }}
                              fetchPolicy={"cache-and-network"}
                              onCompleted={this.updateFields}
                            >
                              {({ loading: getBranchProductsLoading }) => (
                                <ReqEnrollCabinetPresenter
                                  branchId={branchId}
                                  branchPopUpShow={branchPopUpShow}
                                  cabinetId={cabinetId}
                                  productTitle={productTitle}
                                  startDatetime={startDatetime}
                                  onSubmit={this.onSubmit}
                                  branchProducts={branchProducts}
                                  onOptionChange={this.onOptionChange}
                                  setTrueBranchPopUpShow={
                                    this.setTrueBranchPopUpShow
                                  }
                                  setFalseBranchPopUpShow={
                                    this.setFalseBranchPopUpShow
                                  }
                                  onBranchClick={this.onBranchClick}
                                  onDatetimeChange={this.onDatetimeChange}
                                  onThrowBasketButtonClick={
                                    this.onThrowBasketButtonClick
                                  }
                                  onCancelClick={this.onCancelClick}
                                  cabinetLoungeImage={cabinetLoungeImage}
                                  cabinetSets={cabinetSets}
                                  tempSetId={tempSetId}
                                  onSetHover={this.onSetHover}
                                  onSetHoverOut={this.onSetHoverOut}
                                  onSetClick={this.onSetClick}
                                  setId={setId}
                                  cabinets={cabinets}
                                  horizontalNumber={horizontalNumber}
                                  onCabinetClick={this.onCabinetClick}
                                  cabinetNumber={cabinetNumber}
                                  cabinetSetsLoading={cabinetSetsLoading}
                                  isFirstLoaidng={isFirstLoaidng}
                                  verticalNumber={verticalNumber}
                                  selBranchName={selBranchName}
                                  getBranchProductsLoading={
                                    getBranchProductsLoading
                                  }
                                  getCabinetSetLoading={getCabinetSetLoading}
                                />
                              )}
                            </GetBranchProductsQuery>
                          );
                        }}
                      </UserReqCabinetMutation>
                    );
                  }}
                </GetCabinetSetsQuery>
              );
            }}
          </GetCabinetSetQuery>
        )}
      </GetCabinetQuery>
    );
  }

  public updateFields = (
    data: {} | userGetBranchProducts | getBranchForEnrollCabinet | getCabinets
  ) => {
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
    } else if ("UserGetBranch" in data) {
      const {
        UserGetBranch: { branch }
      } = data;
      if (branch) {
        const { cabinetLoungeImage, cabinetSets } = branch;
        this.setState({
          cabinetLoungeImage,
          cabinetSets
        });
      }
    } else if ("GetCabinetSet" in data) {
      const {
        GetCabinetSet: { cabinetSet }
      } = data;

      if (cabinetSet) {
        const {
          cabinets: findCabinets,
          horizontalNumber: findHorizontalNumber,
          verticalNumber: findVerticalNumber
        } = cabinetSet;

        if (findCabinets && findHorizontalNumber) {
          this.setState({
            cabinets: findCabinets.sort((a, b) => {
              return a!.id - b!.id;
            }),
            horizontalNumber: findHorizontalNumber,
            verticalNumber: findVerticalNumber
          });
        }
      }
    }
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    await this.onThrowBasketButtonClick();
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

  public onDatetimeChange = (startDatetime: Date) => {
    this.setState({
      startDatetime
    });
  };

  public onThrowBasketButtonClick = async () => {
    const { branchId, startDatetime, productId, cabinetId } = this.state;
    const { history } = this.props;
    if (!branchId) {
      toast.error("지점 선택이 이루어지지 않았습니다");
    } else if (!cabinetId) {
      toast.error("사물함 선택이 이루어지지 않았습니다");
    } else if (!startDatetime) {
      toast.error("날짜 선택이 이루어지지 않았습니다");
    } else if (!productId) {
      toast.error("이옹권 선택이 이루어지지 않았습니다");
    } else {
      const result = await this.reqCabinetFn();
      const {
        data: { RequestRegistCabinet }
      } = result;
      if (RequestRegistCabinet.ok) {
        toast.success("장바구니에 무사히 담겼습니다!");
        history.push({
          pathname: "/basket"
        });
      } else {
        toast.error(RequestRegistCabinet.error);
      }
    }
  };

  public onCancelClick = () => {
    const { history } = this.props;
    history.push({
      pathname: "/basket2"
    });
  };

  public onSetHover = (setId: number) => {
    this.setState({
      ...this.state,
      tempSetId: setId
    });
  };

  public onSetHoverOut = () => {
    this.setState({
      ...this.state,
      tempSetId: 0
    });
  };

  public onSetClick = (setId: number) => {
    this.setState({
      isFirstLoaidng: false,
      setId
    });
  };

  public onCabinetClick = (cabinetId: number) => {
    // 캐비넷 확인
    this.setState({
      cabinetId
    });
  };
}

export default ReqEnrollCabinetContainer;
