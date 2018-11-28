import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_BRANCH_FOR_UPDATE_LOUNGE } from "../../Components/sharedQueries";
import {
  roomTypeDropDownOptions,
  roomTypeOptions
} from "../../Components/shareOptions";
import {
  getBranchForUpdateLounge,
  getBranchForUpdateLoungeVariables,
  headCreateRoom,
  headCreateRoomVariables
} from "../../types/api";
import SettingLoungePresenter from "./SettingLoungePresenter";
import { HEAD_CREATE_ROOM } from "./SettingLoungeQueries";

interface IProps extends RouteComponentProps<any> {
  branchId: number;
}

interface IState {
  branchId: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  showTempRoom: boolean;
  title: string;
  roomNumber: number;
  usable: boolean;
  roomType: roomTypeOptions;
  tempRoomId: number;
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
}

class GetBranchQuery extends Query<
  getBranchForUpdateLounge,
  getBranchForUpdateLoungeVariables
> {}
class CreateRoomMutation extends Mutation<
  headCreateRoom,
  headCreateRoomVariables
> {}

class AddLoungeContainer extends React.Component<IProps, IState> {
  public enrollRoom;
  constructor(props: IProps) {
    super(props);
    // console.log(props)를 찍어보면 여러가지를 확인할수 있는데
    // 그중 loation.state를 사용한다
    // 새로 고침해도 날라가지 않음
    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      branchId: props.location.state.branchId,
      height: 10,
      isFranchiser: props.location.state.isFranchiser || false,
      isHead: props.location.state.isHead || false,
      isSupervisor: props.location.state.isSupervisor || false,
      roomNumber: 0,
      roomType: roomTypeOptions.SINGLE,
      showTempRoom: false,
      tempRoomId: 0,
      title: "",
      usable: false,
      width: 10,
      xpos: 50,
      ypos: 50
    };
  }
  public render() {
    const {
      branchId,
      height,
      width,
      xpos,
      ypos,
      showTempRoom,
      title,
      roomNumber,
      usable,
      roomType,
      tempRoomId,
      isFranchiser,
      isHead,
      isSupervisor
    } = this.state;
    const { history } = this.props;

    return (
      <CreateRoomMutation
        mutation={HEAD_CREATE_ROOM}
        onCompleted={data => {
          const { HeadCreateRoom } = data;
          if (HeadCreateRoom.ok) {
            toast.success("열람실이 정상적으로 추가되었습니다");
            this.toggleShowRoom();
          } else if (HeadCreateRoom.error) {
            toast.error(HeadCreateRoom.error);
          }
        }}
        variables={{
          branchId,
          height,
          roomNumber,
          roomType,
          title,
          usable,
          width,
          xpos,
          ypos
        }}
        refetchQueries={[
          { query: GET_BRANCH_FOR_UPDATE_LOUNGE, variables: { branchId } }
        ]}
      >
        {enrollRoomFn => {
          this.enrollRoom = enrollRoomFn;
          return (
            <GetBranchQuery
              query={GET_BRANCH_FOR_UPDATE_LOUNGE}
              variables={{ branchId }}
              onCompleted={data => {
                if ("ManagerGetBranch" in data) {
                  const { ManagerGetBranch } = data;
                  if (ManagerGetBranch.error) {
                    toast.error(ManagerGetBranch.error);
                  }
                }
              }}
            >
              {({ loading, error, data }) => {
                if (error) {
                  toast.error(error.message);
                  history.push("/");
                }
                return (
                  <SettingLoungePresenter
                    data={data}
                    loading={loading}
                    height={height}
                    width={width}
                    xpos={xpos}
                    ypos={ypos}
                    showTempRoom={showTempRoom}
                    toggleShowRoom={this.toggleShowRoom}
                    topArrowClick={this.topArrowClick}
                    bottomArrowClick={this.bottomArrowClick}
                    rightArrowClick={this.rightArrowClick}
                    leftArrowClick={this.leftArrowClick}
                    onInputChange={this.onInputChange}
                    title={title}
                    roomNumber={roomNumber}
                    usable={usable}
                    onOptionChange={this.onOptionChange}
                    roomTypeDropDownOptions={roomTypeDropDownOptions}
                    roomType={roomType}
                    toggleUsable={this.toggleUsable}
                    onConfirmClick={this.onConfirmClick}
                    onRoomClick={this.onRoomClick}
                    onRoomHover={this.onRoomHover}
                    tempRoomId={tempRoomId}
                    onRoomHoverOut={this.onRoomHoverOut}
                    onEditSeatClick={this.onEditSeatClick}
                    isFranchiser={isFranchiser}
                    isHead={isHead}
                    isSupervisor={isSupervisor}
                  />
                );
              }}
            </GetBranchQuery>
          );
        }}
      </CreateRoomMutation>
    );
  }

  public toggleShowRoom = () => {
    this.setState({
      ...this.state,
      showTempRoom: !this.state.showTempRoom
    });
  };

  public topArrowClick = () => {
    this.setState({
      ...this.state,
      ypos: this.state.ypos - 0.5
    });
  };

  public bottomArrowClick = () => {
    this.setState({
      ...this.state,
      ypos: this.state.ypos + 0.5
    });
  };

  public rightArrowClick = () => {
    this.setState({
      ...this.state,
      xpos: this.state.xpos + 0.5
    });
  };

  public leftArrowClick = () => {
    this.setState({
      ...this.state,
      xpos: this.state.xpos - 0.5
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
  public onOptionChange = (arg: any) => {
    this.setState({
      ...this.state,
      roomType: arg.value
    });
  };

  public toggleUsable = () => {
    this.setState({
      ...this.state,
      usable: !this.state.usable
    });
  };

  public onConfirmClick = async () => {
    const {
      branchId,
      height,
      roomNumber,
      roomType,
      showTempRoom,
      title,
      width
    } = this.state;

    if (!branchId) {
      toast.error("지점선택이 제대로 이루어지지 않았습니다");
    } else if (!height) {
      toast.error("세로 정보가 입력되지 않았습니다");
    } else if (!width) {
      toast.error("가로 정보가 입력되지 않았습니다");
    } else if (!roomNumber) {
      toast.error("열람실 번호가 없습니다");
    } else if (!roomType) {
      toast.error("열람실 타입이 지정되지 않았습니다");
    } else if (!showTempRoom) {
      toast.error("열라실 추가 모드가 아닙니다");
    } else if (!title) {
      toast.error("열람실 이름이 입력되지 않았습니다");
    } else {
      await this.enrollRoom();
    }
  };

  public onRoomClick = (roomId: number) => {
    const { history } = this.props;
    const { branchId, isFranchiser, isHead, isSupervisor } = this.state;

    history.push({
      pathname: "/lounge-modify",
      state: {
        branchId,
        isFranchiser,
        isHead,
        isSupervisor,
        roomId
      }
    });
  };
  public onRoomHover = (roomId: number) => {
    this.setState({
      ...this.state,
      tempRoomId: roomId
    });
  };

  public onRoomHoverOut = () => {
    this.setState({
      ...this.state,
      tempRoomId: 0
    });
  };

  public onEditSeatClick = (roomId: number) => {
    const { history } = this.props;
    history.push({
      pathname: "/seat-setting",
      state: {
        branchId: this.state.branchId,
        roomId
      }
    });
  };
}

export default AddLoungeContainer;
