import { createSlice } from "@reduxjs/toolkit";
import { Settings } from "../../types";

export const initialState: Settings = {
  mode: "biblatex",
  includeAbstract: false,
  includeFile: true,
  includeWget: false,
  wgetPowershell: false,
  fileFolder: "~",
  includePrimaryCategory: false,
  includeVersion: false,
  sortBy: "submittedDate",
  sortOrder: "descending",
  maxResults: 10,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    saveSettings(_state, action) {
      const settings: Settings = action.payload;
      const json = JSON.stringify(settings);
      localStorage.setItem("settings", json);
      return settings;
    },
  },
});
export default settingsSlice.reducer;

export const selectSettings = (state: { [settingsSlice.name]: Settings }) =>
  state[settingsSlice.name];

export const { saveSettings } = settingsSlice.actions;
