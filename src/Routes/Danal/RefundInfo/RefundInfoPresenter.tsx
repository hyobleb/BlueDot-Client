import React from "react";
import DefaultBack from "../../../Components/DefaultBack";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)`
  line-height: 20px;
`;
const Row = styled.div``;
const RowTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
`;
const RowCont = styled.div`
  margin-bottom: 30px;
`;
const RowContLine = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Table = styled.table`
  width: 700px;
  border: 1px solid #dedede;
  text-align: center;
`;
const Tr = styled.tr``;
const TdrNoBottom = styled.td`
  border-bottom: none;
`;
const TdNoTop = styled.td`
  border-bottom: 1px solid #dedede;
`;
const Th = styled.th`
  padding: 5px;
  border: 1px solid #dedede;
`;

const Td = styled.td`
  padding: 5px;
  border: 1px solid #dedede;
`;

const RefundInfoPresenter: React.SFC = () => (
  <Back title={"Refund-info-rule | BlueDot"} backUrl={"/"}>
    <Row>
      <RowTitle>
        * 교습비등 반환기준(학원의 설립,운영 과외 교습에 관한 법률 시행일 제
        18조 제 3항 관련)
      </RowTitle>
      <RowCont>
        <Table>
          <Tr>
            <Th>구분</Th>
            <Th>반환사유 발생일</Th>
            <Th>반환금액</Th>
          </Tr>
          <Tr>
            <Td>제 18조 제2항 제1호 및 제2호의 반환사유에 해당하는 경우</Td>
            <Td>교습을 할 수 없거나 교습 장소를 제공할 수 없게 된 날</Td>
            <Td>이미 납부한 교습비등을 일할 계산한 금액</Td>
          </Tr>
          <Tr>
            <TdrNoBottom>교습기간이 1개월 이내인 경우(내규)</TdrNoBottom>
            <Td>교습 시작 전</Td>
            <Td>이미 납부한 교습비의 전액</Td>
          </Tr>
          <Tr>
            <TdNoTop />
            <Td>교습 시작 후</Td>
            <Td>
              이비 납부한 교습비등을 일할 계산한 금액(반환금액 = 교습비 -
              (1일권(16시간) X 교습기간))
            </Td>
          </Tr>
          <Tr>
            <TdrNoBottom>교습기간이 1개월을 초과하는 경우(내규)</TdrNoBottom>
            <Td>교습 시작 전</Td>
            <Td>이미 납부한 교습비등의 전액</Td>
          </Tr>
          <Tr>
            <TdNoTop />
            <Td>교습 시작 후</Td>
            <Td>
              반환 사유가 발생한 해당 월의 반환 대상 교습비등(교습기간이 1개월
              이내인 경우의 기준에 따라 산출한 금액을 말한다)과 나머지 월의
              교습비 등의 전액을 합산한 금
            </Td>
          </Tr>
        </Table>
      </RowCont>
    </Row>
    <Row>
      <RowTitle>비고</RowTitle>
      <RowContLine>
        <RowContLine>
          1. 총 교습시간은 교습기간 중의 총 교습시간을 말하며, 반환금액의 산정은
          반환사유가 발생한 날까지 경과된 교습시간을 기준으로 한다.
        </RowContLine>
        <RowContLine>
          2. 원격교습의 경우 반환금액은 교습내용을 실제 수강한 부분(인터넷으로
          수강하거나 학습기기로 저장한 것을 말한다)에 해당하는 금액을 뺀
          금액으로 한다.{" "}
        </RowContLine>
      </RowContLine>
    </Row>
  </Back>
);

export default RefundInfoPresenter;
