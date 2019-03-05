import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.div`
  transform: scale(0.8);
  z-index: 2;
`;

const BackIconBack = styled.div`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 50%;
  width: 50px;
`;

const BackIcon: React.SFC = () => (
  <BackIconBack>
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        stroke={"white"}
        d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"
      />
    </svg>
  </BackIconBack>
);
interface IProps {
  backTo?: string;
  className?: string;
  backFn?: any;
}

const BackArrow: React.SFC<IProps> = ({ backTo, className, backFn }) => (
  <Container className={className}>
    {backTo ? (
      <Link to={backTo}>
        <BackIcon />
      </Link>
    ) : (
      <span onClick={backFn}>
        <BackIcon />
      </span>
    )}
  </Container>
);

export default BackArrow;
