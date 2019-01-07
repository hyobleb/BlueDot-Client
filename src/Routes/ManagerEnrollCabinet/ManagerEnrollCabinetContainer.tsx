import moment, { Moment } from "moment";
import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_BRANCH_FOR_ERNOLL_CABINET,
  GET_CABINET,
  GET_CABINETS,
  GET_MANAGING_BRANCHES,
  USER_GET_PRODUCTS
} from "src/Components/sharedQueries";
import { CreatePaymentMethodOption } from "src/Components/shareOptions";
import {
  getBranchForEnrollCabinet,
  getBranchForEnrollCabinetVariables,
  getCabinet,
  getCabinets,
  getCabinetsVariables,
  getCabinetVariables,
  getManaingBranches,
  getManaingBranches_GetManagingBranches_branches,
  managerEnrollCabinet,
  managerEnrollCabinetVariables,
  managerShiftCabinet,
  managerShiftCabinetVariables,
  userGetProducts,
  userGetProducts_UserGetBranch_branch_products,
  userGetProductsVariables
} from "src/types/api";
import ManagerEnrollCabinetPresenter from "./ManagerEnrollCabinetPresenter";
import {
  MANAGER_ENROLL_CABINET,
  MANAGER_SHIFT_CABINET
} from "./ManagerEnrollCabinetQueries";

interface IState {
  branchId: number;
  branchPopUpShow: boolean;
  cabinetNumber: number;
  productId: number;
  productTitle: string;
  startDatetime: string;
  cabinetId: number;
  tempSetId: number;
  setId: number;
  cabinets: any;
  horizontalNumber: number;
  isFirstLoaidng: boolean;
  userId: number;
  userIdName: string;
  userName: string;
  selEndDatetime: string;
  isShifitCabinet: boolean;
  nowMembershipId?: number;
  selProducts: userGetProducts_UserGetBranch_branch_products[];
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
  managingBranches?: Array<getManaingBranches_GetManagingBranches_branches | null>;
  isManStaff: boolean;
  isCleanStaff: boolean;
}

interface IProps extends RouteComponentProps<any> {
  backInfo: any;
}

class GetManagingBranches extends Query<GetManagingBranches> {}

class GetBranchQuery extends Query<userGetProducts, userGetProductsVariables> {}
class ManangerCreateCabinet extends Mutation<
  managerEnrollCabinet,
  managerEnrollCabinetVariables
> {}

class GetCabinetSetsQuery extends Query<
  getBranchForEnrollCabinet,
  getBranchForEnrollCabinetVariables
> {}

class GetCabinetSetQuery extends Query<getCabinets, getCabinetsVariables> {}
class GetCabinetQuery extends Query<getCabinet, getCabinetVariables> {}

class ShiftCabinetMutation extends Mutation<
  managerShiftCabinet,
  managerShiftCabinetVariables
> {}

