import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "../../typed-components";
const Container = styled.div``;
const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;
const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;
interface IProps {
  email: string;
  password: string;
  profilePhoto: string;
  onSubmit: MutationFn;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  uploading: boolean;
}
const EditAccountPresenter: React.SFC<IProps> = ({
  email,
  password,
  onSubmit,
  profilePhoto,
  onInputChange,
  loading,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>회원정보 수정 | BlueDot</title>
    </Helmet>
    <Header title={"회원정보 수정"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"email"}
        value={email}
        name={"email"}
        placeholder={"이메일"}
        autoComplete={"username"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"password"}
        value={password}
        name={"password"}
        placeholder={"비밀번호"}
        autoComplete={"current-password"}
      />
      <Button onClick={null} value={loading ? "Loading" : "수정"} />
    </ExtendedForm>
  </Container>
);
export default EditAccountPresenter;
