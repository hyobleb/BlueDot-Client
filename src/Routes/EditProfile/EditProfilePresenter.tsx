import React from "react";
import DefaultBack from "../../Components/DefaultBack";
import Form from "../../Components/Form";
// import Input from "../../Components/Input";
import styled from "../../typed-components";

const Back = styled(DefaultBack)``;
const InfoContainer = styled.div`
  padding: 10px;
  border: 1px solid #dedede;
  border-radius: 5px;
`;
const InfoRow = styled.div``;
const InfoRowTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 4px;
`;
const InfoRowContent = styled.div``;

const ExtendedForm = styled(Form)``;

// const ExtendInput = styled(Input)`
//   padding-top: 18px;
//   padding-bottom: 6px;
// `;

interface IProps {
  phoneNumber: string;
  password: string;
  rePassword: string;
}

const EditProfilePresenter: React.SFC<IProps> = ({
  phoneNumber,
  password,
  rePassword
}) => (
  <Back title={"edit-profile"}>
    <InfoContainer>
      <ExtendedForm submitFn={() => console.log("submit")}>
        <InfoRow>
          <InfoRowTitle>생년월일</InfoRowTitle>
          <InfoRowContent>1989년 1월 1일</InfoRowContent>
        </InfoRow>
        <InfoRow>
          <InfoRowTitle>성별</InfoRowTitle>
          <InfoRowContent>남자</InfoRowContent>
        </InfoRow>
        <InfoRow>
          <InfoRowTitle>아이디</InfoRowTitle>
          <InfoRowContent>yoojat</InfoRowContent>
        </InfoRow>
        <InfoRow>
          <InfoRowTitle>비밀번호</InfoRowTitle>
          <InfoRowContent>
            {/* <ExtendInput
              placeholder={"비밀번호"}
              //   value={password}
              name={"password"}
              //   onChange={onInputChange}
              type={"password"}
              maxlength={20}
              autoComplete={"current-password"}
            /> */}
          </InfoRowContent>
        </InfoRow>
      </ExtendedForm>
    </InfoContainer>
  </Back>
);

export default EditProfilePresenter;
