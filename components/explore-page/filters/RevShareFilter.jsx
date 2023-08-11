"use client";
import React from "react";
import { H5, Para } from "@/styles/StyledTypography";
import styled, { useTheme } from "styled-components";
import { Box, Slider } from "@mui/material";
import { updateFilter } from "@/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, RangeWrapper, ValueWrapper, Wrapper } from "./Styles";

function revShareText(value) {
  return `${value}%`;
}

function RevShareFilter() {

  const minDistance = 10;
  const theme = useTheme();
  const dispatch = useDispatch();
  const sliderTheme = {
    color: theme.colors.black,
    height: 2,
    padding: "13px 0",
    "& .MuiSlider-thumb": {
      height: 18,
      width: 18,
      backgroundColor: theme.colors.white,
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "none",
      },
      "&:before": {
        display: "none",
      },
    },
  };
  const revShareMax = useSelector((state)=> state.filter.revShareMax)
  const revShareMin = useSelector((state)=> state.filter.revShareMin)
  
  const handleChange = (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      dispatch(updateFilter({filterName: 'revShareMin', value: Math.min(newValue[0], revShareMax - minDistance)}))
    } else {
      dispatch(updateFilter({filterName: 'revShareMax', value: Math.max(newValue[1], revShareMin + minDistance)}))
    }
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <MenuItem>
        <H5>Revenue Share</H5>
        <Box sx={{ width: "100%" }}>
          <Slider
            getAriaLabel={() => "Landlords Revenue Share"}
            value={[revShareMin, revShareMax]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={revShareText}
            sx={sliderTheme}
            min={0}
            max={100}
          />
        </Box>
        <RangeWrapper>
          <ValueWrapper>
            <Para small grey>Min</Para>
            <Para style={{ pointerEvents: "none" }}>{`${revShareMin} %`}</Para>
          </ValueWrapper>
          <Para>―</Para>
          <ValueWrapper>
            <Para small grey>Max</Para>
            <Para style={{ pointerEvents: "none" }}>{`${revShareMax} %`}</Para>
          </ValueWrapper>
        </RangeWrapper>
      </MenuItem>
    </Wrapper>
  );
}

export default RevShareFilter;