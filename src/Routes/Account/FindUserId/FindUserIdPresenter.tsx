import React from "react";
import AlertPopUp from "../../../Components/AlertPopUp";
import Button from "../../../Components/Button";
import DefaultBack from "../../../Components/DefaultBack";
import Form from "../../../Components/Form";
import Input from "../../../Components/Input";
// import SmallButton from "../../../Components/SmallButton";
import Loading from "../../../Components/Loading";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)``;
const FormContainer = styled.div`
  max-width: 320px;
  min-width: 280px;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  text-align: center;
  height: 80vh;
  display: flex;
  align-items: center;
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
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  name: string;
  phoneNumber: string;
  onConfirmClick: () => void;
  userId?: string;
  onOkClick: () => void;
  findUserIdLoading: boolean;
  doGetUserId: boolean;
}

const FindUserIdPresenter: React.SFC<IProps> = ({
  backUrl,
  onInputChange,
  name,
  phoneNumber,
  onConfirmClick,
  userId,
  onOkClick,
  findUserIdLoading,
  doGetUserId
}) => (
  <Back title={"FindUserId | BlueDot"} backUrl={backUrl}>
    {doGetUserId && findUserIdLoading ? (
      <Loading />
    ) : (
      <FormContainer>
        <Form submitFn={onConfirmClick}>
          <ExtendInput
            placeholder={"이름"}
            value={name}
            name={"name"}
            onChange={onInputChange}
            autoComplete={"username"}
          />
          <ExtendInput
            placeholder={"핸드폰번호('-'없이 입력해주세요)"}
            value={phoneNumber}
            name={"phoneNumber"}
            onChange={onInputChange}
            type={"text"}
            maxlength={11}
          />

          <SubmitBtn value={"아이디 찾기"} />
        </Form>
      </FormContainer>
    )}

    {userId ? (
      <AlertPopUp
        onOkClick={onOkClick}
        closeFunc={onOkClick}
        message={`사용하시는 아이디는 ${userId}입니다`}
        useCancelBtn={false}
      />
    ) : (
      ""
    )}
  </Back>
);

export default FindUserIdPresenter;
