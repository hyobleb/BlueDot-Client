import moment, { Moment } from "moment";
import "moment/locale/ko";
import React from "react";
import Datetime from "react-datetime";
import Dropdown from "react-dropdown";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "src/Components/Button";
import Form from "src/Components/Form";
import Input from "src/Components/Input";
import { genderTypeOptions } from "src/Components/shareOptions";
import styled from "src/typed-components";
import BranchSearchPopUp from "../../Components/BranchSearchPopUp";

const BackContainer = styled.div``;
const Container = styled.div`
  width: 90%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
`;
const Section = styled.section``;
const HeadSection = styled(Section)`
  margin-bottom: 30px;
`;
const LogoContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  text-align: center;
`;

const SubTitleCol = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const FormSection = styled(Section)``;
const ExtendedForm = styled(Form)``;
const ExtendInput = styled(Input)`
  padding-top: 18px;
  padding-bottom: 6px;
`;

const LogoImg = styled.img`
  width: 140px;
  height: auto;
`;

const SelBranchButton = styled(Button)`
  padding: 5px;
  background-color: ${props => props.theme.greenColor};
  &:hover {
    background-color: ${props => props.theme.greyColor};
  }
`;

const SelBranchDisplay = styled.div`
  background-color: ${props => props.theme.greyColor};
  color: white;
  padding: 10px 0px;
  text-align: center;
  margin-top: 5px;
`;

const DatetimeTitle = styled.div`
  margin-bottom: 10px;
`;
const DatetimePicker = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const DatetimeSection = styled(Section)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const DatetimeExtended = styled(Datetime)`
  input {
    width: 100%;
    height: 35px;
    text-align: center;
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.blueColor};
      color: white;
    }
  }
  .rdtPicker {
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
`;

const DropdonwContainer = styled.div`
  margin-top: 30px;
  width: 100%;

  .control {
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.blueColor};
      color: white;
    }
  }
`;

const ConfirmButton = styled(Button)`
  &:hover {
    background-color: ${props => props.theme.greyColor};
  }
`;

// const BirthContainer = styled.div``;

interface IProps {
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  inputUserId: string;
  phoneNumber: string;
  email: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  password: string;
  name: string;
  gender: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  rePassword: string;
  showBranchSearch: boolean;
  toggleShowBranchSearch: () => void;
  baseBranchName: string;
  onBranchClick: (branchId: number) => Promise<void>;
  onDatetimeChange: (datetimeValue: Moment) => void;
  onOptionChange: (arg: any) => void;
  selGenderFirst: boolean;
}

const ReqSignUpPresenter: React.SFC<IProps> = ({
  onInputChange,
  birthDay,
  birthMonth,
  birthYear,
  email,
  gender,
  inputUserId,
  name,
  password,
  phoneNumber,
  onSubmit,
  rePassword,
  showBranchSearch,
  toggleShowBranchSearch,
  baseBranchName,
  onBranchClick,
  onDatetimeChange,
  onOptionChange,
  selGenderFirst
}) => (
  <BackContainer>
    <Helmet>
      <title>ReqSignUp | BlueDot</title>
    </Helmet>
    <Container>
      <HeadSection>
        <LogoContainer>
          <Link to="/">
            <LogoImg src={require("src/images/logo.png")} />
          </Link>
        </LogoContainer>
        <SubTitleCol>가성비 최고의 학습 공간을 경험해보세요!</SubTitleCol>
      </HeadSection>
      <FormSection>
        <ExtendedForm submitFn={onSubmit}>
          <DatetimeSection>
            <DatetimeTitle>생년월일을 선택해주세요</DatetimeTitle>
            <DatetimePicker>
              <DatetimeExtended
                value={moment()
                  .set("year", birthYear)
                  .set("month", birthMonth)
                  .set("date", birthDay)}
                dateFormat="YYYY MMMM Do"
                timeFormat={false}
                viewMode="years"
                onChange={onDatetimeChange}
                closeOnSelect={true}
              />
            </DatetimePicker>
          </DatetimeSection>
          <DropdonwContainer>
            <Dropdown
              options={genderTypeOptions}
              onChange={onOptionChange}
              value={selGenderFirst ? "" : gender}
              placeholder={"성별을 선택해주세요"}
              controlClassName={"control"}
            />
          </DropdonwContainer>
          <ExtendInput
            placeholder={"아이디"}
            value={inputUserId}
            name={"inputUserId"}
            onChange={onInputChange}
            type={"text"}
            maxlength={11}
            autoFocus={true}
          />
          <ExtendInput
            placeholder={"비밀번호"}
            value={password}
            name={"password"}
            onChange={onInputChange}
            type={"password"}
            maxlength={20}
            autoComplete={"current-password"}
          />
          <ExtendInput
            placeholder={"비밀번호 확인"}
            value={rePassword}
            name={"rePassword"}
            onChange={onInputChange}
            type={"password"}
            maxlength={20}
            autoComplete={"current-password"}
          />
          <ExtendInput
            placeholder={"이름"}
            value={name}
            name={"name"}
            onChange={onInputChange}
            type={"text"}
            maxlength={11}
          />
          <ExtendInput
            placeholder={"이메일"}
            value={email}
            name={"email"}
            onChange={onInputChange}
            type={"email"}
            maxlength={30}
            autoFocus={false}
          />
          <ExtendInput
            placeholder={"연락가능한 전화번호('-'없이 입력해주세요)"}
            value={phoneNumber}
            name={"phoneNumber"}
            onChange={onInputChange}
            type={"tel"}
            maxlength={11}
          />
          <SelBranchButton
            value={"지점선택"}
            onClick={toggleShowBranchSearch}
            type={"button"}
          />
          {baseBranchName ? (
            <SelBranchDisplay>
              {baseBranchName}을 선택하셨습니다
            </SelBranchDisplay>
          ) : (
            ""
          )}
        </ExtendedForm>

        <ConfirmButton
          value={"가입 신청하기"}
          type={"submit"}
          onClick={onSubmit}
        />
      </FormSection>
    </Container>
    {showBranchSearch ? (
      <BranchSearchPopUp
        closeFunc={toggleShowBranchSearch}
        onBranchClick={onBranchClick}
      />
    ) : (
      ""
    )}
  </BackContainer>
);

export default ReqSignUpPresenter;
