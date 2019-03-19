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
  width?: number;
  height?: number;
  padding?: number;
}

const SmallLoadingContainer = styled<
  {
    padding?: number;
  },
  "div"
>("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 0;
  left: 0;
  padding: ${props => (props.padding ? `${props.padding}px` : "inherit")};
`;

const SmallLoading: React.SFC<IProps> = ({
  className,
  loadingType = "spokes",
  width,
  height,
  padding
}) => (
  <SmallLoadingContainer className={className}>
    <ReactLoading
      type={loadingType}
      color={"#0E298B"}
      width={width}
      height={height}
    />
  </SmallLoadingContainer>
);
export default SmallLoading;
