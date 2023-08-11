"use client";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useTheme } from "styled-components";
import { Flex } from "./Flexboxes";
import { Para } from "@/styles/StyledTypography";

function MuiTooltip({ title, text, placement }) {
  const theme = useTheme();
  return (
    <Flex direction="row" columnGap="5px" align="center">
      <Para grey small>{title}</Para>
      <Tooltip
        placement={placement}
        title={text}
        arrow
        slotProps={{ 
          tooltip: { 
            sx: { 
              backgroundColor: '#000000', 
              fontSize: theme.fontSizes.p,
              lineHeight: theme.lineHeight.psmall,
              padding: '12px',
            },
          },
          arrow: {
            sx: {
              opacity: '100% !important'
            }
          }
        }}
      >
        <Image
          alt="tool-tip"
          src="/assets/images/icons/tool-tip-grey.svg"
          width={12}
          height={12}
          style={{cursor: 'pointer'}}
        />
      </Tooltip>
    </Flex>
  );
}

export default MuiTooltip;
