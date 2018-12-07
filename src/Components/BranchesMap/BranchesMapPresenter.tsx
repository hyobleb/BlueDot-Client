import React from "react";
import styled from "src/typed-components";
import { userGetBranches_UserGetBranches_branches } from "src/types/api";
import BranchSearchBar from "../BranchSearchBar/BranchSearchBar";
import Loading from "../Loading";
import SmallButton from "../SmallButton";

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Button = styled(SmallButton)`
  position: absolute;
  background-color: ${props => props.theme.blueColor};
  border-radius: 5px;
  -webkit-appearance: none;
  z-index: 2;
  width: 50%;
  border: 0;
  font-size: 16px;
  padding: 15px 10px;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  margin: auto;
  bottom: 10px;
  left: 0;
  right: 0;
  height: auto;
`;

const ExtendedBtn = styled(Button)`
  max-width: 200px;
`;

interface IProps {
  mapRef: any;
  branchName: string;
  onInputBlur: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userGetBranchesLoading: boolean;
  closestBranch?: userGetBranches_UserGetBranches_branches;
  onBranchClick: (branchId: number) => void;
}

class BranchesMapPresenter extends React.Component<IProps> {
  public render() {
    const {
      mapRef,
      branchName,
      onInputChange,
      onInputBlur,
      userGetBranchesLoading,
      closestBranch,
      onBranchClick
    } = this.props;
    return userGetBranchesLoading ? (
      <Loading />
    ) : (
      <div>
        <BranchSearchBar
          onBlur={onInputBlur}
          onChange={onInputChange}
          name={"branchName"}
          value={branchName}
        />
        <Map innerRef={mapRef} />
        {closestBranch ? (
          <ExtendedBtn
            value={`${closestBranch.name}으로 이동`}
            onClick={() => onBranchClick(closestBranch.id)}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default BranchesMapPresenter;
