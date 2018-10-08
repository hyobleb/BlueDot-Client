import React from "react";
import styled from "../../typed-components";
const Container = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;
const Image = styled.label`
  cursor: pointer;
  border: 2px solid black;
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  overflow: hidden;

  & img {
    width: 80px;
    height: 80px;
  }
  :hover {
    color: ${props => props.theme.blueColor};
    border-color: ${props => props.theme.blueColor};
  }
`;
const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;
interface IProps {
  uploading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dispalyText: string;
  name: string;
  fileUrl?: string;
}
const EditAccountPhotoInput: React.SFC<IProps> = ({
  uploading,
  onChange,
  dispalyText,
  name,
  fileUrl
}) => (
  <Container>
    <Input
      id={name}
      type="file"
      accept="image/*"
      onChange={onChange}
      name={name}
    />
    <Image htmlFor={name}>
      {uploading && "⏰"}
      {!uploading && fileUrl && <img src={fileUrl} />}
      {!uploading && !fileUrl && dispalyText}
    </Image>
  </Container>
);
export default EditAccountPhotoInput;
