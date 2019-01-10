// import axios from "axios";
import moment = require("moment");
import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import Script from "react-load-script";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_MY_MEMBERSHIPS,
  GET_USABLE_MY_MEMBERSHIPS
} from "src/Components/sharedQueries";
// import { KAKAO_JAVASCRIPT_KEY } from "src/keys";
// import { KAKAO_ADMIN_KEY } from "src/keys";
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
import { SERVER_HOME_HOST } from "../../keys";
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
  kakaoLoad: boolean;
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
      jqueryLoad: false,
      kakaoLoad: false
    };
  }

  public render() {
    this.sendKakaoMessage();
    const { importLoad, jqueryLoad, baseBranchId, kakaoLoad } = this.state;
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

        <Script
          url="https://developers.kakao.com/sdk/js/kakao.min.js"
          onLoad={() => {
            this.setKakaoLoad();
          }}
          onCreate={this.setKakaoLoad}
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
                                      kakaoLoad={kakaoLoad}
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
    // if (payMethod === "CARD") {
    //   toast.info("카드 결제는 현재 준비중입니다!");
    //   return;
    // }
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

  public setKakaoLoad = () => {
    this.setState({
      kakaoLoad: true
    });
  };

  public sendKakaoMessage = async () => {
    // const result = await axios({
    //   headers: {
    //     Authorization: "KakaoAK " + KAKAO_ADMIN_KEY
    //     // "Content-Type": "application/json"
    //   }, // 인증 토큰 Authorization header에 추가
    //   method: "get", // POST method
    //   url: "http://kapi.kakao.com//v1/push/register"
    // });
    // console.log({ result });
    // const Kakao = (window as any).Kakao;
    // Kakao.init(KAKAO_JAVASCRIPT_KEY);
    // Kakao.PlusFriend.chat({
    //   plusFriendId: "_xmXxiru" // 플러스친구 홈 URL에 명시된 id로 설정합니다.
    // });
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

      // console.log({ paymentResult });

      if (paymentResult.GetPayment.ok) {
        if (paymentResult.GetPayment.payment) {
          if (paymentResult.GetPayment.payment.payMethod === "CARD") {
            payMethod = "card";
          } else if (paymentResult.GetPayment.payment.payMethod === "PHONE") {
            payMethod = "phone";
          } else if (paymentResult.GetPayment.payment.payMethod === "VBANK") {
            payMethod = "vbank";
          } else if (paymentResult.GetPayment.payment.payMethod === "TRANS") {
            payMethod = "trans";
          }
          // TODO: 다른 결제 로직도 추가

          const amount = paymentResult.GetPayment.payment.amount;
          const name = paymentResult.GetPayment.payment.user.name;
          const buyerTel = paymentResult.GetPayment.payment.user.phoneNumber;
          const merchantUid = paymentResult.GetPayment.payment.merchant_uid;

          await IMP.request_pay(
            {
              // param
              amount,
              buyer_name: name,
              buyer_tel: buyerTel,
              merchant_uid: merchantUid,
              name: "블루닷라운지 멤버쉽 결제",
              pay_method: payMethod,
              pg: "html5_inicis",
              vbank_due:
                payMethod === "vbank"
                  ? moment()
                      .add(1, "d")
                      .format("YYYYMMDDhhmm")
                  : undefined,

              m_redirect_url: `${SERVER_HOME_HOST}/payments/complete/mobile`
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
                    if (
                      payMethod === "card" ||
                      payMethod === "phone" ||
                      payMethod === "trans"
                    ) {
                      toast.success("결제 및 등록이 완료되었습니다 :)");
                      history.push("/home");

                      // KAKAO MESSAGE 전송
                      this.sendKakaoMessage();
                    } else if (payMethod === "vbank") {
                      console.log("가상 결제 진행");
                      // TODO: 무통장 결제 로직 추가
                      // rsp 속성 이용처리 :
                      // vbank_num : string 가상계좌 입금계좌번호	PG사로부터 전달된 정보 그대로 제공하므로 숫자 외 dash(-)또는 기타 기호가 포함되어 있을 수 있음
                      // vbank_name : string 가상계좌 은행명
                      // vbank_holder : string 가상계좌 예금주 계약된 사업자명으로 항상 일정함. 단, 일부 PG사의 경우 null반환하므로 자체 처리 필요
                      // vbank_date : number 가상계좌 입금기한	UNIX timestamp
                    }
                  }
                }
              } else {
                toast.error("결제에 실패했습니다");
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
