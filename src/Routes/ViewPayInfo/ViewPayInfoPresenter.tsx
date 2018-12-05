import moment from "moment";
import React, { Fragment } from "react";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import RefundPopUp from "src/Components/RefundPopUp";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import {
  getPaymentInfo_GetPayment_payment,
  getPaymentsByImpUid_GetPaymentByImpUid_payments
} from "src/types/api";
const Back = styled(DefaultBack)``;
const TotalContainer = styled.div``;
const Title = styled.div`
  text-align: center;
  font-size: 20px;
`;
const ContentContainer = styled.div`
  border-bottom: 1px solid #dedede;
  padding: 10px;
`;
const ContentStatus = styled<
  {
    status: string;
  },
  "div"
>("div")`
  background-color: ${props =>
    props.status === "REGIST"
      ? props.theme.blueColor
      : props.status === "EXTENDED"
      ? props.theme.greenColor
      : ""};
  color: white;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ContentValue = styled.div`
  padding: 5px 3px;
`;
const TotalResult = styled.div`
  padding: 10px;
`;
const ResultValue = styled.div`
  text-align: right;
  padding: 3px 0;
`;
const BtnContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const Button = styled(SmallButton)`
  background-color: ${props => props.theme.orangeColor};
  margin: 0 3px;
`;

const Refunded = styled.div`
  color: ${props => props.theme.redColor};
  text-align: center;
