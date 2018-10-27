import React from "react";
import styled from "src/typed-components";

const Container = styled.div`
  max-width: 200px;
  min-width: 50px;
`;
const MiniMapImg = styled.img`
  width: 100%;
`;
interface IProps {
  minimapImage: string;
  className?: string;
}

const Minimap: React.SFC<IProps> = ({ minimapImage, className }) => (
  <Container className={className}>
    <MiniMapImg src={minimapImage} />
  </Container>
);
export default Minimap;
