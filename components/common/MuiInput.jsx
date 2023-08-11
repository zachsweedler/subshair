"use client";
import { Para } from "@/styles/StyledTypography";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useTheme } from "styled-components";

function MuiInput({
  label,
  value,
  onChange,
  onBlur,
  multiline,
  dollar,
  percent,
  sqft,
  errorMessage,
  type,
  field, 
  form, 
  ...props
}) {
  const theme = useTheme();
  return (
    <TextField
      label={label}
      id="outlined-basic"
      variant="outlined"
      value={value !== undefined && value !== null ? value : ""}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      multiline={multiline ? true : false}
      autoComplete="off"
      rowsmax="10"
      sx={{
        width: "100%",
      }}
      InputLabelProps={{
        sx: {
          color: theme.colors.grey,
          fontSize: theme.fontSizes.p,
          textTransform: "capitalize",
          lineHeight: 1,
          top: "0",
          padding: "0",
          "&.MuiInputLabel-shrink": {
            display: value ? "none" : "block",
            lineHeight: 1.6,
          },
        },
      }}
      inputProps={{
        sx: {
          height: "45px",
          padding: "0px",
          maxHeight: multiline ? "200px" : "auto",
          overflow: multiline ? "scroll !important" : "auto",
        },
      }}
      InputProps={{
        disableunderline: 'true',
        startAdornment: dollar ? (
          <InputAdornment position="start">
            <Para grey>$</Para>
          </InputAdornment>
        ) : null,
        endAdornment: percent ? (
            <InputAdornment position="end">
              <Para grey>%</Para>
            </InputAdornment>
          ) : sqft ? (
            <InputAdornment position="end">
              <Para grey>sqft</Para>
            </InputAdornment>
          ) : null,
        sx: {
          backgroundColor: theme.colors.nuetral.bgGrey,
          borderRadius: theme.borderRadius.base,
          overflow: "hidden",
          height: "auto",
          fontSize: theme.fontSizes.p,
          padding: multiline ? "12px" : "0px 12px",
          border: value
            ? `1px solid ${theme.colors.lightGrey} !important`
            : "none",
          transition: "background 0.3s ease",
          "& fieldset": {
            border: value
              ? "none"
              : `1px solid ${theme.colors.lightGrey} !important`,
          },
          "&.Mui-focused": {
            backgroundColor: `${theme.colors.white} !important`,
          },
          "&:focus .MuiOutlinedInput fieldset": {
            border: "none",
          },
        },
      }}
      helperText={errorMessage}
      FormHelperTextProps={{
        sx: {
          color: theme.colors.alerts.error.background,
          marginLeft: "12px",
          marginTop: "5px",
        },
      }}
      {...field} 
      {...props}
    />
  );
}
export default MuiInput;
