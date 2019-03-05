import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  background-color: ${props => props.theme.greyColor};
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
`;

const TopLine = styled.div`
  border-bottom: 1px solid #dedede;
  padding-top: 4px;
  padding-bottom: 4px;
`;
const BottomLine = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  color: #dedede;
`;

const Footer: React.SFC = () => (
  <Container>
    <TopLine>
      <Link to={"/service-rule"}>서비스 이용약관</Link> |{" "}
      <Link to={"/private-info-rule"}>개인정보 취급방침</Link> |{" "}
      <Link to={"/refund-rule"}>환불 약관</Link>
    </TopLine>
    <BottomLine>
      (주)크리플레이 | 사업자등록번호 617-86-24973 | 대표 송병근 | 부산광역시
      북구 양달로 4번길 11, 4층(화명동), 고객센터 051-362-0537
    </BottomLine>
  </Container>
);

export default Footer;
