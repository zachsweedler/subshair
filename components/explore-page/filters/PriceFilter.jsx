"use client";
import { H5, Para } from "@/styles/StyledTypography";
import React from "react";
import styled, { useTheme } from "styled-components";
import { Box, Slider } from "@mui/material";
import { updateFilter } from "@/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, RangeWrapper, ValueWrapper, Wrapper } from "./Styles";

// Rev Share Text
function rentText(value) {
  return `$${value}`;
}

function PriceFilter() {
  const dispatch = useDispatch()
  const theme = useTheme();
  const minDistance = 10;
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

  // Rent Slider
  const rentMin = useSelector((state)=> state.filter.rentMin)
  const rentMax = useSelector((state)=> state.filter.rentMax)
  const handleChange = (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      dispatch(updateFilter({filterName: 'rentMin', value: Math.min(newValue[0], rentMax - minDistance)}))
    } else {
      dispatch(updateFilter({filterName: 'rentMax', value: Math.max(newValue[1], rentMin + minDistance)}))
    }
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <MenuItem>
        <H5>Rent</H5>
        <Box sx={{ width: "100%" }}>
          <Slider
            getAriaLabel={() => "Monthly Rent Amount"}
            value={[rentMin, rentMax]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={rentText}
            sx={sliderTheme}
            min={0}
            max={10000}
          />
        </Box>
        <RangeWrapper>
          <ValueWrapper>
            <Para small grey>Min</Para>
            <Para style={{ pointerEvents: "none" }}>{`$${rentMin}`}</Para>
          </ValueWrapper>
          <Para>―</Para>
          <ValueWrapper>
            <Para small grey>Max</Para>
            <Para style={{ pointerEvents: "none" }}>{`$${rentMax}`}</Para>
          </ValueWrapper>
        </RangeWrapper>
      </MenuItem>
    </Wrapper>
  );
}

export default PriceFilter;