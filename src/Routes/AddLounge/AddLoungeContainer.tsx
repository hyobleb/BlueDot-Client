import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { getBranch, getBranchVariables } from "../../types/api";
import AddLoungePresenter from "./AddLoungePresenter";
import { GET_BRANCH_FOR_UPDATE_LOUNGE } from "./AddLoungeQueries";

interface IProps extends RouteComponentProps<any> {
  branchId: number;
}

interface IState {
  branchId: number;
}

class RoomQuery extends Query<getBranch, getBranchVariables> {}

class AddLoungeContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // console.log(props)를 찍어보면 여러가지를 확인할수 있는데
    // 그중 loation.state를 사용한다
    // 새로 고침해도 날라가지 않음
    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      branchId: props.location.state.branchId
    };
  }
  public render() {
    const { branchId } = this.state;
    const { history } = this.props;
    return (
      <RoomQuery query={GET_BRANCH_FOR_UPDATE_LOUNGE} variables={{ branchId }}>
        {({ loading, error, data }) => {
          if (error) {
            toast.error(error.message);
            history.push("/");
          }
          console.log(data);
          return <AddLoungePresenter data={data} loading={loading} />;
        }}
      </RoomQuery>
    );
  }
}

export default AddLoungeContainer;
