import React from "react";
import Button from "../../../Components/Button";
import DefaultBack from "../../../Components/DefaultBack";
import Form from "../../../Components/Form";
import Input from "../../../Components/Input";
// import Loading from "../../../Components/Loading";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)`
  height: 80vh;
  display: flex;
  align-items: center;
`;
const FormContainer = styled.div`
  max-width: 320px;
  min-width: 280px;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExtendInput = styled(Input)`
  padding-top: 18px;
  padding-bottom: 6px;
`;

const SubmitBtn = styled(Button)`
  border-radius: 0px;
  background-color: ${props => props.theme.blueColor};
  max-width: 200px;
  width: 200px;
  margin-top: 20px;
`;

interface IProps {
  backUrl: string;
  userId: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  password: string;
  rePassword: string;
  onVerifyingButtonClick: () => void;
  getUserWithUserIdLoading: boolean;
  idVerifed: boolean;
  onChangePasswordClick: () => Promise<void>;
}

const FindPasswordPresenter: React.SFC<IProps> = ({
  backUrl,
  userId,
  onInputChange,
  password,
  rePassword,
  onVerifyingButtonClick,
  getUserWithUserIdLoading,
  idVerifed,
  onChangePasswordClick
}) => (
  <Back title={"FindPassword | BlueDot"} backUrl={backUrl}>
    {(idVerifed && (
      <FormContainer>
        <Form submitFn={onChangePasswordClick}>
          <ExtendInput
            placeholder={"새 비밀번호"}
            value={password}
            name={"password"}
            onChange={onInputChange}
            type={"password"}
            autoComplete={"new-password"}
          />
          <ExtendInput
            placeholder={"새 비밀번호 확인"}
            value={rePassword}
            name={"rePassword"}
            onChange={onInputChange}
            type={"password"}
            autoComplete={"new-password"}
          />
          <SubmitBtn value={"확인"} />
        </Form>
      </FormContainer>
    )) || (
      <FormContainer>
        <Form submitFn={onVerifyingButtonClick}>
          <ExtendInput
            placeholder={"아이디"}
            value={userId}
            name={"userId"}
            onChange={onInputChange}
          />
          <SubmitBtn value={"본인인증 하기"} />
        </Form>
      </FormContainer>
    )}
  </Back>
);

export default FindPasswordPresenter;
