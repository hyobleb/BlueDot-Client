import React from "react";
import styled from "../../typed-components";
const Container = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background-color: ${props => props.theme.blueColor};
  color: white;
  text-transform: uppercase;
  padding: 15px 0;
  font-size: 16px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  margin-top: 25px;
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
  type?: string;
}
const Button: React.SFC<IProps> = ({
  value,
  onClick,
  disabled = false,
  className,
  type = "submit"
}) => (
  <Container
    value={value}
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={className}
  />
);
export default Button;
