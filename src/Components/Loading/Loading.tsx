import React from "react";
import ReactLoading from "react-loading";
import styled from "../../typed-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Loading: React.SFC<any> = () => (
  <LoadingContainer>
    <ReactLoading type={"spinningBubbles"} color={"#0E298B"} />
  </LoadingContainer>
);
export default Loading;
