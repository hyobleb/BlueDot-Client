import axios from "axios";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { AddressData } from "react-daum-postcode";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { addBranch, addBranchVariables } from "../../types/api";
import AddBranchPresenter from "./AddBranchPresenter";
import { ADD_BRANCH } from "./AddBranchQueries";

class AddBranchMutation extends Mutation<addBranch, addBranchVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branchName: string;
  branchNumber: number | null;
  postCode: string;
  address: string;
  detailAddress: string;
  branchComment: string;
  branchPhotos: any;
  descriptionPosition: string;
  loungeImg: string;
  minimapImg: string;
  manMax: number | string;
  womanMax: number | string;
  branchPhotosUploading: boolean;
  loungeImgUploading: boolean;
  minimapImgUploading: boolean;
  cabinetLoungeImg: string;
  cabinetLoungeImgLoading: boolean;
  showDaumPostApi: boolean;
  directManage: boolean;
  impId: string;
  impKey: string;
  impSecret: string;
  tempIp: string;
  ips: string[];
}

class AddBranchContainer extends React.Component<IProps, IState> {
  public addBranchMutationFn: MutationFn;
  public state = {
    address: "",
    branchComment: "",
    branchName: "",
    branchNumber: 0,
    branchPhotos: new Array(),
    branchPhotosUploading: false,
    cabinetLoungeImg: "",
    cabinetLoungeImgLoading: false,
    descriptionPosition: "",
    detailAddress: "",
    directManage: false,
    impId: "",
    impKey: "",
    impSecret: "",
    ips: [""],
    loungeImg: "",
    loungeImgUploading: false,
    manMax: 80,
    minimapImg: "",
    minimapImgUploading: false,
    postCode: "",
    showDaumPostApi: false,
    tempIp: "",
    womanMax: 80
  };

  public render() {
    const {
      branchName,
      branchNumber,
      postCode,
      address,
      descriptionPosition,
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
      showDaumPostApi,
      directManage,
      impId,
      impKey,
      impSecret,
      ips,
      tempIp,
      cabinetLoungeImg,
      cabinetLoungeImgLoading
    } = this.state;
    const { history } = this.props;
    return (
      <AddBranchMutation
        mutation={ADD_BRANCH}
        variables={{
          address,
          branchComment,
          branchName,
          branchNumber,
          branchPhotos,
          cabinetLoungeImg,
          descriptionPosition,
          detailAddress,
          directManage,
          ips,
          loungeImg,
          manMax,
          minimapImg,
          postCode,
          womanMax
        }}
        onCompleted={data => {
          const { HeadCreateBranch } = data;
          if (HeadCreateBranch.ok) {
            toast.success("지점을 추가했습니다!");
            setTimeout(() => {
              history.push({
                pathname: "/branch-setting",
                state: {
                  addBranchName: branchName
                }
              });
            }, 2000);
          } else {
            toast.error(HeadCreateBranch.error);
          }
        }}
      >
        {(addBranchFn, { loading }) => {
          this.addBranchMutationFn = addBranchFn;
          return (
            <AddBranchPresenter
              onInputChange={this.onInputChange}
              branchName={branchName}
              branchNumber={branchNumber}
              postCode={postCode}
              address={address}
              detailAddress={detailAddress}
              branchComment={branchComment}
              branchPhotos={branchPhotos}
              loungeImg={loungeImg}
              minimapImg={minimapImg}
              manMax={manMax}
              womanMax={womanMax}
              branchPhotosUploading={branchPhotosUploading}
              loungeImgUploading={loungeImgUploading}
              minimapImgUploading={minimapImgUploading}
              handleAddress={this.handleAddress}
              showDaumPostApi={showDaumPostApi}
              toggleShowDaumPostApi={this.toggleShowDaumPostApi}
              descriptionPosition={descriptionPosition}
              directManage={directManage}
              subtractSnapshot={this.subtractSnapshot}
              toggleSwitch={this.toggleSwitch}
              addBranchFn={addBranchFn}
              impId={impId}
              impKey={impKey}
              impSecret={impSecret}
              onSubmit={this.onSubmit}
              ips={ips}
              tempIp={tempIp}
              addIp={this.addIp}
              subtractIp={this.subtractIp}
              cabinetLoungeImgLoading={cabinetLoungeImgLoading}
              cabinetLoungeImg={cabinetLoungeImg}
            />
          );
        }}
      </AddBranchMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value, files }
    } = event;

