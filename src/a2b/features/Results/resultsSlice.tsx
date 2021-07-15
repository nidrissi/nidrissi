import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { ArxivResult, arxivSearch } from "../../arxiv";
import { RootState } from "../../store";
import { Entry, Query, Settings } from "../../types";

/** An asynchronous "thunk" that fetches entries based on the request. */
export const fetchEntries = createAsyncThunk<
  ArxivResult | undefined,
  void,
  {
    state: {
      searchForm: Query;
      settings: Settings;
      results: { isLoading: boolean; currentRequestId: string; };
    };
  }
>("results/fetchEntries", async (_: void, { getState, requestId }) => {
  const state = getState();
  const query = state.searchForm;
  const settings = state.settings;
  const { isLoading, currentRequestId } = state.results;
  if (!isLoading || requestId !== currentRequestId) {
    return;
  } else {
    return await arxivSearch(query, settings);
  }
});

const entriesAdapter = createEntityAdapter<Entry>();

interface ResultsExtraState {
  isLoading: boolean;
  totalEntriesFound?: number;
  currentRequestId?: string;
  error?: string;
};
const resultsExtraInitialState: ResultsExtraState = {
  isLoading: false,
};
const initialState = entriesAdapter.getInitialState(resultsExtraInitialState);

export const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    clearError(state) {
      delete state.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.pending, (state, action) => {
      if (!state.isLoading) {
        state.isLoading = true;
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.isLoading && state.currentRequestId === requestId) {
        state.isLoading = false;
        delete state.error;
        delete state.currentRequestId;
        if (action.payload) {
          const { entries, totalEntriesFound } = action.payload;
          entriesAdapter.setAll(state, entries);
          state.totalEntriesFound = totalEntriesFound;
        }
      }
    });
    builder.addCase(fetchEntries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      delete state.currentRequestId;
    });
  },
});

export const { clearError } = resultsSlice.actions;

const entriesSelectors = entriesAdapter.getSelectors(
  (state: RootState) => state.results
);

export const selectAllEntries = (state: RootState) =>
  entriesSelectors.selectAll(state);
export const selectTotalEntriesFound = (state: RootState) =>
  state.results.totalEntriesFound;
export const selectIsLoading = (state: RootState) => state.results.isLoading;
export const selectError = (state: RootState) => state.results.error;

export default resultsSlice.reducer;
