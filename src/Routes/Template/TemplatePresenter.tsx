import React from "react";
import DefaultBack from "../../Components/DefaultBack";
import styled from "../../typed-components";

const Back = styled(DefaultBack)``;

const TemplatePresenter: React.SFC = () => (
  <Back title={"Template | BlueDot"} backUrl={"/"}>
    TemplatePresenter
  </Back>
);

export default TemplatePresenter;
