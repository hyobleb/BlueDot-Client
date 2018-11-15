import React from "react";
import { ApolloConsumer, Mutation, MutationFn } from "react-apollo";
import Script from "react-load-script";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GUEST_GET_BRANCH } from "src/Components/sharedQueries";
import { LOG_USER_IN } from "../../sharedQueries.local";
import {
  tempUserIdSignUpMutation,
  tempUserIdSignUpMutationVariables
} from "../../types/api";
import SignUpDetailPresenter from "./SignUpDetailPresenter";
import {
  GET_CERTIFICATION,
  TEMP_USER_ID_SIGN_UP_MUTATION
} from "./SignUpDetailQueries";

interface IState {
  userId: string;
  password: string;
  repassword: string;
  phoneNumber: string;
  baseBranchId: number | null;
  baseBranchName: string;
  showBranchSearch: boolean;
  IMP: any;
  jqueryLoad: boolean;
  importLoad: boolean;
  unique_key: string;
  name: string;
  gender: string | null;
  birthYear: number | null;
  birthMonth: number | null;
  birthDay: number | null;
  imp_uid: string;
  impId: string;
  email: string;
}

interface IProps extends RouteComponentProps<any> {}

class UserIdSignUpMutation extends Mutation<
  tempUserIdSignUpMutation,
  tempUserIdSignUpMutationVariables
> {}

export default class SignUpDetailContainer extends React.Component<
  IProps,
  IState
