import React from "react";
import Dropdown, { Option } from "react-dropdown";
// import DatetimePicker from "../../../Components/DatetimePicker";
import HyobiBack from "../../../Components/HyobiBack";
import Loading from "../../../Components/Loading";
import ModalBox from "../../../Components/ModalBox";
import styled from "../../../typed-components";
import {
  shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch,
  shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships,
  shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branches
} from "../../../types/api";

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
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const BranchIcon = styled.li`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  /* margin-bottom: 16px; */
  background-image: url("/img/default/branchicon.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;
const BranchList = styled.div`
  width: 168px;
  height: 24px;
  margin-right: 8px;
  /* background-color: #f50; */
  margin-left: 8px;
  border-bottom: 2px solid #101010;
  cursor: pointer;
  text-align: center;
`;

const Modal = styled.div`
  position: relative;
  width: 600px;
  padding: 15px;
`;

const ModalTitle = styled.h1`
  font-size: 2em;
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
`;

const BoxesModal = styled.div`
  display: flex;
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 800px;
  background-color: #fff;
  z-index: 800;
  transform: translate(-50%, -50%);
`;

const ModalClose = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  text-indent: -9999px;
  background-image: url("/img/default/close.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  cursor: pointer;
`;

const BoxesModalBg = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.85;
  z-index: 500;
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
  cursor: pointer;
  li {
    font-size: 22px;
  }
  li:last-child {
    margin-bottom: 0;
  } /* 안먹히는 듯 */
  &:hover {
    background-color: ${props => props.theme.lightBlueColor};
    color: white;
    div {
      color: white;
    }
  }
`;

const Active = styled.div`
  font-size: 50px;
  color: #6d95e1;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
`;

// const ExtendedDatetimePicker = styled(DatetimePicker)`
//   height: 100%;
//   width: 100%;
// `;

const ExtendedDropDown = styled(Dropdown)`
  height: 100%;
  width: 100%;
  cursor: pointer;
  .control {
    padding: inherit;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: ${props => props.theme.lightBlueColor};
      color: white;
    }
  }
  .arrow {
    top: 8px;
  }
`;

interface IProps {
  getBranchInfoLoading: boolean;
  branch?: shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch | null;
  nowMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  nowCabinetMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapNowMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapNowCabMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  manMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  womanMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  boyMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  girlMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  oneDayMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapWomanMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapManMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapGirlMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapBoyMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  branches: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branches | null> | null;
  selBranchId?: string;
  branchSelOptions: Array<{ value: string; label: string }>;
  onBranchSelChange: (arg: Option) => void;
  toggleModal: () => void;
  showModal: boolean;
  showModal2: boolean;
  showModal3: boolean;
  toggleModal2: () => void;
  toggleModal3: () => void;
  toggleModalBox: (showModalName: string) => void;
}

