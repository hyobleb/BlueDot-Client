import moment from "moment";
import React from "react";
import { ApolloConsumer, Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GUEST_GET_BRANCH } from "src/Components/sharedQueries";
import { CustomerRequestSignUpGender } from "src/Components/shareOptions";
import { reqSignUp, reqSignUpVariables } from "src/types/api";
import ReqSignUpPresenter from "./ReqSignUpPresenter";
import { REQ_SIGN_UP } from "./ReqSignUpQueries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  inputUserId: string;
  phoneNumber: string;
  email: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  password: string;
  name: string;
  gender: CustomerRequestSignUpGender;
  rePassword: string;
  showBranchSearch: boolean;
  branchId: number;
  baseBranchName: string;
  selGenderFirst: boolean;
  selBirthFirst: boolean;
}

class ReqSignUpMutation extends Mutation<reqSignUp, reqSignUpVariables> {}

class ReqSignUpContainer extends React.Component<IProps, IState> {
  public getBranch;
  public reqSignUp: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      baseBranchName: "",
      birthDay: 1,
      birthMonth: 0,
      birthYear: new Date().getFullYear(),
      branchId: 0,
      email: "",
      gender: CustomerRequestSignUpGender.MALE,
      inputUserId: "",
      name: "",
      password: "",
      phoneNumber: "",
      rePassword: "",
      selBirthFirst: true,
      selGenderFirst: true,
      showBranchSearch: false
    };
  }
  public render() {
    const { history } = this.props;
    const {
      birthDay,
      birthMonth,
      birthYear,
      email,
      gender,
      inputUserId,
      name,
      password,
      phoneNumber,
      rePassword,
      showBranchSearch,
      baseBranchName,
      branchId,
      selGenderFirst
    } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          this.getBranch = async (id: number) => {
            const { data } = await client.query({
              query: GUEST_GET_BRANCH,
              variables: { branchId: id }
            });
            return data;
          };
          return (
            <ReqSignUpMutation
              mutation={REQ_SIGN_UP}
              variables={{
                birthDay,
                birthMonth: birthMonth + 1,
                birthYear,
                branchId,
                email,
                gender,
                inputUserId,
                name,
                password,
                phoneNumber
              }}
              onCompleted={data => {
                const { CustomerRequestSignUp } = data;
                if (CustomerRequestSignUp.ok) {
                  toast.success(
                    "가입요청이 완료되었습니다. 관라자에게 승인을 요청하세요!"
                  );
                  history.push("/");

                  return;
                } else {
                  toast.error(CustomerRequestSignUp.error);
                }
              }}
            >
              {(reqSignUpMutationFn, { loading: reqSignUpLoading }) => {
                this.reqSignUp = reqSignUpMutationFn;
                return (
                  <ReqSignUpPresenter
                    onInputChange={this.onInputChange}
                    birthDay={birthDay}
                    birthMonth={birthMonth}
                    birthYear={birthYear}
                    email={email}
                    gender={gender}
                    inputUserId={inputUserId}
                    name={name}
                    password={password}
                    phoneNumber={phoneNumber}
                    onSubmit={this.onSubmit}
                    rePassword={rePassword}
                    showBranchSearch={showBranchSearch}
                    toggleShowBranchSearch={this.toggleShowBranchSearch}
                    baseBranchName={baseBranchName}
                    onBranchClick={this.onBranchClick}
                    onDatetimeChange={this.onDatetimeChange}
                    onOptionChange={this.onOptionChange}
                    selGenderFirst={selGenderFirst}
                    reqSignUpLoading={reqSignUpLoading}
                  />
                );
              }}
            </ReqSignUpMutation>
          );
        }}
      </ApolloConsumer>
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
    const {
      branchId,
      email,
      inputUserId,
      name,
      password,
      rePassword,
      phoneNumber,
      selGenderFirst,
      selBirthFirst
    } = this.state;
    if (selBirthFirst) {
      toast.error("생년월일을 선택해주세요");
    } else if (selGenderFirst) {
      toast.error("성별을 선택해주세요");
    } else if (!inputUserId) {
      toast.error("사용자 아이디가 입력되지 않았습니다");
    } else if (!new RegExp(/^[a-z0-9_]{4,20}$/).test(inputUserId)) {
      toast.error("아이디 형태가 올바르지 않습니다");
    } else if (!password) {
      toast.error("비밀번호가 입력되지 않았습니다");
    } else if (!rePassword) {
      toast.error("비밀번호 확인란을 입력해주세요");
    } else if (password !== rePassword) {
      toast.error("입력한 두 비밀번호가 다릅니다");
    } else if (!name) {
      toast.error("이름이 입력되지 않았습니다");
    } else if (!email) {
      toast.error("이메일을 입력하지 않았습니다");
    } else if (
      !new RegExp(
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      ).test(email)
    ) {
      toast.error("이메일 양식에 맞게 입력해주세요!");
    } else if (!phoneNumber) {
      toast.error("전화번호를 입력해주세요");
    } else if (
      !new RegExp(/^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/).test(
        phoneNumber
      ) &&
      !new RegExp(/^d{2,3}d{3,4}d{4}$/).test(phoneNumber)
    ) {
      toast.error("전화번호가 제대로 입력되지 않았습니다");
    } else if (branchId === 0) {
      toast.error("지점을 선택하지 않았습니다");
    } else {
      this.reqSignUp();
    }
  };
  public onBranchClick = async (branchId: number) => {
    const { GuestGetBranch } = await this.getBranch(branchId);

    if (!GuestGetBranch.ok) {
      toast.error("지점 정보를 제대로 받아오지 못했습니다");
      return;
    }

    const { id, name } = GuestGetBranch.branch;

    this.setState(
      {
        ...this.state,
        baseBranchName: name,
        branchId: id
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

  public onDatetimeChange = (datetimeValue: Date) => {
    this.setState({
      birthDay: moment(datetimeValue).date(),
      birthMonth: moment(datetimeValue).month(),
      birthYear: moment(datetimeValue).year(),
      selBirthFirst: false
    });
  };
  public onOptionChange = (arg: any) => {
    this.setState({
      ...this.state,
      gender: arg.value,
      selGenderFirst: false
    });
  };
}
export default ReqSignUpContainer;
