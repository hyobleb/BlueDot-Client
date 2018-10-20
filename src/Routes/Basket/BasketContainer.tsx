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
            <GetRequestMembershipsQuery query={GET_REQUEST_MEMBERSHIPS}>
              {({
                loading: reqMembershipsLoading,
                data: reqMembershipDatas
              }) => (
                <BasketPresenter
                  reqMembershipsLoading={reqMembershipsLoading}
                  reqMembershipDatas={reqMembershipDatas}
                  DeleteReqMembership={this.DeleteReqMembership}
                />
              )}
            </GetRequestMembershipsQuery>
          );
        }}
      </DeleteRequestMembershipMutation>
    );
  }

  public DeleteReqMembership = (id: number) => {
    this.deleteReqMembershipFn({
      variables: {
        RequestMembershipId: id
      }
    });
  };
}

export default BasketContainer;
