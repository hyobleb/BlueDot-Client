import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import BackArrow from "../../Components/BackArrow";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import SmallButton from "../../Components/SmallButton";
import styled from "../../typed-components";

const BackContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 95vw;
  max-width: 600px;
  margin-top: 20px;
`;

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
  justify-content: space-between;
`;

const BracnhSearchButton = styled(SmallButton)``;

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

const RoomSettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.orangeColor};
  font-size: 12px;
  margin: 5px 5px;
`;
const CabinetsettingButton = styled(SmallButton)`
  background-color: ${props => props.theme.greenColor};
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
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  branchInput: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const BranchSettingPresenter: React.SFC<IProps> = ({
  branchInput,
  onInputChange,
  onSubmit
}) => (
  <BackContainer>
    <Helmet>
      <title>Branch-Setting | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/" />
    <Container>
      <HeadContainer>
        <InputContainer>
          <ExtendForm submitFn={onSubmit}>
            <ExtendInput
              placeholder={"지점명 or 주소를 입력해주세요"}
              value={branchInput}
              name={"branchInput"}
              onChange={onInputChange}
              autoComplete={"username"}
            />
            <BracnhSearchButton value="찾기" onClick={onSubmit} />
          </ExtendForm>
        </InputContainer>
        <SLink to="/add-branch">지점 추가</SLink>
      </HeadContainer>
      <BodyContainer>
        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>

        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>

        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>

        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>

        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>

        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>

        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>

        <BranchContainer>
          <ContentsContainer>
            <PhotoContainer>
              <Image src={require("src/images/default_profile.png")} />
            </PhotoContainer>
            <ContextContainer>
              <ContextRow>화명본점</ContextRow>
              <ContextRow>화명 맥도날드 근처</ContextRow>
              <ContextRow>북구 양달로 4번길 11 세흥빌딩 4층</ContextRow>
              <ContextRow>화명역점 이용 가능</ContextRow>
            </ContextContainer>
          </ContentsContainer>
          <ButtonContainer>
            <RoomSettingButton value="열람실 및 좌석 세팅" />
            <CabinetsettingButton value="사물함 세팅" />
          </ButtonContainer>
        </BranchContainer>
      </BodyContainer>
    </Container>
  </BackContainer>
);
export default BranchSettingPresenter;
