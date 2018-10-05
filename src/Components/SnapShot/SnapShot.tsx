import React from "react";
import styled from "../../typed-components";

const Container = styled.div`
  margin: 5px;
  position: relative;
`;

const Img = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  overflow: hidden;
`;

const XIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
`;

interface IProps {
  url: string;
}
const SnapShot: React.SFC<IProps> = ({ url }) => (
  <Container>
    <Img src={url} />
    <XIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
      </svg>
    </XIcon>
  </Container>
);
export default SnapShot;
