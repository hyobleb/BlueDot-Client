import moment = require("moment");
import React from "react";
import Helmet from "react-helmet";
import { toast } from "react-toastify";
import BackArrow from "src/Components/BackArrow";
import Loading from "src/Components/Loading";
import { CreatePaymentMethodOption } from "src/Components/shareOptions";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { getRequestMemberships } from "src/types/api";

const BackContainer = styled.div``;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
const Section = styled.div``;

const HeadSection = styled(Section)`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const TitleContainer = styled.div`
  margin-bottom: 10px;
`;
const ButtonContainer = styled.div``;
const Button = styled(SmallButton)`
  margin: 3px;
  width: inherit;
  font-size: 11px;
  padding-left: 5px;
  padding-right: 5px;
`;
const EnrollMembershipButton = styled(Button)`
  background-color: ${props => props.theme.greyColor};
`;
const ExtendMembershipButton = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;

const ExtendCabinetButton = styled(Button)`
  background-color: ${props => props.theme.orangeColor};
`;
const EnrollCabinetButton = styled(Button)`
  background-color: ${props => props.theme.greenColor};
`;

const BodySection = styled(Section)``;
const ReqItem = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 20px;
`;
const ReqRow = styled.div`
  padding: 5px 0;
`;

const ReqDelRow = styled.div`
  margin: 15px 0;
  text-align: center;
`;

const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.redColor};
  margin-left: auto;
  margin-right: auto;
`;

const BottomSection = styled(Section)`
  text-align: center;
  margin-bottom: 20px;
`;
const PayButton = styled(Button)`
  width: 50%;
  max-width: 400px;
  min-width: 300px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  reqMembershipDatas?: getRequestMemberships;
  reqMembershipsLoading: boolean;
  deleteReqMembership: (id: number) => void;
  onEnrollReqMembershipClick: () => void;
  onExtendReqMembershipClick: () => Promise<void>;
  onEnrollCabinetClick: () => void;
  onExtendReqCabinetClick: () => void;
  onPaymentClick: (baseBranchId: number, payMethod: string) => Promise<void>;
  importLoad: boolean;
  jqueryLoad: boolean;
  kakaoLoad: boolean;
}

