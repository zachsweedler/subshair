import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Para } from "@/styles/StyledTypography";
import { useTheme } from "styled-components";

export default function MuiSelect({
  placeholder,
  options,
  onChange,
  value,
  label,
}) {
  const theme = useTheme();
  return (
    <Box sx={{ minWidth: "100%" }}>
      <FormControl fullWidth>
        <Select
          labelId={"id" + label}
          value={value}
          label={label}
          onChange={onChange}
          sx={{
            borderRadius: theme.borderRadius.base,
            overflow: "hidden",
            height: "auto",
            fontSize: theme.fontSizes.p,
            border: theme.border.base,
            "& fieldset": {
                border: 'none'
            }
          }}
          inputProps={{
            sx: {
              height: "45px !important",
              padding: "0px 12px !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              '&:active': {
                backgroundColor: theme.colors.nuetral.bgGrey
              },
              '&:hover': {
                backgroundColor: theme.colors.nuetral.bgGrey
              }
            },
          }}
        >
          <MenuItem disabled value="">
            <Para>{placeholder}</Para>
          </MenuItem>
          {options?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Para>{item.value}</Para>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
