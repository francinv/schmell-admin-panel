import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export const AppDispatch = typeof store.dispatch
