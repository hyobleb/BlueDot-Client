import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import styled from "../../typed-components";

interface IProps {
  allChecked: boolean;
  personalDataCheck: boolean;
  termsAndConditionsCheck: boolean;
  toggleAllCheck: () => void;
  togglePersonalDataCheck: () => void;
  toggleTermsAndConditionCheck: () => void;
  onConfirmClick: () => void;
}

const Container = styled.div`
  font-size: 13px;
`;
const Head = styled.div`
  display: flex;
`;
const Body = styled.div`
  margin-top: 3vh;
  margin-bottom: 4vh;
`;
const ContentRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 14px 0px;
`;
const LogoContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
`;
const LogoImg = styled.img`
  width: 140px;
  height: auto;
`;

const Content = styled.div`
  width: 90%;
  max-width: 600px;
`;

const SubRow = styled.div`
  margin: 5px 0px;
`;

const DetailContent = styled.div`
  height: 20vh;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  margin: 0px 10px;
  border: 2px solid ${props => props.theme.blueColor};
  border-radius: 5px;
`;

const ConfirmButton = styled(Button)`
  width: 90%;
  max-width: 414px;
`;

const Label = styled.label`
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.blueColor};
  }
`;

const Row = styled.div``;
const RowTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
`;
const RowCont = styled.div`
  margin-bottom: 30px;
