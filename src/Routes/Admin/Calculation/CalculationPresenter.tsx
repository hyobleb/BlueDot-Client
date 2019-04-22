import React from "react";
import DefaultBack from "../../../Components/DefaultBack";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)``;

const Title = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #6d95e1;
  text-align: center;
  color: #6d95e1;
`;

const TitleIn = styled.div`
  width: 100%;
  height: 52px;
  background-color: #fff;
  text-align: center;
  line-height: 58px;
  font-size: 24px;
`;

const Icon = styled.i`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-image: url("/img/default/Calculation.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;

const Calculate = styled.div`
  font-size: 20px;
  text-align: center;
  border-bottom: 2px solid #101010;
  margin-top: 170px;
`;

const All = styled.ul`
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  line-height: 50px;
  border-bottom: 2px solid #101010;
  padding-left: 54px;
  padding-right: 54px;
`;

const Lists = styled.div`
  padding: 15px;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  line-height: 28px;
  padding-left: 40px;
  padding-right: 40px;
`;

const Line = styled.p`
  border-bottom: 2px solid #101010;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const OrderPrice = styled.li`
  &:hover {
    color: #fff;
    background-color: #6d95e1;
    padding-left: 1px;
    padding-right: 1px;
  }
`;

const ManagementPrice = styled.li`
  &:hover {
    color: #fff;
    background-color: #6d95e1;
    padding-left: 1px;
    padding-right: 1px;
  }
`;

const SaveBtn = styled.a`
  display: block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 120px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  background-color: #101010;
  color: #fff;
  text-align: center;
`;

// 정산 완료 코멘트 : 정산 완료하고 나면 나타나야 함.
const FinComment = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  color: #6d95e1;
  margin-top: 20px;
  display: none;
`;

const ModalComplete = styled.div`
  display: none;
  /* 모달 보이게 하려면 주석 처리 */
`;

const ModalBox = styled.div`
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 30px;
  background-color: #fff;
  z-index: 200;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.4em;
`;

const Span = styled.span`
  font-size: 16px;
`;

const Answer = styled.ul`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  margin-top: 15px;
  line-height: 40px;
`;

const Yes = styled.li`
  width: 110px;
  height: 40px;
  text-align: center;
  background-color: #4261cd;
  margin-right: 10px;
  cursor: pointer;
`;

const No = styled.li`
  width: 110px;
  height: 40px;
  text-align: center;
  background-color: #ec5d59;
  cursor: pointer;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.85;
  z-index: 100;
`;

const ModalOrder = styled.div`
  display: none;
  /* 모달 보이게 하려면 주석 처리 */
`;

const ModalOrderBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 240px;
  padding: 30px;
  background-color: #fff;
  z-index: 200;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const OrderLists = styled.div`
  font-size: 20px;
  line-height: 30px;
  border-bottom: 2px solid #101010;
  margin-bottom: 15px;
`;

const Price = styled.ul`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #101010;
`;

const OrderList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const OrderInput = styled.input`
  width: 60px;
  height: 26px;
  margin-top: 2px;
  text-align: right;
  font-size: 15px;
`;

const OrderBtn = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 40px;
`;

const Save = styled.a`
  width: 120px;
  height: 40px;
  text-align: center;
  background-color: #101010;
  color: #fff;
  margin-right: 10px;
`;

const Cancel = styled.a`
  width: 120px;
  height: 40px;
  text-align: center;
  border: 2px solid #101010;
`;

const CalculationPresenter: React.SFC = () => (
  <Back title={"Calculation | BlueDot"} backUrl={"/"}>
    <Title>
      <TitleIn>
        <Icon />
        정산 관리
      </TitleIn>
    </Title>
    <div>
      <Calculate>
        <All>
          <li>전체 매출 금액</li>
          <li>100</li>
        </All>
        <Lists>
          <List>
            <li>온라인 수수료</li>
            <li>6</li>
          </List>
          <List>
            <li>현장 카드 수수료</li>
            <li>5</li>
          </List>
          <List>
            <li>취소 금액</li>
            <li>2</li>
          </List>
          <List>
            <OrderPrice>
              <a href="#">발주 금액(VAT 포함)</a>
            </OrderPrice>
            <li>10</li>
          </List>
          <List>
            <ManagementPrice>
              <a href="#">관리비(VAT 포함)</a>
            </ManagementPrice>
            <li>10</li>
          </List>
          <Line />
          <List>
            <li>로얄티</li>
            <li>100 × 4% = 4</li>
          </List>
          <Line />
          <List>
            <li>순수익</li>
            <li>45</li>
          </List>
        </Lists>
      </Calculate>
      <SaveBtn href="#">저장</SaveBtn>
      <FinComment>정산이 완료되었습니다.</FinComment>
    </div>
    <ModalOrder>
      <ModalOrderBox>
        <OrderLists>
          <Price>
            <li>발주 금액</li>
            <li>100</li>
          </Price>
          <OrderList>
            <p>휴지</p>
            <OrderInput type="number" />
          </OrderList>
          <OrderList>
            <p>원두</p>
            <OrderInput type="number" />
          </OrderList>
          <OrderList>
            <p>세정제</p>
            <OrderInput type="number" />
          </OrderList>
          <OrderList>
            <p>기타</p>
            <OrderInput type="number" />
          </OrderList>
        </OrderLists>
        <OrderBtn>
          <Save href="#">저장</Save>
          <Cancel href="#">취소</Cancel>
        </OrderBtn>
      </ModalOrderBox>
      <ModalBg />
    </ModalOrder>
    <ModalComplete>
      <ModalBox>
        <p>
          정산을 완료하시겠습니까?
          <br />
          <Span>(한번 저장하면 다시 변경할 수 없습니다.)</Span>
        </p>
        <Answer>
          <Yes>예</Yes>
          <No>아니오</No>
        </Answer>
      </ModalBox>
      <ModalBg />
    </ModalComplete>
  </Back>
);

export default CalculationPresenter;
