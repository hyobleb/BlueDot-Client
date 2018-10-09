import React from "react";
import styled from "../../typed-components";

const ImgContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
const LoungeImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

interface IProps {
  imgUrl: string;
}

const LoungeContainer: React.SFC<IProps> = ({ imgUrl }) => (
  <ImgContainer>
    <LoungeImg src={imgUrl} />
  </ImgContainer>
);
export default LoungeContainer;
