import moment from "moment";
import React from "react";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

const Back = styled(DefaultBack)``;
const Section = styled.section``;
const HeadButtonSection = styled(Section)`
  text-align: center;
`;
const Button = styled(SmallButton)`
  margin: 0 3px;
`;
const SelBranchBtn = styled(Button)`
  background-color: ${props => props.theme.greenColor};
`;
const AllBranchBtn = styled(Button)`
  background-color: ${props => props.theme.orangeColor};
`;

const ProcessingBtnCon = styled.div`
  text-align: center;
`;

const AcceptBtn = styled(Button)``;
const RejectBtn = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;

const BranchTitleSection = styled(Section)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
`;
const ContentSection = styled(Section)``;
const ReqsContainer = styled.div`
  border: 2px solid ${props => props.theme.greyColor};
  border-radius: 2px;
  padding: 10px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 400px;
`;
const ReqContainer = styled.div`
  border: 1px solid #dedede;
  padding: 10px;
  margin-bottom: 10px;
`;
const ReqElement = styled.div`
  padding: 5px 0;
  display: flex;
`;
const ReqElTitle = styled.div``;
const ReqElVal = styled.div``;
const BlankContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlankTitle = styled.div``;

interface IProps {
  requestSignUps?: any;
  requestSignUpsLoading: boolean;
  onAcceptReqSignUp: (reqSignUpId: number) => Promise<void>;
  onRejectReqSignUp: (reqSignUpId: number) => Promise<void>;
  branchName: string;
  onBackClick: () => void;
}

const ViewReqSignUpPresenter: React.SFC<IProps> = ({
  requestSignUps,
  requestSignUpsLoading,
  onAcceptReqSignUp,
  onRejectReqSignUp,
  branchName,
  onBackClick
}) => (
  <Back title={"view-req-sign-up"} backFn={onBackClick}>
    {requestSignUpsLoading ? (
      <Loading />
    ) : (
      <>
        <HeadButtonSection>
          <SelBranchBtn value={"지점 선택"} />
          <AllBranchBtn value={"전체"} />
        </HeadButtonSection>
        <BranchTitleSection>
          {branchName ? branchName : "전체지점"}
        </BranchTitleSection>
        <ContentSection>
          <ReqsContainer>
            {requestSignUps.length > 0 ? (
              requestSignUps.map(reqSignUp => (
                <ReqContainer key={reqSignUp.id}>
                  <ReqElement>
                    <ReqElTitle>신청시각 : </ReqElTitle>
                    <ReqElVal>
                      {moment(
                        new Date(reqSignUp.updatedAt).toUTCString()
                      ).format("YYYY-MM-DD HH:mm:ss")}
                    </ReqElVal>
                  </ReqElement>
                  <ReqElement>
                    <ReqElTitle>이름 : </ReqElTitle>
                    <ReqElVal> {reqSignUp.name}</ReqElVal>
                  </ReqElement>
                  <ReqElement>
                    <ReqElTitle>요청 아이디 : </ReqElTitle>
                    <ReqElVal> {reqSignUp.inputUserId}</ReqElVal>
                  </ReqElement>
                  <ReqElement>
                    <ReqElTitle>전화번호 : </ReqElTitle>
                    <ReqElVal> {reqSignUp.phoneNumber}</ReqElVal>
                  </ReqElement>
                  <ReqElement>
                    <ReqElTitle>생년월일 : </ReqElTitle>
                    <ReqElVal>
                      {moment()
                        .set("year", reqSignUp.birthYear)
                        .set("month", reqSignUp.birthMonth - 1)
                        .set("date", reqSignUp.birthDay)
                        .format("YYYY-MM-DD")}
                    </ReqElVal>
                  </ReqElement>
                  <ReqElement>
                    <ReqElTitle>이메일 : </ReqElTitle>
                    <ReqElVal> {reqSignUp.email}</ReqElVal>
                  </ReqElement>
                  <ReqElement>
                    <ReqElTitle>성별 : </ReqElTitle>
                    <ReqElVal>
                      {reqSignUp.gender === "MALE"
                        ? "남자"
                        : reqSignUp.gender === "FEMALE"
                        ? "여자"
                        : "성별이 입력되지 않았습니다"}
                    </ReqElVal>
                  </ReqElement>
                  <ReqElement>
                    <ReqElTitle>신청지점 : </ReqElTitle>
                    <ReqElVal> {reqSignUp.baseBranch.name}</ReqElVal>
                  </ReqElement>
                  <ProcessingBtnCon>
                    <AcceptBtn
                      value={"등록"}
                      onClick={() => onAcceptReqSignUp(reqSignUp.id)}
                    />
                    <RejectBtn
                      value={"삭제"}
                      onClick={() => onRejectReqSignUp(reqSignUp.id)}
                    />
                  </ProcessingBtnCon>
                </ReqContainer>
              ))
            ) : (
              <BlankContainer>
                <BlankTitle>현재 가입요청이 없습니다</BlankTitle>
              </BlankContainer>
            )}
          </ReqsContainer>
        </ContentSection>
      </>
    )}
  </Back>
);

export default ViewReqSignUpPresenter;
