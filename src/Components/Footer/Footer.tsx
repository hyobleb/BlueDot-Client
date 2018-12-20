import React from "react";
import styled from "../../typed-components";

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  background-color: ${props => props.theme.greyColor};
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
`;

const Footer: React.SFC = () => (
  <Container>
    (주)크리플레이 | 사업자등록번호 617-86-24973 | 대표 송병근 | 부산광역시 북구
    양달로 4번길 11, 4층(화명동), 고객센터 051-362-0537
  </Container>
);

export default Footer;