const EnrollManagePresenter: React.SFC<IProps> = ({
  getBranchInfoLoading,
  branch,
  nowMemberships,
  nowCabinetMemberships,
  noOverlapNowMemberships,
  noOverlapNowCabMemberships,
  manMemberships,
  womanMemberships,
  boyMemberships,
  girlMemberships,
  oneDayMemberships,
  noOverlapWomanMemberships,
  noOverlapManMemberships,
  noOverlapGirlMemberships,
  noOverlapBoyMemberships,
  branches,
  selBranchId,
  branchSelOptions,
  onBranchSelChange,
  toggleModal,
  showModal,
  showModal2,
  showModal3,
  toggleModal2,
  toggleModal3,
  toggleModalBox
}) => (
  <Back title={"EnrollManage | BlueDot"} backUrl={"/"}>
    {getBranchInfoLoading ? (
      <Loading />
    ) : (
      <>
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
            {/* <FilterItem>
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
            </FilterItem> */}
          </Filter>
          {showModal ? (
            <Modal>
              <BoxesModal>
                <ModalClose onClick={() => toggleModalBox("showModal")}>
                  close
                </ModalClose>
                <ModalTitle>월 등록</ModalTitle>
                <ModalBox
                  title={"30일 멤버십 등록"}
                  color={"#4261cd"}
                  name={"현자"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                />
                <ModalBox
                  title={"30일 멤버십 연장"}
                  color={"#01b2aa"}
                  name={"송군"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                />
                <ModalBox
                  title={"30일 멤버십 취소"}
                  color={"#ec5d59"}
                  name={"김과장"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                  marginBottom={0}
                />
              </BoxesModal>
              <BoxesModalBg />
            </Modal>
          ) : (
            ""
          )}
          {showModal2 ? (
            <Modal>
              <BoxesModal>
                <ModalClose onClick={() => toggleModalBox("showModal2")}>
                  close
                </ModalClose>
                <ModalTitle>월 등록</ModalTitle>
                <ModalBox
                  title={"30일 멤버십 등록"}
                  color={"#4261cd"}
                  name={"현자"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                />
                <ModalBox
                  title={"30일 멤버십 연장"}
                  color={"#01b2aa"}
                  name={"송군"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                />
                <ModalBox
                  title={"30일 멤버십 취소"}
                  color={"#ec5d59"}
                  name={"김과장"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                  marginBottom={0}
                />
              </BoxesModal>
              <BoxesModalBg />
            </Modal>
          ) : (
            ""
          )}
          {showModal3 ? (
            <Modal>
              <BoxesModal>
                <ModalClose onClick={toggleModal3}>close</ModalClose>
                <ModalTitle>월 등록</ModalTitle>
                <ModalBox
                  title={"30일 멤버십 등록"}
                  color={"#4261cd"}
                  name={"현자"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                />
                <ModalBox
                  title={"30일 멤버십 연장"}
                  color={"#01b2aa"}
                  name={"송군"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                />
                <ModalBox
                  title={"30일 멤버십 취소"}
                  color={"#ec5d59"}
                  name={"김과장"}
                  branchName={"반여점"}
                  startDatetime={"2019-02-04 12:20:11"}
                  endDatetime={"2019-03-04 12:20:11"}
                  marginBottom={0}
                />
              </BoxesModal>
              <BoxesModalBg />
            </Modal>
          ) : (
            ""
          )}
          <Boxes>
            <BoxesUl onClick={() => toggleModalBox("showModal")}>
              <Active>
                {nowMemberships &&
                  nowMemberships.length -
                    ((oneDayMemberships && oneDayMemberships.length) || 0)}
              </Active>
              <li>장기등록</li>
            </BoxesUl>
            <BoxesUl onClick={() => toggleModalBox("showModal")}>
              <Active>
                {(oneDayMemberships && oneDayMemberships.length) || 0}
              </Active>
              <li>일 등록</li>
            </BoxesUl>
            <BoxesUl onClick={toggleModal3}>
              <Active>
                {(noOverlapManMemberships && noOverlapManMemberships.length) ||
                  0}
              </Active>
              <li>성인 남자</li>
            </BoxesUl>
            <BoxesUl>
              <Active>
                {(noOverlapWomanMemberships &&
                  noOverlapWomanMemberships.length) ||
                  0}
              </Active>
              <li>성인 여자</li>
            </BoxesUl>
            <BoxesUl>
              <Active>
                {(noOverlapBoyMemberships && noOverlapBoyMemberships.length) ||
                  0}
              </Active>
              <li>청소년 남자</li>
            </BoxesUl>
            <BoxesUl>
              <Active>
                {(noOverlapGirlMemberships &&
                  noOverlapGirlMemberships.length) ||
                  0}
              </Active>
              <li>청소년 여자</li>
            </BoxesUl>
            <BoxesUl>
              <Active>
                {(nowCabinetMemberships && nowCabinetMemberships.length) || 0}
              </Active>
              <li>사물함 등록</li>
            </BoxesUl>
          </Boxes>
        </Container>
      </>
    )}
  </Back>
);

export default EnrollManagePresenter;