> {
  public certificateUser: (impUid: string, branchId: number) => Promise<any>;
  public userIdSignUpMutation: MutationFn;
  public getBranch;

  constructor(props: IProps) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    } else {
      if (!props.location.state.confirmTerms) {
        props.history.push("/");
      }
    }

    this.state = {
      IMP: null,
      baseBranchId: null,
      baseBranchName: "",
      birthDay: null,
      birthMonth: null,
      birthYear: null,
      email: "",
      gender: null,
      impId: "",
      imp_uid: "",
      importLoad: false,
      jqueryLoad: false,
      name: "",
      password: "",
      phoneNumber: "",
      repassword: "",
      showBranchSearch: false,
      unique_key: "",
      userId: ""
    };
  }

  public componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.state.jqueryLoad && this.state.importLoad) {
      if (!this.state.IMP) {
        const IMP = (window as any).IMP;
        this.setState(
          {
            ...this.state,
            IMP
          },
          () => {
            this.state.IMP.init("imp61646988");
          }
        );
      }
    }
  };

  public render() {
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

        <Mutation mutation={LOG_USER_IN}>
          {logUserIn => (
            <UserIdSignUpMutation
              mutation={TEMP_USER_ID_SIGN_UP_MUTATION}
              onCompleted={data => {
                const { TempUserIdSignUp } = data;
                if (TempUserIdSignUp.ok) {
                  logUserIn({
                    variables: {
                      token: TempUserIdSignUp.token
                    }
                  });
                  toast.success("가입이 완료되었습니다!");
                  return;
                } else {
                  toast.error(TempUserIdSignUp.error);
                }
              }}
            >
              {(userIdSignUpMutation, { loading }) => {
                this.userIdSignUpMutation = userIdSignUpMutation;
                return (
                  <ApolloConsumer>
                    {client => {
                      this.certificateUser = async (
                        impUid: string,
                        branchId: number
                      ) => {
                        const { data } = await client.query({
                          query: GET_CERTIFICATION,
                          variables: { imp_uid: impUid, branchId }
                        });
                        return data;
                      };

                      this.getBranch = async (branchId: number) => {
                        const { data } = await client.query({
                          query: GUEST_GET_BRANCH,
                          variables: { branchId }
                        });
                        return data;
                      };

                      return (
                        <SignUpDetailPresenter
                          password={this.state.password}
                          phoneNumber={this.state.phoneNumber}
                          repassword={this.state.repassword}
                          userId={this.state.userId}
                          onInputChange={this.onInputChange}
                          onSubmit={this.onSubmit}
                          showBranchSearch={this.state.showBranchSearch}
                          toggleShowBranchSearch={this.toggleShowBranchSearch}
                          onBranchClick={this.onBranchClick}
                          baseBranchName={this.state.baseBranchName}
                          onVerifyingButtonClick={this.onVerifyingButtonClick}
                          loading={loading}
                          userIdSignUp={this.onSubmit}
                          email={this.state.email}
                        />
                      );
                    }}
                  </ApolloConsumer>
                );
              }}
            </UserIdSignUpMutation>
          )}
        </Mutation>
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

  public onBranchClick = async (branchId: number) => {
    const { GuestGetBranch } = await this.getBranch(branchId);

    if (!GuestGetBranch.ok) {
      toast.error("지점 정보를 제대로 받아오지 못했습니다");
      return;
    }

    const { id, impId, name } = GuestGetBranch.branch;

    this.setState(
      {
        ...this.state,
        baseBranchId: id,
        baseBranchName: name,
        impId
      },
      () => {
        this.toggleShowBranchSearch();
      }
    );
  };

  public toggleShowBranchSearch = () => {
    this.setState({
      ...this.state,
      showBranchSearch: !this.state.showBranchSearch
    });
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    const {
      userId,
      password,
      repassword,
      phoneNumber,
      baseBranchId,
      name,
      gender,
      birthYear,
      birthMonth,
      birthDay,
      imp_uid,
      unique_key,
      email
    } = this.state;

    if (!userId) {
      toast.error("아이디가 입력되지 않았습니다");
    } else if (!new RegExp(/^[a-z0-9_]{4,20}$/).test(userId)) {
      toast.error("아이디 형태가 올바르지 않습니다");
    } else if (!password || !repassword) {
      toast.error("비밀번호가 입력되지 않았습니다");
    } else if (password !== repassword) {
      toast.error("비밀번호를 다시 확인해주세요");
    } else if (!email) {
      toast.error("이메일이 입력되지 않았습니다");
    } else if (
      !new RegExp(
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      ).test(email)
    ) {
      toast.error("이메일 양식에 맞게 입력해주세요!");
    } else if (!phoneNumber) {
      toast.error("전화번호를 입력해주세요");
    } else if (!baseBranchId) {
      toast.error("지점을 선택해주세요");
    } else if (!name || !gender || !birthYear || !birthMonth || !birthDay) {
      toast.error("본인인증을 해주세요!");
    }

    await this.userIdSignUpMutation({
      variables: {
        baseBranchId,
        birthDay,
        birthMonth,
        birthYear,
        gender,
        imp_uid,
        name,
        password,
        phoneNumber,
        unique_key,
        userId
      }
    });
  };

  public onVerifyingButtonClick = async () => {
    // if (!this.state.baseBranchId) {
    //   toast.error("지점을 먼저 선택해주세요!");
    //   return;
    // }
    // this.setState({
    //   ...this.state,
    //   birthDay: 1,
    //   birthMonth: 1,
    //   birthYear: 1989,
    //   gender: "MALE",
    //   name: "방문자",
    //   unique_key: "1234"
    // });

    // toast.success("본인인증에 성공했습니다");

    // ------------------------------------------------------------

    const { IMP } = this.state;
    const { baseBranchId, impId } = this.state;

    if (!baseBranchId || !impId) {
      toast.error("지점을 먼저 설정하셔야 됩니다");
      return;
    }

    if (IMP) {
      // IMP.certification(param, callback) 호출
      const result = await IMP.init(impId); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.
      console.dir(result);
      console.log(impId);
      IMP.certification(
        {
          popup: true
          // param
          // merchant_uid: "ORD20180131-0000011" // 옵션 값
        },
        async rsp => {
          // callback
          if (rsp.success) {
            // 인증 성공 시 로직,

            const data = await this.certificateUser(rsp.imp_uid, baseBranchId);
            if (
              data &&
              data.unique_key &&
              data.name &&
              data.gender &&
              data.birthYear &&
              data.birthMonth &&
              data.birthDay
            ) {
              this.setState(
                {
                  ...this.state,
                  birthDay: data.birthDay,
                  birthMonth: data.birthMonth,
                  birthYear: data.birthYear,
                  gender: data.gender,
                  imp_uid: rsp.imp_uid,
                  name: data.name,
                  unique_key: data.unique_key
                },
                () => console.log(this.state)
              );
            }

            // const {
            //   data: { secure_url }
            // } = await axios.post(
            //   "https://api.cloudinary.com/v1_1/drijcu8ak/image/upload/",
            //   formData
            // );
          } else {
            // 인증 실패 시 로직,
            toast.error(
              `인증에 실패했습니다. 에러 내용 :  ${rsp.error_msg &&
                rsp.error_msg}`
            );
          }
        }
      );
    } else {
      toast.error("인증 모듈이 로드 되지 않았습니다");
    }
    // ------------------------------------------------------------
  };
}
