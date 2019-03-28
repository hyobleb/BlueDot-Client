import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import BackArrow from "../BackArrow";

const BackContainer = styled.div``;
const Container = styled.div``;
const BackArrowExtended = styled(BackArrow)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
`;

interface IProps {
  className?: string;
  title: string;
  backUrl?: string;
  children: React.ReactNode;
  backFn?: any;
}
const HyobiBack: React.SFC<IProps> = ({
  backFn,
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
      {backUrl ? (
        <BackArrowExtended backTo={backUrl} />
      ) : (
        <BackArrowExtended backFn={backFn} />
      )}

      <Container>{children}</Container>
    </BackContainer>
  );
};

export default HyobiBack;