class ManagerEnrollCabinetContainer extends React.Component<IProps, IState> {
  public enrollCabinetFn;
  public shiftCabinetFn: MutationFn;

  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
      if (
        !props.location.state.userId ||
        !props.location.state.userName ||
        !props.location.state.userIdName
      ) {
        props.history.push("/");
      }
    }

    const cabinetId = props.location.state.cabinetId || 0;
    const setId = props.location.state.setId || 0;
    const isShifitCabinet = props.location.state.isShifitCabinet || false;

    this.state = {
      branchId: props.location.state
        ? props.location.state.branchId
          ? props.location.state.branchId
          : 0
        : 0,
      branchPopUpShow: false,
      cabinetId,
      cabinetNumber: 0,
      cabinets: null,
      horizontalNumber: 0,
      isCleanStaff: props.location.state.isCleanStaff,
      isFirstLoaidng: true,
      isFranchiser: props.location.state.isFranchiser || false,
      isHead: props.location.state.isHead || false,
      isManStaff: props.location.state.isManStaff,
      isShifitCabinet,
      isSupervisor: props.location.state.isSupervisor || false,
      nowMembershipId: props.location.state.nowMembershipId,
      productId: 0,
      productTitle: "",
      selEndDatetime: moment().format("YYYY-MM-DD HH:mm:ss"),
      selProducts: [],
      setId,
      startDatetime: moment().format("YYYY-MM-DD HH:mm:ss"),
      tempSetId: 0,
      userId: props.location.state.userId,
      userIdName: props.location.state.userIdName,
      userName: props.location.state.userName
    };
  }

  public render() {
    const {
      branchId,
      branchPopUpShow,
      cabinetId,
      productTitle,
      startDatetime,
      tempSetId,
      setId,
      cabinets,
      horizontalNumber,
      cabinetNumber,
      isFirstLoaidng,
      selEndDatetime,
      userIdName,
      userName,
      isShifitCabinet,
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
        {({ loading: managingBranchesLoading }) => (
          <ShiftCabinetMutation
            mutation={MANAGER_SHIFT_CABINET}
            onCompleted={data => {
              const { ManagerShiftCabinetMembership } = data;
              if (ManagerShiftCabinetMembership.ok) {
                toast.success("해당 사물함으로 이동했습니다!");
                this.onBackClick();
              } else {
                toast.error(ManagerShiftCabinetMembership.error);
              }
            }}
          >
            {shiftCabinetMutation => {
              this.shiftCabinetFn = shiftCabinetMutation;
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
                          toast.error(
                            "해당 사물함은 사용할 수 없는 상태입니다"
                          );
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
                          (reservedDatetime &&
                            moment(reservedDatetime) > moment())
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
                      onCompleted={data => {
                        if ("GetCabinetSet" in data) {
                          const {
                            GetCabinetSet: { cabinetSet }
                          } = data;

                          if (cabinetSet !== null) {
                            const {
                              cabinets: findCabinets,
                              horizontalNumber: findHorizontalNumber
                            } = cabinetSet;

                            if (findCabinets && findHorizontalNumber) {
                              this.setState({
                                cabinets: findCabinets.sort((a, b) => {
                                  return a!.id - b!.id;
                                }),
                                horizontalNumber: findHorizontalNumber
                              });
                            }
                          }
                        }
                      }}
                      skip={setId === 0}
                      fetchPolicy={"cache-and-network"}
                    >
                      {({ loading: cabinetLoading }) => {
                        return (
                          // sometimes this part is not excuted, I expected that it was excuted when render
                          <GetCabinetSetsQuery
                            query={GET_BRANCH_FOR_ERNOLL_CABINET}
                            variables={{ branchId: this.state.branchId }}
                            fetchPolicy={"cache-and-network"}
                          >
                            {({
                              data: cabinetSetDatas,
                              loading: cabinetSetLoading
                            }) => {
                              return (
                                <ManangerCreateCabinet
                                  mutation={MANAGER_ENROLL_CABINET}
                                >
                                  {userRequestCabinetFn => {
                                    this.enrollCabinetFn = userRequestCabinetFn;
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
                                        {({ data: productDatas }) => (
                                          <ManagerEnrollCabinetPresenter
                                            cabinetLoading={cabinetLoading}
                                            managingBranchesLoading={
                                              managingBranchesLoading
                                            }
                                            branchId={branchId}
                                            branchPopUpShow={branchPopUpShow}
                                            cabinetId={cabinetId}
                                            productTitle={productTitle}
                                            startDatetime={startDatetime}
                                            onSubmit={this.onSubmit}
                                            productDatas={productDatas}
                                            onOptionChange={this.onOptionChange}
                                            setTrueBranchPopUpShow={
                                              this.setTrueBranchPopUpShow
                                            }
                                            setFalseBranchPopUpShow={
                                              this.setFalseBranchPopUpShow
                                            }
                                            onBranchClick={this.onBranchClick}
                                            onDatetimeChange={
                                              this.onDatetimeChange
                                            }
                                            onEnrollClick={this.onEnrollClick}
                                            cabinetSetDatas={cabinetSetDatas}
                                            tempSetId={tempSetId}
                                            onSetHover={this.onSetHover}
                                            onSetHoverOut={this.onSetHoverOut}
                                            onSetClick={this.onSetClick}
                                            setId={setId}
                                            cabinets={cabinets}
                                            horizontalNumber={horizontalNumber}
                                            onCabinetClick={this.onCabinetClick}
                                            cabinetNumber={cabinetNumber}
                                            cabinetSetLoading={
                                              cabinetSetLoading
                                            }
                                            isFirstLoaidng={isFirstLoaidng}
                                            selEndDatetime={selEndDatetime}
                                            onEndDatetimeChange={
                                              this.onEndDatetimeChange
                                            }
                                            onDateTimeAddClick={
                                              this.onDateTimeAddClick
                                            }
                                            userIdName={userIdName}
                                            userName={userName}
                                            setDatetimeValueNow={
                                              this.setDatetimeValueNow
                                            }
                                            setEndDatetimeToStart={
                                              this.setEndDatetimeToStart
                                            }
                                            onBackClick={this.onBackClick}
                                            isShifitCabinet={isShifitCabinet}
                                            selProducts={selProducts}
                                            isFranchiser={isFranchiser}
                                            isHead={isHead}
                                            isSupervisor={isSupervisor}
                                            onBranchBtnClick={
                                              this.onBranchBtnClick
                                            }
                                            managingBranches={managingBranches}
                                            isCleanStaff={isCleanStaff}
                                            isManStaff={isManStaff}
                                            selProductReset={
                                              this.selProductReset
                                            }
                                          />
                                        )}
                                      </GetBranchQuery>
                                    );
                                  }}
                                </ManangerCreateCabinet>
                              );
                            }}
                          </GetCabinetSetsQuery>
                        );
                      }}
                    </GetCabinetSetQuery>
                  )}
                </GetCabinetQuery>
              );
            }}
          </ShiftCabinetMutation>
        )}
      </GetManagingBranches>
    );
  }

  public onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    await this.onEnrollClick();
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

  public onDatetimeChange = (startDatetime: Moment) => {
    this.setState({
      selEndDatetime: startDatetime.format("YYYY-MM-DD HH:mm:ss"),
      startDatetime: startDatetime.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public onEndDatetimeChange = (endDatetime: Moment) => {
    this.setState({
      selEndDatetime: endDatetime.format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public onEnrollClick = async (payMethod?: CreatePaymentMethodOption) => {
    const {
      branchId,
      startDatetime,
      selEndDatetime,
      cabinetId,
      isShifitCabinet,
      nowMembershipId,
      userId,
      selProducts
    } = this.state;
    if (!branchId) {
      toast.error("지점 선택이 이루어지지 않았습니다");
    } else if (!cabinetId) {
      toast.error("사물함 선택이 이루어지지 않았습니다");
    } else if (!startDatetime) {
      toast.error("시작 일시 선택이 이루어지지 않았습니다");
    } else if (!selEndDatetime) {
      toast.error("종료 일시 선택이 이루어지지 않았습니다");
    } else {
      if (isShifitCabinet) {
        if (!nowMembershipId) {
          toast.error("해당 사물함 멤버쉽 정보가 없습니다");
        } else {
          await this.shiftCabinetFn({
            variables: {
              membershipId: nowMembershipId,
              targetCabinetId: cabinetId
            }
          });
        }
      } else {
        const result = await this.enrollCabinetFn({
          variables: {
            branchId,
            cabinetId,
            endDatetime: selEndDatetime,
            payMethod: payMethod ? payMethod : undefined,
            products: payMethod
              ? selProducts.map(product => product.id)
              : undefined,
            startDatetime,
            userId
          }
        });
        const {
          data: { ManagerCreateCabMembership }
        } = result;
        if (ManagerCreateCabMembership.ok) {
          toast.success("사물함이 무사히 등록되었습니다");
          this.onBackClick();
        } else {
          toast.error(ManagerCreateCabMembership.error);
        }
      }
    }
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

  public onBackClick = () => {
    const { history, location } = this.props;
    const { userId } = this.state;
    // const {
    //   backInfo,
    //   isFranchiser,
    //   isHead,
    //   isSupervisor,
    //   isManStaff,
    //   isCleanStaff
    // } = location.state;

    const { backInfo } = location.state;
    const {
      isFranchiser,
      isHead,
      isSupervisor,
      isManStaff,
      isCleanStaff
    } = this.state;

    if (backInfo) {
      history.push({
        pathname: backInfo.backUrl,
        state: {
          isCleanStaff,
          isFranchiser,
          isHead,
          isManStaff,
          isSupervisor,
          ...backInfo.content
        }
      });
    } else {
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
      selProducts
    });
  };

  public setDatetimeValueNow = () => {
    this.setState({
      selEndDatetime: moment().format("YYYY-MM-DD HH:mm:ss"),
      selProducts: [],
      startDatetime: moment().format("YYYY-MM-DD HH:mm:ss")
    });
  };

  public setEndDatetimeToStart = () => {
    this.setState({
      selEndDatetime: this.state.startDatetime
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

  public selProductReset = () => {
    this.setState({
      selEndDatetime: moment().format("YYYY-MM-DD HH:mm:ss"),
      selProducts: [],
      startDatetime: moment().format("YYYY-MM-DD HH:mm:ss")
    });
  };
}

export default ManagerEnrollCabinetContainer;
