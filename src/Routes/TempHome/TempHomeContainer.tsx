import React from "react";
import TempHomePresenter from "./TempHomePresenter";

class TempHomeContainer extends React.Component {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }

    console.log(props.location.state);
  }

  public render() {
    return <TempHomePresenter />;
  }
}

export default TempHomeContainer;
