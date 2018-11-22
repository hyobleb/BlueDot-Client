import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import {
  GET_BRANCH_FOR_ERNOLL_CABINET,
  GET_CABINETS
} from "src/Components/sharedQueries";
import {
  getBranchForEnrollCabinet,
  getBranchForEnrollCabinet_UserGetBranch_branch,
  getBranchForEnrollCabinetVariables,
  getCabinet,
  getCabinets,
  getCabinetsVariables
} from "src/types/api";
import ManageCabinetsPresenter from "./ManageCabinetsPreseneter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  showBranchSearchPopUp: boolean;
  selBranchId: number;
  branch?: getBranchForEnrollCabinet_UserGetBranch_branch;
  tempSetId: number;
  selSetId: number;
  cabinets: any;
  horizontalNumber: number;
  cabinetNumber: number;
}

class GetCabinetsQuery extends Query<getCabinets, getCabinetsVariables> {}

class GetBranchQuery extends Query<
  getBranchForEnrollCabinet,
  getBranchForEnrollCabinetVariables
> {}

class ManageCabinetsContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    const selBranchId =
      (props.location.state && props.location.state.selBranchId) || 0;

    const selSetId =
      (props.location.state && props.location.state.selSetId) || 0;

    const cabinetNumber =
      (props.location.state && props.location.state.caqbinetNumber) || 0;

    this.state = {
      cabinetNumber,
      cabinets: null,
      horizontalNumber: 0,
      selBranchId,
      selSetId,
      showBranchSearchPopUp: false,
      tempSetId: 0
    };
  }

  public render() {
    const {
      showBranchSearchPopUp,
      selBranchId,
      branch,
      tempSetId,
      selSetId,
      cabinets,
      horizontalNumber,
      cabinetNumber
    } = this.state;
    return (
      <GetCabinetsQuery
        query={GET_CABINETS}
        variables={{ cabinetSetId: selSetId }}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <GetBranchQuery
            query={GET_BRANCH_FOR_ERNOLL_CABINET}
            variables={{ branchId: selBranchId }}
            skip={selBranchId === 0}
            onCompleted={this.updateFields}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading: getBranchLoading }) => (
              <ManageCabinetsPresenter
                showBranchSearchPopUp={showBranchSearchPopUp}
                toggleSearchBranchPopUpShow={this.toggleSearchBranchPopUpShow}
                branch={branch}
                selBranchId={selBranchId}
                getBranchLoading={getBranchLoading}
                onBranchClick={this.onBranchClick}
                tempSetId={tempSetId}
                selSetId={selSetId}
                onSetHover={this.onSetHover}
                onSetHoverOut={this.onSetHoverOut}
                onSetClick={this.onSetClick}
                cabinets={cabinets}
                horizontalNumber={horizontalNumber}
                onCabinetClick={this.onCabinetClick}
                cabinetNumber={cabinetNumber}
              />
            )}
          </GetBranchQuery>
        )}
      </GetCabinetsQuery>
    );
  }

  public toggleSearchBranchPopUpShow = () => {
    this.setState({
      showBranchSearchPopUp: !this.state.showBranchSearchPopUp
    });
  };

  public updateFields = (
    data: {} | getBranchForEnrollCabinet | getCabinets | getCabinet
  ) => {
    if ("UserGetBranch" in data) {
      const {
        UserGetBranch: { branch }
      } = data;

      if (branch !== null) {
        this.setState({
          branch
        });
      }
    } else if ("GetCabinetSet" in data) {
      const {
        GetCabinetSet: { cabinetSet }
      } = data;

      if (cabinetSet !== null) {
        if (cabinetSet.cabinets) {
          this.setState({
            cabinets: cabinetSet.cabinets.sort((a, b) => {
              return a!.id - b!.id;
            }),
            horizontalNumber: cabinetSet.horizontalNumber
          });
        }
      }
    } else if ("UserGetCabinet" in data) {
      const {
        UserGetCabinet: { cabinet }
      } = data;

      if (cabinet !== null) {
        const { cabinetNumber: findCabinetNumber } = cabinet;

        this.setState({
          cabinetNumber: findCabinetNumber
        });
      }
    }
  };

  public onBranchClick = (branchId: number) => {
    this.setState({
      selBranchId: branchId,
      showBranchSearchPopUp: false
    });
  };

  public onSetHover = (setId: number) => {
    this.setState({
      ...this.state,
      tempSetId: setId
    });
  };

  public onSetHoverOut = () => {
    this.setState({
      ...this.state,
      tempSetId: 0
    });
  };

  public onSetClick = (selSetId: number) => {
    this.setState({
      //   isFirstLoaidng: false,
      selSetId
    });
  };

  public onCabinetClick = (cabinetId: number) => {
    const { history } = this.props;
    const { selBranchId, selSetId, branch } = this.state;
    history.push({
      pathname: "/manage-cabinet",
      state: {
        branchName: branch && branch.name,
        cabinetId,
        selBranchId,
        selSetId
      }
    });
  };
}

export default ManageCabinetsContainer;
