import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';
import { deleteObject } from '../../utils/filterUtil';

const initialState = {
    weeks: [],
    selectedWeek: {},
    status: 'idle',
    error: null
}

export const fetchWeeks = createAsyncThunk('week/fetchWeeks', async (gameID) => {
    const url = `week/?game=${gameID}`;
    const axe = axiosService.get(url);
    const response = await axe.then(res => res.data);
    return response;
});

export const postWeek = createAsyncThunk('week/postWeek', async (data) => {
    const axe = axiosService.post('week/', data);
    const response = await axe.then(res => 
        res.data
    );
    return response;
});

export const deleteWeek = createAsyncThunk('game/deleteWeek', async (idWeek) => {
    const url = `week/${idWeek}/`;
    const axe = axiosService.delete(url);
    const response = await axe.then(res => res.status);
    if (response === 204) {
        return idWeek;
    }
});

export const WeekSlice = createSlice({
    name: 'week',
    initialState,
    reducers: {
        setWeeks: (state, action) => {
            state.weeks = action.payload;
        },
        setSelectedWeek: (state, action) => {
            state.selectedWeek = state.weeks.find(w => w.id === action.payload);
        },
        weekAdded: (state, action) => {
            state.weeks.push(action.payload);
        },
        weekDeleted: (state, action) => {
            state.weeks = state.weeks.filter((w) => {
                w.id != action.payload;
            })
        },
        resetWeek: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchWeeks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchWeeks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.weeks = action.payload
            })
            .addCase(fetchWeeks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postWeek.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postWeek.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.weeks.push(action.payload);
            })
            .addCase(postWeek.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteWeek.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteWeek.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.weeks = deleteObject(state.weeks, action.payload)
            })
            .addCase(deleteWeek.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const {setWeeks, setSelectedWeek, weekAdded, weekDeleted, resetWeek} = WeekSlice.actions;

export default WeekSlice.reducer;