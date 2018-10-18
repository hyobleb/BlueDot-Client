import React from "react";
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import Loading from "src/Components/Loading";
import SmallButton from "src/Components/SmallButton";
import styled from "src/typed-components";
import { headGetBranch } from "src/types/api";
import AlertPopUp from "../../Components/AlertPopUp";

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

const BodySection = styled.div`
  margin-top: 20px;
`;
const ProductContainer = styled.div`
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
`;
const ProductItem = styled.div`
  border: 1px solid #dedede;
  padding: 25px;
  width: 80%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-bottom: 20px;
`;
const ProductRow = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
`;
const ProductRowTitle = styled.div`
  flex-basis: 120px;
`;
const ProductContent = styled.div``;
const ButtonContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
const Button = styled(SmallButton)`
  margin: 3px;
`;
const ModifyButton = styled(Button)`
  background-color: ${props => props.theme.lightBlueColor};
`;
const DiscardButton = styled(Button)`
  background-color: ${props => props.theme.redColor};
`;

const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  onAddButtonClick: () => void;
  branchData?: headGetBranch;
  branchLoading: boolean;
  onModifyClick: (branchId: number) => void;
  showDeletePopUp: boolean;
  setTrueShowDeletePopUp: (productId: number) => void;
  removeProductClick: () => void;
  setFalseShowDeletePopUp: () => void;
}

const SettingProductPresenter: React.SFC<IProps> = ({
  onAddButtonClick,
  branchData,
  branchLoading,
  onModifyClick,
  showDeletePopUp,
  setTrueShowDeletePopUp,
  setFalseShowDeletePopUp,
  removeProductClick
}) => (
  <BackContainer>
    {branchLoading ? (
      <Loading />
    ) : (
      <Container>
        <Helmet>
          <title>ModifyProduct | BlueDot</title>
        </Helmet>
        <BackArrowExtended backTo="/branch-setting" />
        <HeadSection>
          <HeadTitleCol>
            <Title>상품리스트</Title>
          </HeadTitleCol>
          <HeadButtonCol>
            <AddButton value={"추가"} onClick={onAddButtonClick} />
          </HeadButtonCol>
        </HeadSection>
        <BodySection>
          <ProductContainer>
            {branchData &&
              branchData.HeadGetBranch &&
              branchData.HeadGetBranch.branch &&
              branchData.HeadGetBranch.branch.products &&
              branchData.HeadGetBranch.branch.products.length > 0 &&
              branchData.HeadGetBranch.branch.products.map(
                product =>
                  product &&
                  !product.discard && (
                    <ProductItem key={product.id}>
                      <ProductRow>
                        <ProductRowTitle>상품 이름 : </ProductRowTitle>
                        <ProductContent>{product.title}</ProductContent>
                      </ProductRow>
                      <ProductRow>
                        <ProductRowTitle>가격 : </ProductRowTitle>
                        <ProductContent>{product.amount} 원</ProductContent>
                      </ProductRow>
                      <ProductRow>
                        <ProductRowTitle>상품종류 : </ProductRowTitle>
                        <ProductContent>
                          {product.target === "MEMBERSHIP"
                            ? "멤버쉽"
                            : product.target === "CABINET"
                              ? "사물함"
                              : ""}
                        </ProductContent>
                      </ProductRow>
                      <ProductRow>
                        <ProductRowTitle>이용시간 : </ProductRowTitle>
                        <ProductContent>{product.hours} 시간</ProductContent>
                      </ProductRow>
                      <ProductRow>
                        <ProductRowTitle>현재상태 : </ProductRowTitle>
                        <ProductContent>
                          {product.available ? "판매중" : "판매 중지"}
                        </ProductContent>
                      </ProductRow>
                      <ButtonContainer>
                        <ModifyButton
                          value={"수정"}
                          onClick={() => onModifyClick(product.id)}
                        />
                        <DiscardButton
                          value={"삭제"}
                          onClick={() => setTrueShowDeletePopUp(product.id)}
                        />
                      </ButtonContainer>
                    </ProductItem>
                  )
              )}
          </ProductContainer>
        </BodySection>
      </Container>
    )}

    {showDeletePopUp ? (
      <AlertPopUp
        closeFunc={setFalseShowDeletePopUp}
        message={"해당 상품을 삭제하시겠습니까?"}
        onOkClick={removeProductClick}
      />
    ) : (
      ""
    )}
  </BackContainer>
);

export default SettingProductPresenter;
