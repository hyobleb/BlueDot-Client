import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { toast } from "react-toastify";
import { MANAGER_GET_CABLOCKS } from "src/Routes/SettingCabLock/SettingCabLockQueries";
import {
  createCabinetLock,
  createCabinetLockVariables,
  modifyCabinetLock,
  modifyCabinetLockVariables
} from "src/types/api";
import { cabinetLockMode } from "../shareOptions";
import CabLockPopUpPresenter from "./CabLockPopUpPresenter";
import {
  CREATE_CABINET_LOCK,
  MODIFY_CABINET_LOCK
} from "./CabLockPopUpQueries";

interface IProps {
  closeFunc: any;
  title: string;
  branchId: number;
  lockId?: number;
  cabinetNumber?: number;
  lockNumber?: number;
  lockPassword?: string;
  mode: cabinetLockMode;
}

interface IState {
  cabinetNumber: number;
  lockNumber: number;
  lockPassword: string;
  mode: cabinetLockMode;
  lockId: number;
}

class ModifyCabinetlockMutation extends Mutation<
  modifyCabinetLock,
  modifyCabinetLockVariables
> {}

class CreateCabLockMutation extends Mutation<
  createCabinetLock,
  createCabinetLockVariables
> {}

class CabLockPopUpContainer extends React.Component<IProps, IState> {
  public createCabinetLockFn: MutationFn;
  public modifyCabinetLockFn: MutationFn;

  constructor(props) {
    super(props);
    this.state = {
      cabinetNumber: props.cabinetNumber ? props.cabinetNumber : "",
      lockId: props.lockId,
      lockNumber: props.lockNumber ? props.lockNumber : "",
      lockPassword: props.lockPassword ? props.lockPassword : "",
      mode: props.mode
    };
  }

  public render() {
    const { cabinetNumber, lockNumber, lockPassword } = this.state;
    const { closeFunc, title, lockId, branchId } = this.props;
    return (
      <ModifyCabinetlockMutation
        mutation={MODIFY_CABINET_LOCK}
        refetchQueries={[
          { query: MANAGER_GET_CABLOCKS, variables: { branchId } }
        ]}
      >
        {modifyCabinetLockMutation => {
          this.modifyCabinetLockFn = modifyCabinetLockMutation;
          return (
            <CreateCabLockMutation
              mutation={CREATE_CABINET_LOCK}
              variables={{
                branchId,
                cabinetNumber,
                lockNumber,
                password: lockPassword
              }}
              refetchQueries={[
                { query: MANAGER_GET_CABLOCKS, variables: { branchId } }
              ]}
            >
              {(createCabLockMutationFn, { loading: createLockLoading }) => {
                this.createCabinetLockFn = createCabLockMutationFn;
                return (
                  <CabLockPopUpPresenter
                    closeFunc={closeFunc}
                    title={title}
                    lockId={lockId}
                    cabinetNumber={cabinetNumber}
                    lockNumber={lockNumber}
                    lockPassword={lockPassword}
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                    createLockLoading={createLockLoading}
                  />
                );
              }}
            </CreateCabLockMutation>
          );
        }}
      </ModifyCabinetlockMutation>
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    const {
      cabinetNumber,
      lockNumber,
      lockPassword,
      lockId,
      mode
    } = this.state;
    const { closeFunc } = this.props;
    if (!cabinetNumber) {
      toast.error("사물함 번호를 입력해주세요");
      return;
    } else if (!lockNumber) {
      toast.error("자물쇠 번호를 입력해주세요");
      return;
    } else if (!lockPassword) {
      toast.error("비밀번호를 입력해주세요");
      return;
    }

    if (lockId && mode === cabinetLockMode.MODIFY) {
      const result = await this.modifyCabinetLockFn({
        variables: {
          cabinetLockId: lockId,
          cabinetNumber,
          lockNumber,
          password: lockPassword
        }
      });
      if (result && result.data && !result.data.ManagerUpdateCabinetLock.ok) {
        toast.error(result.data.ManagerUpdateCabinetLock.error);
      } else {
        toast.success("해당 자물쇠를 수정했습니다");
        closeFunc();
      }
    } else if (!lockId && mode === cabinetLockMode.CREATE) {
      const result = await this.createCabinetLockFn();
      if (result && result.data && !result.data.ManagerCreateCabinetLock.ok) {
        toast.error(result.data.ManagerCreateCabinetLock.error);
      } else {
        toast.success("해당 자물쇠를 추가했습니다");
        closeFunc();
      }
    }
  };
}

export default CabLockPopUpContainer;
