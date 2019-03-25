import moment from "moment";
import React from "react";
import DefaultBack from "../../Components/DefaultBack";
import Loading from "../../Components/Loading";
import { CreatePaymentMethodOption } from "../../Components/shareOptions";
import SmallButton from "../../Components/SmallButton";
import SmallLoading from "../../Components/SmallLoading";
import styled from "../../typed-components";
import { getRequestMemberships_UserGetRequest_requestMemberships } from "../../types/api";

const Back = styled(DefaultBack)``;
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

const EmptyMsg = styled.div`
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

interface IProps {
  getReqMemsLoading: boolean;
  requestMemberships: Array<getRequestMemberships_UserGetRequest_requestMemberships | null> | null;
  onEnrollReqMembershipClick: () => void;
  delReqMemLoading: boolean;
  delReqMemItemId?: number;
  onDelReqMemClick: (id: number) => Promise<void>;
  onExtendReqMembershipClick: () => Promise<void>;
  onEnrollCabinetClick: () => void;
  onExtendCabinetClick: () => void;
  onPaymentClick: (payMethod: string) => Promise<void>;
  payProcessing: boolean;
}

const BasketV2Presenter: React.SFC<IProps> = ({
  getReqMemsLoading,
  requestMemberships,
  onEnrollReqMembershipClick,
  delReqMemLoading,
  delReqMemItemId,
  onDelReqMemClick,
  onExtendReqMembershipClick,
  onEnrollCabinetClick,
  onExtendCabinetClick,
  onPaymentClick,
  payProcessing
}) => (
  <Back title={"Bakset | BlueDot"} backUrl={"/"}>
    {payProcessing ? (
      <Loading />
    ) : (
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
              value={"사물함 등록"}
              onClick={onEnrollCabinetClick}
            />
            <EnrollCabinetButton
              value={"사물함 연장"}
              onClick={onExtendCabinetClick}
            />
          </ButtonContainer>
        </HeadSection>
        <BodySection>
          {getReqMemsLoading ? (
            <Loading />
          ) : requestMemberships && requestMemberships.length ? (
            requestMemberships.map(
              reqMem =>
                reqMem &&
                (reqMem.status === "REGIST" ? (
                  delReqMemLoading && delReqMemItemId === reqMem.id ? (
                    <SmallLoading key={reqMem.id} />
                  ) : (
                    <ReqItem key={reqMem.id}>
                      <ReqRow>
                        {reqMem.branch.name}
                        {reqMem.product.target === "MEMBERSHIP"
                          ? " 멤버쉽"
                          : reqMem.product.target === "CABINET"
                          ? ` ${reqMem.cabinet &&
                              reqMem.cabinet.cabinetNumber}번 사물함`
                          : ""}
                      </ReqRow>
                      <ReqRow>
                        {reqMem.product.hours}
                        시간 이용
                      </ReqRow>
                      <ReqRow>이용 시작 : {reqMem.startDatetime}</ReqRow>
                      <ReqRow>
                        {moment(reqMem.startDatetime!)
                          .add(reqMem.product.hours, "h")
                          .format("YYYY-MM-DD HH:mm:ss")}
                      </ReqRow>
                      <ReqRow>
                        이용 만료 :{" "}
                        {moment(reqMem.startDatetime!)
                          .add(reqMem.product.hours, "h")
                          .format("YYYY-MM-DD HH:mm:ss")}
                      </ReqRow>
                      <ReqRow>가격 : {reqMem.product.amount}원</ReqRow>
                      <ReqDelRow>
                        <DeleteButton
                          value={"삭제"}
                          onClick={() => onDelReqMemClick(reqMem.id)}
                        />
                      </ReqDelRow>
                    </ReqItem>
                  )
                ) : reqMem && reqMem.status === "EXTENDED" ? (
                  <ReqItem key={reqMem.id}>
                    <ReqRow>
                      {reqMem.branch.name}
                      {reqMem.product.target === "MEMBERSHIP"
                        ? " 멤버쉽 연장"
                        : reqMem.product.target === "CABINET"
                        ? ` ${reqMem.cabinet &&
                            reqMem.cabinet.cabinetNumber}번 사물함 연장`
                        : ""}
                    </ReqRow>
                    <ReqRow>
                      {reqMem.product.hours}
                      시간 연장
                    </ReqRow>
                    <ReqRow>
                      기존 멤버쉽 이용 시작 :{" "}
                      {reqMem.exstingMembership &&
                        reqMem.exstingMembership.startDatetime}
                    </ReqRow>
                    <ReqRow>
                      기종 멤버쉽 이용 만료 :{" "}
                      {reqMem.exstingMembership &&
                        reqMem.exstingMembership.endDatetime}
                    </ReqRow>
                    <ReqRow>
                      연장후 멤버쉽 이용 만료 :{" "}
                      {reqMem.exstingMembership &&
                        moment(reqMem.exstingMembership.endDatetime)
                          .add(reqMem.product.hours, "h")
                          .format("YYYY-MM-DD HH:mm:ss")}
                    </ReqRow>
                    <ReqRow>가격 : {reqMem.product.amount}원</ReqRow>
                    <ReqDelRow>
                      <DeleteButton
                        value={"삭제"}
                        onClick={() => onDelReqMemClick(reqMem.id)}
                      />
                    </ReqDelRow>
                  </ReqItem>
                ) : (
                  ""
                ))
            )
          ) : (
            <EmptyMsg>현재 장바구니에 아무것도 담겨 있지 않습니다</EmptyMsg>
          )}
        </BodySection>

        <BottomSection>
          {requestMemberships && requestMemberships.length > 0 && (
            <>
              <PayButton
                value={"카드 결제"}
                onClick={async () => {
                  await onPaymentClick(CreatePaymentMethodOption.CARD);
                }}
              />
              <PayButton
                value={"실시간 계좌이체"}
                onClick={async () => {
                  await onPaymentClick(CreatePaymentMethodOption.TRANS);
                }}
              />
            </>
          )}
        </BottomSection>
      </Container>
    )}
  </Back>
);

export default BasketV2Presenter;
