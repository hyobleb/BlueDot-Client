import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import BranchSearchPopUp from "../../Components/BranchSearchPopUp";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Loading from "../../Components/Loading";
import SmallButton from "../../Components/SmallButton";
import styled from "../../typed-components";

interface IProps {
  userId: string;
  password: string;
  repassword: string;
  phoneNumber: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  showBranchSearch: boolean;
  toggleShowBranchSearch: () => void;
  onBranchClick: (branchId: number) => void;
  baseBranchName: string;
  onVerifyingButtonClick: () => void;
  userIdSignUp: any;
  loading: boolean;
  email: string;
  certificated: boolean;
}

const Container = styled.div`
  font-size: 13px;
`;
const Head = styled.div`
  display: flex;
`;
const Body = styled.div`
  margin-top: 4vh;
  margin-bottom: 4vh;
`;

const LogoContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
`;
const LogoImg = styled.img`
  width: 140px;
  height: auto;
`;

const FormContainer = styled.div`
  max-width: 320px;
  min-width: 280px;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;

const ExtendInput = styled(Input)`
  padding-top: 18px;
  padding-bottom: 6px;
`;

const Title = styled.h1`
  text-align: center;
`;

const IdentificationButton = styled(SmallButton)`
  border-radius: 0px;
  &:hover {
    background-color: ${props => props.theme.greyColor};
  }
`;

const IdentificationCompleteBtn = styled(SmallButton)`
  border-radius: 0px;
  background-color: ${props => props.theme.greyColor};
  max-width: 200px;
  width: 200px;
`;

const IdentificationButtonCon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const SelBranchButton = styled(Button)`
  padding: 5px;
  background-color: ${props => props.theme.greenColor};
  &:hover {
    background-color: ${props => props.theme.greyColor};
  }
`;

const SelBranchDisplay = styled.div`
  background-color: ${props => props.theme.greyColor};
  color: white;
  padding: 10px 0px;
  text-align: center;
  margin-top: 5px;
`;

const ConfirmButton = styled(Button)`
  &:hover {
    background-color: ${props => props.theme.greyColor};
  }
`;

const SignUpDetailPresenter: React.SFC<IProps> = ({
  password,
  phoneNumber,
  repassword,
  userId,
  onInputChange,
  onSubmit,
  showBranchSearch,
  toggleShowBranchSearch,
  onBranchClick,
  baseBranchName,
  onVerifyingButtonClick,
  loading,
  userIdSignUp,
  email,
  certificated
}) => (
  <Container>
    <Helmet>
      <title>SignUp | BlueDot</title>
    </Helmet>

    <Head>
      <LogoContainer>
        <Link to="/">
          <LogoImg src={require("src/images/logo.png")} />
        </Link>
      </LogoContainer>
    </Head>
    <Body>
      <Title>합리적인 가격에 최고의 학습공간을 경험하세요!</Title>

      <FormContainer>
        <Form submitFn={userIdSignUp}>
          <ExtendInput
            placeholder={"아이디"}
            value={userId}
            name={"userId"}
            onChange={onInputChange}
            autoComplete={"username"}
            autoFocus={true}
          />
          <ExtendInput
            placeholder={"비밀번호"}
            value={password}
            name={"password"}
            onChange={onInputChange}
            type={"password"}
            autoComplete={"current-password"}
          />
          <ExtendInput
            placeholder={"비밀번호 확인"}
            value={repassword}
            name={"repassword"}
            onChange={onInputChange}
            type={"password"}
            autoComplete={"current-password"}
          />
          <ExtendInput
            placeholder={"이메일"}
            value={email}
            name={"email"}
            onChange={onInputChange}
          />

          <SelBranchButton
            value={"지점선택"}
            onClick={toggleShowBranchSearch}
            type={"button"}
          />
          {baseBranchName ? (
            <SelBranchDisplay>
              {baseBranchName}을 선택하셨습니다
            </SelBranchDisplay>
          ) : (
            ""
          )}

          <ExtendInput
            placeholder={"핸드폰번호('-'없이 입력해주세요)"}
            value={phoneNumber}
            name={"phoneNumber"}
            onChange={onInputChange}
            type={"text"}
            maxlength={11}
          />
          {certificated ? (
            <IdentificationButtonCon>
              <IdentificationCompleteBtn value={"본인인증이 완료되었습니다"} />
            </IdentificationButtonCon>
          ) : (
            <IdentificationButtonCon>
              <IdentificationButton
                value={"본인인증"}
                onClick={() => onVerifyingButtonClick()}
              />
            </IdentificationButtonCon>
          )}

          {loading ? (
            <Loading />
          ) : (
            <ConfirmButton
              value={"가입하기"}
              type={"submit"}
              onClick={userIdSignUp}
            />
          )}
        </Form>
      </FormContainer>
    </Body>
    {showBranchSearch ? (
      <BranchSearchPopUp
        closeFunc={toggleShowBranchSearch}
        onBranchClick={onBranchClick}
      />
    ) : (
      ""
    )}
  </Container>
);

export default SignUpDetailPresenter;
