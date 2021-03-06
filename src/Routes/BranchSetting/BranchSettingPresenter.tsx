import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import BackArrow from "../../Components/BackArrow";
import BackContainer from "../../Components/BackContainer";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import SmallButton from "../../Components/SmallButton";
import styled from "../../typed-components";
import {
  getManaingBranches_GetManagingBranches_branches,
  searchBranch
} from "../../types/api";

const InputContainer = styled.div`
  min-width: 150px;
  max-width: 400px;
  margin-right: 10px;
  width: 70%;
`;

const ExtendInput = styled(Input)`
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 15px;
  margin-right: 10px;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const BranchSearchButton = styled(SmallButton)``;

const ExtendForm = styled(Form)`
  display: flex;
`;

const BodyContainer = styled.div`
  margin-top: 30px;
  height: 75vh;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

const BranchContainer = styled.div`
  border-radius: 10px;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
`;

const ContentsContainer = styled.div`
  display: flex;
`;
const PhotoContainer = styled.div`
  margin: 10px;
`;
const ContextContainer = styled.div`
  margin: 10px;
  font-size: ${props => props.theme.smallFontSize};
`;
const ContextRow = styled.div`
  margin-bottom: 5px;
`;
const ButtonContainer = styled.div`
  text-align: center;
`;

const BranchModifyButton = styled(SmallButton)`
  background-color: ${props => props.theme.orangeColor};
  font-size: 12px;
  margin: 5px 5px;
`;

const RoomSettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.lightBlueColor};
  font-size: 12px;
  margin: 5px 5px;
`;

const CabinetSettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.greenColor};
  font-size: 12px;

  margin: 5px 5px;
`;

const ProductSettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.greyColor};
  font-size: 12px;

  margin: 5px 5px;
`;

const CabLockSettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.yellowColor};
  font-size: 12px;

  margin: 5px 5px;
`;

const StaffSettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.pinkColor};
  font-size: 12px;

  margin: 5px 5px;
`;

const CoBranchSettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.purpleColor};
  font-size: 12px;

  margin: 5px 5px;
`;

