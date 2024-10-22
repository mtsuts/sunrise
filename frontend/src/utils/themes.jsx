import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4af0b7",
    },
    background: {
      default: "#212121",
      green: "#4af0b7",
      paper: "#212121",
    },
    text: {
      primary: "#ffffff",
      secondary: "#212121",
      white: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 12,
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.75rem",
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          transition: "none !important",
          animation: "none !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: "4px 8px",
          fontWeight: "bold",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: "4px 8px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "8px",
          boxShadow: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: "4px 8px",
        },
      },
    },
  },
});

export default theme;
