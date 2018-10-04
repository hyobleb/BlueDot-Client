import React from "react";
import { RouteComponentProps } from "react-router";
import BranchSettingPresenter from "./BranchSettingPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchInput: string;
}

class BranchSettingContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      branchInput: ""
    };
  }

  public render() {
    return (
      <BranchSettingPresenter
        branchInput={this.state.branchInput}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    console.log(this.state.branchInput);
    // this.signInMutation();
  };
}

export default BranchSettingContainer;
