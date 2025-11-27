import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "dark",
  },
  reducers: {
    setTheme: (theme) => {
      if (theme.value === "dark") {
        theme.value = "light";
      } else {
        theme.value = "dark";
      }
    },
    setLocalTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme, setLocalTheme } = themeSlice.actions;
export default themeSlice.reducer;
