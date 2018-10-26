import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import Script from "react-load-script";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MY_MEMBERSHIPS,
  GET_USABLE_MY_MEMBERSHIPS
} from "src/Components/sharedQueries";
import {
  completePayment,
  completePaymentVariables,
  createPayment,
  createPaymentVariables,
  deleteRequestMembership,
  deleteRequestMembershipVariables,
  getBranchForImp,
  getPayment,
  getRequestMemberships,
  getUsableMyMemberships
} from "src/types/api";
import BasketPresenter from "./BasketPresenter";
import {
  COMPLETE_PAYMENT,
  CREATE_PAYMENT,
  DELETE_REQUEST_MEMBERSHIP,
  GET_BRANCH_FOR_IMP,
  GET_PAYMENT,
  GET_REQUEST_MEMBERSHIPS
} from "./BasketQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  jqueryLoad: boolean;
  importLoad: boolean;
  impId: string;
  baseBranchId: number;
}

class CreatePaymentMutation extends Mutation<
  createPayment,
  createPaymentVariables
> {}
class GetRequestMembershipsQuery extends Query<getRequestMemberships> {}
class DeleteRequestMembershipMutation extends Mutation<
  deleteRequestMembership,
  deleteRequestMembershipVariables
> {}

class CompletePaymentMutation extends Mutation<
  completePayment,
  completePaymentVariables
> {}

class BasketContainer extends React.Component<IProps, IState> {
  public deleteReqMembershipFn: MutationFn;
  public getUsableMembershipFn;
  public createPaymentFn: MutationFn;
  public getBranchForImpFn;
  public getPaymentFn;
  public completePaymentFn: MutationFn;

  constructor(props: IProps) {
    super(props);
    this.state = {
      baseBranchId: 0,
      impId: "",
      importLoad: false,
      jqueryLoad: false
    };
  }

