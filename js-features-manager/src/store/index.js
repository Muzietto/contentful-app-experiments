import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import appReducer from './appSlice';
import circuitPlansReducer from './circuitPlansSlice';
import featuresReducer from './featuresSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    features: featuresReducer,
    circuitPlans: circuitPlansReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
