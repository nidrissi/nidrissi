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

export const selectIds = (state: RootState) => state.searchForm.ids;
export const selectAuthors = (state: RootState) => state.searchForm.authors;
export const selectTitles = (state: RootState) => state.searchForm.titles;

export default searchFormSlice.reducer;
