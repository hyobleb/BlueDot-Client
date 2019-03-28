import React from "react";
import HyobiBack from "../../../Components/HyobiBack";
import styled from "../../../typed-components";

const Back = styled(HyobiBack)``;
const Header = styled.div`
  position: relative;
  height: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 20px;
  color: #101010;
`;
const HomeTitle = styled.div`
  width: 200px;
`;
const LogoA = styled.a`
  display: flex;
  flex-direction: row;
`;
const Logo = styled.div`
  width: 40px;
  height: 40px;
  background-image: url("/img/default/logo.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  text-indent: -9999px;
  margin-right: 8px;
`;
const LogoAUl = styled.ul`
  li {
    font-size: 24px;
    line-height: 26px;
    cursor: pointer;
  }
`;
const LogoType = styled.ul`
  width: 112px;
  height: auto;
  background-image: url("/img/default/logotype.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  text-indent: -9999px;
`;
const MenuBar = styled.a`
  position: absolute;
  top: 0;
  right: 20px;
  width: 30px;
  height: 100%;
  background-image: url("/img/default/menubar.png");
  background-repeat: no-repeat;
  background-size: 90% auto;
  background-position: center;
  text-indent: -9999px;
  cursor: pointer;
`;
const Bn = styled.p`
  width: 100%;
  height: 100px;
  background-color: #6d95e1;
  background-image: url("/img/default/bn.png");
  background-repeat: no-repeat;
  background-size: auto 90%;
  background-position: center;
  text-indent: -9999px;
`;
const Container = styled.div`
  color: #101010;
`;
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
`;
const BranchIcon = styled.li`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  margin-bottom: 16px;
  background-image: url("/imgs/branchicon.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;
const BranchList = styled.div`
  width: 168px;
  height: 24px;
  margin-right: 8px;
  background-color: #f50;
  margin-left: 8px;
  border-bottom: 2px solid #101010;
  cursor: pointer;
`;
const CalendarIcon = styled.li`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-image: url("/img/default/calendaricon.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
`;
const BranchDate = styled.div`
  width: 70px;
  height: 24px;
  margin-right: 8px;
  background-color: #f50;
  margin-left: 8px;
  border-bottom: 2px solid #101010;
  cursor: pointer;
`;
const Boxes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  padding: 20px;
  background-color: #e0e2e7;
`;
const BoxesUl = styled.ul`
  width: 49%;
  height: auto;
  margin-bottom: 8px;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #c3c5ca;
  text-align: center;
  li {
    font-size: 22px;
  }
  li:last-child {
    margin-bottom: 0;
  } /* 안먹히는 듯*/
`;
const Active = styled.div`
  font-size: 50px;
  color: #6d95e1;
`;

const EnrollManagePresenter: React.SFC = () => (
  // <Back title={"EnrollManage | BlueDot"} backUrl={"/"}>
  //   EnrollManagePresenter
  // </Back>

  <Back title={"EnrollManage | BlueDot"} backUrl={"/"}>
    <Header>
      <HomeTitle>
        <LogoA href="#">
          <Logo>bluedot lounge</Logo>
          <LogoAUl>
            <LogoType>블루닷라운지</LogoType>
            <li>관리자페이지</li>
          </LogoAUl>
        </LogoA>
      </HomeTitle>
      <p>
        <MenuBar href="#">메뉴 열기</MenuBar>
      </p>
    </Header>
    <Bn>가맹점주님과 함께 성장하는 블루닷라운지가 되겠습니다.</Bn>
    <Container>
      <Filter>
        <div>
          <FilterUl>
            <BranchIcon />
            <li>지점이름</li>
            <BranchList />
          </FilterUl>
        </div>
        <div>
          <FilterUl>
            <CalendarIcon />
            <li>기간검색</li>
            <BranchDate />
            <li>~</li>
            <BranchDate />
          </FilterUl>
        </div>
      </Filter>
      <Boxes>
        <BoxesUl>
          <Active>10</Active>
          <li>장기등록</li>
        </BoxesUl>
        <BoxesUl>
          <Active>10</Active>
          <li>일 등록</li>
        </BoxesUl>
        <BoxesUl>
          <Active>10</Active>
          <li>멤버십 등록</li>
        </BoxesUl>
        <BoxesUl>
          <Active>10</Active>
          <li>멤버십 취소</li>
        </BoxesUl>
        <BoxesUl>
          <Active>10</Active>
          <li>사물함 등록</li>
        </BoxesUl>
        <BoxesUl>
          <Active>10</Active>
          <li>사물함 취소</li>
        </BoxesUl>
      </Boxes>
    </Container>
  </Back>
);

export default EnrollManagePresenter;
