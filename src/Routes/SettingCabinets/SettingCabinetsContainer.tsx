import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { GET_CABINETS } from "src/Components/sharedQueries";
import { getCabinets, getCabinetsVariables } from "src/types/api";
import SettingCabinetsPresenter from "./SettingCabinetsPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  setId: number;
  cabinets: any;
  horizontalNumber: number;
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
      setId: props.location.state.setId
    };
  }

  public render() {
    const { setId, cabinets, horizontalNumber } = this.state;
    console.log({ settingCabinets: cabinets });
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

        if (cabinets) {
          this.setState({
            cabinets: cabinets.sort((a, b) => {
              return a!.id - b!.id;
            }),
            horizontalNumber: cabinetSet.horizontalNumber
          });
        }
      }
    }
  };
}

export default SettingCabinetsContainer;
