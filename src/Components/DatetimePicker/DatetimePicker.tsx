import { Korean } from "flatpickr/dist/l10n/ko";
import "flatpickr/dist/themes/material_blue.css";
import React from "react";
import Flatpickr from "react-flatpickr";

import styled from "../../typed-components";

const ExtendedFlatPickr = styled(Flatpickr)`
  height: 30px;
  text-align: center;
  border: 1px solid #dedede;
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.lightBlueColor};
    color: white;
  }
`;

interface IProps {
  onFlatPickrChange: (datetimeValue: Date) => void;
  flatPickrDate: Date;
  dateFormat?: string;
  enableTime?: boolean;
  className?: string;
}
const DatetimePicker: React.SFC<IProps> = ({
  onFlatPickrChange,
  flatPickrDate,
  dateFormat,
  enableTime = true,
  className
}) => {
  return (
    <ExtendedFlatPickr
      value={flatPickrDate}
      onChange={date => onFlatPickrChange(date[0])}
      options={{
        dateFormat: dateFormat ? dateFormat : "Y년 m월 d일 K h:i",
        enableTime,
        locale: Korean
      }}
      className={className}
    />
  );
};

export default DatetimePicker;
