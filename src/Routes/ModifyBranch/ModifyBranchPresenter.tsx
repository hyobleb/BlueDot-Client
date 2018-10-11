import "node_modules/react-toggle-switch/dist/css/switch.min.css";
import React from "react";
import { MutationFn } from "react-apollo";
import { AddressData } from "react-daum-postcode";
import Helmet from "react-helmet";
import Switch from "react-toggle-switch";
import BackArrow from "../../Components/BackArrow";
import BackContainer from "../../Components/BackContainer";
import Button from "../../Components/Button";
import DaumPostCodePopUp from "../../Components/DaumPostCodePopUp";
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
  width: 200px;
  margin-left: 10px;
`;

const SmallButtonExtended = styled(SmallButton)`
  align-self: flex-end;
`;

const SnapShotContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SwitchTitle = styled.div`
  margin: 5px;
  flex-basis: 130px;
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

const IpDisplayContainer = styled.div``;

const IpDisplay = styled.div`
  text-align: right;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const IpDeleteButton = styled(SmallButton)`
  background-color: ${props => props.theme.redColor};
  color: white;
`;

interface IProps {
  branchName: string;
  branchNumber: number | string;
  postCode: string;
  address: string;
  detailAddress: string;
  branchComment: string;
  branchPhotos: any;
  loungeImg: string;
  minimapImg: string;
  manMax: number | string;
  womanMax: number | string;
  branchPhotosUploading: boolean;
  loungeImgUploading: boolean;
  minimapImgUploading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddress: (data: AddressData) => void;
  showDaumPostApi: boolean;
  toggleShowDaumPostApi: () => void;
  descriptionPosition: string;
  directManage: boolean;
  subtractSnapshot: (e: any) => void;
  toggleSwitch: (event: any) => void;
  addBranchFn: MutationFn;
  impId: string;
  impKey: string;
  impSecret: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  ips: string[];
  tempIp: string;
  addIp: () => void;
  subtractIp: (targetIp: any) => void;
  isMaleAvailable: boolean;
  isFemaleAvailable: boolean;
  isGirlAvailable: boolean;
  isBoyAvailable: boolean;
}

const ModifyBranchPresenter: React.SFC<IProps> = ({
  onInputChange,
  branchName,
  branchNumber,
  postCode,
  address,
  detailAddress,
  branchComment,
  branchPhotos,
  loungeImg,
  minimapImg,
  manMax,
  womanMax,
  branchPhotosUploading,
  loungeImgUploading,
  minimapImgUploading,
  handleAddress,
  showDaumPostApi,
  toggleShowDaumPostApi,
  descriptionPosition,
  directManage,
  subtractSnapshot,
  toggleSwitch,
  addBranchFn,
  impId,
  impKey,
  impSecret,
  onSubmit,
  tempIp,
  addIp,
  ips,
  subtractIp,
  isMaleAvailable,
  isFemaleAvailable,
  isGirlAvailable,
  isBoyAvailable
}) => (
  <BackContainer>
    <Helmet>
      <title>Branch-Add | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/branch-setting" />
    <Form submitFn={onSubmit}>
      <Row>
        <InputLabel>
          <InputTitle>지점명 : </InputTitle>
          <InputExtended
            value={branchName}
            onChange={onInputChange}
            name={"branchName"}
          />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>지점 번호 : </InputTitle>
          <InputExtended
            value={branchNumber}
            onChange={onInputChange}
            name={"branchNumber"}
          />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>우편 번호 : </InputTitle>
          <InputExtended value={postCode} name={"postCode"} readonly={true} />
        </InputLabel>
        <SmallButtonExtended
          value={"우편번호 검색"}
          onClick={toggleShowDaumPostApi}
        />
        {showDaumPostApi && <DaumPostCodePopUp onConfirm={handleAddress} />}
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>주소 : </InputTitle>
          <InputExtended value={address} readonly={true} />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>상세 주소 : </InputTitle>
          <InputExtended
            value={detailAddress}
            onChange={onInputChange}
            name={"detailAddress"}
          />
        </InputLabel>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>위치 설명 : </InputTitle>
          <InputExtended
            value={descriptionPosition}
            onChange={onInputChange}
            name={"descriptionPosition"}
            placeholder={"ex. 화명 맥도날드 뒤쪽"}
          />
        </InputLabel>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>지점 설명 : </InputTitle>
          <InputExtended
            value={branchComment}
            onChange={onInputChange}
            name={"branchComment"}
          />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>지점 이미지 : </InputTitle>
          <PhotoInput
            uploading={branchPhotosUploading}
            onChange={onInputChange}
            dispalyText={"지점 이미지 올리기"}
            name={"branchPhotos"}
          />
        </InputLabel>

        <SnapShotContainer>
          {branchPhotos.map(branchPhoto => (
            <SnapShot
              onCloseClick={subtractSnapshot}
              url={branchPhoto}
              key={branchPhoto}
            />
          ))}
        </SnapShotContainer>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>라운지 이미지 : </InputTitle>
          <PhotoInput
            uploading={loungeImgUploading}
            onChange={onInputChange}
            dispalyText={"라운지 이미지 올리기"}
            name={"loungeImg"}
          />
        </InputLabel>

        <SnapShotContainer>
          {loungeImg && (
            <SnapShot onCloseClick={subtractSnapshot} url={loungeImg} />
          )}
        </SnapShotContainer>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>미니맵 이미지 : </InputTitle>
          <PhotoInput
            uploading={minimapImgUploading}
            onChange={onInputChange}
            dispalyText={"미니맵 이미지 올리기"}
            name={"minimapImg"}
          />
        </InputLabel>

        <SnapShotContainer>
          {minimapImg && (
            <SnapShot onCloseClick={subtractSnapshot} url={minimapImg} />
          )}
        </SnapShotContainer>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>남자 최대 수용: </InputTitle>
          <InputExtended
            value={manMax}
            name={"manMax"}
            onChange={onInputChange}
          />
        </InputLabel>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>여자 최대 수용 : </InputTitle>
          <InputExtended
            value={womanMax}
            name={"womanMax"}
            onChange={onInputChange}
          />
        </InputLabel>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>IP : </InputTitle>
          <InputExtended
            value={tempIp}
            name={"tempIp"}
            onChange={onInputChange}
            required={false}
          />
        </InputLabel>
        <SmallButtonExtended value={"IP 추가"} onClick={addIp} />
        <IpDisplayContainer>
          {ips.map(ip => (
            <IpDisplay key={ip}>
              {ip}{" "}
              {ip && (
                <IpDeleteButton value={"삭제"} onClick={() => subtractIp(ip)} />
              )}
            </IpDisplay>
          ))}
        </IpDisplayContainer>
      </Row>

      <Row>
        <InputLabel>
          <InputTitle>아임포트 가맹점 식별코드: </InputTitle>
          <InputExtended
            value={impId}
            name={"impId"}
            onChange={onInputChange}
            required={false}
          />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>아임포트 API 키 : </InputTitle>
          <InputExtended
            value={impKey}
            name={"impKey"}
            onChange={onInputChange}
            required={false}
          />
        </InputLabel>
      </Row>
      <Row>
        <InputLabel>
          <InputTitle>아임포트 API secret : </InputTitle>
          <InputExtended
            value={impSecret}
            name={"impSecret"}
            onChange={onInputChange}
            required={false}
          />
        </InputLabel>
      </Row>

      <Row>
        <SwitchBox>
          <SwitchRow>
            <SwitchTitle>직영매장</SwitchTitle>
            <SwitchItem>
              <Switch
                onClick={() => toggleSwitch("directManage")}
                on={directManage}
              >
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>
          <SwitchRow>
            <SwitchTitle>남자 성인 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch
                onClick={() => toggleSwitch("isMaleAvailable")}
                on={isMaleAvailable}
              >
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>

          <SwitchRow>
            <SwitchTitle>여자 성인 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch
                onClick={() => toggleSwitch("isFemaleAvailable")}
                on={isFemaleAvailable}
              >
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>

          <SwitchRow>
            <SwitchTitle>남자 청소년 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch
                onClick={() => toggleSwitch("isBoyAvailable")}
                on={isBoyAvailable}
              >
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>

          <SwitchRow>
            <SwitchTitle>여자 청소년 등록 가능</SwitchTitle>
            <SwitchItem>
              <Switch
                onClick={() => toggleSwitch("isGirlAvailable")}
                on={isGirlAvailable}
              >
                <i className="some-icon" />
              </Switch>
            </SwitchItem>
          </SwitchRow>
        </SwitchBox>
      </Row>
      <Row>
        <Button value={"등록하기"} onClick={onSubmit} />
      </Row>
    </Form>
  </BackContainer>
);

export default ModifyBranchPresenter;
