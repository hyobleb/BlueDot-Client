import React from "react";
import { ApolloConsumer } from "react-apollo";
import Script from "react-load-script";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { searchBranch_SearchBranch_branches } from "../../types/api";
import SignUpDetailPresenter from "./SignUpDetailPresenter";
import { GET_CERTIFICATION } from "./SignUpDetailQueries";

interface IState {
  userId: string;
  password: string;
  repassword: string;
  phoneNumber: string;
  baseBrachId: number | string;
  baseBranchName: string;
  showBranchSearch: boolean;
  IMP: any;
  jqueryLoad: boolean;
  importLoad: boolean;
  unique_key: string;
  name: string;
  gender: string;
  birthYear: number | null;
  birthMonth: number | null;
  birthDay: number | null;
}

interface IProps extends RouteComponentProps<any> {}

export default class SignUpDetailContainer extends React.Component<
  IProps,
  IState
> {
  public certificateUser;

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
      baseBrachId: "",
      baseBranchName: "",
      birthDay: null,
      birthMonth: null,
      birthYear: null,
      gender: "",
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
          onLoad={this.setJqueryLoad}
        />
        <Script
          url="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
          onLoad={this.setImportLoad}
        />
        <ApolloConsumer>
          {client => {
            this.certificateUser = async (impUid: string, branchId: number) => {
              const { data } = await client.query({
                query: GET_CERTIFICATION,
                variables: { imp_uid: impUid, branchId }
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
              />
            );
          }}
        </ApolloConsumer>
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

  public onBranchClick = (branchData: searchBranch_SearchBranch_branches) => {
    console.log(branchData);
    const { name, id } = branchData;
    this.setState(
      {
        ...this.state,
        baseBrachId: id,
        baseBranchName: name
      },
      () => this.toggleShowBranchSearch()
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    console.log("click");
  };

  public onVerifyingButtonClick = async () => {
    if (!this.state.baseBrachId) {
      toast.error("지점을 먼저 설정하셔야 됩니다");
      return;
    }
    if (this.state.IMP) {
      // IMP.certification(param, callback) 호출
      await this.state.IMP.certification(
        {
          // param
          // merchant_uid: "ORD20180131-0000011" // 옵션 값
        },
        rsp => {
          // callback
          if (rsp.success) {
            // 인증 성공 시 로직,

            const data = this.certificateUser(rsp.imp_uid);
            if (
              data &&
              data.unique_key &&
              data.name &&
              data.gender &&
              data.birthYear &&
              data.birthMonth &&
              data.birthDay
            ) {
              this.setState({
                ...this.state,
                birthDay: data.birthDay,
                birthMonth: data.birthMonth,
                birthYear: data.birthYear,
                gender: data.gender,
                name: data.name,
                unique_key: data.unique_key
              });
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
  };
}
