import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserId, getUserIdVariables } from "../../../types/api";
import FindUserIdPresenter from "./FindUserIdPresenter";
import { GET_USER_ID } from "./FindUserIdQueries";

interface IState {
  backUrl: string;
  name: string;
  phoneNumber: string;
  userId?: string;
  doGetUserId: boolean;
}

class GetUserIdQuery extends Query<getUserId, getUserIdVariables> {}

class FindUserIdContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      backUrl: props.location.state.backInfo.backUrl,
      doGetUserId: false,
      name: "",
      phoneNumber: ""
    };
  }

  public render() {
    const { backUrl, name, phoneNumber, doGetUserId, userId } = this.state;

    return (
      <GetUserIdQuery
        query={GET_USER_ID}
        variables={{ name, phoneNumber }}
        skip={!doGetUserId}
        onCompleted={this.updateFields}
        onError={err => {
          toast.error(err);
          this.setState({ doGetUserId: false });
        }}
        fetchPolicy={"cache-and-network"}
      >
        {({ loading: findUserIdLoading }) => (
          <FindUserIdPresenter
            backUrl={backUrl}
            onInputChange={this.onInputChange}
            name={name}
            phoneNumber={phoneNumber}
            onConfirmClick={this.onConfirmClick}
            userId={userId}
            onOkClick={this.onOkClick}
            findUserIdLoading={findUserIdLoading}
            doGetUserId={doGetUserId}
          />
        )}
      </GetUserIdQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public onConfirmClick = () => {
    const { name, phoneNumber } = this.state;
    if (!name || !phoneNumber) {
      toast.error("두 항목을 모두 입력해주세요");
      this.setState({
        doGetUserId: false
      });
      return;
    }

    this.setState({
      doGetUserId: true
    });
  };

  public updateFields = (data: {} | getUserId) => {
    if ("GetUserId" in data) {
      const {
        GetUserId: { userId, error }
      } = data;

      if (userId !== null) {
        this.setState({ userId, doGetUserId: false });
      } else {
        toast.error(error);
        this.setState({ doGetUserId: false });
      }
    }
  };

  public onOkClick = () => {
    const { history } = this.props;
    history.push("/");
  };
}
export default FindUserIdContainer;
