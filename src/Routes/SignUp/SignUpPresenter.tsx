import React from "react";
import Helmet from "react-helmet";
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
const Row = styled.div`
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
  width: 100px;
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
  width: 100%;
  max-width: 414px;
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
        <LogoImg src={require("src/images/logo.png")} />
      </LogoContainer>
    </Head>
    <Body>
      <Row>
        <Content>
          <input
            type="checkbox"
            defaultChecked={false}
            checked={allChecked}
            onClick={toggleAllCheck}
          />{" "}
          이용약관, 개인정보 수집 및 이용에 모두 동의 합니다
        </Content>
      </Row>
      <Row>
        <Content>
          <SubRow>
            <input
              type="checkbox"
              defaultChecked={false}
              checked={termsAndConditionsCheck}
              onClick={toggleTermsAndConditionCheck}
            />{" "}
            블루닷라운지 이용약관 동의(필수)
          </SubRow>
          <SubRow>
            <DetailContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              ullam ipsam, atque itaque harum iusto consequuntur aspernatur
              error omnis molestias, ex eveniet molestiae illum a quasi earum
              iste minus. Cum? At tempora quas animi temporibus veritatis
              architecto rem unde nobis asperiores? Expedita maxime odit unde
              dolor iste mollitia ratione. Officia consectetur natus dignissimos
              tenetur asperiores sint enim amet accusamus! Aliquam. Eveniet ea
              quos aliquam rerum ab magni necessitatibus vel adipisci, placeat
              quisquam odio amet! Quam possimus minus rerum officiis ipsum
              deleniti minima veritatis error in iure! Nihil repudiandae numquam
              quas? Minus vel, unde voluptatibus fugit magni assumenda tempore
              quam optio numquam! Quasi vel dolores ut iusto adipisci dolorum.
              Voluptatibus dolore cupiditate adipisci atque eveniet illo
              exercitationem dolor saepe optio qui! Nesciunt eveniet eaque iure!
              Tempora, cupiditate tenetur? Tempora voluptatum explicabo, beatae
              minima fuga labore fugit, distinctio doloribus ullam ea veritatis
              aperiam. Libero reprehenderit ullam deserunt voluptatibus, magnam
              adipisci iure accusantium. Recusandae enim, exercitationem
              molestias, animi perferendis sunt necessitatibus ratione
              blanditiis, quia cupiditate nemo nam illo? Nesciunt facilis, porro
              dolore assumenda error eos quae autem odit in voluptatem magnam
              illo commodi? Sapiente et at nisi magni maiores itaque accusantium
              numquam odit dolorem iusto ex, minima nobis corporis nemo
              assumenda dolores ducimus omnis consequatur unde veniam nostrum
              fuga aut eaque mollitia? Quod. Molestias facere consectetur ea
              veniam incidunt, iure id? Ut vel corporis error. Velit dicta magni
              incidunt facere aliquid dolor at deserunt voluptate sapiente
              aspernatur, deleniti est iste tenetur commodi illo! Ab laudantium,
              iure facilis porro omnis cumque similique aperiam saepe est quos,
              voluptatum voluptatem quae! Sed laborum, molestiae aliquam dolor
              dolorem facere, voluptatem vel odit excepturi reiciendis
              laudantium beatae commodi? Illo magnam porro aliquid eius facilis
              esse tempora consectetur quibusdam quisquam fugiat. Ipsam iusto
              rem esse, iste quam, aperiam asperiores, incidunt animi labore
              error ut optio cupiditate quae dolorem. Minima.
            </DetailContent>
          </SubRow>
        </Content>
      </Row>
      <Row>
        <Content>
          <SubRow>
            <input
              type="checkbox"
              defaultChecked={false}
              checked={personalDataCheck}
              onClick={togglePersonalDataCheck}
            />{" "}
            블루닷라운지 개인정보 수집 및 이용 동의(필수)
          </SubRow>
          <SubRow>
            <DetailContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              ullam ipsam, atque itaque harum iusto consequuntur aspernatur
              error omnis molestias, ex eveniet molestiae illum a quasi earum
              iste minus. Cum? At tempora quas animi temporibus veritatis
              architecto rem unde nobis asperiores? Expedita maxime odit unde
              dolor iste mollitia ratione. Officia consectetur natus dignissimos
              tenetur asperiores sint enim amet accusamus! Aliquam. Eveniet ea
              quos aliquam rerum ab magni necessitatibus vel adipisci, placeat
              quisquam odio amet! Quam possimus minus rerum officiis ipsum
              deleniti minima veritatis error in iure! Nihil repudiandae numquam
              quas? Minus vel, unde voluptatibus fugit magni assumenda tempore
              quam optio numquam! Quasi vel dolores ut iusto adipisci dolorum.
              Voluptatibus dolore cupiditate adipisci atque eveniet illo
              exercitationem dolor saepe optio qui! Nesciunt eveniet eaque iure!
              Tempora, cupiditate tenetur? Tempora voluptatum explicabo, beatae
              minima fuga labore fugit, distinctio doloribus ullam ea veritatis
              aperiam. Libero reprehenderit ullam deserunt voluptatibus, magnam
              adipisci iure accusantium. Recusandae enim, exercitationem
              molestias, animi perferendis sunt necessitatibus ratione
              blanditiis, quia cupiditate nemo nam illo? Nesciunt facilis, porro
              dolore assumenda error eos quae autem odit in voluptatem magnam
              illo commodi? Sapiente et at nisi magni maiores itaque accusantium
              numquam odit dolorem iusto ex, minima nobis corporis nemo
              assumenda dolores ducimus omnis consequatur unde veniam nostrum
              fuga aut eaque mollitia? Quod. Molestias facere consectetur ea
              veniam incidunt, iure id? Ut vel corporis error. Velit dicta magni
              incidunt facere aliquid dolor at deserunt voluptate sapiente
              aspernatur, deleniti est iste tenetur commodi illo! Ab laudantium,
              iure facilis porro omnis cumque similique aperiam saepe est quos,
              voluptatum voluptatem quae! Sed laborum, molestiae aliquam dolor
              dolorem facere, voluptatem vel odit excepturi reiciendis
              laudantium beatae commodi? Illo magnam porro aliquid eius facilis
              esse tempora consectetur quibusdam quisquam fugiat. Ipsam iusto
              rem esse, iste quam, aperiam asperiores, incidunt animi labore
              error ut optio cupiditate quae dolorem. Minima.
            </DetailContent>
          </SubRow>
        </Content>
      </Row>
      <Row>
        <ConfirmButton value="확인" onClick={onConfirmClick} />
      </Row>
    </Body>
  </Container>
);

export default SignUpPresenter;
