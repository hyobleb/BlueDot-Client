import React from "react";
import DefaultBack from "../../../Components/DefaultBack";
import styled from "../../../typed-components";

const Back = styled(DefaultBack)``;

const Box1 = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: #6d95e1;
  text-align: center;
  color: #fff;
`;

const Box1In = styled.div`
  display: inline-block;
  width: 100%;
`;

const Title = styled.div`
  height: 52px;
  background-color: #fff;
  text-align: center;
  line-height: 58px;
  font-size: 24px;
  color: #6d95e1;
  margin-bottom: 20px;
`;

const Icon = styled.i`
  display: inline-block;
  width: 28px;
  height: 22px;
  margin-right: 10px;
  background-image: url("/img/default/SalesManagement.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;

const Filter = styled.div`
  font-size: 20px;
`;

/* 필터용. 이거 풀고 나면 위에 const Filter는 지워주기
const Filter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 22px;
  padding: 20px;
`;
const FilterUl = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const BranchIcon = styled.li`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-image: url("/img/default/branchicon.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;
const BranchList = styled.div`
  width: 168px;
  height: 24px;
  margin-right: 8px;
  margin-left: 8px;
  border-bottom: 2px solid #101010;
  cursor: pointer;
  text-align: center;
`;
*/

const Sum = styled.div`
  font-size: 22px;
  text-align: center;
  border-bottom: 2px solid #101010;
  margin-top: 220px;
`;

const SumTitle = styled.div`
  line-height: 50px;
  border-bottom: 2px solid #101010;
`;

const All = styled.li`
  padding: 10px;
`;

const AllCount = styled.ul`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  line-height: 50px;
  border-bottom: 2px solid #101010;
  margin-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

const Lists = styled.div`
  margin-bottom: 10px;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  line-height: 30px;
  padding-left: 40px;
  padding-right: 40px;
`;

const SpanOk = styled.span`
  padding: 5px;
  margin-right: 8px;
  background-color: #4261cd;
  color: #fff;
  font-size: 16px;
  vertical-align: top;
`;

const SpanCancel = styled.span`
  padding: 5px;
  margin-right: 8px;
  background-color: #ec5d59;
  color: #fff;
  font-size: 16px;
  vertical-align: top;
`;

const ModalAllRefund = styled.div`
  display: none;
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
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.85;
  z-index: 100;
`;

const ModalPartialRefund = styled.div`
  display: none;
`;

const Input = styled.input`
  margin: 15px 10px 0px 0px;
  width: 200px;
  height: 30px;
  font-size: 16px;
  text-align: right;
`;

const SalesManagementPresenter: React.SFC = () => (
  <Back title={"SalesManagement | BlueDot"} backUrl={"/"}>
    <Box1>
      <Box1In>
        <Title>
          <Icon />
          매출 관리
        </Title>
        <Filter>
          {" "}
          {/* 이 태그는 지워주세요. */}
          필터 자리!
        </Filter>{" "}
        {/* 이 태그는 지워주세요. */}
        {/* 필터입니다.
        <Filter>
            <FilterItem>
              <FilterUl>
                <BranchIcon />
                <li>지점이름</li>
                <BranchList>
                  <ExtendedDropDown
                    options={branchSelOptions}
                    onChange={onBranchSelChange}
                    placeholder={"지점선택"}
                    controlClassName={"control"}
                    arrowClassName={"arrow"}
                    value={String(selBranchId)}
                  />
                </BranchList>
              </FilterUl>
            </FilterItem>
             <FilterItem>
              <FilterUl>
                <CalendarIcon />
                <li>기간검색</li>
                <BranchDate>
                  <ExtendedDatetimePicker
                    flatPickrDate={new Date()}
                    dateFormat={"Y/m/d"}
                    onFlatPickrChange={() => console.log("!")}
                    enableTime={false}
                  />
                </BranchDate>
                <li>~</li>
                <BranchDate>
                  <ExtendedDatetimePicker
                    flatPickrDate={new Date()}
                    dateFormat={"Y/m/d"}
                    onFlatPickrChange={() => console.log("!")}
                    enableTime={false}
                  />
                </BranchDate>
              </FilterUl>
            </FilterItem>
          </Filter> */}
      </Box1In>
    </Box1>
    <Sum>
      <SumTitle>총 거래내역</SumTitle>
      <ul>
        <All>
          <AllCount>
            <li>262건</li>
            <li>8,550,500원</li>
          </AllCount>
          <Lists>
            <List>
              <li>
                <SpanOk>승인</SpanOk>218건
              </li>
              <li>9,550,500원</li>
            </List>
            <List>
              <li>
                <SpanCancel>취소</SpanCancel>44건
              </li>
              <li>-1,044,500원</li>
            </List>
          </Lists>
        </All>
      </ul>
    </Sum>
    <ModalAllRefund>
      <ModalBox>
        <p>전체 환불 하시겠습니까?</p>
        <Answer>
          <Yes>예</Yes>
          <No>아니오</No>
        </Answer>
      </ModalBox>
      <ModalBg />
    </ModalAllRefund>
    <ModalPartialRefund>
      <ModalBox>
        <p>환불할 금액을 입력해주세요.</p>
        <p>
          <Input type="number" />원
        </p>
        <Answer>
          <Yes>환불하기</Yes>
          <No>취소</No>
        </Answer>
      </ModalBox>
      <ModalBg />
    </ModalPartialRefund>
  </Back>
);

export default SalesManagementPresenter;
