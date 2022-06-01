import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';

const initialState = {
    users_count: '',
    game_count: '',
    questions_count: '',
    task_unsolved: '',
    task_overdue: '',
    task_development: '',
    task_game:'',
    task_design: '',
    task_marketing:'',
    task_economy: '',
    count_by_game: '',
    solved_by_me: 0,
    status: 'idle',
    error: null,
}

export const fetchStatistics = createAsyncThunk('statistic/fetchStatistics', async () => {
    let url = 'statistics';
    const axe = axiosService.get(url);
    const response = await axe.then(res => res.data);
    return response;
});


export const StatisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        resetStatistics: (state) => {
            state.status='idle';
        },
        addCountByGame: (state, action) => {
            state.count_by_game['N'+action.payload] += 1;
            state.questions_count += 1;
        },
        subCountByGame: (state, action) => {
            if (state.count_by_game['N'+action.payload] > 0) {
                state.count_by_game['N'+action.payload] -= 1;
            }
            else {
                state.count_by_game['N'+action.payload] = 0;
            }

            if (state.questions_count > 0) {
                state.questions_count -= 1;
            }
            else {
                state.questions_count = 0;
            }
        },
        addSolved: (state) => {
            state.solved_by_me += 1;
        },
        addGameCountGame: (state, action) => {
            state.count_by_game["N"+action.payload.id] = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStatistics.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users_count = action.payload.Users.count;
                state.game_count = action.payload.Game.count;
                state.questions_count = action.payload.Questions.total_count;
                state.count_by_game = action.payload.Questions.count_by_game;
                state.task_unsolved = action.payload.Task.unsolved;
                state.task_overdue = action.payload.Task.overdue;
                state.task_development = action.payload.Task.development;
                state.task_game = action.payload.Task.game;
                state.task_design = action.payload.Task.design;
                state.task_marketing = action.payload.Task.marketing;
                state.task_economy = action.payload.Task.economy;
                
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {resetStatistics, addCountByGame, subCountByGame, addSolved, addGameCountGame} = StatisticSlice.actions;

export default StatisticSlice.reducer;