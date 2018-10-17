import React from "react";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";

const BackContainer = styled.div``;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`;
const Section = styled.div``;
const HeadSection = styled(Section)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 20px;
  margin-right: 10px;
`;
const HeadTitleCol = styled.div``;
const HeadButtonCol = styled.div``;
const AddButton = styled(SmallButton)``;

interface IProps {
  onAddButtonClick: () => void;
}

const SettingProductPresenter: React.SFC<IProps> = ({ onAddButtonClick }) => (
  <BackContainer>
    <Container>
      <HeadSection>
        <HeadTitleCol>
          <Title>상품리스트</Title>
        </HeadTitleCol>
        <HeadButtonCol>
          <AddButton value={"추가"} onClick={onAddButtonClick} />
        </HeadButtonCol>
      </HeadSection>
    </Container>
  </BackContainer>
);

export default SettingProductPresenter;
