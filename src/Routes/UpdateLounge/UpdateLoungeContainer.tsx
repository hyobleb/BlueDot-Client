import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_BRANCH_FOR_UPDATE_LOUNGE } from "../../Components/sharedQueries";
import { roomTypeOptions } from "../../Components/shareOptions";
import {
  getBranchForUpdateLounge,
  getBranchForUpdateLoungeVariables,
  headUpdateRoom,
  headUpdateRoomVariables,
  managerGetRoom,
  managerGetRoomVariables,
  managerUpdateRoom,
  managerUpdateRoomVariables
} from "../../types/api";

import UpdateLoungePresenter from "./UpdateLoungePresenter";
import {
  HEAD_UPDATE_ROOM,
  MANAGER_GET_ROOM,
  MANAGER_UPDATE_ROOM
} from "./UpdateLoungeQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  roomId: number;
  branchId: number;
  width: number;
  height: number;
  xpos: number;
  ypos: number;
  title: string;
  roomNumber: number;
  usable: boolean;
  roomType: roomTypeOptions;
  isFranchiser: boolean;
  isHead: boolean;
  isSupervisor: boolean;
}

class GetBranchQuery extends Query<
  getBranchForUpdateLounge,
  getBranchForUpdateLoungeVariables
> {}

class LoungeUpdateMutation extends Mutation<
  headUpdateRoom,
  headUpdateRoomVariables
> {}

class ManagerUpdateMutation extends Mutation<
  managerUpdateRoom,
  managerUpdateRoomVariables
> {}

class GetRoomQuery extends Query<managerGetRoom, managerGetRoomVariables> {}

