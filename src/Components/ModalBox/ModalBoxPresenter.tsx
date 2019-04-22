import React from "react";
import styled from "src/typed-components";

const ModalBoxBlue = styled<
  {
    marginBottom: number;
    highLightBorder?: boolean;
    color?: string;
  },
  "ul"
>("ul")`
  margin: 0 auto;
  border: 1px solid #c3c5ca;
  width: 300px;
  margin-bottom: ${props => props.marginBottom}px;
  position: relative;
  ${props =>
    props.highLightBorder ? `border : 2px solid ${props.color || "black"}` : ""}
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
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  font-size: 18px;
  line-height: 24px;
`;

const ModallistData = styled.ul`
  margin-left: 50px;
`;

const RefundBtn = styled.button`
  border: 3px solid black;
  margin-right: 5px;
`;

const BtnContainer = styled.div`
  padding-bottom: 15px;
  padding-left: 15px;
`;

const LeftBar = styled<
  {
    color: string;
  },
  "div"
>("div")`
  background-color: ${props => props.color};
  width: 8px;
  height: 100%;
  position: absolute;
  left: 0;
`;

interface IProps {
  color: string;
  name: string;
  branchName: string;
  startDatetime: string;
  endDatetime: string;
  marginBottom: number;
  title: string;
  button1Func?: () => void;
  button2Func?: () => void;
  displayTitle?: boolean;
  highLightBorder?: boolean;
}

const ModalBoxPresenter: React.SFC<IProps> = ({
  color,
  name,
  branchName,
  startDatetime,
  endDatetime,
  marginBottom,
  title,
  button1Func,
  button2Func,
  displayTitle,
  highLightBorder
}) => {
  return (
    <ModalBoxBlue
      marginBottom={marginBottom}
      highLightBorder={highLightBorder}
      color={color}
    >
      {displayTitle ? (
        <ModalBoxTitle color={color}>
          <li>{title}</li>
          <ModalBoxTitleMore>더보기</ModalBoxTitleMore>
        </ModalBoxTitle>
      ) : (
        ""
      )}
      {displayTitle ? "" : <LeftBar color={color} />}

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
      <BtnContainer>
        {button1Func ? (
          <RefundBtn onClick={button1Func}>전체 환불</RefundBtn>
        ) : (
          ""
        )}
        {button2Func ? (
          <RefundBtn onClick={button2Func}>부분 환불</RefundBtn>
        ) : (
          ""
        )}
      </BtnContainer>
    </ModalBoxBlue>
  );
};
export default ModalBoxPresenter;
