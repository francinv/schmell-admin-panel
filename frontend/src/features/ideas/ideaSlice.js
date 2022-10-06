import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';
import { deleteObject } from '../../utils/filterUtil';

const initialState = {
    ideas: [],
    status: 'idle',
    error: null
}

export const fetchIdeas = createAsyncThunk('idea/fetchIdea', async () => {
    return axiosService
        .get(`admin/idea/`)
        .then(res => res.data);
});

export const postIdea = createAsyncThunk('idea/postIdea', async (data) => {
    return axiosService
        .post('admin/idea/', data)
        .then(res => res.data);
});

export const deleteIdea = createAsyncThunk('idea/deleteIdea', async (idIdea) => {
    if (await axiosService.delete(`admin/idea/${idIdea}/`).then(res => res.status)) {
        return idIdea;
    }
});

export const IdeaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchIdeas.pending, state => {
                state.statusByWeek = 'loading'
            })
            .addCase(fetchIdeas.fulfilled, (state, action) => {
                state.statusByWeek = 'succeeded'
                state.ideas = action.payload;
            })
            .addCase(fetchIdeas.rejected, (state, action) => {
                state.statusByWeek = 'failed'
                state.error = action.error.message
            })
            .addCase(postIdea.pending, state => {
                state.status = 'loading'
            })
            .addCase(postIdea.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ideas = state.ideas.push(action.payload);
            })
            .addCase(postIdea.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteIdea.pending, state => {
                state.status = 'loading'
            })
            .addCase(deleteIdea.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ideas = deleteObject(state.ideas, action.payload);
            })
            .addCase(deleteIdea.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default IdeaSlice.reducer;