class UpdateLoungeContainer extends React.Component<IProps, IState> {
  public updateRoom;
  public managerUpdateRoom;

  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      branchId: props.location.state.branchId,
      height: 0,
      isFranchiser: props.location.state.isFranchiser || false,
      isHead: props.location.state.isHead || false,
      isSupervisor: props.location.state.isSupervisor || false,
      roomId: props.location.state.roomId,
      roomNumber: 0,
      roomType: roomTypeOptions.FOCUS,
      title: "",
      usable: false,
      width: 0,
      xpos: 0,
      ypos: 0
    };
  }

  public render() {
    const {
      branchId,
      height,
      roomNumber,
      roomType,
      title,
      usable,
      width,
      xpos,
      ypos,
      roomId,
      isFranchiser,
      isHead,
      isSupervisor
    } = this.state;

    const { history } = this.props;
    return (
      <GetRoomQuery
        query={MANAGER_GET_ROOM}
        variables={{ roomId }}
        fetchPolicy={"cache-and-network"}
        onCompleted={this.updateFields}
      >
        {() => (
          <ManagerUpdateMutation
            mutation={MANAGER_UPDATE_ROOM}
            variables={{
              roomId,
              roomNumber,
              roomType,
              title,
              usable
            }}
            onCompleted={data => {
              const { ManagerUpdateRoom } = data;
              if (ManagerUpdateRoom.ok) {
                toast.success("해당 열람실 수정을 완료했습니다");
                setTimeout(() => {
                  history.push({
                    pathname: "/lounge-setting",
                    state: { branchId, isFranchiser, isHead, isSupervisor }
                  });
                }, 500);
              } else if (ManagerUpdateRoom.error) {
                toast.error(ManagerUpdateRoom.error);
              }
            }}
            refetchQueries={[
              {
                query: GET_BRANCH_FOR_UPDATE_LOUNGE,
                variables: { branchId }
              }
            ]}
          >
            {managerUpdateRoomFn => {
              this.managerUpdateRoom = managerUpdateRoomFn;
              return (
                <LoungeUpdateMutation
                  mutation={HEAD_UPDATE_ROOM}
                  variables={{
                    height,
                    roomId,
                    roomNumber,
                    roomType,
                    title,
                    usable,
                    width,
                    xpos,
                    ypos
                  }}
                  onCompleted={data => {
                    const { HeadUpdateRoom } = data;
                    if (HeadUpdateRoom.ok) {
                      toast.success("해당 열람실 수정을 완료했습니다");
                      setTimeout(() => {
                        history.push({
                          pathname: "/lounge-setting",
                          state: {
                            branchId,
                            isFranchiser,
                            isHead,
                            isSupervisor
                          }
                        });
                      }, 500);
                    } else if (HeadUpdateRoom.error) {
                      toast.error(HeadUpdateRoom.error);
                    }
                  }}
                  refetchQueries={[
                    {
                      query: GET_BRANCH_FOR_UPDATE_LOUNGE,
                      variables: { branchId }
                    }
                  ]}
                >
                  {updateRoomFn => {
                    this.updateRoom = updateRoomFn;
                    return (
                      <GetBranchQuery
                        query={GET_BRANCH_FOR_UPDATE_LOUNGE}
                        variables={{ branchId }}
                      >
                        {({
                          loading: branchLoading,
                          error,
                          data: branchData
                        }) => {
                          if (error) {
                            toast.error(error.message);
                            history.push("/");
                          }
                          return (
                            <UpdateLoungePresenter
                              height={height}
                              roomNumber={roomNumber}
                              roomType={roomType}
                              title={title}
                              usable={usable}
                              width={width}
                              xpos={xpos}
                              ypos={ypos}
                              branchLoading={branchLoading}
                              branchData={branchData}
                              onInputChange={this.onInputChange}
                              onOptionChange={this.onOptionChange}
                              topArrowClick={this.topArrowClick}
                              bottomArrowClick={this.bottomArrowClick}
                              rightArrowClick={this.rightArrowClick}
                              leftArrowClick={this.leftArrowClick}
                              toggleUsable={this.toggleUsable}
                              onConfirmClick={this.onConfirmClick}
                              onCancleClick={this.onCancleClick}
                              isFranchiser={isFranchiser}
                              isHead={isHead}
                              isSupervisor={isSupervisor}
                            />
                          );
                        }}
                      </GetBranchQuery>
                    );
                  }}
                </LoungeUpdateMutation>
              );
            }}
          </ManagerUpdateMutation>
        )}
      </GetRoomQuery>
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
  public onOptionChange = (arg: any) => {
    this.setState({
      ...this.state,
      roomType: arg.value
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

  public toggleUsable = () => {
    this.setState({
      ...this.state,
      usable: !this.state.usable
    });
  };
  public onConfirmClick = () => {
    const {
      roomId,
      title,
      roomNumber,
      roomType,
      width,
      height,
      isHead,
      isFranchiser,
      isSupervisor
    } = this.state;

    if (!roomId) {
      toast.error("초기 열람실을 불러오지 못했습니다");
    } else if (!title) {
      toast.error("열람실 이름이 없습니다");
    } else if (!roomNumber) {
      toast.error("열람실 번호가 지정되지 않았습니다");
    } else if (!roomType) {
      toast.error("열람실 타입이 지정되지 않았습니다");
    } else {
      if (isHead) {
        if (!width) {
          toast.error("가로 크기 값이 없습니다");
        } else if (!height) {
          toast.error("세로크기 값이 없습니다");
        } else {
          this.updateRoom();
        }
      } else if (isSupervisor || isFranchiser) {
        this.managerUpdateRoom();
      }
    }
  };
  public onCancleClick = () => {
    const { history } = this.props;
    const { branchId, isFranchiser, isHead, isSupervisor } = this.state;
    history.push({
      pathname: "lounge-setting",
      state: {
        branchId,
        isFranchiser,
        isHead,
        isSupervisor
      }
    });
  };

  public updateFields = (data: {} | managerGetRoom) => {
    if ("ManagerGetRoom" in data) {
      const {
        ManagerGetRoom: { room }
      } = data;
      if (room !== null) {
        const {
          id,
          width,
          height,
          xpos,
          ypos,
          title,
          roomNumber,
          roomType,
          usable
        } = room;
        this.setState({
          height,
          id,
          roomNumber,
          roomType,
          title,
          usable,
          width,
          xpos,
          ypos
        } as any);
      }
    }
  };
}

export default UpdateLoungeContainer;
