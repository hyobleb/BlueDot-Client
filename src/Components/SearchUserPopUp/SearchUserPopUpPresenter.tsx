import { ApolloError } from "apollo-boost";
import React from "react";
import styled from "../../typed-components";
import { searchUsers } from "../../types/api";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";

interface IProps {
  inputValue: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closFunc: any;
  data: searchUsers | undefined;

  error: ApolloError | undefined;
  loading: boolean;
  setSearchText: () => void;
  onUserClick: (id: number) => void;
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

const UserContainer = styled.div`
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

const ContextContainer = styled.div`
  margin: 10px;
  font-size: ${props => props.theme.smallFontSize};
`;
const ContextRow = styled.div`
  margin-bottom: 5px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const BranchSearchPopUpPresenter: React.SFC<IProps> = ({
  inputValue,
  closFunc,
  onInputChange,
  data,
  error,
  loading,
  setSearchText,
  onUserClick
}) => {
  return (
    <Container>
      <HeadContainer>
        <InputContainer>
          <ExtendForm submitFn={setSearchText}>
            <ExtendInput
              placeholder={"지점명 or 주소를 입력해주세요"}
              value={inputValue}
              name={"inputValue"}
              onChange={onInputChange}
              autoComplete={"username"}
            />
            <BranchSearchButton value="찾기" onClick={setSearchText} />
          </ExtendForm>
        </InputContainer>
      </HeadContainer>
      <BodyContainer>
        {data &&
          data &&
          data.ManagerSearchUsers &&
          data.ManagerSearchUsers.users &&
          data.ManagerSearchUsers.users.length > 0 &&
          data.ManagerSearchUsers.users.map(user => {
            return (
              user && (
                <UserContainer
                  key={user.id}
                  onClick={() => onUserClick(user.id)}
                >
                  <ContentsContainer>
                    <ContextContainer>
                      <ContextRow>{user.name}</ContextRow>
                      <ContextRow>{user.userId}</ContextRow>
                      <ContextRow>{user.gender}</ContextRow>
                      <ContextRow>{user.phoneNumber}</ContextRow>
                    </ContextContainer>
                  </ContentsContainer>
                </UserContainer>
              )
            );
          })}
      </BodyContainer>
      <CloseButton onClick={closFunc}>
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
