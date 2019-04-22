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
  width: 22px;
  height: 20px;
  margin-right: 10px;
  background-image: url("/img/default/Stock.png");
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

const DailyStock = styled.div`
  font-size: 22px;
  text-align: center;
  border-bottom: 2px solid #101010;
  margin-top: 220px;
`;

const StockTitle = styled.div`
  line-height: 50px;
  border-bottom: 2px solid #101010;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  line-height: 30px;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 60px;
  height: 26px;
  margin-top: 2px;
  text-align: right;
  font-size: 15px;
`;

const MonthlyStock = styled.div`
  margin-top: 20px;
  font-size: 22px;
  text-align: center;
  border-bottom: 2px solid #101010;
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

const StockPresenter: React.SFC = () => (
  <Back title={"Stock | BlueDot"} backUrl={"/"}>
    <Box1>
      <Box1In>
        <Title>
          <Icon />
          재고 관리
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
    <DailyStock>
      <StockTitle>일일 재고</StockTitle>
      <ul>
        <List>
          <li>휴지</li>
          <Input type="number" />
        </List>
        <List>
          <li>원두</li>
          <Input type="number" />
        </List>
      </ul>
    </DailyStock>
    <MonthlyStock>
      <StockTitle>월 재고 파악</StockTitle>
      <ul>
        <List>
          <li>코코도르</li>
          <Input type="number" />
        </List>
        <List>
          <li>컴퓨터</li>
          <Input type="number" />
        </List>
      </ul>
    </MonthlyStock>
    <SaveBtn href="#">저장</SaveBtn>
  </Back>
);

export default StockPresenter;
