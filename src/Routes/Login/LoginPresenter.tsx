import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  min-height: 600px;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.div`
  height: 123px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoImg = styled.img`
  width: 200px;
`;

const Body = styled.div``;
const Footer = styled.div`
  margin-top: 15px;
  text-align: center;
  color: ${props => props.theme.blueColor};
`;

const FooterColumn = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h1``;

const FormContainer = styled.div`
  max-width: 320px;
  min-width: 280px;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
`;

const ExtendInput = styled(Input)`
  padding-top: 18px;
  padding-bottom: 6px;
`;

interface IProps {
  userId: string;
  password: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}
// RouteComponentProps에 any를 넣은 이유는 가끔 Route를 받고 되고 그 Route들은
// pros가 있기 때문
// RouteComponentProps 에는 history, location, match등등 들어있음
// 이것들이 우리가 받게 될 Route

// const LoginPresenter:React.SFC<RouteComponentProps<IProps>>=()=>(
// 위와 같은 식으로도 가능함
const LoginPresenter: React.SFC<IProps> = ({
  userId,
  password,
  onInputChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Login | BlueDot</title>
    </Helmet>
    <Header>
      <Logo>
        <LogoImg src={require("src/images/logo.png")} />
      </Logo>
      <Title>합리적인 가격에 최고의 학습공간을 경험하세요!</Title>
    </Header>
    <Body>
      <FormContainer>
        <Form submitFn={onSubmit}>
          <ExtendInput
            placeholder={"아이디"}
            value={userId}
            name={"userId"}
            onChange={onInputChange}
            autoComplete={"username"}
          />
          <ExtendInput
            placeholder={"비밀번호"}
            value={password}
            name={"password"}
            onChange={onInputChange}
            type={"password"}
            autoComplete={"current-password"}
          />
          {loading ? (
            <Button value={"로그인 중입니다"} />
          ) : (
            <Button value={"로그인"} onClick={onSubmit} />
          )}
        </Form>
      </FormContainer>
    </Body>
    <Footer>
      <FooterColumn>
        <Link to={"/sign-up"}>아직 계정이 없으신가요?</Link>
      </FooterColumn>
      <FooterColumn>
        <Link to={"/find-id"}>아이디 찾기</Link> |
        <Link to={"/find-password"}>비밀번호 찾기</Link>
      </FooterColumn>
      <FooterColumn>
        <Link to={"/social-phone"}>페이스북 로그인</Link>
      </FooterColumn>
    </Footer>
  </Container>
);

export default LoginPresenter;
