import React from "react";
import BranchSearchPopUp from "src/Components/BranchSearchPopUp";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

const Back = styled(DefaultBack)``;
const Section = styled.section``;
const HeadSection = styled(Section)`
  font-size: 24px;
  margin-bottom: 10px;
`;
const ButtonSection = styled(Section)`
  text-align: right;
  margin-bottom: 10px;
`;
const Button = styled(SmallButton)``;
const AddBtn = styled(Button)``;
const BodySection = styled(Section)``;
const ContentContainer = styled.div``;
const BranchItem = styled.div`
  border: 1px solid #dedede;
  padding: 10px;
  margin-bottom: 10px;
`;
const BItemCol = styled.div``;

const BContentRow = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`;

const PhotoCol = styled(BItemCol)`
  flex-basis: 100px;
  margin-right: 15px;
`;
const Img = styled.img`
  width: 100%;
`;
const TextCol = styled(BItemCol)`
  flex-basis: 200px;
`;

const TextRow = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
`;

const TitleTextCol = styled(TextRow)`
  font-size: 20px;
`;

const DelBtnRow = styled.div`
  text-align: center;
`;
const DelBtn = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;

interface IProps {
  coBranchesLoading: boolean;
  toggleBranchSearchPopUpShow: () => void;
  branchSearchPopUpShow: boolean;
  coBranches: any[];
  onBranchClick: (branchId: number) => Promise<void>;
  onDelBranchClick: (branchId: number) => Promise<void>;
}

const SettingCoBranchPresenter: React.SFC<IProps> = ({
  coBranchesLoading,
  toggleBranchSearchPopUpShow,
  branchSearchPopUpShow,
  coBranches,
  onBranchClick,
  onDelBranchClick
}) => (
  <Back title={"setting-cobranch"} backUrl={"/branch-setting"}>
    {coBranchesLoading ? (
      <Loading />
    ) : (
      <>
        <HeadSection>협력 지점</HeadSection>
        <ButtonSection>
          <AddBtn value={"추가"} onClick={toggleBranchSearchPopUpShow} />
        </ButtonSection>
        <BodySection>
          <ContentContainer>
            {coBranches.length === 0 &&
              "등록 버튼을 눌러 협력지점을 추가해주세요"}
            {coBranches.map(branch => (
              <BranchItem key={branch.id}>
                <BContentRow>
                  <PhotoCol>
                    <Img
                      src={
                        "https://images.wsj.net/im-7089?width=620&aspect_ratio=1.5"
                      }
                    />
                  </PhotoCol>
                  <TextCol>
                    <TitleTextCol>{branch.name}</TitleTextCol>
                    <TextRow>{branch.descriptionPosition}</TextRow>
                    <TextRow>
                      {branch.address} {branch.detailAddress}
                    </TextRow>
                    {branch.alliedBranches.length > 0 && (
                      <TextRow>
                        {branch.alliedBranches.map(aBranch => aBranch.name)}
                        이용 가능
                      </TextRow>
                    )}
                  </TextCol>
                </BContentRow>
                <DelBtnRow>
                  <DelBtn
                    value={"삭제"}
                    onClick={() => onDelBranchClick(branch.id)}
                  />
                </DelBtnRow>
              </BranchItem>
            ))}
          </ContentContainer>
        </BodySection>
      </>
    )}

    {branchSearchPopUpShow ? (
      <BranchSearchPopUp
        closeFunc={toggleBranchSearchPopUpShow}
        onBranchClick={onBranchClick}
      />
    ) : (
      ""
    )}
  </Back>
);

export default SettingCoBranchPresenter;
