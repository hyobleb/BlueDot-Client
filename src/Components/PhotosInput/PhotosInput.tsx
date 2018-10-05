import React from "react";
import styled from "../../typed-components";
const Container = styled.div``;
const Image = styled.label`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border: 2px solid black;
  display: block;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  overflow: hidden;
  & img {
    width: 80px;
    height: 80px;
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
  fileUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dispalyText: string;
  name: string;
}
const PhotosInput: React.SFC<IProps> = ({
  uploading,
  onChange,
  dispalyText,
  name
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
      {!uploading && dispalyText}
    </Image>
  </Container>
);
export default PhotosInput;
