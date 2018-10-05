import "node_modules/react-toggle-switch/dist/css/switch.min.css";
import React from "react";
import Helmet from "react-helmet";
import Switch from "react-toggle-switch";
import BackArrow from "../../Components/BackArrow";
import BackContainer from "../../Components/BackContainer";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import SmallButton from "../../Components/SmallButton";
import SnapShot from "../../Components/SnapShot";
import styled from "../../typed-components";

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InputLabel = styled.label`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
`;
const InputExtended = styled(Input)`
  width: 80%;
`;
const InputTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 130px;
  margin-left: 10px;
`;

const SmallButtonExtended = styled(SmallButton)`
  align-self: flex-end;
`;

const SnapShotContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DetailOptionContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
`;
const DetailOptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DetailOptionTitle = styled.div``;
const DetailOptionBody = styled.div`
  margin-top: 10px;
`;
const DetailOptionDataRow = styled.div`
  padding-bottom: 10px;
`;

const SwitchTitle = styled.div`
  margin: 5px;
`;

const SwitchBox = styled.div``;

const SwitchRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwitchItem = styled.div``;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddBranchPresenter: React.SFC<IProps> = ({ onInputChange }) => (
  <BackContainer>
    <Helmet>
      <title>Branch-Add | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/branch-setting" />
    <Form submitFn={() => console.log("!")}>
      <Row>
        <InputLabel>
          <InputTitle>지점명 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>지점 번호 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>우편 번호 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
        <SmallButtonExtended value={"우편번호 검색"} />
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>주소 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>상세 주소 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>지점 설명 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>지점 설명 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>지점 이미지 : </InputTitle>
          <PhotoInput
            uploading={false}
            fileUrl={""}
            onChange={onInputChange}
            dispalyText={"지점 이미지 올리기"}
            name={"bracnhPhotos"}
          />
        </InputLabel>

        <SnapShotContainer>
          <SnapShot
            url={
              "https://scontent.cdninstagram.com/vp/104e27f1b10abdb67edf3bc6ef246ff9/5C2C8DC2/t51.2885-15/sh0.08/e35/p640x640/28152943_2030521387229675_6668475367478525952_n.jpg"
            }
          />
          <SnapShot
            url={
              "https://scontent.cdninstagram.com/vp/104e27f1b10abdb67edf3bc6ef246ff9/5C2C8DC2/t51.2885-15/sh0.08/e35/p640x640/28152943_2030521387229675_6668475367478525952_n.jpg"
            }
          />
          <SnapShot
            url={
              "https://scontent.cdninstagram.com/vp/104e27f1b10abdb67edf3bc6ef246ff9/5C2C8DC2/t51.2885-15/sh0.08/e35/p640x640/28152943_2030521387229675_6668475367478525952_n.jpg"
            }
          />
        </SnapShotContainer>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>라운지 이미지 : </InputTitle>
          <PhotoInput
            uploading={false}
            fileUrl={""}
            onChange={onInputChange}
            dispalyText={"라운지 이미지 올리기"}
            name={"loungeImg"}
          />
        </InputLabel>

        <SnapShotContainer>
          <SnapShot
            url={
              "https://scontent.cdninstagram.com/vp/104e27f1b10abdb67edf3bc6ef246ff9/5C2C8DC2/t51.2885-15/sh0.08/e35/p640x640/28152943_2030521387229675_6668475367478525952_n.jpg"
            }
          />
        </SnapShotContainer>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>미니맵 이미지 : </InputTitle>
          <PhotoInput
            uploading={false}
            fileUrl={""}
            onChange={onInputChange}
            dispalyText={"미니맵 이미지 올리기"}
            name={"minimapIng"}
          />
        </InputLabel>

        <SnapShotContainer>
          <SnapShot
            url={
              "https://scontent.cdninstagram.com/vp/104e27f1b10abdb67edf3bc6ef246ff9/5C2C8DC2/t51.2885-15/sh0.08/e35/p640x640/28152943_2030521387229675_6668475367478525952_n.jpg"
            }
          />
        </SnapShotContainer>
      </Row>
      <Row>
        <DetailOptionContainer>
          <DetailOptionHeader>
            <DetailOptionTitle>협력지점</DetailOptionTitle>
            <SmallButtonExtended value={"추가"} />
          </DetailOptionHeader>
          <DetailOptionBody>
            <DetailOptionDataRow>
              동래 안락점 : 동래구 연안로 41 6층
            </DetailOptionDataRow>
          </DetailOptionBody>
        </DetailOptionContainer>
      </Row>

      <Row>
        <DetailOptionContainer>
          <DetailOptionHeader>
            <DetailOptionTitle>가맹주</DetailOptionTitle>
            <SmallButtonExtended value={"변경"} />
          </DetailOptionHeader>
          <DetailOptionBody>
            <DetailOptionDataRow>
              김진완 나이 : 31 01098258816
            </DetailOptionDataRow>
          </DetailOptionBody>
        </DetailOptionContainer>
      </Row>

      <Row>
        <DetailOptionContainer>
          <DetailOptionHeader>
            <DetailOptionTitle>슈퍼바이저</DetailOptionTitle>
            <SmallButtonExtended value={"추가"} />
          </DetailOptionHeader>
          <DetailOptionBody>
            <DetailOptionDataRow>
              김진완 나이 : 31 01098258816
            </DetailOptionDataRow>
            <DetailOptionDataRow>
              김진완 나이 : 31 01098258816
            </DetailOptionDataRow>
          </DetailOptionBody>
        </DetailOptionContainer>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>남자 최대 수용: </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>여자 최대 수용 : </InputTitle>
          <InputExtended value={""} />
        </InputLabel>
      </Row>

      <Row>
        <SwitchBox>
          <SwitchRow>
            <SwitchTitle>남자 성인 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch onClick={() => console.log("click")} on={true}>
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>

          <SwitchRow>
            <SwitchTitle>남자 성인 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch onClick={() => console.log("click")} on={true}>
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>

          <SwitchRow>
            <SwitchTitle>남자 성인 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch onClick={() => console.log("click")} on={true}>
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>

          <SwitchRow>
            <SwitchTitle>남자 성인 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch onClick={() => console.log("click")} on={true}>
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>
        </SwitchBox>
      </Row>
      <Row>
        <Button value={"등록하기"} />
      </Row>
    </Form>
  </BackContainer>
);

export default AddBranchPresenter;
