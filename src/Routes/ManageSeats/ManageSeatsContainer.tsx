import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getBranchForManSeat,
  getBranchForManSeat_GetBranchForManSeat_branch_rooms,
  getBranchForManSeatVariables
} from "src/types/api";
import ManageSeatsPresenter from "./ManageSeatsPresenter";
import { GET_BRANCH_FOR_MAN_SEAT } from "./ManageSeatsQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  showBranchSearchPopUp: boolean;
  selBranchId: number;
  loungeImage: string;
  minimapImage: string;
  rooms: [getBranchForManSeat_GetBranchForManSeat_branch_rooms] | null;
  branchName: string;
  nowRoomId: number;
}

class GetBranchForManSeatQuery extends Query<
  getBranchForManSeat,
  getBranchForManSeatVariables
> {}

class ManageSeatsContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    const selBranchId =
      (props.location.state && props.location.state.selBranchId) || 0;
    const nowRoomId =
      (props.location.state && props.location.state.nowRoomId) || 0;

    this.state = {
      branchName: "",
      loungeImage: "",
      minimapImage: "",
      nowRoomId,
      rooms: null,
      selBranchId,
      showBranchSearchPopUp: false
    };
  }
  public render() {
    const {
      showBranchSearchPopUp,
      selBranchId,
      rooms,
      loungeImage,
      minimapImage,
      branchName,
      nowRoomId
    } = this.state;

    return (
      <GetBranchForManSeatQuery
        query={GET_BRANCH_FOR_MAN_SEAT}
        variables={{ branchId: selBranchId }}
        skip={selBranchId === 0}
        fetchPolicy={"cache-and-network"}
        onCompleted={this.updateFields}
      >
        {({ loading: getBranchLoading }) => (
          <ManageSeatsPresenter
            showBranchSearchPopUp={showBranchSearchPopUp}
            toggleSearchBranchPopUpShow={this.toggleSearchBranchPopUpShow}
            onBranchClick={this.onBranchClick}
            getBranchLoading={getBranchLoading}
            selBranchId={selBranchId}
            rooms={rooms}
            loungeImage={loungeImage}
            minimapImage={minimapImage}
            branchName={branchName}
            onRoomClick={this.onRoomClick}
            nowRoomId={nowRoomId}
            onSeatsPopUpCloseClick={this.onSeatsPopUpCloseClick}
            onSeatClick={this.onSeatClick}
            onEntranceClick={this.onEntranceClick}
          />
        )}
      </GetBranchForManSeatQuery>
    );
  }

  public toggleSearchBranchPopUpShow = () => {
    this.setState({
      showBranchSearchPopUp: !this.state.showBranchSearchPopUp
    });
  };

  public onBranchClick = (branchId: number) => {
    this.setState(
      {
        selBranchId: branchId
      },
      () => this.toggleSearchBranchPopUpShow()
    );
  };

  public updateFields = (data: {} | getBranchForManSeat) => {
    if ("GetBranchForManSeat" in data) {
      const {
        GetBranchForManSeat: { branch }
      } = data;

      if (branch !== null) {
        const { loungeImage, minimapImage, rooms, name } = branch;
        this.setState({
          branchName: name,
          loungeImage,
          minimapImage,
          rooms
        } as any);
      }
    }
  };

  public onRoomClick = (roomId: number) => {
    const { rooms } = this.state;
    if (!rooms) {
      toast.error("지점 및 열람실 정보가 제대로 불러오지 않았습니다");
    } else {
      const findRoom = rooms.find(room => room.id === roomId);
      if (!findRoom) {
        toast.error("해당 열람실을 찾을 수 없습니다");
      } else {
        this.setState({ nowRoomId: roomId });
      }
    }
  };

  public onSeatsPopUpCloseClick = () => {
    this.setState({ nowRoomId: 0 });
  };

  public onSeatClick = (seatId: number) => {
    const { history } = this.props;
    const { nowRoomId, selBranchId } = this.state;
    history.push({
      pathname: "/manage-seat",
      state: {
        nowRoomId,
        seatId,
        selBranchId
      }
    });
  };

  public onEntranceClick = () => {
    this.setState({ nowRoomId: 0 });
  };
}

export default ManageSeatsContainer;
