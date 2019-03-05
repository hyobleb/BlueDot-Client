import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_SEATS_V2 } from "../../Components/sharedQueries";
import {
  getSeatsV2,
  getSeatsV2_GetSeatsV2_seats,
  getSeatsV2Variables,
  headUpdateSeat,
  headUpdateSeatVariables,
  managerGetSeat,
  managerGetSeatV2,
  managerGetSeatVariables
} from "../../types/api";
import { HEAD_UPDATE_SEAT } from "../SettingSeats/SettingSeatsQueries";
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
}

class GetSeats extends Query<getSeatsV2, getSeatsV2Variables> {}
class GetSeatQuery extends Query<managerGetSeat, managerGetSeatVariables> {}
class UpdateSeatMutation extends Mutation<
  headUpdateSeat,
  headUpdateSeatVariables
> {}

class SettingSeatsV2Container extends React.Component<IProps, IState> {
  public UpdateSeat: MutationFn;

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
    const {
      roomId,
      isFranchiser,
      isHead,
      isSupervisor
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
      seats
    } = this.state;
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
            refetchQueries={[{ query: GET_SEATS_V2, variables: { roomId } }]}
          >
            {(updateSeatMutation, { loading: updateSeatLoading }) => {
              this.UpdateSeat = updateSeatMutation;
              return (
                <GetSeatQuery
                  query={MANAGER_GET_SEAT_V2}
                  variables={{ seatId: selSeatId || selDoorId || 0 }}
                  skip={!selSeatId && !selDoorId}
                  onCompleted={this.updateFields}
                  fetchPolicy={"cache-and-network"}
                >
                  {({ loading: getSeatsLoading }) => (
                    <SettingSeatsV2Presenter
                      roomId={roomId}
                      forAdmin={isFranchiser || isHead || isSupervisor}
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
                    />
                  )}
                </GetSeatQuery>
              );
            }}
          </UpdateSeatMutation>
        )}
      </GetSeats>
    );
  }

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
      rotate: undefined,
      seatNumber: undefined,
      selDoorId: undefined,
      selSeatId: undefined,
      top: undefined,
      usable: undefined
    });
  };

  public onSeatClick = async (seatId: number) => {
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
      femaleUsable
    } = this.state;

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
      this.setState({
        [name]: !targetValue
      } as any);
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
