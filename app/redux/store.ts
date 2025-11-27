import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import countryReducer from "./countrySlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
