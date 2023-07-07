import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import delocalizeEntry from '../utils/delocalizeEntry';
import circuitPlansAdapter from './adapters/circuitPlansAdapter';

export const fetchCircuitPlans = createAsyncThunk(
  'circuitPlans/fetch',
  async (cma, { getState }) => {
    const {
      app: { defaultLocale },
    } = getState();
    const circuitPlanCollection = await cma.entry.getMany({
      query: { content_type: 'circuitPlan' },
    });
    return circuitPlanCollection.items.map((item) => delocalizeEntry(item, defaultLocale));
  }
);

const circuitPlansSlice = createSlice({
  name: 'circuitPlans',
  initialState: circuitPlansAdapter.getInitialState({
    configs: undefined,
    loading: false,
    selectedId: undefined,
  }),
  reducers: {
    circuitPlanSelected(state, action) {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCircuitPlans.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCircuitPlans.fulfilled, (state, action) => {
        state.loading = false;
        circuitPlansAdapter.setAll(state, action.payload);
      });
  },
});

export default circuitPlansSlice.reducer;

export const { circuitPlanSelected } = circuitPlansSlice.actions;

export const circuitPlansSelectors = circuitPlansAdapter.getSelectors(
  (state) => state.circuitPlans
);

export const selectedCircuitPlanSelectors = createSelector(
  (state) => state.circuitPlans.selectedId,
  (state) => state.circuitPlans.entities,
  (selectedId, entities) => {
    if (!selectedId || !entities || Object.keys(entities).length === 0) {
      return undefined;
    }

    return entities[selectedId];
  }
);