`;
const RowContLine = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const SignUpPresenter: React.SFC<IProps> = ({
  personalDataCheck,
  termsAndConditionsCheck,
  toggleAllCheck,
  allChecked,
  toggleTermsAndConditionCheck,
  togglePersonalDataCheck,
  onConfirmClick
}) => (
  <Container>
    <Helmet>
      <title>SignUp | BlueDot</title>
    </Helmet>
    <Head>
      <LogoContainer>
        <Link to="/">
          <LogoImg src={require("src/images/logo.png")} />
        </Link>
      </LogoContainer>
    </Head>
    <Body>
      <ContentRow>
        <Content>
          <Label>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={toggleAllCheck}
            />
            이용약관, 개인정보 수집 및 이용에 모두 동의 합니다
          </Label>
        </Content>
      </ContentRow>
      <ContentRow>
        <Content>
          <SubRow>
            <Label>
              <input
                type="checkbox"
                checked={termsAndConditionsCheck}
                onChange={toggleTermsAndConditionCheck}
              />
              블루닷라운지 이용약관 동의(필수)
            </Label>
          </SubRow>
          <SubRow>
            <DetailContent>
              <Row>
                <RowTitle>
                  **제1조(목적)** 이 약관은 ㈜크리플레이(전자상거래 사업자)가
                  운영하는 블루닷라운지(이하 “몰”이라 한다)에서 제공하는 인터넷
                  관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과
                  이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
                </RowTitle>
                <RowCont>
                  ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에
                  반하지 않는 한 이 약관을 준용합니다.」
                </RowCont>
              </Row>
              <Row>
                <RowTitle>**제2조(정의)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”이란 ㈜크리플레이가 재화 또는 용역(이하 “재화 등”이라
                    함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를
                    이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을
                    말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도
                    사용합니다.
                  </RowContLine>
                  <RowContLine>
                    ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는
                    서비스를 받는 회원 및 비회원을 말합니다.
                  </RowContLine>
                  <RowContLine>
                    ③ ‘회원’이라 함은 “몰”에 회원등록을 한 자로서, 계속적으로
                    “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
                  </RowContLine>
                  <RowContLine>
                    ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는
                    서비스를 이용하는 자를 말합니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제3조 (약관 등의 명시와 설명 및 개정)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지
                    주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함),
                    전화번호․모사전송번호․전자우편주소, 사업자등록번호,
                    통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알
                    수 있도록 00 사이버몰의 초기 서비스화면(전면)에 게시합니다.
                    다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록
                    할 수 있습니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는
                    내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을
                    이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을
                    제공하여 이용자의 확인을 구하여야 합니다.
                  </RowContLine>
                  <RowContLine>
                    ③ “몰”은 「전자상거래 등에서의 소비자보호에 관한 법률」,
                    「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」,
                    「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및
                    정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」,
                    「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이
                    약관을 개정할 수 있습니다.
                  </RowContLine>
                  <RowContLine>
                    ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를
                    명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일
                    이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게
                    불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의
                    사전 유예기간을 두고 공지합니다. 이 경우 "몰“은 개정 전
                    내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록
                    표시합니다.
                  </RowContLine>
                  <RowContLine>
                    ⑤ “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자
                    이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된
                    계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만
                    이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를
                    원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “몰”에
                    송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이
                    적용됩니다.
                  </RowContLine>
                  <RowContLine>
                    ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
                    전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에
                    관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의
                    소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>**제4조(서비스의 제공 및 변경)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 다음과 같은 업무를 수행합니다.
                    <p>
                      1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
                      <br />
                      2. 구매계약이 체결된 재화 또는 용역의 배송
                      <br />
                      3. 기타 “몰”이 정하는 업무
                      <br />
                    </p>
                    <p>
                      ② “몰”은 재화 또는 용역의 품절 또는 기술적 사양의 변경
                      등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는
                      용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화
                      또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는
                      용역의 내용을 게시한 곳에 즉시 공지합니다.
                    </p>
                    <p>
                      ③ “몰”이 제공하기로 이용자와 계약을 체결한 서비스의 내용을
                      재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할
                      경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시
                      통지합니다.
                    </p>
                    <p>
                      ④ 전항의 경우 “몰”은 이로 인하여 이용자가 입은 손해를
                      배상합니다. 다만, “몰”이 고의 또는 과실이 없음을 입증하는
                      경우에는 그러하지 아니합니다.
                    </p>
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제5조(서비스의 중단)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 컴퓨터 등 정보통신설비의 보수점검․교체 및 고장,
                    통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을
                    일시적으로 중단할 수 있습니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”은 제1항의 사유로 서비스의 제공이 일시적으로
                    중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여
                    배상합니다. 단, “몰”이 고의 또는 과실이 없음을 입증하는
                    경우에는 그러하지 아니합니다.
                  </RowContLine>

                  <RowContLine>
                    ③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로
                    서비스를 제공할 수 없게 되는 경우에는 “몰”은 제8조에 정한
                    방법으로 이용자에게 통지하고 당초 “몰”에서 제시한 조건에
                    따라 소비자에게 보상합니다. 다만, “몰”이 보상기준 등을
                    고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금
                    등을 “몰”에서 통용되는 통화가치에 상응하는 현물 또는
                    현금으로 이용자에게 지급합니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제6조(회원가입)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① 이용자는 “몰”이 정한 가입 양식에 따라 회원정보를 기입한 후
                    이 약관에 동의한다는 의사표시를 함으로서 회원가입을
                    신청합니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중
                    다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                    <p>
                      1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에
                      회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한
                      회원자격 상실 후 3년이 경과한 자로서 “몰”의 회원재가입
                      승낙을 얻은 경우에는 예외로 한다.
                      <br />
                      2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
                      <br />
                      3. 기타 회원으로 등록하는 것이 “몰”의 기술상 현저히 지장이
                      있다고 판단되는 경우
                      <br />
                    </p>
                  </RowContLine>
                  <RowContLine>
                    ③ 회원가입계약의 성립 시기는 “몰”의 승낙이 회원에게 도달한
                    시점으로 합니다.
                  </RowContLine>

                  <RowContLine>
                    ④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한
                    기간 이내에 “몰”에 대하여 회원정보 수정 등의 방법으로 그
                    변경사항을 알려야 합니다.
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>**제7조(회원 탈퇴 및 자격 상실 등)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① 회원은 “몰”에 언제든지 탈퇴를 요청할 수 있으며 “몰”은 즉시
                    회원탈퇴를 처리합니다.
                  </RowContLine>
                  <RowContLine>
                    ② 회원이 다음 각 호의 사유에 해당하는 경우, “몰”은
                    회원자격을 제한 및 정지시킬 수 있습니다.
                    <p>
                      1. 가입 신청 시에 허위 내용을 등록한 경우
                      <br />
                      2. “몰”을 이용하여 구입한 재화 등의 대금, 기타 “몰”이용에
                      관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우
                      <br />
                      3. 다른 사람의 “몰” 이용을 방해하거나 그 정보를 도용하는
                      등 전자상거래 질서를 위협하는 경우
                      <br />
                      4. “몰”을 이용하여 법령 또는 이 약관이 금지하거나
                      공서양속에 반하는 행위를 하는 경우
                    </p>
                  </RowContLine>
                  <RowContLine>
                    ③ “몰”이 회원 자격을 제한․정지 시킨 후, 동일한 행위가 2회
                    이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우
                    “몰”은 회원자격을 상실시킬 수 있습니다.
                  </RowContLine>
                  <RowContLine>
                    ④ “몰”이 회원자격을 상실시키는 경우에는 회원등록을
                    말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소
                    전에 최소한 30일 이상의 기간을 정하여 소명할 기회를
                    부여합니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제8조(회원에 대한 통지)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”이 회원에 대한 통지를 하는 경우, 회원이 “몰”과 미리
                    약정하여 지정한 전자우편 주소로 할 수 있습니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”은 불특정다수 회원에 대한 통지의 경우 1주일이상 “몰”
                    게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만,
                    회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에
                    대하여는 개별통지를 합니다.
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>
                  **제9조(구매신청 및 개인정보 제공 동의 등)**
                </RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”이용자는 “몰”상에서 다음 또는 이와 유사한 방법에
                    의하여 구매를 신청하며, “몰”은 이용자가 구매신청을 함에
                    있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
                    <p>
                      1. 재화 등의 검색 및 선택
                      <br />
                      2. 받는 사람의 성명, 주소, 전화번호, 전자우편주소(또는
                      이동전화번호) 등의 입력
                      <br />
                      3. 약관내용, 청약철회권이 제한되는 서비스, 배송료․설치비
                      등의 비용부담과 관련한 내용에 대한 확인
                      <br />
                      4. 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는
                      표시(예, 마우스 클릭)
                      <br />
                      5. 재화등의 구매신청 및 이에 관한 확인 또는 “몰”의 확인에
                      대한 동의
                      <br />
                      6. 결제방법의 선택
                    </p>
                  </RowContLine>
                  <RowContLine>
                    ② “몰”이 제3자에게 구매자 개인정보를 제공할 필요가 있는 경우
                    1) 개인정보를 제공받는 자, 2)개인정보를 제공받는 자의
                    개인정보 이용목적, 3) 제공하는 개인정보의 항목, 4)
                    개인정보를 제공받는 자의 개인정보 보유 및 이용기간을
                    구매자에게 알리고 동의를 받아야 합니다. (동의를 받은 사항이
                    변경되는 경우에도 같습니다.)
                  </RowContLine>
                  <RowContLine>
                    ③ “몰”이 제3자에게 구매자의 개인정보를 취급할 수 있도록
                    업무를 위탁하는 경우에는 1) 개인정보 취급위탁을 받는 자, 2)
                    개인정보 취급위탁을 하는 업무의 내용을 구매자에게 알리고
                    동의를 받아야 합니다. (동의를 받은 사항이 변경되는 경우에도
                    같습니다.) 다만, 서비스제공에 관한 계약이행을 위해 필요하고
                    구매자의 편의증진과 관련된 경우에는 「정보통신망 이용촉진 및
                    정보보호 등에 관한 법률」에서 정하고 있는 방법으로 개인정보
                    취급방침을 통해 알림으로써 고지절차와 동의절차를 거치지
                    않아도 됩니다.
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>**제10조 (계약의 성립)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 제9조와 같은 구매신청에 대하여 다음 각 호에
                    해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을
                    체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자
                    본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을
                    고지하여야 합니다.
                    <p>
                      1. 신청 내용에 허위, 기재누락, 오기가 있는 경우
                      <br />
                      2. 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화
                      및 용역을 구매하는 경우
                      <br />
                      3. 기타 구매신청에 승낙하는 것이 “몰” 기술상 현저히 지장이
                      있다고 판단하는 경우
                      <br />
                    </p>
                  </RowContLine>
                  <RowContLine>
                    ② “몰”의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게
                    도달한 시점에 계약이 성립한 것으로 봅니다.
                  </RowContLine>
                  <RowContLine>
                    ③ “몰”의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인
                    및 판매가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을
                    포함하여야 합니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>
                  **제11조(지급방법)** “몰”에서 구매한 재화 또는 용역에 대한
                  대금지급방법은 다음 각 호의 방법중 가용한 방법으로 할 수
                  있습니다. 단, “몰”은 이용자의 지급방법에 대하여 재화 등의
                  대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.
                </RowTitle>
                <RowCont>
                  1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체
                  <br />
                  2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제
                  <br />
                  3. 온라인무통장입금
                  <br />
                  4. 전자화폐에 의한 결제
                  <br />
                  5. 수령 시 대금지급
                  <br />
                  6. 마일리지 등 “몰”이 지급한 포인트에 의한 결제
                  <br />
                  7. “몰”과 계약을 맺었거나 “몰”이 인정한 상품권에 의한 결제
                  <br />
                  8. 기타 전자적 지급 방법에 의한 대금 지급 등<br />
                </RowCont>
              </Row>

              <Row>
                <RowTitle>
                  **제12조(수신확인통지․구매신청 변경 및 취소)**
                </RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 이용자의 구매신청이 있는 경우 이용자에게
                    수신확인통지를 합니다.
                  </RowContLine>
                  <RowContLine>
                    ② 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는
                    경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를
                    요청할 수 있고 “몰”은 배송 전에 이용자의 요청이 있는
                    경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만
                    이미 대금을 지불한 경우에는 제15조의 청약철회 등에 관한
                    규정에 따릅니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제13조(재화 등의 공급)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 이용자와 재화 등의 공급시기에 관하여 별도의 약정이
                    없는 이상, 이용자가 청약을 한 날부터 7일 이내에 재화 등을
                    배송할 수 있도록 주문제작, 포장 등 기타의 필요한 조치를
                    취합니다. 다만, “몰”이 이미 재화 등의 대금의 전부 또는
                    일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터
                    3영업일 이내에 조치를 취합니다. 이때 “몰”은 이용자가 재화
                    등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를
                    합니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”은 이용자가 구매한 재화에 대해 배송수단, 수단별
                    배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약
                    “몰”이 약정 배송기간을 초과한 경우에는 그로 인한 이용자의
                    손해를 배상하여야 합니다. 다만 “몰”이 고의․과실이 없음을
                    입증한 경우에는 그러하지 아니합니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제14조(환급)**</RowTitle>
                <RowCont>
                  “몰”은 이용자가 구매신청한 재화 등이 품절 등의 사유로 인도
                  또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게
                  통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은
                  날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를
                  취합니다.
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제15조(청약철회 등)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”과 재화등의 구매에 관한 계약을 체결한 이용자는
                    「전자상거래 등에서의 소비자보호에 관한 법률」 제13조
                    제2항에 따른 계약내용에 관한 서면을 받은 날(그 서면을 받은
                    때보다 재화 등의 공급이 늦게 이루어진 경우에는 재화 등을
                    공급받거나 재화 등의 공급이 시작된 날을 말합니다)부터 7일
                    이내에는 청약의 철회를 할 수 있습니다. 다만, 청약철회에
                    관하여 「전자상거래 등에서의 소비자보호에 관한 법률」에 달리
                    정함이 있는 경우에는 동 법 규정에 따릅니다.
                  </RowContLine>
                  <RowContLine>
                    ② 이용자는 재화 등을 배송 받은 경우 다음 각 호의 1에
                    해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                    <p>
                      1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된
                      경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을
                      훼손한 경우에는 청약철회를 할 수 있습니다)
                      <br />
                      2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가
                      현저히 감소한 경우
                      <br />
                      3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의
                      가치가 현저히 감소한 경우
                      <br />
                      4. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그
                      원본인 재화 등의 포장을 훼손한 경우
                      <br />
                    </p>
                  </RowContLine>
                  <RowContLine>
                    ③ 제2항제2호 내지 제4호의 경우에 “몰”이 사전에 청약철회 등이
                    제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나
                    시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의
                    청약철회 등이 제한되지 않습니다.
                  </RowContLine>
                  <RowContLine>
                    ④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화 등의 내용이
                    표시·광고 내용과 다르거나 계약내용과 다르게 이행된 때에는
                    당해 재화 등을 공급받은 날부터 3월 이내, 그 사실을 안 날
                    또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수
                    있습니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제16조(청약철회 등의 효과)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에
                    이미 지급받은 재화 등의 대금을 환급합니다. 이 경우 “몰”이
                    이용자에게 재화등의 환급을 지연한때에는 그 지연기간에 대하여
                    「전자상거래 등에서의 소비자보호에 관한 법률
                    시행령」제21조의2에서 정하는 ****지연이자율을 곱하여 산정한
                    지연이자를 지급합니다.
                  </RowContLine>

                  <RowContLine>
                    ② “몰”은 위 대금을 환급함에 있어서 이용자가 신용카드 또는
                    전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는
                    지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의
                    대금의 청구를 정지 또는 취소하도록 요청합니다.
                  </RowContLine>
                  <RowContLine>
                    ③ 청약철회 등의 경우 공급받은 재화 등의 반환에 필요한 비용은
                    이용자가 부담합니다. “몰”은 이용자에게 청약철회 등을 이유로
                    위약금 또는 손해배상을 청구하지 않습니다. 다만 재화 등의
                    내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행되어
                    청약철회 등을 하는 경우 재화 등의 반환에 필요한 비용은
                    “몰”이 부담합니다.
                  </RowContLine>
                  <RowContLine>
                    ④ 이용자가 재화 등을 제공받을 때 발송비를 부담한 경우에
                    “몰”은 청약철회 시 그 비용을 누가 부담하는지를 이용자가 알기
                    쉽도록 명확하게 표시합니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제17조(개인정보보호)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 이용자의 개인정보 수집시 서비스제공을 위하여 필요한
                    범위에서 최소한의 개인정보를 수집합니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”은 회원가입시 구매계약이행에 필요한 정보를 미리
                    수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여
                    구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정
                    개인정보를 수집하는 경우에는 그러하지 아니합니다.
                  </RowContLine>
                  <RowContLine>
                    ③ “몰”은 이용자의 개인정보를 수집·이용하는 때에는 당해
                    이용자에게 그 목적을 고지하고 동의를 받습니다.
                  </RowContLine>
                  <RowContLine>
                    ④ “몰”은 수집된 개인정보를 목적외의 용도로 이용할 수 없으며,
                    새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는
                    경우에는 이용·제공단계에서 당해 이용자에게 그 목적을
                    고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는
                    경우에는 예외로 합니다.
                  </RowContLine>

                  <RowContLine>
                    ⑤ “몰”이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는
                    경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호,
                    기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한
                    정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의
                    내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」
                    제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며
                    이용자는 언제든지 이 동의를 철회할 수 있습니다.
                  </RowContLine>
                  <RowContLine>
                    ⑥ 이용자는 언제든지 “몰”이 가지고 있는 자신의 개인정보에
                    대해 열람 및 오류정정을 요구할 수 있으며 “몰”은 이에 대해
                    지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의
                    정정을 요구한 경우에는 “몰”은 그 오류를 정정할 때까지 당해
                    개인정보를 이용하지 않습니다.
                  </RowContLine>

                  <RowContLine>
                    ⑦ “몰”은 개인정보 보호를 위하여 이용자의 개인정보를 취급하는
                    자를 최소한으로 제한하여야 하며 신용카드, 은행계좌 등을
                    포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제3자
                    제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을
                    집니다.
                  </RowContLine>

                  <RowContLine>
                    ⑧ “몰” 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의
                    수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를
                    지체 없이 파기합니다.
                  </RowContLine>
                  <RowContLine>
                    ⑨ “몰”은 개인정보의 수집·이용·제공에 관한 동의 란을 미리
                    선택한 것으로 설정해두지 않습니다. 또한 개인정보의
                    수집·이용·제공에 관한 이용자의 동의거절시 제한되는 서비스를
                    구체적으로 명시하고, 필수수집항목이 아닌 개인정보의
                    수집·이용·제공에 관한 이용자의 동의 거절을 이유로 회원가입
                    등 서비스 제공을 제한하거나 거절하지 않습니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제18조(“몰“의 의무)**</RowTitle>

                <RowCont>
                  <RowContLine>
                    ① “몰”은 법령과 이 약관이 금지하거나 공서양속에 반하는
                    행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고,
                    안정적으로 재화․용역을 제공하는데 최선을 다하여야 합니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록
                    이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을
                    갖추어야 합니다.
                  </RowContLine>
                  <RowContLine>
                    ③ “몰”이 상품이나 용역에 대하여 「표시․광고의 공정화에 관한
                    법률」 제3조 소정의 부당한 표시․광고행위를 함으로써 이용자가
                    손해를 입은 때에는 이를 배상할 책임을 집니다.
                  </RowContLine>
                  <RowContLine>
                    ④ “몰”은 이용자가 원하지 않는 영리목적의 광고성 전자우편을
                    발송하지 않습니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>
                  **제19조(회원의 ID 및 비밀번호에 대한 의무)**
                </RowTitle>
                <RowCont>
                  ① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은
                  회원에게 있습니다. ② 회원은 자신의 ID 및 비밀번호를 제3자에게
                  이용하게 해서는 안됩니다. ③ 회원이 자신의 ID 및 비밀번호를
                  도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로
                  “몰”에 통보하고 “몰”의 안내가 있는 경우에는 그에 따라야
                  합니다.
                </RowCont>
              </Row>

              <Row>
                <RowTitle>
                  **제20조(이용자의 의무) 이용자는 다음 행위를 하여서는 안
                  됩니다.**
                </RowTitle>

                <RowCont>
                  <RowContLine>
                    1. 신청 또는 변경시 허위 내용의 등록
                  </RowContLine>
                  <RowContLine>2. 타인의 정보 도용</RowContLine>
                  <RowContLine>3. “몰”에 게시된 정보의 변경</RowContLine>
                  <RowContLine>3. “몰”에 게시된 정보의 변경</RowContLine>
                  <RowContLine>
                    4. “몰”이 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의
                    송신 또는 게시
                  </RowContLine>
                  <RowContLine>
                    5. “몰” 기타 제3자의 저작권 등 지적재산권에 대한 침해
                  </RowContLine>
                  <RowContLine>
                    6. “몰” 기타 제3자의 명예를 손상시키거나 업무를 방해하는
                    행위
                  </RowContLine>
                  <RowContLine>
                    7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에
                    반하는 정보를 몰에 공개 또는 게시하는 행위
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제21조(연결“몰”과 피연결“몰” 간의 관계)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① 상위 “몰”과 하위 “몰”이 하이퍼링크(예: 하이퍼링크의
                    대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된
                    경우, 전자를 연결 “몰”(웹 사이트)이라고 하고 후자를 피연결
                    “몰”(웹사이트)이라고 합니다.
                  </RowContLine>
                  <RowContLine>
                    ② 연결“몰”은 피연결“몰”이 독자적으로 제공하는 재화 등에
                    의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지
                    않는다는 뜻을 연결“몰”의 초기화면 또는 연결되는 시점의
                    팝업화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지
                    않습니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제22조(저작권의 귀속 및 이용제한)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰“이 작성한 저작물에 대한 저작권 기타 지적재산권은
                    ”몰“에 귀속합니다.
                  </RowContLine>
                  <RowContLine>
                    ② 이용자는 “몰”을 이용함으로써 얻은 정보 중 “몰”에게
                    지적재산권이 귀속된 정보를 “몰”의 사전 승낙 없이 복제, 송신,
                    출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나
                    제3자에게 이용하게 하여서는 안됩니다.
                  </RowContLine>

                  <RowContLine>
                    ③ “몰”은 약정에 따라 이용자에게 귀속된 저작권을 사용하는
                    경우 당해 이용자에게 통보하여야 합니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제23조(분쟁해결)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”은 이용자가 제기하는 정당한 의견이나 불만을 반영하고
                    그 피해를 보상처리하기 위하여 피해보상처리기구를
                    설치․운영합니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로
                    그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는
                    이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
                  </RowContLine>

                  <RowContLine>
                    ③ “몰”과 이용자 간에 발생한 전자상거래 분쟁과 관련하여
                    이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는
                    시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
                  </RowContLine>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>**제24조(재판권 및 준거법)**</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① “몰”과 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은
                    제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는
                    거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소
                    당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의
                    경우에는 민사소송법상의 관할법원에 제기합니다.
                  </RowContLine>
                  <RowContLine>
                    ② “몰”과 이용자 간에 제기된 전자상거래 소송에는 한국법을
                    적용합니다.
                  </RowContLine>
                </RowCont>
              </Row>
            </DetailContent>
          </SubRow>
        </Content>
      </ContentRow>
      <ContentRow>
        <Content>
          <SubRow>
            <Label>
              <input
                type="checkbox"
                checked={personalDataCheck}
                onChange={togglePersonalDataCheck}
              />
              블루닷라운지 개인정보 수집 및 이용 동의(필수)
            </Label>
          </SubRow>
          <SubRow>
            <DetailContent>
              <Row>
                <RowTitle>1. 개인정보의 처리 목적</RowTitle>
                <RowCont>
                  (주)크리플레이는 다음의 목적을 위하여 개인정보를 처리하고
                  있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다. - 고객
                  가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별․인증,
                  회원자격 유지․관리, 물품 또는 서비스 공급에 따른 금액 결제,
                  물품 또는 서비스의 공급․배송 등
                </RowCont>
              </Row>
              <Row>
                <RowTitle>2. 개인정보의 처리 및 보유기간</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① **(주)크리플레이는** 정보주체로부터 개인정보를 수집할 때
                    동의받은 개인정보 보유․이용기간 또는 법령에 따른 개인정보
                    보유․이용기간 내에서 개인정보를 처리․보유합니다.
                  </RowContLine>
                  <RowContLine>
                    ② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    <p>
                      - 고객 가입 및 관리 : 서비스 이용계약 또는 회원가입
                      해지시까지, 다만 채권․채무관계 잔존시에는 해당
                      채권․채무관계 정산시까지
                    </p>
                    <p>
                      - 전자상거래에서의 계약․청약철회, 대금결제, 재화 등
                      공급기록 : 5년
                    </p>
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>3. 개인정보의 제 3자 제공</RowTitle>
                <RowCont>
                  (주)크리플레이는 정보주체의 별도 동의, 법률의 특별한 규정 등
                  개인정보 보호법 제17조에 해당하는 경우 외에는 개인정보를
                  제3자에게 제공하지 않습니다.
                </RowCont>
              </Row>
              <Row>
                <RowTitle>
                  4. 정보주체와 법정대리인의 권리, 의무 및 행사방법
                </RowTitle>
                <RowCont>
                  정보주체는 (주) 크리플레이에 대해 언제든지 다음 각 호의
                  개인정보 보호 관련 권리를 행사할 수 있습니다.
                  <p>1. 개인정보 열람요구</p>
                  <p>2. 오류 등이 있을 경우 정정 요구</p>
                  <p>3. 삭제요구</p>
                  <p>4. 처리정지 요구</p>
                </RowCont>
              </Row>

              <Row>
                <RowTitle>5. 처리하는 개인정보 항목</RowTitle>
                <RowCont>
                  (주)크리플레이는 다음의 개인정보 항목을 처리하고 있습니다.
                  <p>
                    - 성명, 생년월일, 휴대전화번호, 성별, 이메일주소, 결제정보
                  </p>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>6. 개인정보의 파기</RowTitle>
                <RowCont>
                  <RowContLine>
                    ① (주)크리플레이는 개인정보 보유기간의 경과, 처리목적 달성
                    등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
                    개인정보를 파기합니다.
                  </RowContLine>
                  <RowContLine>
                    ② (주)크리플레이는 다음의 방법으로 개인정보를 파기합니다.
                    <p>- 전자적 파일 : 파일 삭제, 디스크 포맷</p>
                    <p>- 종이 문서 : 분쇄하거나 소각</p>
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>7. 개인정보의 안전성 확보조치</RowTitle>
                <RowCont>
                  (주)크리플레이는 개인정보의 안전성 확보를 위해 다음과 같은
                  조치를 취하고 있습니다. - 관리적 조치 : 내부관리계획
                  수립․시행, 직원․종업원 등에 대한 정기적 교육 - 기술적 조치 :
                  개인정보처리시스템(또는 개인정보가 저장된 컴퓨터)의 비밀번호
                  설정 등 접근권한 관리, 백신소프트웨어 등 보안프로그램 설치,
                  개인정보가 저장된 파일의 암호화 - 물리적 조치 : 개인정보가
                  저장․보관된 장소의 시건, 출입통제 등
                </RowCont>
              </Row>
              <Row>
                <RowTitle>
                  8. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항
                </RowTitle>
                <RowCont>
                  <RowContLine>
                    ① (주) 크리플레이은(는) 이용자에게 개별적인 맞춤서비스를
                    제공하기 위해 이용정보를 저장하고 수시로 불러오는
                    ‘쿠키(cookie)’를 사용합니다.
                  </RowContLine>
                  <RowContLine>
                    ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가
                    이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의
                    PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
                    <p>
                      가. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹
                      사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속
                      여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해
                      사용됩니다.
                    </p>
                    <p>
                      나. 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의
                      도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키
                      저장을 거부 할 수 있습니다.
                    </p>
                    <p>
                      다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이
                      발생할 수 있습니다.
                    </p>
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>9. 개인정보 보호책임자</RowTitle>
                <RowCont>
                  (주)크리플레이는 개인정보 처리에 관한 업무를 총괄해서
                  책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
                  피해구제를 처리하기 위하여 아래와 같이 개인정보 보호책임자를
                  지정하고 있습니다.
                  <RowContLine>
                    ▶ 개인정보 보호책임자 (사업주 또는 대표자) 성명 : 송병근
                    직책 : 대표 연락처 : 051-362-0537
                  </RowContLine>
                </RowCont>
              </Row>
              <Row>
                <RowTitle>10. 개인정보 처리방침 변경</RowTitle>
                <RowCont>
                  이 개인정보 처리방침은 2017. 3. 15부터 적용됩니다.
                </RowCont>
              </Row>
            </DetailContent>
          </SubRow>
        </Content>
      </ContentRow>
      <ContentRow>
        <ConfirmButton value="확인" onClick={onConfirmClick} />
      </ContentRow>
    </Body>
  </Container>
);

export default SignUpPresenter;
