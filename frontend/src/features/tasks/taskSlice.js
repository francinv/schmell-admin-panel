import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../utils/axios';
import { deleteObject } from '../../utils/filterUtil';
import { getIdeaList } from '../../utils/ideaUtil';

const initialState = {
    tasks: [],
    status: 'idle',
    error: null
}

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (content) => {
    
    const url = `task?sort=${category}`
    const axe = axiosService.get(url);
    const response = await axe.then(res => res.data);
    return response;
});

export const postIdea = createAsyncThunk('idea/postIdea', async (data) => {
    const url = 'idea/';
    const axe = axiosService.post(url, data)
    const response = await axe.then(res => res.data)
    axe.catch(res => console.log(res));
    return response;
});

export const deleteIdea = createAsyncThunk('idea/deleteIdea', async (idIdea) => {
    const url = `idea/${idIdea}/`;
    const axe = axiosService.delete(url);
    const response = await axe.then(res => res.status);
    if (response === 204) {
        return idIdea;
    }
});

export const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchIdeas.pending, (state, action) => {
                state.statusByWeek = 'loading'
            })
            .addCase(fetchIdeas.fulfilled, (state, action) => {
                state.statusByWeek = 'succeeded'
                switch (action.payload[0].category) {
                    case 'G':
                        state.gameIdeas = action.payload;
                        break
                    case 'D':
                        state.devIdeas = action.payload;
                        break
                    case 'W':
                        state.designIdeas = action.payload;
                        break
                    case 'E':
                        state.variousIdeas = action.payload;
                }
            })
            .addCase(fetchIdeas.rejected, (state, action) => {
                state.statusByWeek = 'failed'
                state.error = action.error.message
            })
            .addCase(postIdea.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postIdea.fulfilled, (state, action) => {
                state.status = 'succeeded'
                switch (action.payload.category) {
                    case 'G':
                        state.gameIdeas.push(action.payload);
                        break
                    case 'D':
                        state.devIdeas.push(action.payload);
                        break
                    case 'W':
                        state.designIdeas.push(action.payload);
                        break
                    case 'E':
                        state.variousIdeas.push(action.payload);
                }
            })
            .addCase(postIdea.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteIdea.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteIdea.fulfilled, (state, action) => {
                state.status = 'succeeded'
                switch(getIdeaList(state.gameIdeas, state.devIdeas, state.designIdeas, state.variousIdeas, action.payload)) {
                    case 'G':
                        state.gameIdeas = deleteObject(state.gameIdeas, action.payload);
                    case 'D':
                        state.devIdeas = deleteObject(state.devIdeas, action.payload);
                    case 'W':
                        state.designIdeas = deleteObject(state.designIdeas, action.payload);
                    case 'E':
                        state.variousIdeas = deleteObject(state.variousIdeas, action.payload);
                }
            })
            .addCase(deleteIdea.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {resetStatus} = IdeaSlice.actions;

export default IdeaSlice.reducer;