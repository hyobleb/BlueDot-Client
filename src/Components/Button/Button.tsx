import React from "react";
import styled from "../../typed-component";
const Container = styled.input`
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
}
const Button: React.SFC<IProps> = ({ value, onClick, disabled = false }) => (
  <Container value={value} disabled={false} onClick={onClick} type={"submit"} />
);
export default Button;
