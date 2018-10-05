import axios from "axios";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import AddBranchPresenter from "./AddBranchPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  brnachName: string;
  branchNumber: number;
  postCode: string;
  address: string;
  detailAddress: string;
  branchComment: string;
  branchPhotos: [string];
  loungeImg: string;
  minimapIng: string;
  coBranchId: number;
  franchiserId: number;
  supervisorId: number;
  isMaleAvailable: boolean;
  isFemaleAvailable: boolean;
  isBoyAvailable: boolean;
  isGirlAvailAble: boolean;
  manMax: number;
  womanMax: number;
  branchPhotosUploading: boolean;
  loungeImgUploading: boolean;
  minimapImgUploading: boolean;
}

class AddBranchContainer extends React.Component<IProps, IState> {
  public render() {
    return <AddBranchPresenter onInputChange={this.onInputChange} />;
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
        "https://api.cloudinary.com/v1_1/djjpx4ror/image/upload",
        formData
      );
      if (secure_url) {
        if (name === "bracnhPhotos") {
          this.setState({
            branchPhotos: [...this.state.branchPhotos, secure_url],
            [`${name}Uploading`]: true
          } as any);
        } else {
          this.setState({
            [name]: secure_url,
            [`${name}Uploading`]: true
          } as any);
        }
      }
    } 

    this.setState({
      [name]: value
    } as any);
  };
}

export default AddBranchContainer;
