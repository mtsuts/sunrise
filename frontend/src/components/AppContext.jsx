import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [activityInput, setActivityInput] = useState("");
  const [page, setPage] = useState(1);
  const [avatar, setAvatar] = useState("");
  const [updateActivities, setUpdateActivities] = useState(false)

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        data,
        login,
        logout,
        setIsLoading,
        setData,
        setOpen,
        open,
        activityInput,
        setActivityInput,
        page,
        setPage,
        avatar,
        setAvatar,
        activities,
        setActivities,
        updateActivities, 
        setUpdateActivities
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
