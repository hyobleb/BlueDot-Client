import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_SEATS_V2, HEAD_GET_ROOM } from "../../Components/sharedQueries";
import {
  getSeatsV2,
  getSeatsV2_GetSeatsV2_seats,
  getSeatsV2Variables,
  headCreateDoor,
  headCreateDoorVariables,
  headCreateSeat,
  headCreateSeatVariables,
  headUpdateSeat,
  headUpdateSeatVariables,
  managerGetSeat,
  managerGetSeatV2,
  managerGetSeatVariables
} from "../../types/api";
import {
  HEAD_CREATE_DOOR,
  HEAD_CREATE_SEAT,
  HEAD_UPDATE_SEAT
} from "../SettingSeats/SettingSeatsQueries";
import SettingSeatsV2Presenter from "./SettingSeatsV2Presenter";
import { MANAGER_GET_SEAT_V2 } from "./SettingSeatsV2Queries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  selSeatId?: number;
  selDoorId?: number;
  left?: number;
  top?: number;
  rotate?: number;
  isFlip?: boolean;
  usable?: boolean;
  seatNumber?: number;
  discard?: boolean;
  maleUsable?: boolean;
  femaleUsable?: boolean;
  seats: Array<getSeatsV2_GetSeatsV2_seats | null> | null;
  newSeat?: boolean;
  newTop?: number;
  newLeft?: number;
  newRotate?: number;
  newIsFlip?: boolean;
  newSeatNumber?: number;
  newIsDoor?: boolean;

  newUsable?: boolean;
  newMaleUsable?: boolean;
  newFemaleUsable?: boolean;
}

class GetSeats extends Query<getSeatsV2, getSeatsV2Variables> {}
class GetSeatQuery extends Query<managerGetSeat, managerGetSeatVariables> {}
class UpdateSeatMutation extends Mutation<
  headUpdateSeat,
  headUpdateSeatVariables
> {}
class CreateDoorMutation extends Mutation<
  headCreateDoor,
  headCreateDoorVariables
> {}

class CreateSeatMutation extends Mutation<
  headCreateSeat,
  headCreateSeatVariables
> {}

