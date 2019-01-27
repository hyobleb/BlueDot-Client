import React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditProfilePresenter from "./EditProfilePresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  phoneNumber: string;
  password: string;
  rePassword: string;
}

class EditProfileContainer extends React.Component<IProps, IState> {
  public render() {
    const { phoneNumber, password, rePassword } = this.state;
    return (
      <EditProfilePresenter
        phoneNumber={phoneNumber}
        password={password}
        rePassword={rePassword}
      />
    );
  }
}

export default EditProfileContainer;
