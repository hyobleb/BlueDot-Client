import moment from "moment";
import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import Script from "react-load-script";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MY_MEMBERSHIPS,
  GET_USABLE_MY_MEMBERSHIPS
} from "../../Components/sharedQueries";
import { CreatePaymentMethodOption } from "../../Components/shareOptions";
import { SERVER_HOME_HOST } from "../../keys";
import {
  completePayment,
  completePaymentVariables,
  createPayment,
  createPayment_CreatePayment_payment,
  createPaymentVariables,
  deleteRequestMembership,
  deleteRequestMembershipVariables,
  getBranchForImp,
  getBranchForImpVariables,
  getPayment,
  getRequestMemberships,
  getRequestMemberships_UserGetRequest_requestMemberships,
  getUsableMyMemberships,
  getUsableMyMemberships_GetMyUsableMemberships_memberships
} from "../../types/api";
import {
  COMPLETE_PAYMENT,
  CREATE_PAYMENT,
  DELETE_REQUEST_MEMBERSHIP,
  GET_BRANCH_FOR_IMP,
  GET_REQUEST_MEMBERSHIPS
} from "../Basket/BasketQueries";
import BasketV2Presenter from "./BasketV2Presenter";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  jqueryLoad: boolean;
  importLoad: boolean;
  requestMemberships: Array<getRequestMemberships_UserGetRequest_requestMemberships | null> | null;
  delReqMemItemId: number | undefined;
  usableMemberships: Array<getUsableMyMemberships_GetMyUsableMemberships_memberships | null> | null;
  baseBranchId: number;
  impId?: string;
  payProcessing: boolean;
  payment?: createPayment_CreatePayment_payment | null;
}

class CreatePaymentMutation extends Mutation<
  createPayment,
  createPaymentVariables
> {}
class GetUsableMemberships extends Query<getUsableMyMemberships> {}
class GetRequestMembershipsQuery extends Query<getRequestMemberships> {}
class DeleteRequestMembershipMutation extends Mutation<
  deleteRequestMembership,
  deleteRequestMembershipVariables
> {}
class GetBranchForImpQuery extends Query<
  getBranchForImp,
  getBranchForImpVariables
> {}
class CompletePaymentMutation extends Mutation<
  completePayment,
  completePaymentVariables
> {}

class BasketV2Container extends React.Component<IProps, IState> {
  public delReqMem: MutationFn;
  public createPaymentFn: MutationFn;
  public completePaymentFn: MutationFn;

  constructor(props) {
    super(props);
    this.state = {
      baseBranchId: 0,
      delReqMemItemId: undefined,
      importLoad: false,
      jqueryLoad: false,
      payProcessing: false,
      requestMemberships: [],
      usableMemberships: []
    };
  }

