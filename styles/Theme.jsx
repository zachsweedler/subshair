"use client";
import {
  createTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import React from "react";
import StyledComponentsRegistry from "@/registery/registery";

// This is used in customer components and Mui components
const theme = {
  colors: {
    black: "#000000",
    darkGrey: "#404040",
    grey: "#898989",
    lightGrey: "#E2E2E2",
    white: "#ffffff",
    psuedo: {
      hover: "#1C1C1C",
    },
    nuetral: {
      bgGrey: "#F2F2F2",
      lightBgGrey: '#FBFBFB',
      hoverGrey: "#F0F0F0",
      borderGrey: "#F0F0F0",
      trackGrey: "#414141",
    },
    alerts: {
      success: {
        light: {
          background: "#d7efdb",
          text: "#2e523a",
        },
        dark: {
          background: "#2e523a",
          text: "#ffffff",
        },
      },
      error: {
        light: {
          background: "#ffdede",
          text: "#a32626",
        },
        dark: {
          background: "#a32626",
          text: "#ffffff",
        },
      },
      info: {
        light: {
          background: "#d7e5ef",
          text: "#094364",
        },
        dark: {
          background: "#094364",
          text: "#ffffff",
        },
      },
      warning: {
        light: {
          background: "#efe4d7",
          text: "#EB672E",
        },
        dark: {
          background: "#EB672E",
          text: "#ffffff",
        },
      },
      nuetral: {
        background: `#F6F6F6`,
        text: "#404040",
      },
    },
  },
  fontSizes: {
    psm: "12px",
    p: "14px",
    h5: "16px",
    h4: "18px",
    h3: "25px",
    h2: "45px",
    h1: "60px",
    hero: "85px",
    mobile: {
      psm: "12px",
      p: "14px",
      h5: "14px",
      h4: "18x",
      h3: "20px",
      h2: "35px",
      h1: "40px",
      hero: "60px",
    },
  },
  fontWeights: {
    buttons: {
      base: "400",
    },
    text: {
      psm: "400",
      p: "400",
      h5: "500",
      h4: "500",
      h3: "600",
      h2: "600",
      h1: "600",
    },
  },
  letterSpacing: {
    psmall: "0px",
    p: "0px",
    h5: "-0.015em",
    h4: "-0.015em",
    h3: "-0.015em",
    h2: "-0.035em",
    h1: "-0.035em",
  },
  lineHeight: {
    psmall: "1.3",
    p: "1.8",
    h5: "1.4",
    h4: "1.6",
    h3: "1.4",
    h2: "1.25",
    h1: "1.2",
    hero: "1.1",
  },
  textDecoration: {
    underline: "underline",
  },
  heights: {
    input: "50px",
  },
  border: {
    base: "1px solid #F0F0F0",
    focus: "1px solid #000000",
    hover: "1px solid #E2E2E2",
    active: "1px solid #898989",
  },
  borderRadius: {
    base: "5px",
    xs: "1px",
    sm: "3px",
    md: "12px",
    lg: "16px",
    xl: "25px",
  },
  boxShadow: {
    base: "0 5px 18px 0 rgba(43, 43, 43, 0.094)",
    light: "0 3px 9px 0 rgba(43, 43, 43, 0.098)",
    marker: "0 2px 4px rgba(0, 0, 0, 0.282);",
    filterBar: "0px 9px 5px 0 rgba(43, 43, 43, 0.041)",
  },
  breakPoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
    xxl: "1400px",
  },
  container: {
    width: {
      xs: "560px",
      sm: "745px",
      smd: "950px",
      md: "1120px",
      lg: "1300px",
      xl: "1880px",
      fullvw: "100vw",
    },
    padding: {
      nav: "20px 25px",
      pdpslider: "70px 25px 0px 25px",
      pdpcontent: "25px 30px",
      xs: "130px 25px 160px 25px",
      sm: "130px 25px 160px 25px",
      smd: "130px 25px 160px 25px",
      md: "130px 25px 160px 25px",
      lg: "130px 25px 160px 25px",
      xl: "130px 25px 160px 25px",
      fullvw: "112px 0px 160px 0px",
      mobile: {
        nav: "0px 20px 0px 20px",
        xs: "90px 20px 100px 20px",
        sm: "90px 20px 100px 20px",
        smd: "90px 20px 100px 20px",
        md: "90px 20px 100px 20px",
        lg: "50px 20px 100px 20px",
        xl: "90px 20px 100px 20px",
        fullvw: "90px 0px 100px 0px",
      },
    },
  },
};

// for all Mui Components
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme?.colors?.black,
    },
  },
});

export function MuiThemeWrapper({ children }) {
  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}

export function ThemeWrapper({ children }) {
  return (
    <StyledComponentsRegistry>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </StyledComponentsRegistry>
  );
}
