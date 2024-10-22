import React from "react";
import { Box } from "@mui/material";
import Card from "./Card";

interface Activity {
  name: string;
  activityID: string;
  activityName: string;
  athleteID: string;
  city: string;
  polyline: [];
}
interface CardsGridProps {
  activities: Activity[];
}

export default function CardsGrid({ activities }: CardsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { sm: "repeat(4, 1fr)", xs: "repeat(1, 1fr)" },
        py: 6,
      }}
    >
      {activities.map((activity, index) => {
        return (
          <Card
            key={index}
            activityID={activity.activityID}
            activityName={activity.name}
            athleteID={activity.athleteID}
            city={activity.city}
            polyline={activity.polyline}
          />
        );
      })}
    </Box>
  );
}
