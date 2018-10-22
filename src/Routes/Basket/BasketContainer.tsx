import React from "react";
import { ApolloConsumer, Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_USABLE_MY_MEMBERSHIPS } from "src/Components/sharedQueries";
import {
  deleteRequestMembership,
  deleteRequestMembershipVariables,
  getRequestMemberships,
  getUsableMyMemberships
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
  public deleteReqMembershipFn: MutationFn;
  public getUsableMembershipFn;
  public render() {
    return (
      <ApolloConsumer>
        {client => {
          this.getUsableMembershipFn = async () => {
            const { data } = await client.query({
              query: GET_USABLE_MY_MEMBERSHIPS
            });
            return data;
          };

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
                        onEnrollReqMembershipClick={
                          this.onEnrollReqMembershipClick
                        }
                        onExtendReqMembershipClick={
                          this.onExtendReqMembershipClick
                        }
                        onEnrollCabinetClick={this.onEnrollCabinetClick}
                      />
                    )}
                  </GetRequestMembershipsQuery>
                );
              }}
            </DeleteRequestMembershipMutation>
          );
        }}
      </ApolloConsumer>
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
    const result: getUsableMyMemberships = await this.getUsableMembershipFn();
    if (result.GetMyUsableMemberships.ok) {
      if (
        result.GetMyUsableMemberships.memberships &&
        result.GetMyUsableMemberships.memberships.length === 0
      ) {
        toast.error("연장할 멤버쉽이 없습니다");
      }
      console.log("연장 화면으로 넘어가기");
    } else {
      toast.error(result.GetMyUsableMemberships.error);
    }
  };

  public onEnrollCabinetClick = () => {
    const { history } = this.props;
    history.push("/enroll-req-cabinet");
  };
}

export default BasketContainer;
