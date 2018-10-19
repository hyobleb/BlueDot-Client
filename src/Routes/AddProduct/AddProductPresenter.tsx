import React from "react";
import Dropdown from "react-dropdown";
import Helmet from "react-helmet";
import Switch from "react-toggle-switch";
import BackArrow from "src/Components/BackArrow";
import Form from "src/Components/Form";
import Input from "src/Components/Input";
import { productTypeDropDownOptions } from "src/Components/shareOptions";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

const BackContainer = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
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

const SwitchBox = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SwitchRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwitchItem = styled.div``;

const SwitchTitle = styled.div`
  margin: 5px;
  flex-basis: 130px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(SmallButton)`
  margin: 10px;
`;

const SubmitButton = styled(Button)`
  background-color: ${props => props.theme.blueColor};
`;
const CancleButton = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;

const DropdonwContainer = styled.div`
  width: 80%;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  productTitle: string;
  price: number;
  type: string;
  period: number;
  isSale: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionChange: (args: any) => void;
  toggleSwitch: (name: string) => void;
  onCancelClick: () => void;
}

const AddProductPresenter: React.SFC<IProps> = ({
  isSale,
  period,
  price,
  productTitle,
  type,
  onSubmit,
  onInputChange,
  onOptionChange,
  toggleSwitch,
  onCancelClick
}) => (
  <BackContainer>
    <Helmet>
      <title>Add-Product | BlueDot</title>
    </Helmet>
    <BackArrowExtended backTo="/" />
    <Container>
      <Form submitFn={onSubmit}>
        <Row>
          <InputLabel>
            <InputTitle>상품명 : </InputTitle>
            <InputExtended
              value={productTitle}
              onChange={onInputChange}
              name={"productTitle"}
            />
          </InputLabel>
        </Row>
        <Row>
          <InputLabel>
            <InputTitle>가격 : </InputTitle>
            <InputExtended
              value={price}
              onChange={onInputChange}
              name={"price"}
              type={"number"}
            />
          </InputLabel>
        </Row>

        <Row>
          <InputLabel>
            <InputTitle>상품 종류 : </InputTitle>
            <DropdonwContainer>
              <Dropdown
                options={productTypeDropDownOptions}
                onChange={onOptionChange}
                value={type}
              />
            </DropdonwContainer>
          </InputLabel>
        </Row>

        <Row>
          <InputLabel>
            <InputTitle>이용 시간 : </InputTitle>
            <InputExtended
              value={period}
              onChange={onInputChange}
              name={"period"}
              type={"number"}
              placeholder={"시간단위로 입력해주세요"}
            />
          </InputLabel>
        </Row>
        <Row>
          <SwitchBox>
            <SwitchRow>
              <SwitchTitle>이용 가능</SwitchTitle>
              <SwitchItem>
                <Switch onClick={() => toggleSwitch("isSale")} on={isSale}>
                  <i className="some-icon" />
                </Switch>
              </SwitchItem>
            </SwitchRow>
          </SwitchBox>
        </Row>

        <Row>
          <ButtonContainer>
            <SubmitButton value={"등록하기"} onClick={onSubmit} />
            <CancleButton value={"취소"} onClick={onCancelClick} />
          </ButtonContainer>
        </Row>
      </Form>
    </Container>
  </BackContainer>
);

export default AddProductPresenter;
