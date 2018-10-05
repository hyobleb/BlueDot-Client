import React from "react";
import styled from "../../typed-components";

const BContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 95vw;
  max-width: 600px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

interface IProps {
  className?: string;
}

const BackContainer: React.SFC<IProps> = ({ className, children }) => (
  <BContainer>
    <Container className={className}>{children}</Container>
  </BContainer>
);

export default BackContainer;
