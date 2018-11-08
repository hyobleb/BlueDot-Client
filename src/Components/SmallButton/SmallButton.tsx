import React from "react";
import styled from "../../typed-components";
const Container = styled.input`
  width: 100px;
  min-width: 50px;
  max-width: 150px;
  background-color: ${props => props.theme.blueColor};
  color: white;
  text-transform: uppercase;
  padding: 3px 3px;
  font-size: 15px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  border-radius: 5px;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
  }
`;
interface IProps {
  value: string;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}
const SmallButton: React.SFC<IProps> = ({
  value,
  onClick,
  disabled = false,
  className
}) => (
  <Container
    value={value}
    disabled={false}
    onClick={onClick}
    type={"button"}
    className={className}
  />
);
export default SmallButton;
