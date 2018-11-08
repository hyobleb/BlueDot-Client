import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import BackArrow from "../BackArrow";

const BackContainer = styled.div``;
const Container = styled.div`
  width: 90%;
  max-width: 600px;
  min-width: 300px;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
`;
const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

interface IProps {
  className?: string;
  title: string;
  backUrl: string;
  children: React.ReactNode;
}
const DefaultBack: React.SFC<IProps> = ({
  className,
  title,
  backUrl,
  children
}) => {
  return (
    <BackContainer className={className}>
      <Helmet>
        <title>{title} | BlueDot</title>
      </Helmet>
      <BackArrowExtended backTo={backUrl} />
      <Container>{children}</Container>
    </BackContainer>
  );
};

export default DefaultBack;
