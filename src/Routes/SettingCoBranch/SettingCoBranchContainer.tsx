import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  delCoBranch,
  delCoBranchVariables,
  getCoBranches,
  getCoBranchesVariables,
  setCoBranch,
  setCoBranchVariables
} from "src/types/api";
import SettingCoBranchPresenter from "./SettingCoBranchPresenter";
import {
  DEL_CO_BRANCH,
  GET_CO_BRANCHES,
  SET_CO_BRANCH
} from "./SettingCoBranchQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  nowBranchId: number;
  coBranches: any[];
  branchSearchPopUpShow: boolean;
}

class SetCoBranchMutation extends Mutation<setCoBranch, setCoBranchVariables> {}
class DelCoBranchMutation extends Mutation<delCoBranch, delCoBranchVariables> {}
class GetCoBranchesQuery extends Query<getCoBranches, getCoBranchesVariables> {}

class SettingCoBranchContainer extends React.Component<IProps, IState> {
  public setCoBranchFn: MutationFn;
  public delCoBranchFn: MutationFn;

  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      branchSearchPopUpShow: false,
      coBranches: [],
      nowBranchId: props.location.state.branchId
    };
  }
  public render() {
    const { nowBranchId, branchSearchPopUpShow, coBranches } = this.state;
    return (
      <DelCoBranchMutation
        mutation={DEL_CO_BRANCH}
        onCompleted={data => {
          if (data.HeadDelCoBranch.ok) {
            toast.success("해당 지점을 협력지점에서 삭제했습니다");
          } else {
            toast.error(data.HeadDelCoBranch.error);
          }
        }}
        refetchQueries={[
          { query: GET_CO_BRANCHES, variables: { branchId: nowBranchId } }
        ]}
      >
        {delCoBranchMutation => {
          this.delCoBranchFn = delCoBranchMutation;
          return (
            <SetCoBranchMutation
              mutation={SET_CO_BRANCH}
              onCompleted={data => {
                if (data.HeadSetCoBranch.ok) {
                  toast.success("해당 지점을 협력지점으로 추가했습니다");
                  this.toggleBranchSearchPopUpShow();
                } else {
                  toast.error(data.HeadSetCoBranch.error);
                }
              }}
              refetchQueries={[
                { query: GET_CO_BRANCHES, variables: { branchId: nowBranchId } }
              ]}
            >
              {setCoBranchMutation => {
                this.setCoBranchFn = setCoBranchMutation;
                return (
                  <GetCoBranchesQuery
                    query={GET_CO_BRANCHES}
                    variables={{ branchId: nowBranchId }}
                    onCompleted={this.updateFields}
                    fetchPolicy={"cache-and-network"}
                  >
                    {({ loading: coBranchesLoading }) => (
                      <SettingCoBranchPresenter
                        coBranchesLoading={coBranchesLoading}
                        toggleBranchSearchPopUpShow={
                          this.toggleBranchSearchPopUpShow
                        }
                        branchSearchPopUpShow={branchSearchPopUpShow}
                        coBranches={coBranches}
                        onBranchClick={this.onBranchClick}
                        onDelBranchClick={this.onDelBranchClick}
                      />
                    )}
                  </GetCoBranchesQuery>
                );
              }}
            </SetCoBranchMutation>
          );
        }}
      </DelCoBranchMutation>
    );
  }

  public updateFields = (data: {} | getCoBranches) => {
    if ("HeadGetCoBranches" in data) {
      const {
        HeadGetCoBranches: { branches }
      } = data;
      if (branches !== null) {
        this.setState({
          coBranches: branches
        });
      }
    }
  };

  public toggleBranchSearchPopUpShow = () => {
    this.setState({
      branchSearchPopUpShow: !this.state.branchSearchPopUpShow
    });
  };

  public onBranchClick = async (branchId: number) => {
    const { nowBranchId } = this.state;
    await this.setCoBranchFn({
      variables: {
        branchId: nowBranchId,
        coBranchId: branchId
      }
    });
  };

  public onDelBranchClick = async (branchId: number) => {
    const { nowBranchId } = this.state;
    await this.delCoBranchFn({
      variables: {
        branchId: nowBranchId,
        coBranchId: branchId
      }
    });
  };
}

export default SettingCoBranchContainer;
