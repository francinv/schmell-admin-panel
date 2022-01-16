import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/user/userSlice';
import GameReducer from '../features/games/gameSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    game: GameReducer,
  },
});

export const AppDispatch = typeof store.dispatch
