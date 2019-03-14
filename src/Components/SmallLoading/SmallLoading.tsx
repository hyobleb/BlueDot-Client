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

const SmallLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0;
  left: 0;
`;

const SmallLoading: React.SFC<IProps> = ({
  className,
  loadingType = "spokes"
}) => (
  <SmallLoadingContainer className={className}>
    <ReactLoading type={loadingType} color={"#0E298B"} />
  </SmallLoadingContainer>
);
export default SmallLoading;
