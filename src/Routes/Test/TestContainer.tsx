import React from "react";
import TestPresenter from "./TestPresenter";

class TestContainer extends React.Component {
  public onSeatClick = async id => {
    await console.log({ id });
  };

  public onDoorClick = () => {
    console.log("door click");
  };

  public render() {
    return (
      <TestPresenter
        onSeatClick={this.onSeatClick}
        onDoorClick={this.onDoorClick}
        forAdmin={true}
      />
    );
  }
}
export default TestContainer;
