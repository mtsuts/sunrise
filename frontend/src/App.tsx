import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Outlet } from "react-router-dom";
import { AppContext } from "./components/AppContext";
import theme from "./utils/themes";
// import { GetActivities } from "./api/api";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  const { avatar, setAvatar } = useContext(AppContext);
  const athelteAvatar = localStorage.getItem("avatar");

  useEffect(() => {
    if (!avatar) {
      setAvatar(athelteAvatar);
    }
  }, []);

  return (
    <Box
      sx={{
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.background.default,
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar />
      <Container maxWidth={"lg"} sx={{ py: 28, px: { sm: 0, xs: 5 } }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