    if (files) {
      this.setState({
        [`${name}Uploading`]: true
      } as any);
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "913659325659299");
      formData.append("upload_preset", "ob3ddvn5");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/drijcu8ak/image/upload/",
        formData
      );
      if (secure_url) {
        if (name === "branchPhotos") {
          this.setState({
            branchPhotos: [...this.state.branchPhotos, secure_url],
            [`${name}Uploading`]: false
          } as any);
        } else {
          this.setState({
            [name]: secure_url,
            [`${name}Uploading`]: false
          } as any);
        }
      }
    } else {
      this.setState({
        [name]: value
      } as any);
    }
  };

  public handleAddress = (data: AddressData): void => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    this.setState({
      ...this.state,
      address: fullAddress,
      postCode: data.zonecode
    });

    this.toggleShowDaumPostApi();
  };

  public toggleShowDaumPostApi = () => {
    this.setState({
      ...this.state,
      showDaumPostApi: !this.state.showDaumPostApi
    });
  };

  public subtractSnapshot = url => {
    // 해당 url에 해당하는 이미지 빼기
    const { branchPhotos, loungeImg, minimapImg } = this.state;
    if (loungeImg === url) {
      this.setState({
        ...this.state,
        loungeImg: ""
      });
    } else if (minimapImg === url) {
      this.setState({
        ...this.state,
        minimapImg: ""
      });
    } else {
      branchPhotos.splice(branchPhotos.indexOf(url), 1);
      this.setState({
        ...this.state,
        branchPhotos
      });
    }
  };

  public toggleSwitch = name => {
    switch (name) {
      case "directManage":
        this.setState({
          ...this.state,
          [name]: !this.state.directManage
        } as any);
        break;
      // case "isMaleAvailable":
      //   this.setState({
      //     ...this.state,
      //     [name]: !this.state.isMaleAvailable
      //   } as any);
      //   break;
      // case "isFemaleAvailable":
      //   this.setState({
      //     ...this.state,
      //     [name]: !this.state.isFemaleAvailable
      //   } as any);
      //   break;
      // case "isBoyAvailable":
      //   this.setState({
      //     ...this.state,
      //     [name]: !this.state.isBoyAvailable
      //   } as any);
      //   break;

      // case "isGirlAvailable":
      //   this.setState({
      //     ...this.state,
      //     [name]: !this.state.isGirlAvailable
      //   } as any);
      //   break;

      default:
        break;
    }
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const {
      branchName,
      branchNumber,
      loungeImg,
      minimapImg,
      manMax,
      womanMax
    } = this.state;

    if (!branchName) {
      toast.error("지점이름을 입력해주세요!");
    } else if (!branchNumber) {
      toast.error("지점 번호를 입력해주세요!");
    } else if (!loungeImg) {
      toast.error("열람실 이미지를 업로드 해주세요");
    } else if (!minimapImg) {
      toast.error("미니맵 이미지를 업로드해주세요");
    } else if (!manMax) {
      toast.error("남자 최대 수용인원수를 입력해주세요");
    } else if (!womanMax) {
      toast.error("여자 최대 수용인원수를 입력해주세요");
    } else {
      this.addBranchMutationFn();
    }
  };

  public addIp = () => {
    const { tempIp } = this.state;
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        tempIp
      )
    ) {
      if (tempIp) {
        const { ips } = this.state;
        if (ips.find(ip => ip === tempIp)) {
          toast.error("해당 아이피는 이미 존재합니다");
          return;
        }
        if (ips.length === 1 && ips[0] === "") {
          ips[0] = tempIp;
        } else {
          ips.push(tempIp);
        }
        this.setState({
          ...this.state,
          ips,
          tempIp: ""
        });
        return;
      }
    } else {
      toast.error("아이피가 제대로 입력되지 않았습니다");
    }
  };

  public subtractIp = targetIp => {
    const { ips } = this.state;

    const newIps = ips.filter(ip => ip !== targetIp);
    this.setState({
      ...this.state,
      ips: newIps
    });
  };
}

export default AddBranchContainer;
