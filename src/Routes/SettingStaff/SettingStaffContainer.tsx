import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  headGetBranchEmployee,
  headGetBranchEmployeeVariables,
  headSetBranchManager,
  headSetBranchManagerVariables,
  managerSetBranchStaff,
  managerSetBranchStaffVariables
} from "src/types/api";
import SettingStaffPresenter from "./SettingStaffPresenter";
import {
  HEAD_GET_BRANCH_EMPLOYEE,
  HEAD_SET_BRANCH_MANGER,
  MANAGER_SET_BRANCH_STAFF
} from "./SettingStaffQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchId: number;
  managers?: any;
  cleanStaffs?: any;
  managingStaffs?: any;
  branchName: string;
  showUserSearchPopUp: boolean;
  onUserClick: (userId: number) => Promise<void>;
}

class SetBranchStaffMutation extends Mutation<
  managerSetBranchStaff,
  managerSetBranchStaffVariables
> {}

class SetBranchManagerMutation extends Mutation<
  headSetBranchManager,
  headSetBranchManagerVariables
> {}

class GetBranchEployeeQuery extends Query<
  headGetBranchEmployee,
  headGetBranchEmployeeVariables
> {}

class SettingStaffContainer extends React.Component<IProps, IState> {
  public setBranchManager: MutationFn;
  public setBranchStaff: MutationFn;
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      branchId: props.location.state.branchId,
      branchName: "",
      onUserClick: this.addFranchiser,
      showUserSearchPopUp: false
    };
  }
  public render() {
    const {
      branchId,
      showUserSearchPopUp,
      branchName,
      onUserClick,
      managers,
      cleanStaffs,
      managingStaffs
    } = this.state;
    return (
      <SetBranchStaffMutation
        mutation={MANAGER_SET_BRANCH_STAFF}
        refetchQueries={[
          {
            query: HEAD_GET_BRANCH_EMPLOYEE,
            variables: { branchId }
          }
        ]}
      >
        {setBranchStaffMutation => {
          this.setBranchStaff = setBranchStaffMutation;
          return (
            <SetBranchManagerMutation
              mutation={HEAD_SET_BRANCH_MANGER}
              refetchQueries={[
                {
                  query: HEAD_GET_BRANCH_EMPLOYEE,
                  variables: { branchId }
                }
              ]}
            >
              {setBranchManagerMutation => {
                this.setBranchManager = setBranchManagerMutation;
                return (
                  <GetBranchEployeeQuery
                    query={HEAD_GET_BRANCH_EMPLOYEE}
                    variables={{ branchId }}
                    fetchPolicy={"cache-and-network"}
                    onCompleted={this.updateFields}
                  >
                    {({ loading: brachEmployeeLoading }) => {
                      return (
                        <SettingStaffPresenter
                          brachEmployeeLoading={brachEmployeeLoading}
                          showUserSearchPopUp={showUserSearchPopUp}
                          branchName={branchName}
                          closeSearchUserPopUp={this.closeSearchUserPopUp}
                          onFranchiserEnrollClick={this.onFranchiserEnrollClick}
                          onUserClick={onUserClick}
                          managers={managers}
                          cleanStaffs={cleanStaffs}
                          managingStaffs={managingStaffs}
                          delFranchiser={this.delFranchiser}
                          onSupervisorEnrollClick={this.onSupervisorEnrollClick}
                          delSupervisor={this.delSupervisor}
                          onCleanStaffEnrollClick={this.onCleanStaffEnrollClick}
                          delCleanStaff={this.delCleanStaff}
                          onManagingStaffEnrollClick={
                            this.onManagingStaffEnrollClick
                          }
                          delManaingStaff={this.delManaingStaff}
                        />
                      );
                    }}
                  </GetBranchEployeeQuery>
                );
              }}
            </SetBranchManagerMutation>
          );
        }}
      </SetBranchStaffMutation>
    );
  }

  public updateFields = (data: {} | headGetBranchEmployee) => {
    if ("HeadGetBranchEmployee" in data) {
      const {
        HeadGetBranchEmployee: { branch }
      } = data;

      if (branch) {
        const { managers, cleanStaffs, managingStaffs, name } = branch;
        this.setState({
          branchName: name,
          cleanStaffs,
          managers,
          managingStaffs
        });
      }
    }
  };

  public closeSearchUserPopUp = () => {
    this.setState({
      showUserSearchPopUp: false
    });
  };

  public onFranchiserEnrollClick = () => {
    this.setState({
      onUserClick: this.addFranchiser,
      showUserSearchPopUp: true
    });
  };

  public onSupervisorEnrollClick = () => {
    this.setState({
      onUserClick: this.addSupervisor,
      showUserSearchPopUp: true
    });
  };

  public onCleanStaffEnrollClick = () => {
    this.setState({
      onUserClick: this.addCleanStaff,
      showUserSearchPopUp: true
    });
  };

  public onManagingStaffEnrollClick = () => {
    this.setState({
      onUserClick: this.addManagingStaff,
      showUserSearchPopUp: true
    });
  };

  public delFranchiser = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchManager({
      variables: {
        action: "SUB_BRANCH",
        branchId,
        managerType: "FRANCHISER",
        userId
      }
    });

    if (result && result.data) {
      const { HeadSetBranchManager } = result.data;
      if (HeadSetBranchManager.ok) {
        toast.success("점주를 삭제했습니다");
      } else {
        toast.error(HeadSetBranchManager.error);
      }
    } else {
      toast.error("점주 삭제에 실패했습니다");
    }
  };
  public addFranchiser = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchManager({
      variables: {
        action: "ADD_BRANCH",
        branchId,
        managerType: "FRANCHISER",
        userId
      }
    });

    if (result && result.data) {
      const { HeadSetBranchManager } = result.data;
      if (HeadSetBranchManager.ok) {
        toast.success("점주 등록에 성공했습니다");
        this.setState({
          showUserSearchPopUp: false
        });
      } else {
        toast.error(HeadSetBranchManager.error);
      }
    } else {
      toast.error("점주 등록에 실패했습니다");
    }
  };

  public addManagingStaff = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchStaff({
      variables: {
        action: "ADD_BRANCH",
        branchId,
        staffType: "MANAGE",
        userId
      }
    });

    if (result && result.data) {
      const { ManagerSetStaff } = result.data;
      if (ManagerSetStaff.ok) {
        toast.success("관리 스탭 등록에 성공했습니다");
        this.setState({
          showUserSearchPopUp: false
        });
      } else {
        toast.error(ManagerSetStaff.error);
      }
    } else {
      toast.error("관리 스탭 등록에 실패했습니다");
    }
  };

  public delManaingStaff = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchStaff({
      variables: {
        action: "SUB_BRANCH",
        branchId,
        staffType: "MANAGE",
        userId
      }
    });

    if (result && result.data) {
      const { ManagerSetStaff } = result.data;
      if (ManagerSetStaff.ok) {
        toast.success("관리 스탭 삭제에 성공했습니다");
        this.setState({
          showUserSearchPopUp: false
        });
      } else {
        toast.error(ManagerSetStaff.error);
      }
    } else {
      toast.error("관리 스탭 삭제에 실패했습니다");
    }
  };

  public addCleanStaff = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchStaff({
      variables: {
        action: "ADD_BRANCH",
        branchId,
        staffType: "CLEAN",
        userId
      }
    });

    if (result && result.data) {
      const { ManagerSetStaff } = result.data;
      if (ManagerSetStaff.ok) {
        toast.success("오픈/마감 스탭 등록에 성공했습니다");
        this.setState({
          showUserSearchPopUp: false
        });
      } else {
        toast.error(ManagerSetStaff.error);
      }
    } else {
      toast.error("오픈/마감 스탭 등록에 실패했습니다");
    }
  };

  public delCleanStaff = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchStaff({
      variables: {
        action: "SUB_BRANCH",
        branchId,
        staffType: "CLEAN",
        userId
      }
    });

    if (result && result.data) {
      const { ManagerSetStaff } = result.data;
      if (ManagerSetStaff.ok) {
        toast.success("오픈/마감 스탭 삭제에 성공했습니다");
        this.setState({
          showUserSearchPopUp: false
        });
      } else {
        toast.error(ManagerSetStaff.error);
      }
    } else {
      toast.error("오픈/마감 스탭 삭제에 실패했습니다");
    }
  };

  public addSupervisor = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchManager({
      variables: {
        action: "ADD_BRANCH",
        branchId,
        managerType: "SUPERVISOR",
        userId
      }
    });

    if (result && result.data) {
      const { HeadSetBranchManager } = result.data;
      if (HeadSetBranchManager.ok) {
        toast.success("슈퍼바이저 등록에 성공했습니다");
        this.setState({
          showUserSearchPopUp: false
        });
      } else {
        toast.error(HeadSetBranchManager.error);
      }
    } else {
      toast.error("슈퍼바이저 등록에 실패했습니다");
    }
  };
  public delSupervisor = async (userId: number) => {
    const { branchId } = this.state;
    const result = await this.setBranchManager({
      variables: {
        action: "SUB_BRANCH",
        branchId,
        managerType: "SUPERVISOR",
        userId
      }
    });

    if (result && result.data) {
      const { HeadSetBranchManager } = result.data;
      if (HeadSetBranchManager.ok) {
        toast.success("슈퍼바이저 삭제에 성공했습니다");
        this.setState({
          showUserSearchPopUp: false
        });
      } else {
        toast.error(HeadSetBranchManager.error);
      }
    } else {
      toast.error("슈퍼바이저 삭제에 실패했습니다");
    }
  };
}

export default SettingStaffContainer;