const BasketPresenter: React.SFC<IProps> = ({
  reqMembershipDatas,
  reqMembershipsLoading,
  deleteReqMembership,
  onEnrollReqMembershipClick,
  onExtendReqMembershipClick,
  onEnrollCabinetClick,
  onExtendReqCabinetClick,
  onPaymentClick,
  importLoad,
  jqueryLoad,
  kakaoLoad
}) =>
  reqMembershipsLoading || !importLoad || !jqueryLoad || !kakaoLoad ? (
    <Loading />
  ) : (
    <BackContainer>
      <Helmet>
        <title>Basket | BlueDot</title>
      </Helmet>
      <BackArrowExtended backTo="/" />
      <Container>
        <HeadSection>
          <TitleContainer>장바구니</TitleContainer>
          <ButtonContainer>
            <EnrollMembershipButton
              value={"멤버쉽 등록"}
              onClick={onEnrollReqMembershipClick}
            />
            <ExtendMembershipButton
              value={"멤버쉽 연장"}
              onClick={onExtendReqMembershipClick}
            />
            <ExtendCabinetButton
              value={"사물함 연장"}
              onClick={onExtendReqCabinetClick}
            />
            <EnrollCabinetButton
              value={"사물함 등록"}
              onClick={onEnrollCabinetClick}
            />
          </ButtonContainer>
        </HeadSection>
        <BodySection>
          {reqMembershipDatas &&
            reqMembershipDatas.UserGetRequest &&
            reqMembershipDatas.UserGetRequest.requestMemberships &&
            reqMembershipDatas.UserGetRequest.requestMemberships.map(
              reqMembership =>
                reqMembership && reqMembership.status === "REGIST" ? (
                  <ReqItem key={reqMembership.id}>
                    <ReqRow>
                      {reqMembership.branch.name}
                      {reqMembership.product.target === "MEMBERSHIP"
                        ? " 멤버쉽"
                        : reqMembership.product.target === "CABINET"
                        ? ` ${reqMembership.cabinet &&
                            reqMembership.cabinet.cabinetNumber}번 사물함`
                        : ""}
                    </ReqRow>
                    <ReqRow>
                      {reqMembership.product.hours}
                      시간 이용
                    </ReqRow>
                    <ReqRow>이용 시작 : {reqMembership.startDatetime}</ReqRow>
                    <ReqRow>
                      이용 만료 :{" "}
                      {moment(reqMembership.startDatetime!)
                        .add(reqMembership.product.hours, "h")
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </ReqRow>
                    <ReqRow>가격 : {reqMembership.product.amount}원</ReqRow>
                    <ReqDelRow>
                      <DeleteButton
                        value={"삭제"}
                        onClick={() => deleteReqMembership(reqMembership.id)}
                      />
                    </ReqDelRow>
                  </ReqItem>
                ) : reqMembership && reqMembership.status === "EXTENDED" ? (
                  <ReqItem key={reqMembership.id}>
                    <ReqRow>
                      {reqMembership.branch.name}
                      {reqMembership.product.target === "MEMBERSHIP"
                        ? " 멤버쉽 연장"
                        : reqMembership.product.target === "CABINET"
                        ? ` ${reqMembership.cabinet &&
                            reqMembership.cabinet.cabinetNumber}번 사물함 연장`
                        : ""}
                    </ReqRow>
                    <ReqRow>
                      {reqMembership.product.hours}
                      시간 연장
                    </ReqRow>
                    <ReqRow>
                      기존 멤버쉽 이용 시작 :{" "}
                      {reqMembership.exstingMembership &&
                        reqMembership.exstingMembership.startDatetime}
                    </ReqRow>
                    <ReqRow>
                      기종 멤버쉽 이용 만료 :{" "}
                      {reqMembership.exstingMembership &&
                        reqMembership.exstingMembership.endDatetime}
                    </ReqRow>
                    <ReqRow>
                      연장후 멤버쉽 이용 만료 :{" "}
                      {reqMembership.exstingMembership &&
                        moment(reqMembership.exstingMembership.endDatetime)
                          .add(reqMembership.product.hours, "h")
                          .format("YYYY-MM-DD HH:mm:ss")}
                    </ReqRow>

                    <ReqRow>가격 : {reqMembership.product.amount}원</ReqRow>
                    <ReqDelRow>
                      <DeleteButton
                        value={"삭제"}
                        onClick={() => deleteReqMembership(reqMembership.id)}
                      />
                    </ReqDelRow>
                  </ReqItem>
                ) : (
                  ""
                )
            )}
        </BodySection>
        <BottomSection>
          {reqMembershipDatas &&
          reqMembershipDatas.UserGetRequest &&
          reqMembershipDatas.UserGetRequest.requestMemberships &&
          reqMembershipDatas.UserGetRequest.requestMemberships.length === 0
            ? "현재 장바구니에 아무것도 담겨 있지 않습니다"
            : reqMembershipDatas &&
              reqMembershipDatas.UserGetRequest &&
              reqMembershipDatas.UserGetRequest.requestMemberships &&
              reqMembershipDatas.UserGetRequest.requestMemberships.length >
                0 && (
                <>
                  <PayButton
                    value={"카드 결제"}
                    onClick={() => {
                      const baseRequestMembership =
                        reqMembershipDatas.UserGetRequest.requestMemberships &&
                        reqMembershipDatas.UserGetRequest.requestMemberships
                          .length &&
                        reqMembershipDatas.UserGetRequest.requestMemberships[0];

                      if (baseRequestMembership) {
                        onPaymentClick(
                          baseRequestMembership.branch.id,
                          CreatePaymentMethodOption.CARD
                        );
                      } else {
                        toast.error("결제 모듈을 불러올 수 없습니다");
                      }
                    }}
                  />
                  <PayButton
                    value={"실시간 계좌이체"}
                    onClick={() => {
                      const baseRequestMembership =
                        reqMembershipDatas.UserGetRequest.requestMemberships &&
                        reqMembershipDatas.UserGetRequest.requestMemberships
                          .length &&
                        reqMembershipDatas.UserGetRequest.requestMemberships[0];

                      if (baseRequestMembership) {
                        onPaymentClick(
                          baseRequestMembership.branch.id,
                          CreatePaymentMethodOption.TRANS
                        );
                      } else {
                        toast.error("결제 모듈을 불러올 수 없습니다");
                      }
                    }}
                  />
                  {/* <PayButton
                    value={"가상계좌 이체"}
                    onClick={() => {
                      const baseRequestMembership =
                        reqMembershipDatas.UserGetRequest.requestMemberships &&
                        reqMembershipDatas.UserGetRequest.requestMemberships
                          .length &&
                        reqMembershipDatas.UserGetRequest.requestMemberships[0];

                      if (baseRequestMembership) {
                        onPaymentClick(
                          baseRequestMembership.branch.id,
                          CreatePaymentMethodOption.VBANK
                        );
                      } else {
                        toast.error("결제 모듈을 불러올 수 없습니다");
                      }
                    }}
                  /> */}

                  {/* <PayButton
                    value={"휴대폰 소액결제"}
                    onClick={() => {
                      const baseRequestMembership =
                        reqMembershipDatas.UserGetRequest.requestMemberships &&
                        reqMembershipDatas.UserGetRequest.requestMemberships
                          .length &&
                        reqMembershipDatas.UserGetRequest.requestMemberships[0];

                      if (baseRequestMembership) {
                        onPaymentClick(
                          baseRequestMembership.branch.id,
                          CreatePaymentMethodOption.PHONE
                        );
                      } else {
                        toast.error("결제 모듈을 불러올 수 없습니다");
                      }
                    }}
                  /> */}
                </>
              )}
        </BottomSection>
      </Container>
    </BackContainer>
  );
export default BasketPresenter;
