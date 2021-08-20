import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import { arxivApi } from "./features/Results/resultsSlice";
import searchFormReducer, {
  searchFormSlice,
} from "./features/SearchForm/searchFormSlice";
import settingsReducer, {
  settingsSlice,
} from "./features/Settings/settingsSlice";

const store = configureStore({
  reducer: {
    [arxivApi.reducerPath]: arxivApi.reducer,
    [searchFormSlice.name]: searchFormReducer,
    [settingsSlice.name]: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(arxivApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
