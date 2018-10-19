import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  headCreateCabinetSet,
  headCreateCabinetSetVariables,
  headGetBranchForCabinetsSetting,
  headGetBranchForCabinetsSettingVariables
} from "src/types/api";
import SettingCabinetsPresenter from "./SettingCabinetSetsPresenter";
import {
  HEAD_CREATE_CABINET_SET,
  HEAD_GET_BRANCH_FOR_CABINETS_SETTING
} from "./SettingCabinetSetsQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  showTempCabinetSet: boolean;
  title: string;
  setNumber: number;
  tempSetId: number;
  horizontalNumber: number;
  verticalNumber: number;
  startNumber: number;
}

class GetBranch extends Query<
  headGetBranchForCabinetsSetting,
  headGetBranchForCabinetsSettingVariables
> {}

class CreateSetMutation extends Mutation<
  headCreateCabinetSet,
  headCreateCabinetSetVariables
> {}

class SettingCabinetSetsContainer extends React.Component<IProps, IState> {
  public createSetFn: MutationFn;
  constructor(props: IProps) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchId: props.location.state.branchId,
      height: 10,
      horizontalNumber: 0,
      setNumber: 0,
      showTempCabinetSet: false,
      startNumber: 0,
      tempSetId: 0,
      title: "",
      verticalNumber: 0,
      width: 10,
      xpos: 50,
      ypos: 50
    };
  }

  public render() {
    const {
      branchId,
      width,
      height,
      xpos,
      ypos,
      showTempCabinetSet,
      title,
      setNumber,
      tempSetId,
      horizontalNumber,
      verticalNumber,
      startNumber
    } = this.state;

    return (
      <CreateSetMutation
        mutation={HEAD_CREATE_CABINET_SET}
        variables={{
          branchId,
          height,
          horizontalNumber,
          setNumber,
          startNumber,
          title,
          verticalNumber,
          width,
          xpos,
          ypos
        }}
        onCompleted={data => {
          const { HeadCreateCabinetSet } = data;
          if (HeadCreateCabinetSet.ok) {
            toast.success("사물함 세트가 정상적으로 추가되었습니다");
            this.setState({
              height: 10,
              horizontalNumber: 0,
              setNumber: 0,
              showTempCabinetSet: false,
              startNumber: 0,
              tempSetId: 0,
              title: "",
              verticalNumber: 0,
              width: 10,
              xpos: 50,
              ypos: 50
            });
          } else if (HeadCreateCabinetSet.error) {
            toast.error(HeadCreateCabinetSet.error);
          }
        }}
        refetchQueries={[
          {
            query: HEAD_GET_BRANCH_FOR_CABINETS_SETTING,
            variables: { branchId }
          }
        ]}
      >
        {createSetMuatiotnFn => {
          this.createSetFn = createSetMuatiotnFn;
          return (
            <GetBranch
              query={HEAD_GET_BRANCH_FOR_CABINETS_SETTING}
              variables={{ branchId }}
            >
              {({ loading, data }) => {
                return (
                  <SettingCabinetsPresenter
                    loading={loading}
                    data={data}
                    width={width}
                    height={height}
                    xpos={xpos}
                    ypos={ypos}
                    showTempCabinetSet={showTempCabinetSet}
                    title={title}
                    setNumber={setNumber}
                    tempSetId={tempSetId}
                    onSetEditClick={this.onSetEditClick}
                    onSetHover={this.onSetHover}
                    onSetHoverOut={this.onSetHoverOut}
                    onInputChange={this.onInputChange}
                    onConfirmClick={this.onConfirmClick}
                    toggleShowTempCabinetSet={this.toggleShowTempCabinetSet}
                    onEditCabinetSetClick={this.onEditCabinetSetClick}
                    horizontalNumber={horizontalNumber}
                    verticalNumber={verticalNumber}
                    startNumber={startNumber}
                  />
                );
              }}
            </GetBranch>
          );
        }}
      </CreateSetMutation>
    );
  }

  public onSetEditClick = (setId: number) => {
    const { history } = this.props;
    const { branchId } = this.state;
    history.push({
      pathname: "/set-modify",
      state: {
        branchId,
        setId
      }
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
    const {
      branchId,
      height,
      setNumber,
      showTempCabinetSet,
      title,
      width,
      xpos,
      ypos,
      horizontalNumber,
      verticalNumber,
      startNumber
    } = this.state;

    if (!branchId) {
      toast.error("지점선택이 제대로 이루어지지 않았습니다");
    } else if (!height) {
      toast.error("세로 정보가 입력되지 않았습니다");
    } else if (!width) {
      toast.error("가로 정보가 입력되지 않았습니다");
    } else if (!setNumber) {
      toast.error("열람실 번호가 없습니다");
    } else if (!showTempCabinetSet) {
      toast.error("열라실 추가 모드가 아닙니다");
    } else if (!title) {
      toast.error("열람실 이름이 입력되지 않았습니다");
    } else if (!xpos) {
      toast.error("가로 위치 정보가 입력되지 않았습니다");
    } else if (!ypos) {
      toast.error("세로 위치 정보가 입력되지 않았습니다");
    } else if (!setNumber) {
      toast.error("세트 번호가 입력되지 않았습니다");
    } else if (!horizontalNumber) {
      toast.error("가로 사물함 수가 입력되지 않았습니다");
    } else if (!verticalNumber) {
      toast.error("세로 사물함 수가 입력되지 않았습니다");
    } else if (!startNumber) {
      toast.error("사물함 시작 번호가 입력되지 않았습니다");
    } else {
      this.createSetFn();
    }
  };

  public toggleShowTempCabinetSet = () => {
    this.setState({
      showTempCabinetSet: !this.state.showTempCabinetSet
    });
  };

  public onEditCabinetSetClick = (setId: number) => {
    const { history } = this.props;

    history.push({
      pathname: "/set-cabinets",
      state: {
        setId
      }
    });
  };
}

export default SettingCabinetSetsContainer;
