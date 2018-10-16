import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { getCabinets, getCabinetsVariables } from "src/types/api";
import SettingCabinetsPresenter from "./SettingCabinetsPresenter";
import { GET_CABINETS } from "./SettingCabinetsQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  setId: number;
  cabinets: any;
  horizontalNumber: number;
  verticalNumber: number;
}

class GetCabinetSetQuery extends Query<getCabinets, getCabinetsVariables> {}

class SettingCabinetsContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      cabinets: null,
      horizontalNumber: 0,
      setId: props.location.state.setId,
      verticalNumber: 0
    };
  }

  public render() {
    const { setId, cabinets, horizontalNumber, verticalNumber } = this.state;
    return (
      <GetCabinetSetQuery
        query={GET_CABINETS}
        variables={{ cabinetSetId: setId }}
        onCompleted={data => this.updateFields(data)}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <SettingCabinetsPresenter
            cabinets={cabinets}
            horizontalNumber={horizontalNumber}
            verticalNumber={verticalNumber}
          />
        )}
      </GetCabinetSetQuery>
    );
  }
  public updateFields = (data: {} | getCabinets) => {
    if ("GetCabinetSet" in data) {
      const {
        GetCabinetSet: { cabinetSet }
      } = data;

      if (cabinetSet !== null) {
        const { cabinets } = cabinetSet;
        this.setState({
          cabinets,
          horizontalNumber: cabinetSet.horizontalNumber,
          verticalNumber: cabinetSet.verticalNumber
        });
      }
    }
  };
}

export default SettingCabinetsContainer;
