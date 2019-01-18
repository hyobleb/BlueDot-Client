import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { GET_VBNAK_PAYMENTS } from "../../Components/sharedQueries";
import {
  getVbankPayments,
  getVbankPayments_GetVbankPayments_payments
} from "../../types/api";
import VbankListPresenter from "./VbankListPresenter";

class GetVBankQuery extends Query<getVbankPayments> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  vbankPayments: getVbankPayments_GetVbankPayments_payments[];
}
class VbankListContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      vbankPayments: []
    };
  }

  public render() {
    const { vbankPayments } = this.state;
    return (
      <GetVBankQuery
        query={GET_VBNAK_PAYMENTS}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {({ loading: getVbankLoading }) => (
          <VbankListPresenter
            vbankPayments={vbankPayments}
            getVbankLoading={getVbankLoading}
          />
        )}
      </GetVBankQuery>
    );
  }

  public updateFields = (data: {} | getVbankPayments) => {
    if ("GetVbankPayments" in data) {
      const {
        GetVbankPayments: { payments }
      } = data;

      if (payments !== null) {
        this.setState({
          vbankPayments: payments
        } as any);
      }
    }
  };
}

export default VbankListContainer;
