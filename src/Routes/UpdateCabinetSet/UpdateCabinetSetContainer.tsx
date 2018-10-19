import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_CABINET_SET } from "src/Components/sharedQueries";
import {
  getCabinetSet,
  getCabinetSetVariables,
  headGetBranchForCabinetsSetting,
  headGetBranchForCabinetsSettingVariables,
  headUpdateCabinetSet,
  headUpdateCabinetSetVariables
} from "src/types/api";
import { HEAD_GET_BRANCH_FOR_CABINETS_SETTING } from "../SettingCabinetSets/SettingCabinetSetsQueries";
import UpdateCabinetSetPresenter from "./UpdateCabinetSetPresenter";
import { HEAD_UPDATE_CABINET_SET } from "./UpdateCabinetSetQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  setId: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  title: string;
  setNumber: number;
}

class GetBranchQuery extends Query<
  headGetBranchForCabinetsSetting,
  headGetBranchForCabinetsSettingVariables
> {}

class GetCabinetSetQuery extends Query<getCabinetSet, getCabinetSetVariables> {}

class UpdateCabinetSetMutation extends Mutation<
  headUpdateCabinetSet,
  headUpdateCabinetSetVariables
> {}

class UpdateLoungeContainer extends React.Component<IProps, IState> {
  public updateCabinetSet;
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      branchId: props.location.state.branchId,
      height: 0,
      setId: props.location.state.setId,
      setNumber: 0,
      title: "",
      width: 0,
      xpos: 0,
      ypos: 0
    };
  }
  public render() {
    const {
      branchId,
      setId,
      height,
      setNumber,
      width,
      xpos,
      ypos,
      title
    } = this.state;

    const { history } = this.props;
    return (
      <UpdateCabinetSetMutation
        mutation={HEAD_UPDATE_CABINET_SET}
        variables={{
          cabinetSetId: setId,
          height,
          setNumber,
          title,
          width,
          xpos,
          ypos
        }}
        onCompleted={data => {
          if (data.HeadUpdateCabinetSet.ok) {
            toast.success("해당 사물함 세트를 수정완료했습니다");
            setTimeout(() => {
              history.push({
                pathname: "/set-setting",
                state: { branchId }
              });
            }, 500);
          } else {
            toast.success(data.HeadUpdateCabinetSet.error);
          }
        }}
        refetchQueries={[
          {
            query: HEAD_GET_BRANCH_FOR_CABINETS_SETTING,
            variables: { branchId }
          }
        ]}
      >
        {updateCabinetSetMutationFn => {
          this.updateCabinetSet = updateCabinetSetMutationFn;
          return (
            <GetCabinetSetQuery
              query={GET_CABINET_SET}
              variables={{ cabinetSetId: setId }}
              onCompleted={this.updateFields}
              fetchPolicy={"cache-and-network"}
            >
              {({ loading: getSetLoading, data: data }) => {
                return (
                  <GetBranchQuery
                    query={HEAD_GET_BRANCH_FOR_CABINETS_SETTING}
                    variables={{ branchId }}
                    fetchPolicy={"cache-and-network"}
                  >
                    {({ loading: branchLoading, data: branchData }) => (
                      <UpdateCabinetSetPresenter
                        branchLoading={branchLoading}
                        branchData={branchData}
                        setId={setId}
                        getSetLoading={getSetLoading}
                        height={height}
                        setNumber={setNumber}
                        width={width}
                        xpos={xpos}
                        ypos={ypos}
                        onInputChange={this.onInputChange}
                        title={title}
                        onConfirmClick={this.onConfirmClick}
                        onCancelClick={this.onCancelClick}
                      />
                    )}
                  </GetBranchQuery>
                );
              }}
            </GetCabinetSetQuery>
          );
        }}
      </UpdateCabinetSetMutation>
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

  public onConfirmClick = async () => {
    await this.updateCabinetSet();
  };

  public onCancelClick = () => {
    const { branchId } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "/set-setting",
      state: {
        branchId
      }
    });
  };

  public updateFields = (data: {} | getCabinetSet) => {
    if ("GetCabinetSet" in data) {
      const {
        GetCabinetSet: { cabinetSet }
      } = data;

      if (cabinetSet !== null) {
        const { title, width, height, xpos, ypos, setNumber } = cabinetSet;
        this.setState({
          height,
          setNumber,
          title,
          width,
          xpos,
          ypos
        });
      }
    }
  };
}

export default UpdateLoungeContainer;
