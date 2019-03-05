import React from "react";
import { Query } from "react-apollo";
import { getSeats, getSeatsVariables } from "../../types/api";
import { GET_SEATS } from "../sharedQueries";
import RoomPresenter from "./RoomPresenter";

interface IProps {
  roomId: number;
  onSeatClick: (seatId: number) => void;
  showTempSeat?: boolean;
  tempSeatXpos?: number;
  tempSeatYpos?: number;
  tempSeatRotate?: number;
  tempSeatNumber?: number;
  tempSeatUsable?: boolean;
  tempSeatFemaleUsable?: boolean;
  tempSeatMaleUsable?: boolean;
  selSeatNumber?: number;
  selSeatId?: number;
  selSeatXpos?: number;
  selSeatYpos?: number;
  selSeatDiscard?: boolean;
  selSeatMaleUsable?: boolean;
  selSeatFemaleUsable?: boolean;
  selSeatUsable?: boolean;
  selSeatRotate?: number;
  isAddDoor?: boolean;
  isFlip?: boolean;
  assignSeatId?: number | null;
  assignSeatLoading?: boolean;
  onEntranceClick?: () => void;
}

class GetSeatsQuery extends Query<getSeats, getSeatsVariables> {}

class RoomContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }
  public render() {
    const {
      roomId,
      onSeatClick,
      showTempSeat = false,
      tempSeatXpos = 0,
      tempSeatYpos = 0,
      tempSeatRotate = 0,
      tempSeatNumber = 0,
      tempSeatUsable = true,
      tempSeatFemaleUsable = false,
      tempSeatMaleUsable = false,
      selSeatNumber = 0,
      selSeatId = 0,
      selSeatXpos = 0,
      selSeatYpos = 0,
      selSeatDiscard = false,
      selSeatMaleUsable = true,
      selSeatFemaleUsable = true,
      selSeatUsable = true,
      selSeatRotate = 0,
      isAddDoor = false,
      isFlip = false,
      assignSeatId,
      assignSeatLoading,
      onEntranceClick
    } = this.props;
    return (
      <GetSeatsQuery
        query={GET_SEATS}
        variables={{ roomId }}
        fetchPolicy={"cache-and-network"}
      >
        {({ data, loading }) => {
          return (
            <RoomPresenter
              data={data}
              loading={loading}
              onSeatClick={onSeatClick}
              showTempSeat={showTempSeat}
              tempSeatXpos={tempSeatXpos}
              tempSeatYpos={tempSeatYpos}
              tempSeatRotate={tempSeatRotate}
              tempSeatNumber={tempSeatNumber}
              tempSeatUsable={tempSeatUsable}
              tempSeatFemaleUsable={tempSeatFemaleUsable}
              tempSeatMaleUsable={tempSeatMaleUsable}
              selSeatNumber={selSeatNumber}
              selSeatId={selSeatId}
              selSeatXpos={selSeatXpos}
              selSeatYpos={selSeatYpos}
              selSeatDiscard={selSeatDiscard}
              selSeatMaleUsable={selSeatMaleUsable}
              selSeatFemaleUsable={selSeatFemaleUsable}
              selSeatUsable={selSeatUsable}
              selSeatRotate={selSeatRotate}
              isAddDoor={isAddDoor}
              isFlip={isFlip}
              assignSeatId={assignSeatId}
              assignSeatLoading={assignSeatLoading}
              onEntranceClick={onEntranceClick}
            />
          );
        }}
      </GetSeatsQuery>
    );
  }
}
export default RoomContainer;
