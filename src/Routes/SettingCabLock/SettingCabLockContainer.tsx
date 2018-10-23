import React from "react";
import { ApolloConsumer, Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import {
  managerGetCablocks,
  managerGetCablocksVariables,
  removeCabinetLock,
  removeCabinetLockVariables
} from "src/types/api";
import SettingCabLockPresenter from "./SettingCabLockPresenter";
import {
  GET_CABINET_LOCK,
  MANAGER_GET_CABLOCKS,
  REMOVE_CABINET_LOCK
} from "./SettingCabLockQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  popUpShow: boolean;
  lockId?: number;
  cabinetNumber?: number;
  lockNumber?: number;
  lockPassword?: string;
}

class RemoveCabinetLockMutation extends Mutation<
  removeCabinetLock,
  removeCabinetLockVariables
> {}

class GetCabinetLocksQuery extends Query<
  managerGetCablocks,
  managerGetCablocksVariables
> {}

class SettingCabLockContainer extends React.Component<IProps, IState> {
  public removeLockFn;
  public getCabinetLockFn;
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      branchId: props.location.state.branchId,
      popUpShow: false
    };
  }
  public render() {
    const {
      popUpShow,
      branchId,
      cabinetNumber,
      lockNumber,
      lockPassword,
      lockId
    } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          this.getCabinetLockFn = async (cabinetLockId: number) => {
            const { data } = await client.query({
              query: GET_CABINET_LOCK,
              variables: { lockId: cabinetLockId }
            });
            return data;
          };
          return (
            <RemoveCabinetLockMutation
              mutation={REMOVE_CABINET_LOCK}
              refetchQueries={[
                { query: MANAGER_GET_CABLOCKS, variables: { branchId } }
              ]}
            >
              {removeLockMutationFn => {
                this.removeLockFn = removeLockMutationFn;
                return (
                  <GetCabinetLocksQuery
                    query={MANAGER_GET_CABLOCKS}
                    variables={{ branchId }}
                  >
                    {({ data: lockDatas, loading: lockDatasLoading }) => (
                      <SettingCabLockPresenter
                        popUpShow={popUpShow}
                        togglePopUpShow={this.togglePopUpShow}
                        addButtonClick={this.addButtonClick}
                        branchId={branchId}
                        lockDatas={lockDatas}
                        lockDatasLoading={lockDatasLoading}
                        onRemoveClick={this.onRemoveClick}
                        onModifyClick={this.onModifyClick}
                        cabinetNumber={cabinetNumber}
                        lockNumber={lockNumber}
                        lockPassword={lockPassword}
                        lockId={lockId}
                      />
                    )}
                  </GetCabinetLocksQuery>
                );
              }}
            </RemoveCabinetLockMutation>
          );
        }}
      </ApolloConsumer>
    );
  }

  public togglePopUpShow = () => {
    this.setState({
      popUpShow: !this.state.popUpShow
    });
  };

  public addButtonClick = () => {
    this.setState(
      {
        cabinetNumber: undefined,
        lockId: undefined,
        lockNumber: undefined,
        lockPassword: undefined
      },
      this.togglePopUpShow
    );
  };

  public onRemoveClick = async (lockId: number) => {
    const {
      data: { ManagerRemoveCabinetLock }
    } = await this.removeLockFn({
      variables: { cabinetLockId: lockId }
    });

    if (ManagerRemoveCabinetLock.ok) {
      toast.success("해당 자물쇠를 삭제했습니다");
    } else {
      toast.error(ManagerRemoveCabinetLock.error);
    }
  };

  public onModifyClick = async (lockId: number) => {
    const data = await this.getCabinetLockFn(lockId);
    if (data.ManagerGetCabinetLock.ok) {
      this.setState(
        {
          cabinetNumber:
            data.ManagerGetCabinetLock.cabinetLock.cabinet.cabinetNumber,
          lockId,
          lockNumber: data.ManagerGetCabinetLock.cabinetLock.lockNumber,
          lockPassword: data.ManagerGetCabinetLock.cabinetLock.password
        },
        this.togglePopUpShow
      );
    }
  };
}

export default SettingCabLockContainer;
