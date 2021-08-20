import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// these components are always loaded
import Search from "./features/Search";
import Settings from "./features/Settings";

// state
import { initialState, saveSettings } from "./features/Settings/settingsSlice";
import Title from "./features/Title";

export default function App() {
  // keep here to avoid re-fetching on route change
  const dispatch = useDispatch();
  useEffect(() => {
    const persistentState = localStorage.getItem("settings");
    if (persistentState) {
      // in case I have introduced new settings since the last time the user
      // has used the app, I still want to use defaultInitialState as fallback
      dispatch(
        saveSettings({ ...initialState, ...JSON.parse(persistentState) })
      );
    }
  }, [dispatch]);

  // the page we are currently on
  const [currentPage, setCurrentPage] = useState("Search");
  const pageAssociation = new Map([
    ["Search", <Search />],
    ["Settings", <Settings />],
  ]);

  return (
    <>
      <Title setCurrentPage={setCurrentPage} />
      {pageAssociation.get(currentPage)}
    </>
  );
}