`;

interface IProps {
  onBackClick: () => void;
  getPaymentInfoLoading: boolean;
  payment?: getPaymentInfo_GetPayment_payment;
  toggleShowRefundPopUp: (paymentId?: number | undefined) => void;
  showRefundPopUp: boolean;
  paymentsByImpUid?: Array<getPaymentsByImpUid_GetPaymentByImpUid_payments | null>;
  selPaymentId?: number;
}

const ViewPayInfoPresenter: React.SFC<IProps> = ({
  onBackClick,
  getPaymentInfoLoading,
  payment,
  toggleShowRefundPopUp,
  showRefundPopUp,
  paymentsByImpUid,
  selPaymentId
}) => (
  <Back title={"view-pay"} backFn={onBackClick}>
    {getPaymentInfoLoading && <Loading />}
    {payment ? (
      <>
        <TotalContainer>
          <Title>결제 정보</Title>
          {payment.membershipLogs &&
            payment.membershipLogs.map(
              log =>
                log && (
                  <ContentContainer key={log.id}>
                    <ContentStatus status={log.status}>
                      {log.status === "REGIST"
                        ? "등록"
                        : log.status === "EXTENDED"
                        ? "연장"
                        : ""}
                    </ContentStatus>
                    <ContentValue>
                      등록일자 :{" "}
                      {moment(new Date(log.updatedAt).toUTCString()).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </ContentValue>
                    <ContentValue>등록지점 : {log.branch.name}</ContentValue>
                    <ContentValue>
                      등록내용 :{" "}
                      {log.target === "MEMBERSHIP"
                        ? "멤버쉽"
                        : log.target === "CABINET"
                        ? `${log.cabinet && log.cabinet.cabinetNumber}번 사물함`
                        : ""}{" "}
                      {log.hours % 24 === 0
                        ? `${log.hours / 24}일`
                        : `${log.hours}시간`}
                    </ContentValue>
                    <ContentValue>
                      이용시작 : {log.actualStartDatetime}
                    </ContentValue>
                    <ContentValue>이용만료 : {log.endDatetime}</ContentValue>
                  </ContentContainer>
                )
            )}

          <TotalResult>
            <ResultValue>전체 가격: {payment.amount}원</ResultValue>
            <ResultValue>
              결제 수단 :{" "}
              {payment.payMethod === "PHONE"
                ? "소액결제"
                : payment.payMethod === "CARD"
                ? "카드"
                : payment.payMethod === "VBANK"
                ? "가상계좌"
                : payment.payMethod === "TRANS"
                ? "실시간 계좌이체"
                : payment.payMethod === "CASH"
                ? "현금"
                : payment.payMethod === "FIELD_CARD"
                ? "현장 카드"
                : ""}
            </ResultValue>
          </TotalResult>
        </TotalContainer>
        <BtnContainer>
          {payment.refunded ? (
            <Refunded>환불처리된 결제 내역입니다.</Refunded>
          ) : (
            <>
              <Button value={"환불"} onClick={() => toggleShowRefundPopUp()} />
            </>
          )}
        </BtnContainer>
      </>
    ) : (
      ""
    )}

    {paymentsByImpUid &&
      paymentsByImpUid.length >= 2 &&
      paymentsByImpUid
        .filter(target => target && !target.refunded)
        .map(
          paymentByImpUid =>
            paymentByImpUid && (
              <Fragment key={paymentByImpUid.id}>
                <TotalContainer>
                  <Title>연관 결제 정보</Title>
                  {paymentByImpUid.membershipLogs &&
                    paymentByImpUid.membershipLogs.map(
                      log =>
                        log && (
                          <ContentContainer key={log.id}>
                            <ContentStatus status={log.status}>
                              {log.status === "REGIST"
                                ? "등록"
                                : log.status === "EXTENDED"
                                ? "연장"
                                : ""}
                            </ContentStatus>
                            <ContentValue>
                              등록일자 :{" "}
                              {moment(
                                new Date(log.updatedAt).toUTCString()
                              ).format("YYYY-MM-DD HH:mm:ss")}
                            </ContentValue>
                            <ContentValue>
                              등록지점 : {log.branch.name}
                            </ContentValue>
                            <ContentValue>
                              등록내용 :{" "}
                              {log.target === "MEMBERSHIP"
                                ? "멤버쉽"
                                : log.target === "CABINET"
                                ? `${log.cabinet &&
                                    log.cabinet.cabinetNumber}번 사물함`
                                : ""}{" "}
                              {log.hours % 24 === 0
                                ? `${log.hours / 24}일`
                                : `${log.hours}시간`}
                            </ContentValue>
                            <ContentValue>
                              이용시작 : {log.actualStartDatetime}
                            </ContentValue>
                            <ContentValue>
                              이용만료 : {log.endDatetime}
                            </ContentValue>
                          </ContentContainer>
                        )
                    )}

                  <TotalResult>
                    <ResultValue>
                      전체 가격: {paymentByImpUid.amount}원
                    </ResultValue>
                    <ResultValue>
                      결제 수단 :{" "}
                      {paymentByImpUid.payMethod === "PHONE"
                        ? "소액결제"
                        : paymentByImpUid.payMethod === "CARD"
                        ? "카드"
                        : paymentByImpUid.payMethod === "VBANK"
                        ? "가상계좌"
                        : paymentByImpUid.payMethod === "TRANS"
                        ? "실시간 계좌이체"
                        : paymentByImpUid.payMethod === "CASH"
                        ? "현금"
                        : paymentByImpUid.payMethod === "FIELD_CARD"
                        ? "현장 카드"
                        : ""}
                    </ResultValue>
                  </TotalResult>
                </TotalContainer>
                <BtnContainer>
                  {paymentByImpUid.refunded ? (
                    <Refunded>환불처리된 결제 내역입니다.</Refunded>
                  ) : (
                    <>
                      <Button
                        value={"환불"}
                        onClick={() =>
                          toggleShowRefundPopUp(paymentByImpUid.id)
                        }
                      />
                    </>
                  )}
                </BtnContainer>
              </Fragment>
            )
        )}
    {showRefundPopUp && payment && payment.impUid && (
      <RefundPopUp
        closeFunc={toggleShowRefundPopUp}
        paymentId={payment.id}
        selPaymentId={selPaymentId}
        impUid={payment.impUid}
      />
    )}
  </Back>
);

export default ViewPayInfoPresenter;
