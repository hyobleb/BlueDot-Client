import React from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps } from "react-router-dom";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import styled from "../../typed-component";

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Header = styled.header`
  height: 30%;
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

const Body = styled.body``;
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
  width: 320px;
  margin-left: auto;
  margin-right: auto;
`;

interface IProps extends RouteComponentProps<any> {}
// RouteComponentProps에 any를 넣은 이유는 가끔 Route를 받고 되고 그 Route들은
// pros가 있기 때문
// RouteComponentProps 에는 history, location, match등등 들어있음
// 이것들이 우리가 받게 될 Route

// const LoginPresenter:React.SFC<RouteComponentProps<IProps>>=()=>(
// 위와 같은 식으로도 가능함
const LoginPresenter: React.SFC<IProps> = () => (
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
        <Form submitFn={() => console.log("tempSubmitFn")}>
          <Input
            placeholder={"아이디"}
            value={""}
            name={"phoneNumber"}
            onChange={() => console.log("tempOnChange")}
          />
          <Input
            placeholder={"비밀번호"}
            value={""}
            name={"phoneNumber"}
            onChange={() => console.log("tempOnChange")}
          />
          <Button value={"로그인"} onClick={() => console.log("tempButton")} />
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
    </Footer>
  </Container>
);

export default LoginPresenter;
