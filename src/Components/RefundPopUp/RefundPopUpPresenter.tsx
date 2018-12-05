import React from "react";
import Dropdown from "react-dropdown";
import styled from "../../typed-components";
import Form from "../Form";
import Input from "../Input";
import { bankDropDownOptions } from "../shareOptions";
import SmallButton from "../SmallButton";

interface IProps {
  closeFunc: any;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  refundBank?: string;
  refundHolder?: string;
  refundAccount?: string;
  refundAmount: number;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onOptionChange: (arg: any) => void;
  onBankClick: () => void;
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
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const ExtendInput = styled(Input)`
  padding-top: 18px;
  padding-bottom: 6px;
  font-size: 12px;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const InputTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 12px;
  margin-bottom: 5px;
  margin-top: 10px;
  justify-content: center;
`;

const DropdonwContainer = styled.div`
  width: 80%;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const Button = styled(SmallButton)``;
const CancelBankBtn = styled(Button)`
  background-color: ${props => props.theme.orangeColor};
  padding: 2px 0;
  font-size: 12px;
  width: 80px;
  margin-top: 3px;
`;

const RefundPopUpPresenter: React.SFC<IProps> = ({
  closeFunc,
  onSubmit,
  refundBank,
  refundHolder,
  refundAccount,
  refundAmount,
  onInputChange,
  onOptionChange,
  onBankClick
}) => {
  return (
    <Container>
      <HeadContainer />
      <BodyContainer>
        <FormContainer>
          <Form submitFn={onSubmit}>
            <ExtendInput
              placeholder={"환불금액을 입력해주세요"}
              value={refundAmount === 0 ? undefined : refundAmount}
              name={"refundAmount"}
              onChange={onInputChange}
              autoFocus={true}
            />

            <InputLabel>
              <InputTitle>은행을 선택해주세요 (가상계좌 환불시) </InputTitle>
              <DropdonwContainer>
                <Dropdown
                  options={bankDropDownOptions}
                  onChange={onOptionChange}
                  placeholder={"은행선택"}
                  value={refundBank}
                />
              </DropdonwContainer>
            </InputLabel>
            {refundBank ? (
              <CancelBankBtn value={"선택취소"} onClick={onBankClick} />
            ) : (
              ""
            )}
            <ExtendInput
              placeholder={"계좌번호를 입력해주세요(가상계좌 환불시)"}
              value={refundAccount}
              name={"refundAccount"}
              onChange={onInputChange}
              required={false}
            />
            <ExtendInput
              placeholder={"예금주를 입력해주세요(가상계좌 환불시)"}
              value={refundHolder}
              name={"refundHolder"}
              onChange={onInputChange}
              required={false}
            />
            <ButtonContainer>
              <Button value={"환불하기"} onClick={onSubmit} />
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
export default RefundPopUpPresenter;
