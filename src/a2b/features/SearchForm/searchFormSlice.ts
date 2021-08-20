import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Query } from "../../types";

const initialState: Query = {
  ids: [],
  authors: [],
  titles: [],
};

export const searchFormSlice = createSlice({
  name: "searchForm",
  initialState,
  reducers: {
    setQuery(_state: Query, action: PayloadAction<Query>) {
      return action.payload;
    },
  },
});

export const { setQuery } = searchFormSlice.actions;
export const selectQuery = (state: RootState) => state[searchFormSlice.name];
export default searchFormSlice.reducer;
