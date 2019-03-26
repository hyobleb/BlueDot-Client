import React from "react";
import Button from "../../../Components/Button";
import DefaultBack from "../../../Components/DefaultBack";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)``;
const BtnContainer = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Btn = styled(Button)``;

interface IProps {
  onFindUserIdBtnClick: () => void;
}

const FindAccountPresenter: React.SFC<IProps> = ({ onFindUserIdBtnClick }) => (
  <Back title={"Template | BlueDot"} backUrl={"/"}>
    <BtnContainer>
      <Btn value={"아이디를 잊으셨나요?"} onClick={onFindUserIdBtnClick} />
      <Btn value={"비밀번호 찾기는 준비중입니다 😅"} />
    </BtnContainer>
  </Back>
);

export default FindAccountPresenter;