const SLink = styled(Link)`
  background-color: ${props => props.theme.orangeColor};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 5px;
  overflow: hidden;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  data?: searchBranch | null;
  branchInput: string;
  onBranchModifyClick: (branchId: number) => void;
  onLoungeSettingClick: (branchId: number) => void;
  onCainbetSettingClick: (branchId: number) => void;
  onProductSettingClick: (branchId: number) => void;
  onCabLockSettingClick: (branchId: number) => void;
  onStaffSettingClick: (branchid: number) => void;
  onCoBranchSettingClick: (branchId: number) => void;
  isHead: boolean;
  isFranchiser: boolean;
  isSupervisor: boolean;
  managingBranches: Array<getManaingBranches_GetManagingBranches_branches | null>;
}

const BranchSettingPresenter: React.SFC<IProps> = ({
  onInputChange,
  onSubmit,
  data,
  branchInput,
  onLoungeSettingClick,
  onBranchModifyClick,
  onCainbetSettingClick,
  onProductSettingClick,
  onCabLockSettingClick,
  onStaffSettingClick,
  onCoBranchSettingClick,
  isHead,
  isFranchiser,
  isSupervisor,
  managingBranches
}) => (
  <BackContainer>
    <Helmet>
      <title>Branch-Setting | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/" />
    {isHead && (
      <HeadContainer>
        <InputContainer>
          <ExtendForm submitFn={onSubmit}>
            <ExtendInput
              placeholder={"지점명 or 주소를 입력해주세요"}
              value={branchInput}
              name={"branchInput"}
              onChange={onInputChange}
            />
            <BranchSearchButton value="찾기" onClick={onSubmit} />
          </ExtendForm>
        </InputContainer>
        <SLink to="/add-branch">지점 추가</SLink>
      </HeadContainer>
    )}

    {(isSupervisor || isFranchiser) && (
      <HeadContainer>
        {managingBranches &&
          managingBranches.length > 0 &&
          managingBranches.map(branch => {
            return (
              branch && (
                <BranchContainer key={branch.id}>
                  <ContentsContainer>
                    <PhotoContainer>
                      <Image src={require("src/images/default_profile.png")} />
                    </PhotoContainer>
                    <ContextContainer>
                      <ContextRow>{branch.name}</ContextRow>
                      <ContextRow>{branch.descriptionPosition}</ContextRow>
                      <ContextRow>
                        {branch.address} {branch.detailAddress}
                      </ContextRow>
                      <ContextRow>
                        {branch.alliedBranches &&
                          branch.alliedBranches.length > 0 &&
                          `${branch.alliedBranches.map(
                            alliedBranch => alliedBranch && alliedBranch.name
                          )} 이용가능`}
                      </ContextRow>
                    </ContextContainer>
                  </ContentsContainer>
                  <ButtonContainer>
                    <BranchModifyButton
                      value="지점 정보 수정"
                      onClick={() => onBranchModifyClick(branch.id)}
                    />
                    <CabLockSettingButton
                      value={"자물쇠 세팅"}
                      onClick={() => onCabLockSettingClick(branch.id)}
                    />
                    <StaffSettingButton
                      value={"스탭 세팅"}
                      onClick={() => onStaffSettingClick(branch.id)}
                    />
                    <RoomSettingButton
                      value="열람실 및 좌석 세팅"
                      onClick={() => onLoungeSettingClick(branch.id)}
                    />
                  </ButtonContainer>
                </BranchContainer>
              )
            );
          })}
      </HeadContainer>
    )}

    <BodyContainer>
      {isHead &&
        data &&
        data.SearchBranch &&
        data.SearchBranch.branches &&
        data.SearchBranch.branches.length > 0 &&
        data.SearchBranch.branches.map(branch => {
          if (branch) {
            return (
              <BranchContainer key={branch.id}>
                <ContentsContainer>
                  <PhotoContainer>
                    <Image src={require("src/images/default_profile.png")} />
                  </PhotoContainer>
                  <ContextContainer>
                    <ContextRow>{branch.name}</ContextRow>
                    <ContextRow>{branch.descriptionPosition}</ContextRow>
                    <ContextRow>
                      {branch.address} {branch.detailAddress}
                    </ContextRow>
                    <ContextRow>
                      {branch.alliedBranches &&
                        branch.alliedBranches.length > 0 &&
                        `${branch.alliedBranches.map(
                          alliedBranch => alliedBranch && alliedBranch.name
                        )} 이용가능`}
                    </ContextRow>
                  </ContextContainer>
                </ContentsContainer>
                <ButtonContainer>
                  <BranchModifyButton
                    value="지점 정보 수정"
                    onClick={() => onBranchModifyClick(branch.id)}
                  />
                  <RoomSettingButton
                    value="열람실 및 좌석 세팅"
                    onClick={() => onLoungeSettingClick(branch.id)}
                  />
                  <CabinetSettingButton
                    value="사물함 세팅"
                    onClick={() => onCainbetSettingClick(branch.id)}
                  />
                  <ProductSettingButton
                    value="상품 세팅"
                    onClick={() => onProductSettingClick(branch.id)}
                  />
                  <CabLockSettingButton
                    value={"자물쇠 세팅"}
                    onClick={() => onCabLockSettingClick(branch.id)}
                  />
                  <StaffSettingButton
                    value={"스탭 세팅"}
                    onClick={() => onStaffSettingClick(branch.id)}
                  />
                  <CoBranchSettingButton
                    value={"협력지점 세팅"}
                    onClick={() => onCoBranchSettingClick(branch.id)}
                  />
                </ButtonContainer>
              </BranchContainer>
            );
          } else {
            return;
          }
        })}
    </BodyContainer>
  </BackContainer>
);
export default BranchSettingPresenter;
