import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_PROFILE } from "../../Components/sharedQueries";
import {
  updateProfile,
  updateProfileVariables,
  userProfile
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";
interface IState {
  email: string;
  password: string;
  profilePhoto: string;
}
interface IProps extends RouteComponentProps<any> {}
class UpdateProfileMutation extends Mutation<
  updateProfile,
  updateProfileVariables
> {}

class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    password: "",
    profilePhoto: ""
  };
  public render() {
    const { email, password, profilePhoto } = this.state;
    return (
      <ProfileQuery
        query={USER_PROFILE}
        fetchPolicy={"cache-and-network"}
        // cache-first : cache를 먼저 확인하고 동작하지 않으면 네트워크로 감
        // cache-only : 네트워크에 요청하지 않음
        // network-only : cache를 고려하지 않음
        // no-cahce : 네트워크를 통해 받아오지만 어디에도 저장하지 않음
        // cache-and-network로 설정함으로써 둘다 사용
        onCompleted={this.updateFields}
      >
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            onCompleted={data => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success("회원정보가 수정되었습니다");
              } else if (UpdateMyProfile.error) {
                toast.error(UpdateMyProfile.error);
              }
            }}
            variables={{
              email,
              password,
              profilePhoto
            }}
          >
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
                email={email}
                password={password}
                profilePhoto={profilePhoto}
                onInputChange={this.onInputChange}
                loading={loading}
                onSubmit={updateProfileFn}
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public updateFields = (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;

      if (user !== null) {
        const { email, profilePhoto } = user;
        this.setState({
          email,
          profilePhoto
        } as any);
      }
    }
  };
}
export default EditAccountContainer;
