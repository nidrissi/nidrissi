import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

import { arxivApi } from "./a2b/features/Results/resultsSlice";
import searchFormReducer, {
  searchFormSlice,
} from "./a2b/features/SearchForm/searchFormSlice";
import settingsReducer, {
  settingsSlice,
} from "./a2b/features/Settings/settingsSlice";

import { commentApi } from "./components/Page/CommentBlock/CommentApi";

// export type RootState = ReturnType<typeof store.getState>;

export function wrapWithProvider({ element }: { element: React.ReactNode }) {
  const store = configureStore({
    reducer: {
      [commentApi.reducerPath]: commentApi.reducer,
      [arxivApi.reducerPath]: arxivApi.reducer,
      [searchFormSlice.name]: searchFormReducer,
      [settingsSlice.name]: settingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(arxivApi.middleware)
        .concat(commentApi.middleware),
  });
  setupListeners(store.dispatch);
  return <Provider store={store}>{element}</Provider>;
}
