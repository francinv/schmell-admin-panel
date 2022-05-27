import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/user/userSlice';
import GameReducer from '../features/games/gameSlice';
import QuestionReducer from '../features/questions/questionSlice';
import WeekReducer from '../features/weeks/weekSlice';
import IdeaReducer from '../features/ideas/ideaSlice';
import TaskReducer from '../features/tasks/taskSlice';
import CommentReducer from '../features/comments/commentSlice';
import StatisticReducer from '../features/statistics/statisticSlice';
import AudioFileReducer from '../features/audiofiles/audioFileSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    game: GameReducer,
    question: QuestionReducer,
    week: WeekReducer,
    idea: IdeaReducer,
    task: TaskReducer,
    comment: CommentReducer,
    statistic: StatisticReducer,
    audioFile: AudioFileReducer
  },
});

export const AppDispatch = typeof store.dispatch
