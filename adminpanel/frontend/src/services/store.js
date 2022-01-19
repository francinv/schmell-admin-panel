import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/user/userSlice';
import GameReducer from '../features/games/gameSlice';
import QuestionReducer from '../features/questions/questionSlice';
import WeekReducer from '../features/weeks/weekSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    game: GameReducer,
    question: QuestionReducer,
    week: WeekReducer,
  },
});

export const AppDispatch = typeof store.dispatch
