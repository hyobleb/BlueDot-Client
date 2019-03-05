import React from "react";
import { ApolloConsumer, Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GET_SEATS,
  HEAD_GET_ROOM,
  MANAGER_GET_SEAT
} from "../../Components/sharedQueries";
import {
  headCreateDoor,
  headCreateDoorVariables,
  headCreateSeat,
  headCreateSeatVariables,
  headUpdateDoor,
  headUpdateDoorVariables,
  headUpdateSeat,
  headUpdateSeatVariables,
  managerGetSeat_ManagerGetSeat_seat
} from "../../types/api";
import SettingSeatsPresenter from "./SettingSeatsPresenter";
import {
  HEAD_CREATE_DOOR,
  HEAD_CREATE_SEAT,
  HEAD_UPDATE_DOOR,
  HEAD_UPDATE_SEAT
} from "./SettingSeatsQueries";

interface IProps extends RouteComponentProps<any> {
  roomId: number;
}

interface IState {
  branchId: number;
  roomId: number;
  addSeatMode: boolean;
  seatNumber: number;
  usable: boolean;
  rotate: number;
  xpos: number;
  ypos: number;
  maleUsable: boolean;
  femaleUsable: boolean;

  selSeatNumber: number;
  selSeatId: number;
  selSeatXpos: number;
  selSeatYpos: number;
  selSeatRotate: number;
  selSeatDiscard: boolean;
  selSeatMaleUsable: boolean;
  selSeatFemaleUsable: boolean;
  selSeatUsable: boolean;

  isAddDoorMode: boolean;
  isFlip: boolean;
  doorEditMode: boolean;
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
}

class UpdateDoorMutation extends Mutation<
  headUpdateDoor,
  headUpdateDoorVariables
> {}

class CreateDoorMutation extends Mutation<
  headCreateDoor,
  headCreateDoorVariables
> {}

class CreateSeatMutation extends Mutation<
  headCreateSeat,
  headCreateSeatVariables
> {}

class UpdateSeatMutation extends Mutation<
  headUpdateSeat,
  headUpdateSeatVariables
> {}

