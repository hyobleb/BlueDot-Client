import React from "react";
import styled from "../../typed-components";
import Form from "../Form";
import Input from "../Input";
import SmallButton from "../SmallButton";

interface IProps {
  closeFunc: any;
  title: string;
  lockId?: number;
  cabinetNumber: number;
  lockNumber: number;
  lockPassword: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  createLockLoading: boolean;
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

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BodyContainer = styled.div`
  margin-top: 30px;
  height: 75vh;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const FormContainer = styled.div`
  max-width: 320px;
  min-width: 280px;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 100px;
  margin-left: 10px;
`;

const Button = styled(SmallButton)``;
const ConfirmButton = styled(Button)``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CabLockPopUpPresenter: React.SFC<IProps> = ({
  closeFunc,
  title,
  lockId,
  onInputChange,
  lockNumber,
  lockPassword,
  onSubmit,
  createLockLoading,
  cabinetNumber
}) => {
  return (
    <Container>
      <HeadContainer> {title} </HeadContainer>
      <BodyContainer>
        <FormContainer>
          <Form submitFn={onSubmit}>
            <Row>
              <InputLabel>
                <InputTitle>사물함 번호 : </InputTitle>
                <InputExtended
                  value={cabinetNumber}
                  onChange={onInputChange}
                  name={"cabinetNumber"}
                  type={"number"}
                />
              </InputLabel>
            </Row>
            <Row>
              <InputLabel>
                <InputTitle>자물쇠 번호 : </InputTitle>
                <InputExtended
                  value={lockNumber}
                  onChange={onInputChange}
                  name={"lockNumber"}
                  type={"number"}
                />
              </InputLabel>
            </Row>
            <Row>
              <InputLabel>
                <InputTitle>비밀 번호 : </InputTitle>
                <InputExtended
                  value={lockPassword}
                  onChange={onInputChange}
                  name={"lockPassword"}
                />
              </InputLabel>
            </Row>
            <ButtonContainer>
              {createLockLoading ? (
                <ConfirmButton value={"업데이트 중입니다"} />
              ) : (
                <ConfirmButton
                  value={lockId ? "수정" : "추가"}
                  onClick={onSubmit}
                />
              )}
            </ButtonContainer>
          </Form>
        </FormContainer>
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
export default CabLockPopUpPresenter;
