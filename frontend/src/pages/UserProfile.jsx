import React, { useEffect, useRef, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { Box, Pagination } from "@mui/material";
import { GetActivities, GetAllActivities, GetAthlete } from "../api/api";
import { useSearchParams } from "react-router-dom";
import theme from "../utils/themes";
import CardsGrid from "../components/CardsGrid";
import SearchBox from "../components/SearchBox";
import PaginationRounded from "../components/Pagination";
import AthleteDashboard from "../components/AthleteDashboard";
import Activities from "../components/Activities";

export default function UserProfile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    activityInput,
    page,
    avatar,
    setAvatar,
    activities,
    setActivities,
    updateActivities,
  } = useContext(AppContext);
  const dataLoaded = useRef(false);

  // load athlete data
  useEffect(() => {
    if (dataLoaded.current) {
      return;
    }
    dataLoaded.current = true;
    GetAthlete()
      .then((data) => {
        setSearchParams({});
        setData(data);
        localStorage.setItem("token", data.accessToken);
        const athleteAvatar = data?.data[0].avatar || "";
        localStorage.setItem("avatar", athleteAvatar);
        setAvatar(athleteAvatar);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  // load activities data from database
  useEffect(() => {
    if (localStorage.getItem("activity") === "received") {
      GetAllActivities().then((data) => {
        setActivities(data.data);
      });
    }
  }, [updateActivities]);

  const athlete = data?.data || [];
  const athleteName = athlete[0]?.name || "";

  return (
    <>
      <AthleteDashboard name={athleteName} />
      <Activities />
      <Box sx={{ marginTop: 10, fontSize: 24 }}> My activities for Routes</Box>
      <CardsGrid activities={activities} />
    </>
  );
}

// data manipulations
// const receivedData = data?.data || [];
// let activities = receivedData
//   .filter((d) => d.type === "Ride")
//   .filter((d) => d.polyline.length !== 0);
// const itemsShow = 4;
// const currentPage = page;
// let currentPageData = [];

// activity filtering
// if (activityInput) {
//   activities = activities.filter((d) =>
//     d.name.toLowerCase().includes(activityInput)
//   );
// }
// currentPageData = activities.slice(
//   itemsShow * (currentPage - 1),
//   itemsShow * currentPage
// );
// console.log(currentPageData);

// return (
//   <>
//     <Box>
//       <SearchBox />
//       <Box
//         sx={{
//           marginTop: 4,
//           color: theme.palette.text.secondary,
//           fontSize: 30,
//           fontWeight: "bold",
//         }}
//       >
//         {!token && "Please authenticate"}
//       </Box>
//       {/* <EffortCard data={stats[0] || []}/> */}

//
//       <PaginationRounded length={Math.ceil(activities.length / itemsShow)} />
//     </Box>
//   </>
// );
