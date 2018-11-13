import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import {
  acceptRequestSignUp,
  acceptRequestSignUpVariables,
  getRequestSignUps,
  getRequestSignUpsVariables,
  rejectRequestSignUp,
  rejectRequestSignUpVariables
} from "src/types/api";
import ViewReqSignUpPresenter from "./ViewReqSignUpPresenter";
import {
  ACCEPT_REQUEST_SIGN_UP,
  GET_REQUEST_SIGN_UPS,
  REJECT_REQUEST_SIGN_UP
} from "./ViewReqSignUpQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId?: number;
  requestSignUps: any[];
  branchName: string;
}

class GetReqSignUpsQuery extends Query<
  getRequestSignUps,
  getRequestSignUpsVariables
> {}

class AcceptReqSignUpMutation extends Mutation<
  acceptRequestSignUp,
  acceptRequestSignUpVariables
> {}

class RejectReqSignUpMutation extends Mutation<
  rejectRequestSignUp,
  rejectRequestSignUpVariables
> {}

class ViewReqSignUpContainer extends React.Component<IProps, IState> {
  public acceptReqSignUpFn: MutationFn;
  public rejectReqSignUpFn: MutationFn;

  constructor(props) {
    super(props);

    this.state = {
      branchId: props.location.state.branchId,
      branchName: "",
      requestSignUps: []
    };
  }
  public render() {
    const { branchId, requestSignUps, branchName } = this.state;
    return (
      <RejectReqSignUpMutation
        mutation={REJECT_REQUEST_SIGN_UP}
        onCompleted={data => {
          const { ManagerRejectReqSignUp } = data;
          if (ManagerRejectReqSignUp.ok) {
            toast.success("해당 요청이 삭제되었습니다");
          } else {
            toast.error(ManagerRejectReqSignUp.error);
          }
        }}
        refetchQueries={[
          { query: GET_REQUEST_SIGN_UPS, variables: { branchId } }
        ]}
      >
        {rejectReqSignUpMutation => {
          this.rejectReqSignUpFn = rejectReqSignUpMutation;
          return (
            <AcceptReqSignUpMutation
              mutation={ACCEPT_REQUEST_SIGN_UP}
              onCompleted={data => {
                const { ManagerAcceptReqSignUp } = data;
                if (ManagerAcceptReqSignUp.ok) {
                  toast.success("해당회원이 가입되었습니다");
                } else {
                  toast.error(ManagerAcceptReqSignUp.error);
                }
              }}
              refetchQueries={[
                { query: GET_REQUEST_SIGN_UPS, variables: { branchId } }
              ]}
            >
              {acceptReqSignUpMutation => {
                this.acceptReqSignUpFn = acceptReqSignUpMutation;
                return (
                  <GetReqSignUpsQuery
                    query={GET_REQUEST_SIGN_UPS}
                    variables={{ branchId }}
                    fetchPolicy={"cache-and-network"}
                    onCompleted={this.updateFields}
                    onError={err => toast.error(err)}
                  >
                    {({ loading: requestSignUpsLoading }) => (
                      <ViewReqSignUpPresenter
                        requestSignUps={requestSignUps}
                        requestSignUpsLoading={requestSignUpsLoading}
                        onAcceptReqSignUp={this.onAcceptReqSignUp}
                        onRejectReqSignUp={this.onRejectReqSignUp}
                        branchName={branchName}
                        onBackClick={this.onBackClick}
                      />
                    )}
                  </GetReqSignUpsQuery>
                );
              }}
            </AcceptReqSignUpMutation>
          );
        }}
      </RejectReqSignUpMutation>
    );
  }

  public updateFields = (data: {} | getRequestSignUps) => {
    if ("ManagerGetRequestSignUps" in data) {
      const {
        ManagerGetRequestSignUps: { requestSignUps, branch }
      } = data;
      if (requestSignUps !== null) {
        this.setState(
          {
            branchName: branch ? branch.name : "",
            requestSignUps
          },
          () => console.log(this.state)
        );
      }
    }
  };

  public onAcceptReqSignUp = async (reqSignUpId: number) => {
    await this.acceptReqSignUpFn({ variables: { reqSignUpId } });
  };
  public onRejectReqSignUp = async (reqSignUpId: number) => {
    await this.rejectReqSignUpFn({ variables: { reqSignUpId } });
  };

  public onBackClick = () => {
    const { history } = this.props;
    const { branchId } = this.state;
    history.push({
      pathname: "/manage-users",
      state: {
        branchId
      }
    });
  };
}

export default ViewReqSignUpContainer;
