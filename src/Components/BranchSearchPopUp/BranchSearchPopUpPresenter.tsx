import { ApolloError } from "apollo-boost";
import React from "react";
import styled from "../../typed-components";
import {
  searchBranch,
  searchBranch_SearchBranch_branches
} from "../../types/api";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";

interface IProps {
  inputBranch: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeFunc: any;
  data: searchBranch | undefined;
  error: ApolloError | undefined;
  loading: boolean;
  setSearchText: () => void;
  onBranchClick: (branchData: searchBranch_SearchBranch_branches) => void;
}
const Container = styled.div`
  -webkit-box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 12px -4px rgba(0, 0, 0, 0.5);
  background-color: white;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 90%;
  height: 60%;
  z-index: 9;
  padding: 20px;
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
  font-size: 12px;
  margin-right: 10px;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BranchSearchButton = styled(Button)`
  width: 100px;
  min-width: 50px;
  max-width: 150px;
  background-color: ${props => props.theme.blueColor};
  color: white;
  text-transform: uppercase;
  padding: 3px 3px;
  font-size: 12px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  border-radius: 5%;
  margin-top: 0px;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
  }
`;

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
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.greyColor};
    color: white;
  }
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

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 5px;
  overflow: hidden;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const BranchSearchPopUpPresenter: React.SFC<IProps> = ({
  inputBranch,
  closeFunc,
  onInputChange,
  data,
  error,
  loading,
  setSearchText,
  onBranchClick
}) => {
  return (
    <Container>
      <HeadContainer>
        <InputContainer>
          <ExtendForm submitFn={setSearchText}>
            <ExtendInput
              placeholder={"지점명 or 주소를 입력해주세요"}
              value={inputBranch}
              name={"inputBranch"}
              onChange={onInputChange}
            />
            <BranchSearchButton
              value="찾기"
              type={"submit"}
              onClick={setSearchText}
            />
          </ExtendForm>
        </InputContainer>
      </HeadContainer>
      <BodyContainer>
        {data &&
          data.SearchBranch &&
          data.SearchBranch.branches &&
          data.SearchBranch.branches.length > 0 &&
          data.SearchBranch.branches.map(branch => {
            return (
              branch && (
                <BranchContainer
                  key={branch.id}
                  onClick={() => onBranchClick(branch)}
                >
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
                          )} 이용 가능`}
                      </ContextRow>
                    </ContextContainer>
                  </ContentsContainer>
                </BranchContainer>
              )
            );
          })}
      </BodyContainer>
      <CloseButton onClick={closeFunc}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z" />
        </svg>
      </CloseButton>
    </Container>
  );
};
export default BranchSearchPopUpPresenter;
