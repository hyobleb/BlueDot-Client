import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import {
  headGetBranchForCabinetsSetting,
  headGetBranchForCabinetsSettingVariables
} from "src/types/api";
import SettingCabinetsPresenter from "./SettingCabinetsPresenter";
import { HEAD_GET_BRANCH_FOR_CABINETS_SETTING } from "./SettingCabinetsQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
}

class GetBranch extends Query<
  headGetBranchForCabinetsSetting,
  headGetBranchForCabinetsSettingVariables
> {}

class SettingCabinetsContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchId: props.location.state.branchId
    };
  }

  public render() {
    return (
      <GetBranch
        query={HEAD_GET_BRANCH_FOR_CABINETS_SETTING}
        onCompleted={data => console.log(data)}
      >
        {({ loading, data }) => (
          <SettingCabinetsPresenter loading={loading} data={data} />
        )}
      </GetBranch>
    );
  }
}

export default SettingCabinetsContainer;
