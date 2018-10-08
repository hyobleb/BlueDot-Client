import axios from "axios";
import React from "react";
import { Mutation } from "react-apollo";
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
  isMaleAvailable: boolean;
  isFemaleAvailable: boolean;
  isBoyAvailable: boolean;
  isGirlAvailable: boolean;
  manMax: number | string;
  womanMax: number | string;
  branchPhotosUploading: boolean;
  loungeImgUploading: boolean;
  minimapImgUploading: boolean;
  showDaumPostApi: boolean;
  directManage: boolean;
  inputBranch: string;
}

class AddBranchContainer extends React.Component<IProps, IState> {
  public state = {
    address: "",
    branchComment: "",
    branchName: "",
    branchNumber: 0,
    branchPhotos: new Array(),
    branchPhotosUploading: false,
    descriptionPosition: "",
    detailAddress: "",
    directManage: false,
    inputBranch: "",
    isBoyAvailable: true,
    isFemaleAvailable: true,
    isGirlAvailable: true,
    isMaleAvailable: true,
    loungeImg: "",
    loungeImgUploading: false,
    manMax: 80,
    minimapImg: "",
    minimapImgUploading: false,
    postCode: "",
    showDaumPostApi: false,
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
      isMaleAvailable,
      isFemaleAvailable,
      isBoyAvailable,
      isGirlAvailable,
      manMax,
      womanMax,
      branchPhotosUploading,
      loungeImgUploading,
      minimapImgUploading,
      showDaumPostApi,
      directManage
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
          descriptionPosition,
          detailAddress,
          directManage,
          isBoyAvailable,
          isFemaleAvailable,
          isGirlAvailable,
          isMaleAvailable,
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
        {(addBranchFn, { loading }) => (
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
            isMaleAvailable={isMaleAvailable}
            isFemaleAvailable={isFemaleAvailable}
            isBoyAvailable={isBoyAvailable}
            isGirlAvailable={isGirlAvailable}
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
          />
        )}
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
      case "isMaleAvailable":
        this.setState({
          ...this.state,
          [name]: !this.state.isMaleAvailable
        } as any);
        break;
      case "isFemaleAvailable":
        this.setState({
          ...this.state,
          [name]: !this.state.isFemaleAvailable
        } as any);
        break;
      case "isBoyAvailable":
        this.setState({
          ...this.state,
          [name]: !this.state.isBoyAvailable
        } as any);
        break;

      case "isGirlAvailable":
        this.setState({
          ...this.state,
          [name]: !this.state.isGirlAvailable
        } as any);
        break;

      default:
        break;
    }
  };
}

export default AddBranchContainer;
