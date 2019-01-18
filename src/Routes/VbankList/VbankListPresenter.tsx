import moment from "moment";
import React from "react";
import DefaultBack from "../../Components/DefaultBack";
import Loading from "../../Components/Loading";
import styled from "../../typed-components";
import { getVbankPayments_GetVbankPayments_payments } from "../../types/api";

const Back = styled(DefaultBack)``;
const Segment = styled.div`
  border: 1px solid #dedede;
  border-radius: 10px;
  padding: 20px;
`;
const BigList = styled.div`
  border-bottom: 1px solid #dedede;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
`;
const List = styled.div`
  padding-bottom: 10px;
`;

const Item = styled.div`
  padding-bottom: 10px;
`;

const ResultItem = styled.div`
  color: ${props => props.theme.lightBlueColor};
  border: 2px solid ${props => props.theme.lightBlueColor};
  padding: 10px;
  border-radius: 3px;
`;

const Content = styled.div``;
const Title = styled.div`
  font-size: 20px;
`;

interface IProps {
  vbankPayments: getVbankPayments_GetVbankPayments_payments[];
  getVbankLoading: boolean;
}

const VbankListPresenter: React.SFC<IProps> = ({
  vbankPayments,
  getVbankLoading
}) =>
  getVbankLoading ? (
    <Loading />
  ) : (
    <Back backUrl={"/"} title={"vbank-list"}>
      {vbankPayments.length > 0 ? (
        <Segment>
          <List>
            {vbankPayments.map(vbankPayement => (
              <React.Fragment key={vbankPayement.id}>
                {vbankPayement &&
                  vbankPayement.requestMemberships &&
                  vbankPayement.requestMemberships.map(
                    requestMembership =>
                      requestMembership && (
                        <Item key={requestMembership.id}>
                          <BigList>
                            <Item>
                              <Content>
                                <Title>등록 지점</Title>
                                {requestMembership.branch.name}
                              </Content>
                            </Item>
                            <Item>
                              <Content>
                                <Title>등록 내용</Title>
                                {requestMembership.product.title}
                              </Content>
                            </Item>
                            <Item>
                              <Content>
                                <Title>이용 시작</Title>
                                {requestMembership.startDatetime}
                              </Content>
                            </Item>
                            <Item>
                              <Content>
                                <Title>이용 만료</Title>
                                {requestMembership.startDatetime &&
                                  moment(requestMembership.startDatetime)
                                    .add(requestMembership.product.hours, "h")
                                    .format("YYYY-MM-DD HH:mm:ss")}
                              </Content>
                            </Item>
                            <Item>
                              <Content>
                                <Title>가격</Title>
                                {requestMembership.product.amount}원
                              </Content>
                            </Item>
                          </BigList>
                        </Item>
                      )
                  )}

                <ResultItem>
                  <List>
                    <Item>
                      <Content>
                        <Title>전체가격</Title>
                        {vbankPayement.amount}원
                      </Content>
                    </Item>

                    <Item>
                      <Content>
                        <Title>계좌번호</Title>
                        {vbankPayement.vbankName} {vbankPayement.vbankNum}
                      </Content>
                    </Item>
                    <Item>
                      <Content>
                        <Title>입금기한</Title>
                        {vbankPayement.vbankDate &&
                          moment(
                            new Date(
                              parseInt(vbankPayement.vbankDate, 10) * 1000
                            ).toUTCString()
                          ).format("YYYY-MM-DD HH:mm:ss")}
                      </Content>
                    </Item>
                    <Item>
                      <Content>
                        <Title>주문처리 상태</Title>
                        입금대기
                      </Content>
                    </Item>
                    <Item>
                      <Content>입금 후 등록이 완료됩니다</Content>
                    </Item>
                  </List>
                </ResultItem>
              </React.Fragment>
            ))}
          </List>
        </Segment>
      ) : (
        ""
      )}
      {/* {vbankPayments.length > 0 ? (
        <Segment inverted={false}>
          <List divided={true} relaxed={true} size={"small"}>
            {vbankPayments.map(vbankPayement => (
              <React.Fragment key={vbankPayement.id}>
                {vbankPayement &&
                  vbankPayement.requestMemberships &&
                  vbankPayement.requestMemberships.map(
                    requestMembership =>
                      requestMembership && (
                        <List.Item key={requestMembership.id}>
                          <List.List>
                            <List.Item>
                              <List.Content>
                                <List.Header>등록 지점</List.Header>
                                {requestMembership.branch.name}
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>등록 내용</List.Header>
                                {requestMembership.product.title}
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>이용 시작</List.Header>
                                {requestMembership.startDatetime}
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>이용 만료</List.Header>
                                {requestMembership.startDatetime &&
                                  moment(requestMembership.startDatetime)
                                    .add(requestMembership.product.hours, "h")
                                    .format("YYYY-MM-DD HH:mm:ss")}
                              </List.Content>
                            </List.Item>
                            <List.Item>
                              <List.Content>
                                <List.Header>가격</List.Header>
                                {requestMembership.product.amount}원
                              </List.Content>
                            </List.Item>
                          </List.List>
                        </List.Item>
                      )
                  )}

                <List.Item>
                  <List
                    divided={true}
                    inverted={false}
                    relaxed={true}
                    size={"big"}
                  >
                    <List.Item>
                      <List.Content>
                        <List.Header>전체가격</List.Header>
                        {vbankPayement.amount}원
                      </List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Content>
                        <List.Header>계좌번호</List.Header>
                        {vbankPayement.vbankName} {vbankPayement.vbankNum}
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Header>입금기한</List.Header>
                        {vbankPayement.vbankDate &&
                          moment(
                            new Date(
                              parseInt(vbankPayement.vbankDate, 10) * 1000
                            ).toUTCString()
                          ).format("YYYY-MM-DD HH:mm:ss")}
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Header>주문처리 상태</List.Header>
                        입금대기
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>입금 후 처리 등록 완료됩니다</List.Content>
                    </List.Item>
                  </List>
                </List.Item>
              </React.Fragment>
            ))}
          </ListItem>
        </Segment> 
      ) : ( "" )}*/}
    </Back>
  );

export default VbankListPresenter;
