import { Para } from "@/styles/StyledTypography";
import React, { useEffect, useMemo, useRef } from "react";
import styled, { useTheme } from "styled-components";

function StatusLabel({ status }) {
  const label = useRef();
  const text = useRef();
  const theme = useTheme();

  useEffect(() => {
    if (status === "Listed" && label.current) {
      label.current.style.backgroundColor =
        theme.colors.alerts.success.light.background;
      text.current.style.color = theme.colors.alerts.success.light.text;
    } else if (status === "Draft" && label.current) {
      label.current.style.backgroundColor = theme.colors.alerts.info.light.background;
      text.current.style.color = theme.colors.alerts.info.light.text;
    } else {
      label.current.style.backgroundColor =
        theme.colors.alerts.nuetral.background;
      text.current.style.color = theme.colors.alerts.nuetral.text;
    }
  }, [
    status,
    theme.colors.alerts.info.light.background,
    theme.colors.alerts.info.light.text,
    theme.colors.alerts.nuetral.background,
    theme.colors.alerts.nuetral.text,
    theme.colors.alerts.success.light.background,
    theme.colors.alerts.success.light.text,
  ]);

  return (
    <Label ref={label}>
      <Para ref={text} small grey>
        {status}
      </Para>
    </Label>
  );
}

export default StatusLabel;

const Label = styled.div`
  padding: 3px 9px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.alerts.nuetral.background};
  position: absolute;
  top: 250px;
  right: 0;
  margin: 20px;
`;
