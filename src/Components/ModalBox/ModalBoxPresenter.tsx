import React from "react";
import styled from "src/typed-components";

const ModalBoxBlue = styled<
  {
    marginBottom: number;
  },
  "ul"
>("ul")`
  margin: 0 auto;
  border: 1px solid #c3c5ca;
  width: 400px;
  margin-bottom: ${props => props.marginBottom}px;
`;

const ModalBoxTitle = styled<
  {
    color: string;
  },
  "ul"
>("ul")`
  position: relative;
  height: 50px;
  background-color: ${props => props.color};
  color: #fff;
  font-size: 22px;
  line-height: 50px;
  padding-left: 15px;
`;

const ModalBoxTitleMore = styled.li`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 10px;
  height: 20px;
  text-indent: -9999px;
  background-image: url("/img/default/more.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
`;

const ModalList = styled.div`
  display: flex;
  padding: 15px;
  font-size: 18px;
  line-height: 24px;
`;

const ModallistData = styled.ul`
  margin-left: 50px;
`;

interface IProps {
  color: string;
  name: string;
  branchName: string;
  startDatetime: string;
  endDatetime: string;
  marginBottom: number;
  title: string;
}

const ModalBoxPresenter: React.SFC<IProps> = ({
  color,
  name,
  branchName,
  startDatetime,
  endDatetime,
  marginBottom,
  title
}) => {
  return (
    <ModalBoxBlue marginBottom={marginBottom}>
      <ModalBoxTitle color={color}>
        <li>{title}</li>
        <ModalBoxTitleMore>더보기</ModalBoxTitleMore>
      </ModalBoxTitle>
      <ModalList>
        <ul>
          <li>등록자</li>
          <li>등록지점</li>
          <li>시작일시</li>
          <li>종료일시</li>
        </ul>
        <ModallistData>
          <li>{name}</li>
          <li>{branchName}</li>
          <li>{startDatetime}</li>
          <li>{endDatetime}</li>
        </ModallistData>
      </ModalList>
    </ModalBoxBlue>
  );
};
export default ModalBoxPresenter;