  public render() {
    const { importLoad, jqueryLoad, baseBranchId } = this.state;
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
        <ApolloConsumer>
          {client => {
            this.getUsableMembershipFn = async () => {
              const { data } = await client.query({
                fetchPolicy: "cache-first",
                query: GET_USABLE_MY_MEMBERSHIPS
              });
              return data;
            };
            this.getBranchForImpFn = async () => {
              const { data } = await client.query({
                query: GET_BRANCH_FOR_IMP,
                variables: { branchId: baseBranchId }
              });
              return data;
            };
            this.getPaymentFn = async (paymentId: number) => {
              const { data } = await client.query({
                query: GET_PAYMENT,
                variables: { paymentId }
              });
              return data;
            };

            return (
              <CompletePaymentMutation
                mutation={COMPLETE_PAYMENT}
                refetchQueries={[{ query: GET_MY_MEMBERSHIPS }]}
              >
                {completePaymentMutationFn => {
                  this.completePaymentFn = completePaymentMutationFn;
                  return (
                    <CreatePaymentMutation mutation={CREATE_PAYMENT}>
                      {createPaymentMutationFn => {
                        this.createPaymentFn = createPaymentMutationFn;
                        return (
                          <DeleteRequestMembershipMutation
                            mutation={DELETE_REQUEST_MEMBERSHIP}
                            refetchQueries={[
                              { query: GET_REQUEST_MEMBERSHIPS }
                            ]}
                          >
                            {deleteRequestMembershipFn => {
                              this.deleteReqMembershipFn = deleteRequestMembershipFn;
                              return (
                                <GetRequestMembershipsQuery
                                  query={GET_REQUEST_MEMBERSHIPS}
                                  fetchPolicy={"cache-and-network"}
                                >
                                  {({
                                    loading: reqMembershipsLoading,
                                    data: reqMembershipDatas
                                  }) => (
                                    <BasketPresenter
                                      reqMembershipsLoading={
                                        reqMembershipsLoading
                                      }
                                      reqMembershipDatas={reqMembershipDatas}
                                      deleteReqMembership={
                                        this.deleteReqMembership
                                      }
                                      onEnrollReqMembershipClick={
                                        this.onEnrollReqMembershipClick
                                      }
                                      onExtendReqMembershipClick={
                                        this.onExtendReqMembershipClick
                                      }
                                      onEnrollCabinetClick={
                                        this.onEnrollCabinetClick
                                      }
                                      onExtendReqCabinetClick={
                                        this.onExtendReqCabinetClick
                                      }
                                      onPaymentClick={this.onPaymentClick}
                                      importLoad={importLoad}
                                      jqueryLoad={jqueryLoad}
                                    />
                                  )}
                                </GetRequestMembershipsQuery>
                              );
                            }}
                          </DeleteRequestMembershipMutation>
                        );
                      }}
                    </CreatePaymentMutation>
                  );
                }}
              </CompletePaymentMutation>
            );
          }}
        </ApolloConsumer>
      </>
    );
  }

  public deleteReqMembership = (id: number) => {
    this.deleteReqMembershipFn({
      variables: {
        RequestMembershipId: id
      }
    });
  };

  public onEnrollReqMembershipClick = () => {
    const { history } = this.props;
    history.push("/enroll-req-membership");
  };

  public onExtendReqMembershipClick = async () => {
    const { history } = this.props;
    const result: getUsableMyMemberships = await this.getUsableMembershipFn();
    if (result.GetMyUsableMemberships.ok) {
      if (
        result.GetMyUsableMemberships.memberships &&
        result.GetMyUsableMemberships.memberships.length !== 0
      ) {
        const filteredMemberships = result.GetMyUsableMemberships.memberships.filter(
          membership => membership && !membership.cabinetId
        );
        if (filteredMemberships.length === 0) {
          toast.error("연장할 멤버쉽이 없습니다");
          return;
        }
      } else {
        toast.error("연장할 멤버쉽이 없습니다");
      }

      history.push("/extend-req-membership");
    } else {
      toast.error(result.GetMyUsableMemberships.error);
    }
  };

  public onEnrollCabinetClick = () => {
    const { history } = this.props;
    history.push("/enroll-req-cabinet");
  };

  public onExtendReqCabinetClick = () => {
    const { history } = this.props;
    history.push("/extend-req-cabinet");
  };

  public onPaymentClick = async (baseBranchId: number, payMethod: string) => {
    this.setState(
      {
        baseBranchId
      },
      async () => {
        const result = await this.createPaymentFn({
          variables: { payMethod }
        });
        if (result && result.data && result.data.CreatePayment) {
          if (result.data.CreatePayment.ok) {
            const branchResult: getBranchForImp = await this.getBranchForImpFn();
            if (
              branchResult.GuestGetBranch &&
              branchResult.GuestGetBranch.branch &&
              branchResult.GuestGetBranch.branch.impId
            ) {
              await this.processingPayment(
                branchResult.GuestGetBranch.branch.impId,
                result.data.CreatePayment.payment.id
              );
            }
          } else {
            toast.error(result.data.CreatePayment.error);
          }
        } else {
          toast.error("결제에 실패했습니다");
        }
      }
    );
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

  public processingPayment = async (impId: string, paymentId: number) => {
    const { history } = this.props;
    if (!this.state.baseBranchId) {
      toast.error("지점을 먼저 설정하셔야 됩니다");
      return;
    }

    if (this.state.jqueryLoad && this.state.importLoad) {
      const IMP = (window as any).IMP;
      IMP.init(impId);
      const paymentResult: getPayment = await this.getPaymentFn(paymentId);
      let payMethod;

      if (paymentResult.UserGetPayment.ok) {
        if (paymentResult.UserGetPayment.payment) {
          if (paymentResult.UserGetPayment.payment.payMethod === "CARD") {
            payMethod = "card";
          } else if (
            paymentResult.UserGetPayment.payment.payMethod === "PHONE"
          ) {
            payMethod = "phone";
          }
          // TODO: 다른 결제 로직도 추가

          const amount = paymentResult.UserGetPayment.payment.amount;
          const name = paymentResult.UserGetPayment.payment.user.name;
          const buyerTel =
            paymentResult.UserGetPayment.payment.user.phoneNumber;
          const merchantUid = paymentResult.UserGetPayment.payment.merchant_uid;

          await IMP.request_pay(
            {
              // param
              amount,
              buyer_name: name,
              buyer_tel: buyerTel,
              merchant_uid: merchantUid,
              name: "블루닷라운지 멤버쉽 결제",
              pay_method: payMethod,
              pg: "html5_inicis"
            },
            async rsp => {
              // callback
              if (rsp.success) {
                const paymentCompleteResult = await this.completePaymentFn({
                  variables: {
                    imp_uid: rsp.imp_uid,
                    merchant_uid: merchantUid,
                    paymentId
                  }
                });

                if (paymentCompleteResult) {
                  if (paymentCompleteResult.data.CompletePayment.ok) {
                    if (payMethod === "card" || payMethod === "phone") {
                      toast.success("결제 및 등록이 완료되었습니다 :)");
                      history.push("/home");
                    }
                    // TODO: 무통장 결제 로직 추가
                  }
                }
              } else {
                console.log("실패");
              }
            }
          );
        }
      } else {
        toast.error("결제에 실패했습니다");
      }
    } else {
      toast.error("결제 모듈이 제대로 불러오지 않았습니다");
    }
  };
}

export default BasketContainer;