  public render() {
    const {
      requestMemberships,
      delReqMemItemId,
      baseBranchId,
      payProcessing
    } = this.state;


    return (
      <>
        <Script
          url="https://code.jquery.com/jquery-1.12.4.min.js"
          onLoad={() => {
            this.setJqueryLoad();
          }}
          onCreate={this.setJqueryLoad}
        />
        <Script
          url="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
          onLoad={() => {
            this.setImportLoad();
          }}
          onCreate={this.setImportLoad}
        />

        <CompletePaymentMutation
          mutation={COMPLETE_PAYMENT}
          refetchQueries={[{ query: GET_MY_MEMBERSHIPS }]}
          onError={err =>
            toast.error(
              `멤버쉽 등록이 정상적으로 이루어지지 않았습니다. 관리자에게 문의해주세요! ${err}`
            )
          }
        >
          {completePaymentMutation => {
            this.completePaymentFn = completePaymentMutation;
            return (
              <GetBranchForImpQuery
                query={GET_BRANCH_FOR_IMP}
                variables={{ branchId: baseBranchId }}
                skip={!baseBranchId}
                onCompleted={this.updateFields}
                fetchPolicy={"cache-and-network"}
              >
                {() => (
                  <CreatePaymentMutation
                    mutation={CREATE_PAYMENT}
                    onCompleted={this.updateFields}
                    refetchQueries={[{ query: GET_REQUEST_MEMBERSHIPS }]}
                    onError={err => toast.error(err)}
                  >
                    {createPaymentMutationFn => {
                      this.createPaymentFn = createPaymentMutationFn;
                      return (
                        <GetUsableMemberships
                          query={GET_USABLE_MY_MEMBERSHIPS}
                          onCompleted={this.updateFields}
                          fetchPolicy={"cache-and-network"}
                        >
                          {() => (
                            <DeleteRequestMembershipMutation
                              mutation={DELETE_REQUEST_MEMBERSHIP}
                              refetchQueries={[
                                { query: GET_REQUEST_MEMBERSHIPS }
                              ]}
                              onCompleted={this.updateFields}
                            >
                              {(delReqMem, { loading: delReqMemLoading }) => {
                                this.delReqMem = delReqMem;
                                return (
                                  <GetRequestMembershipsQuery
                                    query={GET_REQUEST_MEMBERSHIPS}
                                    fetchPolicy={"cache-and-network"}
                                    onCompleted={this.updateFields}
                                  >
                                    {({ loading: getReqMemsLoading }) => (
                                      <BasketV2Presenter
                                        getReqMemsLoading={getReqMemsLoading}
                                        requestMemberships={requestMemberships}
                                        onEnrollReqMembershipClick={
                                          this.onEnrollReqMembershipClick
                                        }
                                        delReqMemLoading={delReqMemLoading}
                                        delReqMemItemId={delReqMemItemId}
                                        onDelReqMemClick={this.onDelReqMemClick}
                                        onExtendReqMembershipClick={
                                          this.onExtendReqMembershipClick
                                        }
                                        onEnrollCabinetClick={
                                          this.onEnrollCabinetClick
                                        }
                                        onExtendCabinetClick={
                                          this.onExtendCabinetClick
                                        }
                                        onPaymentClick={this.onPaymentClick}
                                        payProcessing={payProcessing}
                                      />
                                    )}
                                  </GetRequestMembershipsQuery>
                                );
                              }}
                            </DeleteRequestMembershipMutation>
                          )}
                        </GetUsableMemberships>
                      );
                    }}
                  </CreatePaymentMutation>
                )}
              </GetBranchForImpQuery>
            );
          }}
        </CompletePaymentMutation>
      </>
    );
  }

  public updateFields = async (
    data:
      | {}
      | getRequestMemberships
      | getUsableMyMemberships
      | getBranchForImp
      | createPayment
      | deleteRequestMembership
      | getPayment
  ) => {
    if ("UserGetRequest" in data) {
      const {
        UserGetRequest: { requestMemberships, branchId }
      } = data;

      if (requestMemberships) {
        this.setState({
          baseBranchId: branchId || 0,
          requestMemberships
        });
      }
    } else if ("GetMyUsableMemberships" in data) {
      const {
        GetMyUsableMemberships: { memberships }
      } = data;
      if (memberships) {
        this.setState({
          usableMemberships: memberships
        });
      }
    } else if ("GuestGetBranch" in data) {
      const {
        GuestGetBranch: { branch }
      } = data;

      if (branch && branch.impId) {
        this.setState({
          impId: branch.impId
        });
      }
    } else if ("CreatePayment" in data) {
      const {
        CreatePayment: { payment }
      } = data;
      if (payment) {
        await this.setState(
          {
            payment
          },
          async () => {
            const { impId } = this.state;
            if (impId) {
              await this.processingPayment(impId, payment.id);
            }
          }
        );
      }
    } else if ("UserDeleteRequest" in data) {
      const { UserDeleteRequest } = data;
      if (UserDeleteRequest.ok) {
        toast.success("해당 멤버쉽을 장바구니에서 삭제했습니다");
      }
    }
  };

