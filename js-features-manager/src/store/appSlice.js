import { RootState } from '.';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  configs: {},
  defaultLocale: 'it-IT',
  locales: [],
};

const appSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    setLocales(state, action) {
      state.defaultLocale = action.payload.default;
      state.locales = [
        action.payload.default,
        ...action.payload.available.filter((locale) => locale !== action.payload.default),
      ];
    },
    setConfigs(state, action) {
      state.configs = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setLocales, setConfigs } = appSlice.actions;

export const selectFilteredConfigs = createSelector(
  (state) => state.app.configs || {},
  (state) => state.features.search,
  (configs, search) => {
    const regexp = new RegExp(search, 'gi');

    return search
      ? Object.keys(configs)
        .filter((key) => key.match(regexp))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: configs[key] });
        }, {})
      : configs;
  }
);
