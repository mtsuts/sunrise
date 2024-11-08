import React from "react";
import { useEffect, useContext, useState } from "react";
import { GetAndSaveActivity } from "../api/api";
import { AppContext } from "./AppContext";
import { Button, Box, TextField } from "@mui/material";
import { unixTimestamp } from "../utils/metricsUpdates";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import theme from "../utils/themes";

interface ActivitiesProps {
  value: String;
}

export default function Activities({ value }: ActivitiesProps) {
  const { updateActivities, setUpdateActivities } = useContext(AppContext);
  const [dateValue, setDateValue] = useState("");
  const [prevDate, setPrevDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [activityName, setActivityName] = useState("");

  const after = unixTimestamp(prevDate || "");
  const before = unixTimestamp(nextDate || "");

  return (
    <>
      <Box sx={{ width: { xs: "100%", sm: "50%" }, marginTop: 4 }}>
        Get your desired Strava Activity. Please indicate exact information
        about activity date and name.
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              onChange={(event) => {
                console.log(event);
                if (event !== null) {
                  const nextDate = event.add(1, "day");
                  const prevDate = event.add(-1, "day");
                  setDateValue(event.format("YYYY-MM-DD"));
                  setPrevDate(prevDate.format("YYYY-MM-DD"));
                  setNextDate(nextDate.format("YYYY-MM-DD"));
                }
              }}
              sx={{ label: { color: "#ffffff", left: "auto", top: "auto" } }}
              label="Activity Date"
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          sx={{
            color: "White",
            label: {
              left: "auto",
              top: "auto",
              color: theme.palette.text.primary,
            },
          }}
          onChange={(event) => {
            setActivityName(event.target.value);
          }}
          required={true}
          id="standard-basic"
          label="Activity name"
          variant="standard"
        />
      </Box>
      <Button
        variant="contained"
        sx={{ fontSize: 16, marginTop: 5 }}
        onClick={() => {
          GetAndSaveActivity(before, after, activityName).then((data) => {
            setUpdateActivities(true);
            localStorage.setItem("activity", "received");
          });
        }}
      >
        Get activity
      </Button>
    </>
  );
}
