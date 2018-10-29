import React from "react";
import ReactLoading from "react-loading";
import styled from "../../typed-components";

type LoadingType =
  | "blank"
  | "balls"
  | "bars"
  | "bubbles"
  | "cubes"
  | "cylon"
  | "spin"
  | "spinningBubbles"
  | "spokes";

interface IProps {
  className?: string;
  loadingType?: LoadingType;
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Loading: React.SFC<IProps> = ({
  className,
  loadingType = "spinningBubbles"
}) => (
  <LoadingContainer className={className}>
    <ReactLoading type={loadingType} color={"#0E298B"} />
  </LoadingContainer>
);
export default Loading;
