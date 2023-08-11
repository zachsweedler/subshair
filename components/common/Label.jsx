import { Para } from "@/styles/StyledTypography";
import React from "react";
import styled from "styled-components";

function Label({ labelText, labelTextColor, labelBgColor }) {

  return (
    <LabelWrapper color={labelBgColor}>
      <Para small style={{color: labelTextColor}}>
        {labelText}
      </Para>
    </LabelWrapper>
  );
}

export default Label;

const LabelWrapper = styled.div`
  padding: 3px 9px;
  border-radius: 3px;
  background-color: ${({color}) => color};
  top: 200px;
  right: 0;
`;
