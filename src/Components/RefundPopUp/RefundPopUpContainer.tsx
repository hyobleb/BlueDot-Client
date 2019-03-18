import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { toast } from "react-toastify";
// import { GET_PAYMENTS_BY_IMPUID } from "src/Routes/ViewPayInfo/ViewPayInfoQueries";
import { managerRefund, managerRefundVariables } from "src/types/api";
import { GET_PAYMENT_INFO } from "../sharedQueries";
import RefundPopUpPresenter from "./RefundPopUpPresenter";
import { MANAGER_REFUND } from "./RefundPopUpQueries";

interface IProps {
  closeFunc: any;
  paymentId: number;
  selPaymentId?: number;
  paymentAmount: number;
  paymentMethod: string;
}

interface IState {
  refundAmount: number;
  refundBank?: string;
  refundHolder?: string;
  refundAccount?: string;
}

class ManagerRefundMutation extends Mutation<
  managerRefund,
  managerRefundVariables
> {}

class BranchSearchPopUpContainer extends React.Component<IProps, IState> {
  public refundFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      refundAmount: 0
    };
  }

  public render() {
    const { closeFunc, paymentId, paymentMethod } = this.props;
    const {
      refundBank,
      refundHolder,
      refundAccount,
      refundAmount
    } = this.state;

    return (
      <ManagerRefundMutation
        mutation={MANAGER_REFUND}
        onCompleted={data => {
          const { ManagerRefund } = data;
          if (ManagerRefund.ok) {
            toast.success("환불을 완료했습니다!");
            closeFunc();
          } else {
            toast.error(ManagerRefund.error);
          }
        }}
        refetchQueries={[
          { query: GET_PAYMENT_INFO, variables: { paymentId } }
          // { query: GET_PAYMENTS_BY_IMPUID, variables: { impUid } }
        ]}
      >
        {(managerRefundMutation, { loading: managerRefundLoading }) => {
          this.refundFn = managerRefundMutation;
          return (
            <RefundPopUpPresenter
              closeFunc={closeFunc}
              onSubmit={this.onSubmit}
              refundBank={refundBank}
              refundHolder={refundHolder}
              refundAmount={refundAmount}
              refundAccount={refundAccount}
              onInputChange={this.onInputChange}
              onOptionChange={this.onOptionChange}
              onBankClick={this.onBankClick}
              paymentMethod={paymentMethod}
              managerRefundLoading={managerRefundLoading}
            />
          );
        }}
      </ManagerRefundMutation>
    );
  }

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const {
      refundAmount,
      refundBank,
      refundHolder,
      refundAccount
    } = this.state;

    const { paymentId, selPaymentId } = this.props;

    if (!refundAmount) {
      toast.error("환불 금액을 입력해주세요!");
    } else if (
      (refundBank || refundHolder || refundAccount) &&
      !(refundBank && refundHolder && refundAccount)
    ) {
      toast.error("환불 계좌를 입력정보가 부족합니다");
    } else {
      this.refundFn({
        variables: {
          paymentId: selPaymentId ? selPaymentId : paymentId,
          refundAccount: refundAccount ? refundAccount : undefined,
          refundAmount,
          refundBank,
          refundHolder: refundHolder ? refundHolder : undefined
        }
      });
    }
    // this.signInMutation();
  };

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;

    const { paymentAmount } = this.props;

    if (name === "refundAmount" && paymentAmount < parseInt(value, 10)) {
      toast.error("환불금액이 결제금액보다 큽니다");
      return;
    }
    this.setState({
      [name]: value
    } as any);
  };
  public onOptionChange = (arg: any) => {
    this.setState({
      ...this.state,
      refundBank: arg.value
    });
  };

  public onBankClick = () => {
    this.setState({
      ...this.state,
      refundBank: undefined
    });
  };
}

export default BranchSearchPopUpContainer;
