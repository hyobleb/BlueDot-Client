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
  onCloseClick: any;
}
const SnapShot: React.SFC<IProps> = ({ url, onCloseClick }) => (
  <Container>
    <Img src={url} />
    <XIcon
      data-url={url}
      onClick={() => {
        onCloseClick(url);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z" />
      </svg>
    </XIcon>
  </Container>
);
export default SnapShot;
