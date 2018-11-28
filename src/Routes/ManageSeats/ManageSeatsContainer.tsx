import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_MANAGING_BRANCHES } from "src/Components/sharedQueries";
import {
  getBranchForManSeat,
  getBranchForManSeat_GetBranchForManSeat_branch_rooms,
  getBranchForManSeatVariables,
  getManaingBranches,
  getManaingBranches_GetManagingBranches_branches
} from "src/types/api";
import ManageSeatsPresenter from "./ManageSeatsPresenter";
import { GET_BRANCH_FOR_MAN_SEAT } from "./ManageSeatsQueries";

interface IProps extends RouteComponentProps<any> {
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
}
interface IState {
  showBranchSearchPopUp: boolean;
  selBranchId: number;
  loungeImage: string;
  minimapImage: string;
  rooms: [getBranchForManSeat_GetBranchForManSeat_branch_rooms] | null;
  branchName: string;
  nowRoomId: number;
  managingBranches?: Array<getManaingBranches_GetManagingBranches_branches | null>;
}

class GetManagingBranchesQuery extends Query<getManaingBranches> {}

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
      nowRoomId,
      managingBranches
    } = this.state;

    const { isHead, isFranchiser, isSupervisor } = this.props;

    return (
      <GetManagingBranchesQuery
        query={GET_MANAGING_BRANCHES}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <GetBranchForManSeatQuery
            query={GET_BRANCH_FOR_MAN_SEAT}
            variables={{ branchId: selBranchId }}
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
                isHead={isHead}
                isFranchiser={isFranchiser}
                isSupervisor={isSupervisor}
                managingBranches={managingBranches}
                onBranchBtnClick={this.onBranchBtnClick}
              />
            )}
          </GetBranchForManSeatQuery>
        )}
      </GetManagingBranchesQuery>
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

  public onBranchBtnClick = (branchId: number) => {
    this.setState({
      selBranchId: branchId
    });
  };

  public updateFields = (
    data: {} | getBranchForManSeat | getManaingBranches
  ) => {
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
    } else if ("GetManagingBranches" in data) {
      const {
        GetManagingBranches: { branches }
      } = data;

      const { isHead, isSupervisor, isFranchiser } = this.props;

      if (!isHead && (isSupervisor || isFranchiser) && branches !== null) {
        let oneBranchId;
        if (branches.length === 1) {
          if (branches[0] !== null) {
            oneBranchId = branches[0]!.id;
          }
        }

        this.setState({
          managingBranches: branches,
          selBranchId: oneBranchId
        });
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