class SettingSeatsContainer extends React.Component<IProps, IState> {
  public getSeat;
  public updateSeat;
  public deleteSeat;
  public createSeat;
  public createDoor: MutationFn;
  public updateDoor: MutationFn;

  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      addSeatMode: false,
      branchId: props.location.state.branchId,
      doorEditMode: false,
      femaleUsable: true,
      isAddDoorMode: false,
      isFlip: false,
      isFranchiser: props.location.state.isFranchiser || false,
      isHead: props.location.state.isHead || false,
      isSupervisor: props.location.state.isSupervisor || false,
      maleUsable: true,
      roomId: props.location.state.roomId,
      rotate: 0,
      seatNumber: 0,
      selSeatDiscard: false,
      selSeatFemaleUsable: true,
      selSeatId: 0,
      selSeatMaleUsable: true,
      selSeatNumber: 0,
      selSeatRotate: 0,
      selSeatUsable: true,
      selSeatXpos: 0,
      selSeatYpos: 0,
      usable: false,
      xpos: 50,
      ypos: 50
    };
  }

  public render() {
    const {
      addSeatMode,
      roomId,
      femaleUsable,
      maleUsable,
      rotate,
      seatNumber,
      usable,
      xpos,
      ypos,
      branchId,
      selSeatDiscard,
      selSeatFemaleUsable,
      selSeatId,
      selSeatMaleUsable,
      selSeatNumber,
      selSeatUsable,
      selSeatXpos,
      selSeatYpos,
      selSeatRotate,
      isAddDoorMode,
      isFlip,
      doorEditMode
    } = this.state;

    const { history } = this.props;

    return (
      <ApolloConsumer>
        {client => {
          this.getSeat = async (seatId: number) => {
            const { data } = await client.query({
              query: MANAGER_GET_SEAT,
              variables: { seatId }
            });
            return data;
          };
          return (
            <UpdateDoorMutation
              mutation={HEAD_UPDATE_DOOR}
              variables={{
                discard: selSeatDiscard,
                isFlip,
                rotate: selSeatRotate,
                seatId: selSeatId,
                xpos: selSeatXpos,
                ypos: selSeatYpos
              }}
              onCompleted={data => {
                const { HeadUpdateDoor } = data;
                if (HeadUpdateDoor.ok) {
                  toast.success("출입구가 성공적으로 수정 되었습니다!");

                  history.push({
                    pathname: "/seat-setting",
                    state: { roomId, branchId }
                  });
                  this.onSeatEditCancelClick();
                } else {
                  toast.error(HeadUpdateDoor.error);
                }
              }}
              refetchQueries={[
                {
                  query: HEAD_GET_ROOM,
                  variables: { roomId }
                }
              ]}
            >
              {updateDoorMutation => {
                this.updateDoor = updateDoorMutation;
                return (
                  <CreateDoorMutation
                    mutation={HEAD_CREATE_DOOR}
                    variables={{
                      branchId,
                      isFlip,
                      left: xpos,
                      roomId,
                      rotate,
                      top: ypos
                    }}
                    onCompleted={data => {
                      const { HeadCreateDoor } = data;
                      if (HeadCreateDoor.ok) {
                        toast.success("출입구가 성공적으로 추가 되었습니다!");

                        history.push({
                          pathname: "/seat-setting",
                          state: { roomId, branchId }
                        });
                        this.toggleAddSeatMode();
                      } else {
                        toast.error(HeadCreateDoor.error);
                      }
                    }}
                    refetchQueries={[
                      { query: HEAD_GET_ROOM, variables: { roomId } },
                      {
                        query: GET_SEATS,
                        variables: { roomId }
                      }
                    ]}
                  >
                    {createDoorMutation => {
                      this.createDoor = createDoorMutation;
                      return (
                        <UpdateSeatMutation
                          mutation={HEAD_UPDATE_SEAT}
                          variables={{
                            discard: selSeatDiscard,
                            femaleUsable: selSeatFemaleUsable,
                            maleUsable: selSeatMaleUsable,
                            rotate: selSeatRotate,
                            seatId: selSeatId,
                            seatNumber: selSeatNumber,
                            usable: selSeatUsable,
                            xpos: selSeatXpos,
                            ypos: selSeatYpos
                          }}
                          refetchQueries={[
                            { query: HEAD_GET_ROOM, variables: { roomId } },
                            {
                              query: GET_SEATS,
                              variables: { roomId }
                            }
                          ]}
                          onCompleted={data => {
                            const { HeadUpdateSeat } = data;
                            if (HeadUpdateSeat.ok) {
                              toast.success("해당 좌석이 수정되었습니다!");
                              this.onSeatEditCancelClick();
                            } else {
                              toast.error(HeadUpdateSeat.error);
                            }
                          }}
                        >
                          {updateSeatMutation => {
                            this.updateSeat = updateSeatMutation;
                            return (
                              <CreateSeatMutation
                                mutation={HEAD_CREATE_SEAT}
                                variables={{
                                  branchId,
                                  femaleUsable,
                                  left: xpos,
                                  maleUsable,
                                  roomId,
                                  rotate,
                                  seatNumber,
                                  top: ypos,
                                  usable
                                }}
                                refetchQueries={[
                                  {
                                    query: HEAD_GET_ROOM,
                                    variables: { roomId }
                                  },
                                  {
                                    query: GET_SEATS,
                                    variables: { roomId }
                                  }
                                ]}
                                onCompleted={data => {
                                  const { HeadCreateSeat } = data;
                                  if (HeadCreateSeat.ok) {
                                    toast.success(
                                      "좌석이 성공적으로 추가 되었습니다!"
                                    );
                                    history.push({
                                      pathname: "/seat-setting",
                                      state: { roomId, branchId }
                                    });
                                    this.toggleAddSeatMode();
                                  } else {
                                    toast.error(HeadCreateSeat.error);
                                  }
                                }}
                              >
                                {createSeatMutationFn => {
                                  this.createSeat = createSeatMutationFn;
                                  return (
                                    <SettingSeatsPresenter
                                      roomId={roomId}
                                      addSeatMode={addSeatMode}
                                      toggleAddSeatMode={this.toggleAddSeatMode}
                                      onSubmit={this.onSubmit}
                                      onInputChange={this.onInputChange}
                                      femaleUsable={femaleUsable}
                                      maleUsable={maleUsable}
                                      rotate={rotate}
                                      seatNumber={seatNumber}
                                      usable={usable}
                                      xpos={xpos}
                                      ypos={ypos}
                                      toggleSwitch={this.toggleSwitch}
                                      onSeatClick={this.onSeatClick}
                                      onConfirmClick={this.onSubmit}
                                      onCancelButtonClick={
                                        this.onCancelButtonClick
                                      }
                                      selSeatDiscard={selSeatDiscard}
                                      selSeatFemaleUsable={selSeatFemaleUsable}
                                      selSeatId={selSeatId}
                                      selSeatMaleUsable={selSeatMaleUsable}
                                      selSeatNumber={selSeatNumber}
                                      selSeatUsable={selSeatUsable}
                                      selSeatXpos={selSeatXpos}
                                      selSeatYpos={selSeatYpos}
                                      selSeatRotate={selSeatRotate}
                                      onSeatEditCancelClick={
                                        this.onSeatEditCancelClick
                                      }
                                      onUpdateSeatClick={this.onUpdateSeatClick}
                                      isAddDoorMode={isAddDoorMode}
                                      onAddDoorMode={this.onAddDoorMode}
                                      isFlip={isFlip}
                                      toggleIsFlip={this.toggleIsFlip}
                                      doorEditMode={doorEditMode}
                                    />
                                  );
                                }}
                              </CreateSeatMutation>
                            );
                          }}
                        </UpdateSeatMutation>
                      );
                    }}
                  </CreateDoorMutation>
                );
              }}
            </UpdateDoorMutation>
          );
        }}
      </ApolloConsumer>
    );
  }

  public toggleAddSeatMode = () => {
    this.setState({
      ...this.state,
      addSeatMode: !this.state.addSeatMode,
      femaleUsable: true,
      isAddDoorMode: this.state.isAddDoorMode && !this.state.addSeatMode,
      maleUsable: true,
      rotate: 0,
      seatNumber: 0,
      usable: true,
      xpos: 50,
      ypos: 50
    });
  };

  public onAddDoorMode = () => {
    this.setState({
      ...this.state,
      addSeatMode: !this.state.addSeatMode,
      isAddDoorMode: !this.state.addSeatMode,
      rotate: 0,
      xpos: 50,
      ypos: 50
    });
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    const { isAddDoorMode } = this.state;
    if (isAddDoorMode) {
      await this.createDoor();
    } else {
      await this.createSeat();
    }
  };

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public toggleSwitch = name => {
    switch (name) {
      case "usable":
        this.setState({
          ...this.state,
          [name]: !this.state.usable
        } as any);
        break;

      case "maleUsable":
        this.setState({
          ...this.state,
          [name]: !this.state.maleUsable
        } as any);
        break;

      case "femaleUsable":
        this.setState({
          ...this.state,
          [name]: !this.state.femaleUsable
        } as any);
        break;

      case "selSeatDiscard":
        this.setState({
          ...this.state,
          [name]: !this.state.selSeatDiscard
        } as any);
        break;

      case "selSeatFemaleUsable":
        this.setState({
          ...this.state,
          [name]: !this.state.selSeatFemaleUsable
        } as any);
        break;

      case "selSeatMaleUsable":
        this.setState({
          ...this.state,
          [name]: !this.state.selSeatMaleUsable
        } as any);
        break;

      case "selSeatUsable":
        this.setState({
          ...this.state,
          [name]: !this.state.selSeatUsable
        } as any);
        break;

      default:
        break;
    }
  };

  public onSeatClick = async (seatId: number) => {
    const queryData = await this.getSeat(seatId);
    const seatData: managerGetSeat_ManagerGetSeat_seat =
      queryData.ManagerGetSeat.seat;

    if (seatData.isDoor) {
      this.setState({
        doorEditMode: true,
        isFlip: seatData.isFlip,
        selSeatDiscard: seatData.discard,
        selSeatId: seatData.id,
        selSeatNumber: seatData.seatNumber,
        selSeatRotate: seatData.rotate,
        selSeatXpos: seatData.xpos,
        selSeatYpos: seatData.ypos
      });
    } else {
      this.setState({
        doorEditMode: false,
        selSeatDiscard: seatData.discard,
        selSeatFemaleUsable: seatData.usable,
        selSeatId: seatData.id,
        selSeatMaleUsable: seatData.maleUsable,
        selSeatNumber: seatData.seatNumber,
        selSeatRotate: seatData.rotate,
        selSeatUsable: seatData.usable,
        selSeatXpos: seatData.xpos,
        selSeatYpos: seatData.ypos
      });
    }
  };

  public onSeatEditCancelClick = () => {
    this.setState({
      ...this.state,
      addSeatMode: false,
      doorEditMode: false,
      isAddDoorMode: false,
      isFlip: false,
      selSeatDiscard: true,
      selSeatFemaleUsable: true,
      selSeatId: 0,
      selSeatMaleUsable: true,
      selSeatNumber: 0,
      selSeatRotate: 0,
      selSeatUsable: true,
      selSeatXpos: 0,
      selSeatYpos: 0
    });
  };

  public onCancelButtonClick = () => {
    const { history } = this.props;
    const { branchId, isFranchiser, isHead, isSupervisor } = this.state;
    history.push({
      pathname: "/lounge-setting",
      state: {
        branchId,
        isFranchiser,
        isHead,
        isSupervisor
      }
    });
  };

  public onUpdateSeatClick = async () => {
    const { doorEditMode } = this.state;
    if (!doorEditMode) {
      await this.updateSeat();
    } else {
      await this.updateDoor();
    }
  };

  public toggleIsFlip = () => {
    this.setState({
      isFlip: !this.state.isFlip
    });
  };
}

export default SettingSeatsContainer;
