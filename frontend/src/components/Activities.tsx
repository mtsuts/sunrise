import React from "react";
import { useEffect, useContext } from "react";
import { GetActivity } from "../api/api";
import { AppContext } from "./AppContext";
import { Button, Box, TextField } from "@mui/material";
import { unixTimestamp } from "../utils/metricsUpdates";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import theme from "../utils/themes";

interface ActivitiesProps {
  children: React.ReactNode;
}

export default function Activities({ children }: ActivitiesProps) {
  const { setActivities, activities } = useContext(AppContext);
  const after = unixTimestamp("2021-08-09");
  const before = unixTimestamp("2021-10-11");
  const activityName = "Oldervik";

  if (activities) {
    console.log(activities);
  }
  const activity =
    activities.filter((d: { name: String }) => d.name === activityName)[0] ||
    {};

  return (
    <>
      <Box sx={{ width: { xs: "100%", sm: "50%" }, marginTop: 4 }}>
        To get your strava activity which you would like to share as a route,
        please fill simple form below with activity date and activity name, so
        we will retrive your activity from Strava
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField"]}>
            <DateField
              sx={{
                "& .MuiInputBase-input": {
                  color: "#ffffff",
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // Label color
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffffff", // Border color for the outline
                  },
                },
              }}
              label="Activity Date"
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          sx={{ color: "White" }}
          id="filled-basic"
          label="Activity Name"
          variant="filled"
        />

        <Button
          sx={{ fontSize: 16 }}
          onClick={() => {
            GetActivity(before, after).then((data) => {
              setActivities(data.data);
              localStorage.setItem("activity", "received");
            });
          }}
        >
          Get your activity
        </Button>
      </Box>
      {/* <Box sx={{ border: 1, width: "50%", p: 4, marginTop: 4 }}>
        {activity?.name}, You needed {activity?.movingTime} to finish this
        route.
      </Box> */}
    </>
  );
}
