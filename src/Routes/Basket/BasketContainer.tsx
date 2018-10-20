import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import {
  deleteRequestMembership,
  deleteRequestMembershipVariables,
  getRequestMemberships
} from "src/types/api";
import BasketPresenter from "./BasketPresenter";
import {
  DELETE_REQUEST_MEMBERSHIP,
  GET_REQUEST_MEMBERSHIPS
} from "./BasketQueries";

interface IProps extends RouteComponentProps<any> {}

class GetRequestMembershipsQuery extends Query<getRequestMemberships> {}
class DeleteRequestMembershipMutation extends Mutation<
  deleteRequestMembership,
  deleteRequestMembershipVariables
> {}

class BasketContainer extends React.Component<IProps> {
  public deleteReqMembershipFn;
  public render() {
    return (
      <DeleteRequestMembershipMutation
        mutation={DELETE_REQUEST_MEMBERSHIP}
        refetchQueries={[{ query: GET_REQUEST_MEMBERSHIPS }]}
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
                  reqMembershipsLoading={reqMembershipsLoading}
                  reqMembershipDatas={reqMembershipDatas}
                  deleteReqMembership={this.deleteReqMembership}
                  onEnrollReqMembershipClick={this.onEnrollReqMembershipClick}
                />
              )}
            </GetRequestMembershipsQuery>
          );
        }}
      </DeleteRequestMembershipMutation>
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
}

export default BasketContainer;
