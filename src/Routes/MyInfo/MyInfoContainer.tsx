import React from "react";
import MyInfoPresenter from "./MyInfoPresenter";

class MyInfoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return <MyInfoPresenter />;
  }
}

export default MyInfoContainer;
