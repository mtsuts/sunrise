import { useState, useEffect } from "react";
import { Slide, Box, Button } from "@mui/material";
import pathImage from "../images/path.JPG";
import { Link } from "react-router-dom";

export default function HomePage() {
  const token = localStorage.getItem('token')
  return (
    <>
      <Slide
        direction="down"
        in={true}
        timeout={750}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
            fontSize: 20,
          }}
        >
          <Box sx={{ width: { sm: "50%", xs: "100%" }, textAlign: "left" }}>
            <img
              src={pathImage}
              alt="path"
              className="md:w-[550px] md:h-[550px] w-full h-full rounded-2xl"
            />
          </Box>

          <Box sx={{ width: { sm: "50%", xs: "100%" }, textAlign: "left" }}>
            <Box sx={{ fontSize: 28, fontWeight: "medium" }}>
              You went on a unique ride and would love to share the route with
              other cyclists?
            </Box>
            <Box sx={{ marginTop: 4 }}>
              <Box>
                {" "}
                Here is how you can do it: Authorize with Strava by clicking
                button below and select the activity you'd like to share as a
                route worldwide.
              </Box>

              {!token && (
                <Link to="/login">
                  <Button
                    variant="outlined"
                    sx={{
                      marginTop: 2,
                      px: 3,
                      fontSize: "1rem",
                      fontWeight: "400",
                      bgcolor: "transparent",
                    }}
                  >
                    Share your route
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Box>
      </Slide>

      <Box sx={{ marginTop: 20 }} id="routes">
        <Box sx={{ fontSize: 24 }}>Explore routes</Box>
      </Box>
    </>
  );
}
