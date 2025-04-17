"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#A855F7",
      contrastText: "#fff",
    },
    background: {
      default: "#1e2939",
    },
    text: {
      primary: "#fff",
      secondary: "#000",
    },
    action: {
      disabled: "rgba(255, 255, 255, 0.26)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
  },
});

export default theme;