class SettingSeatsV2Container extends React.Component<IProps, IState> {
  public UpdateSeat: MutationFn;
  public createSeat: MutationFn;
  public createDoor: MutationFn;

  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      seats: null
    };
  }

  public render() {
    const { history } = this.props;

    const {
      roomId,
      isFranchiser,
      isHead,
      isSupervisor,
      branchId
    } = this.props.location.state;

    const {
      selSeatId,
      selDoorId,
      left,
      top,
      rotate,
      isFlip,
      usable,
      seatNumber,
      discard,
      maleUsable,
      femaleUsable,
      seats,
      newSeat,
      newTop,
      newLeft,
      newRotate,
      newIsFlip,
      newSeatNumber,
      newIsDoor,
      newUsable,
      newMaleUsable,
      newFemaleUsable
    } = this.state;
    return (
      <CreateDoorMutation
        mutation={HEAD_CREATE_DOOR}
        onCompleted={data => {
          const { HeadCreateDoor } = data;
          if (HeadCreateDoor.ok) {
            toast.success("출입구가 성공적으로 추가 되었습니다!");

            history.push({
              pathname: "/seat-setting",
              state: { roomId, branchId }
            });
            this.initState();
          } else {
            toast.error(HeadCreateDoor.error);
          }
        }}
        refetchQueries={[
          { query: HEAD_GET_ROOM, variables: { roomId } },
          {
            query: GET_SEATS_V2,
            variables: { roomId }
          }
        ]}
      >
        {createDoorMutation => {
          this.createDoor = createDoorMutation;

          return (
            <CreateSeatMutation
              mutation={HEAD_CREATE_SEAT}
              refetchQueries={[
                {
                  query: HEAD_GET_ROOM,
                  variables: { roomId }
                },
                {
                  query: GET_SEATS_V2,
                  variables: { roomId }
                }
              ]}
              onCompleted={data => {
                const { HeadCreateSeat } = data;
                if (HeadCreateSeat.ok) {
                  toast.success("좌석이 성공적으로 추가 되었습니다!");
                  history.push({
                    pathname: "/seat-setting_v2",
                    state: { roomId, branchId }
                  });
                  this.initState();
                } else {
                  toast.error(HeadCreateSeat.error);
                }
              }}
            >
              {createSeatMutation => {
                this.createSeat = createSeatMutation;
                return (
                  <GetSeats
                    query={GET_SEATS_V2}
                    variables={{ roomId }}
                    fetchPolicy={"cache-and-network"}
                    onCompleted={this.updateFields}
                  >
                    {() => (
                      <UpdateSeatMutation
                        mutation={HEAD_UPDATE_SEAT}
                        onCompleted={data => {
                          const { HeadUpdateSeat } = data;
                          if (HeadUpdateSeat.ok) {
                            toast.success("성공적으로 수정되었습니다!");
                            this.initState();
                          } else {
                            toast.error(HeadUpdateSeat.error);
                          }
                        }}
                        refetchQueries={[
                          { query: GET_SEATS_V2, variables: { roomId } }
                        ]}
                      >
                        {(
                          updateSeatMutation,
                          { loading: updateSeatLoading }
                        ) => {
                          this.UpdateSeat = updateSeatMutation;
                          return (
                            <GetSeatQuery
                              query={MANAGER_GET_SEAT_V2}
                              variables={{
                                seatId: selSeatId || selDoorId || 0
                              }}
                              skip={!selSeatId && !selDoorId}
                              onCompleted={this.updateFields}
                              fetchPolicy={"cache-and-network"}
                            >
                              {({ loading: getSeatsLoading }) => (
                                <SettingSeatsV2Presenter
                                  roomId={roomId}
                                  forAdmin={
                                    isFranchiser || isHead || isSupervisor
                                  }
                                  onSeatClick={this.onSeatClick}
                                  onDoorClick={this.onDoorClick}
                                  selSeatId={selSeatId}
                                  selDoorId={selDoorId}
                                  onConfirmClick={this.onConfirmClick}
                                  left={left}
                                  top={top}
                                  rotate={rotate}
                                  isFlip={isFlip}
                                  usable={usable}
                                  seatNumber={seatNumber}
                                  discard={discard}
                                  maleUsable={maleUsable}
                                  femaleUsable={femaleUsable}
                                  onInputChange={this.onInputChange}
                                  toggleSwitch={this.toggleSwitch}
                                  onCancelClick={this.onCancelClick}
                                  getSeatsLoading={getSeatsLoading}
                                  updateSeatLoading={updateSeatLoading}
                                  onBackClick={this.onBackClick}
                                  seats={seats}
                                  onCreateSeatClick={this.onCreateSeatClick}
                                  newSeat={newSeat}
                                  newTop={newTop}
                                  newLeft={newLeft}
                                  newRotate={newRotate}
                                  newIsFlip={newIsFlip}
                                  newSeatNumber={newSeatNumber}
                                  newIsDoor={newIsDoor}
                                  newUsable={newUsable}
                                  newMaleUsable={newMaleUsable}
                                  newFemaleUsable={newFemaleUsable}
                                />
                              )}
                            </GetSeatQuery>
                          );
                        }}
                      </UpdateSeatMutation>
                    )}
                  </GetSeats>
                );
              }}
            </CreateSeatMutation>
          );
        }}
      </CreateDoorMutation>
    );
  }

  public onCreateSeatClick = () => {
    this.initState();
    this.setState({
      newFemaleUsable: true,
      newIsDoor: false,
      newIsFlip: false,
      newLeft: 0,
      newMaleUsable: true,
      newRotate: 0,
      newSeat: true,
      newSeatNumber: 0,
      newTop: 0,
      newUsable: true
    });
  };

  public onBackClick = () => {
    const { history, location } = this.props;
    const { backInfo } = location.state;

    if (backInfo) {
      history.push({
        pathname: backInfo.backUrl,
        state: {
          ...backInfo.content
        }
      });
    }
  };

  public initState = () => {
    this.setState({
      discard: undefined,
      femaleUsable: undefined,
      isFlip: undefined,
      left: undefined,
      maleUsable: undefined,
      newFemaleUsable: undefined,
      newIsDoor: undefined,
      newIsFlip: undefined,
      newLeft: undefined,
      newMaleUsable: undefined,
      newRotate: undefined,
      newSeat: undefined,
      newSeatNumber: undefined,
      newTop: undefined,
      newUsable: undefined,
      rotate: undefined,
      seatNumber: undefined,
      selDoorId: undefined,
      selSeatId: undefined,
      top: undefined,
      usable: undefined
    });
  };

  public onSeatClick = async (seatId: number) => {
    this.initState();
    this.setState({
      selDoorId: undefined,
      selSeatId: seatId
    });
  };

  public onDoorClick = (doorId: number) => {
    this.setState({
      selDoorId: doorId,
      selSeatId: undefined
    });
  };

  public onConfirmClick = async () => {
    const {
      selSeatId,
      selDoorId,
      left,
      top,
      rotate,
      isFlip,
      usable,
      seatNumber,
      discard,
      maleUsable,
      femaleUsable,
      newSeat,
      newTop,
      newLeft,
      newRotate,
      newIsFlip,
      newSeatNumber,
      newIsDoor,
      newUsable,
      newMaleUsable,
      newFemaleUsable
    } = this.state;

    const { roomId, branchId } = this.props.location.state;

    if (selSeatId && !newSeat) {
      await this.UpdateSeat({
        variables: {
          discard,
          femaleUsable,
          isFlip,
          left,
          maleUsable,
          rotate,
          seatId: selSeatId || selDoorId,
          seatNumber,
          selDoorId,
          selSeatId,
          top,
          usable
        }
      });
    } else if (newSeat && !newIsDoor) {
      this.createSeat({
        variables: {
          branchId,
          femaleUsable: newFemaleUsable,
          left: newLeft,
          maleUsable: newMaleUsable,
          roomId,
          rotate: newRotate,
          seatNumber: newSeatNumber,
          top: newTop,
          usable: newUsable
        }
      });
    } else if (newSeat && newIsDoor) {
      this.createDoor({
        variables: {
          branchId,
          isFlip: newIsFlip,
          left: newLeft,
          roomId,
          rotate: newRotate,
          top: newTop
        }
      });
    }
  };

  public onCancelClick = () => {
    this.initState();
  };

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;

    const actualValue = !value ? "" : value;

    this.setState({
      [name]: actualValue
    } as any);
  };

  public toggleSwitch = (name: string) => {
    const targetValue = this.state[name];

    if (typeof targetValue === "boolean") {
      if (name === "newIsDoor") {
        this.setState({
          newFemaleUsable: targetValue ? true : undefined,
          newIsDoor: !targetValue,
          newIsFlip: targetValue ? undefined : false,
          newMaleUsable: targetValue ? true : undefined,
          newSeatNumber: !targetValue ? undefined : 0,
          newUsable: targetValue ? true : undefined
        } as any);
      } else {
        this.setState({
          [name]: !targetValue
        } as any);
      }
    }
  };

  public updateFields = (data: {} | managerGetSeatV2 | getSeatsV2) => {
    if ("ManagerGetSeatV2" in data) {
      const {
        ManagerGetSeatV2: { seat }
      } = data;
      if (seat !== null) {
        const {
          rotate,
          top,
          left,
          isFlip,
          discard,
          usable,
          maleUsable,
          femaleUsable,
          seatNumber
        } = seat;
        this.setState({
          discard,
          femaleUsable,
          isFlip,
          left,
          maleUsable,
          rotate,
          seatNumber,
          top,
          usable
        } as any);
      }
    } else if ("GetSeatsV2" in data) {
      const {
        GetSeatsV2: { seats }
      } = data;

      if (seats !== null) {
        this.setState({
          seats
        } as any);
      }
    }
  };
}

export default SettingSeatsV2Container;
