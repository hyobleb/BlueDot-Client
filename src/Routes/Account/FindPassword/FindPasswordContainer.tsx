import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import Script from "react-load-script";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changePassword,
  changePasswordVariables,
  checkOneself,
  checkOneselfVariables,
  getUserId,
  getUserWithUserId,
  getUserWithUserId_GetUserWithUserId_user,
  getUserWithUserIdVariables
} from "../../../types/api";
import FindPasswordPresenter from "./FindPasswordPresenter";
import {
  CHANGE_PASSWORD,
  CHECK_ONESELF,
  GET_USER_WITH_USER_ID
} from "./FindPasswordQueries";

interface IState {
  backUrl: string;
  userId: string;
  password: string;
  rePassword: string;
  idVerifed: boolean;
  jqueryLoad: boolean;
  importLoad: boolean;
  IMP: any;
  user?: getUserWithUserId_GetUserWithUserId_user | null;
}

class ChangePassword extends Mutation<
  changePassword,
  changePasswordVariables
> {}
class CheckOneself extends Mutation<checkOneself, checkOneselfVariables> {}
class GetUserWithUserId extends Mutation<
  getUserId,
  getUserWithUserIdVariables
> {}

class FindPasswordContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public checkOneself: MutationFn;
  public getUserWithUserId: MutationFn;
  public changePassword: MutationFn;

  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      IMP: null,
      backUrl: props.location.state.backInfo.backUrl,
      idVerifed: false,
      importLoad: false,
      jqueryLoad: false,
      password: "",
      rePassword: "",
      userId: ""
    };
  }

  public componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.state.jqueryLoad && this.state.importLoad) {
      if (!this.state.IMP) {
        const IMP = (window as any).IMP;
        this.setState({
          ...this.state,
          IMP
        });
      }
    }
  };

  public render() {
    const { backUrl, userId, idVerifed, password, rePassword } = this.state;
    return (
      <>
        <Script
          url="https://code.jquery.com/jquery-1.12.4.min.js"
          onLoad={() => {
            this.setJqueryLoad();
          }}
          onCreate={this.setJqueryLoad}
        />
        <Script
          url="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
          onLoad={() => {
            this.setImportLoad();
          }}
          onCreate={this.setImportLoad}
        />
        <ChangePassword
          mutation={CHANGE_PASSWORD}
          onCompleted={this.updateFields}
        >
          {(changePasswordMutation, { loading: chanagePasswordLoading }) => {
            this.changePassword = changePasswordMutation;
            return (
              <CheckOneself
                mutation={CHECK_ONESELF}
                onCompleted={this.updateFields}
              >
                {checkOneselfMutation => {
                  this.checkOneself = checkOneselfMutation;
                  return (
                    <GetUserWithUserId
                      mutation={GET_USER_WITH_USER_ID}
                      onCompleted={this.updateFields}
                    >
                      {(
                        getUserWithUserIdMutation,
                        { loading: getUserWithUserIdLoading }
                      ) => {
                        this.getUserWithUserId = getUserWithUserIdMutation;
                        return (
                          <FindPasswordPresenter
                            backUrl={backUrl}
                            userId={userId}
                            onInputChange={this.onInputChange}
                            password={password}
                            rePassword={rePassword}
                            onVerifyingButtonClick={this.onVerifyingButtonClick}
                            getUserWithUserIdLoading={getUserWithUserIdLoading}
                            idVerifed={idVerifed}
                            onChangePasswordClick={this.onChangePasswordClick}
                          />
                        );
                      }}
                    </GetUserWithUserId>
                  );
                }}
              </CheckOneself>
            );
          }}
        </ChangePassword>
      </>
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

  public setJqueryLoad = () => {
    this.setState({
      ...this.state,
      jqueryLoad: true
    });
  };

  public setImportLoad = () => {
    this.setState({
      ...this.state,
      importLoad: true
    });
  };

  public updateFields = (
    data: {} | getUserWithUserId | checkOneself | changePassword
  ) => {
    if ("GetUserWithUserId" in data) {
      const {
        GetUserWithUserId: { user, ok, error }
      } = data;

      if (!ok) {
        toast.error(error);
      } else if (ok && user !== null) {
        this.setState(
          {
            user
          },
          this.certificateUser
        );
      }
    } else if ("CheckOneself" in data) {
      const {
        CheckOneself: { ok, error }
      } = data;

      if (!ok) {
        toast.error(error);
      } else {
        this.setState({
          idVerifed: true
        });
      }
    } else if ("ChangePassword" in data) {
      const { history } = this.props;
      const {
        ChangePassword: { ok, error }
      } = data;
      if (!ok) {
        toast.error(error);
      } else {
        toast.success("비밀번호를 변경했습니다!");
        history.push("/");
      }
    }
  };

  public onVerifyingButtonClick = () => {
    const { userId } = this.state;
    if (!userId) {
      toast.error("아이디를 입력해주세요!");
      return;
    }

    this.getUserWithUserId({ variables: { userId } });
  };

  public certificateUser = async () => {
    const { IMP, user } = this.state;
    // const { baseBranchId, impId } = this.state;
    if (!user) {
      toast.error("유저 정보가 없습니다");
      return;
    }

    if (IMP) {
      // IMP.certification(param, callback) 호출
      IMP.init(user.baseBranch.impId); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.
      // console.dir(result);
      // console.log(impId);
      IMP.certification(
        {
          // popup: true
          // param
          // merchant_uid: "ORD20180131-0000011" // 옵션 값
        },
        async rsp => {
          // callback
          if (rsp.success) {
            // 인증 성공 시 로직,
            await this.checkOneself({
              variables: {
                branchId: user.baseBranch.id,
                impUid: rsp.imp_uid,
                userId: user.id
              }
            });
          }
        }
      );
    } else {
      toast.error("인증 모듈이 로드 되지 않았습니다");
    }
  };

  public onChangePasswordClick = async () => {
    const { user, password, rePassword, idVerifed } = this.state;
    if (!user) {
      toast.error("대상 유저가 존재하지 않습니다");
      return;
    }
    if (password !== rePassword) {
      toast.error("비밀번호가 맞지 않습니다");
      return;
    }

    if (!idVerifed) {
      toast.error("인증을 먼저 해주세요!");
      return;
    }

    await this.changePassword({
      variables: {
        newPassword: password,
        userId: user.id
      }
    });
  };
}
export default FindPasswordContainer;
