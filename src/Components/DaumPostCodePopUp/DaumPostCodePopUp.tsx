import React from "react";
import DaumPostCode, { AddressData } from "react-daum-postcode";
import styled from "../../typed-components";
interface IProps {
  onConfirm: (data: AddressData) => void;
}
const Container = styled.div`
  background-color: white;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 60%;
  z-index: 9;
  padding: 20px;
`;
const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const DaumPostCodePopUp: React.SFC<IProps> = ({ onConfirm }) => (
  <Container>
    <Title>주소를 검색하세요!</Title>
    <DaumPostCode onComplete={onConfirm} />
  </Container>
);
export default DaumPostCodePopUp;
