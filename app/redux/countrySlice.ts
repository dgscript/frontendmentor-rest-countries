import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CountryData {
  name: string;
  flag: string;
  nativeName: string;
  population: string;
  subregion: string;
  capital: string;
  topLevelDomain: string;
  alpha3Code: string;
  currencies: {
    name: string;
  };
  languages: {
    name: string;
  };
  borders?: [string];
}

export interface CountryState {
  value: CountryData[] | null;
}

const initialState: CountryState = {
  value: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<CountryData[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
