import React from "react";
import styled from "../../typed-component";
const Container = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.blueColor};
  font-size: 20px;
  width: 100%;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-weight: 300;
  }
`;

interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: any;
  name?: string;
  onChange?: any;
  className?: string;
  autoComplete?: string;
}

const Input: React.SFC<IProps> = ({
  placeholder = "",
  type = "text",
  required = true,
  value,
  name = "",
  onChange,
  className,
  autoComplete
}) => (
  <Container
    className={className}
    onChange={onChange}
    name={name}
    type={type}
    required={required}
    value={value}
    placeholder={placeholder}
    autoComplete={autoComplete}
  />
);
export default Input;
