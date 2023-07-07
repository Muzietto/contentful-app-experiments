import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enabledEditFeature: false,
  search: '',
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    setEnabledEditFeature(state, action) {
      state.enabledEditFeature = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export default featuresSlice.reducer;
export const { setEnabledEditFeature, setSearch } = featuresSlice.actions;