  public onEnrollReqMembershipClick = () => {
    const { history } = this.props;
    history.push("/enroll-req-membership");
  };

  public onExtendReqMembershipClick = async () => {
    const { history } = this.props;
    const { usableMemberships } = this.state;

    if (usableMemberships) {
      if (
        usableMemberships.filter(mem => mem && mem.target === "MEMBERSHIP")
          .length === 0
      ) {
        toast.error("연장할 멤버쉽이 없습니다");
      } else {
        history.push("/extend-req-membership");
      }
    }
  };

  public onEnrollCabinetClick = () => {
    const { history } = this.props;
    history.push("/enroll-req-cabinet");
  };

  public onExtendCabinetClick = () => {
    const { history } = this.props;
    const { usableMemberships } = this.state;

    if (usableMemberships) {
      if (
        usableMemberships.filter(mem => mem && mem.target === "CABINET")
          .length === 0
      ) {
        toast.error("연장할 사물함이 없습니다");
      } else {
        history.push("/extend-req-cabinet");
      }
    }
  };

  public onDelReqMemClick = async (id: number) => {
    await this.setState(
      {
        delReqMemItemId: id
      },
      async () => {
        await this.delReqMem({
          variables: {
            RequestMembershipId: id
          }
        });
      }
    );
  };

  public onPaymentClick = async (payMethod: string) => {
    await this.setState(
      {
        payProcessing: true
      },
      async () => {
        // const result =
        await this.createPaymentFn({
          variables: { payMethod }
        });
      }
    );
  };

  public processingPayment = async (impId: string, paymentId: number) => {
    const { history } = this.props;
    if (this.state.jqueryLoad && this.state.importLoad) {
      const IMP = (window as any).IMP;
      IMP.init(impId);

      const { payment } = this.state;
      if (!payment) {
        toast.error("결제 정보가 존재하지 않습니다");
      } else {
        const {
          payMethod,
          amount,
          merchant_uid,
          user: { name, phoneNumber: buyerTel, email }
        } = payment;
        await IMP.request_pay(
          {
            // param
            amount,
            buyer_email: email,
            buyer_name: name,
            buyer_tel: buyerTel,
            m_redirect_url: `${SERVER_HOME_HOST}/payments/complete/mobile`,
            merchant_uid,
            name: "블루닷라운지 멤버쉽 결제",
            pay_method: payMethod,
            pg: "html5_inicis",
            vbank_due:
              payMethod === "vbank"
                ? moment()
                    .add(1, "d")
                    .format("YYYYMMDDhhmm")
                : undefined
          },
          async rsp => {
            // callback

            if (rsp.success) {
              const paymentCompleteResult = await this.completePaymentFn({
                variables: {
                  imp_uid: rsp.imp_uid,
                  merchant_uid,
                  paymentId
                }
              });

              if (paymentCompleteResult) {
                if (paymentCompleteResult.data.CompletePayment.ok) {
                  if (
                    payMethod === CreatePaymentMethodOption.CARD ||
                    payMethod === CreatePaymentMethodOption.PHONE ||
                    payMethod === CreatePaymentMethodOption.TRANS
                  ) {
                    toast.success("결제 및 등록이 완료되었습니다 :)");
                    this.setState({
                      payProcessing: false
                    });
                    history.push("/");
                  }
                }
              }
            } else {
              toast.error("결제에 실패했습니다!");
              this.setState({
                payProcessing: false
              });
            }
          }
        );
      }
    } else {
      toast.error("결제 모듈이 제대로 불러오지 않았습니다");
    }
  };

  public setJqueryLoad = () => {
    this.setState({
      jqueryLoad: true
    });
  };

  public setImportLoad = () => {
    this.setState({
      importLoad: true
    });
  };
}

export default BasketV2Container;
