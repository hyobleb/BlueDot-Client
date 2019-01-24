import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { GET_PAYMENT_INFO } from "src/Components/sharedQueries";
import {
  getPaymentInfo,
  getPaymentInfo_GetPayment_payment,
  getPaymentInfoVariables,
  getPaymentsByImpUid,
  getPaymentsByImpUid_GetPaymentByImpUid_payments,
  getPaymentsByImpUidVariables
} from "src/types/api";
import ViewPayInfoPresenter from "./ViewPayInfoPresenter";
import { GET_PAYMENTS_BY_IMPUID } from "./ViewPayInfoQueries";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  paymentId: number;
  backUrl: string;
  backInfo?: any;
  payment?: getPaymentInfo_GetPayment_payment;
  showRefundPopUp: boolean;
  paymentsByImpUid?: Array<getPaymentsByImpUid_GetPaymentByImpUid_payments | null>;
  selPaymentId?: number;
}

class GetPaymentsByImpUid extends Query<
  getPaymentsByImpUid,
  getPaymentsByImpUidVariables
> {}

class GetPaymentInfoQuery extends Query<
  getPaymentInfo,
  getPaymentInfoVariables
> {}

class ViewPayInfoContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      backInfo: props.location.state.backInfo
        ? {
            ...props.location.state.backInfo
          }
        : undefined,
      backUrl: props.location.state.backUrl || "/",
      paymentId: props.location.state.paymentId,
      showRefundPopUp: false
    };
  }

  public render() {
    const {
      paymentId,
      payment,
      showRefundPopUp,
      paymentsByImpUid,
      selPaymentId
    } = this.state;

    return (
      <GetPaymentsByImpUid
        query={GET_PAYMENTS_BY_IMPUID}
        variables={{ impUid: payment && payment.impUid ? payment.impUid : "" }}
        skip={!payment}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <GetPaymentInfoQuery
            query={GET_PAYMENT_INFO}
            variables={{ paymentId }}
            onCompleted={this.updateFields}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading: getPaymentInfoLoading }) => (
              <ViewPayInfoPresenter
                onBackClick={this.onBackClick}
                getPaymentInfoLoading={getPaymentInfoLoading}
                payment={payment}
                toggleShowRefundPopUp={this.toggleShowRefundPopUp}
                showRefundPopUp={showRefundPopUp}
                paymentsByImpUid={paymentsByImpUid}
                selPaymentId={selPaymentId}
              />
            )}
          </GetPaymentInfoQuery>
        )}
      </GetPaymentsByImpUid>
    );
  }

  public onBackClick = () => {
    const { history, location } = this.props;
    const { backInfo } = location.state;

    history.push({
      pathname: backInfo.backUrl,
      state: {
        ...backInfo.content
      }
    });
  };

  public updateFields = (data: {} | getPaymentInfo | getPaymentsByImpUid) => {
    if ("GetPayment" in data) {
      const {
        GetPayment: { payment }
      } = data;

      if (payment) {
        this.setState({
          payment
        });
      }
    } else if ("GetPaymentByImpUid" in data) {
      const {
        GetPaymentByImpUid: { payments }
      } = data;

      if (payments !== null) {
        this.setState({
          paymentsByImpUid: payments
        });
      }
    }
  };

  public toggleShowRefundPopUp = (paymentId?: number) => {
    this.setState({
      selPaymentId: paymentId,
      showRefundPopUp: !this.state.showRefundPopUp
    });
  };
}
export default ViewPayInfoContainer;
