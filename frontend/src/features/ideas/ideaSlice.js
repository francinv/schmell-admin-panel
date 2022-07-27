import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';
import { deleteObject } from '../../utils/filterUtil';
import { getIdeaList } from '../../utils/ideaUtil';

const initialState = {
    gameIdeas: [],
    devIdeas: [],
    designIdeas: [],
    variousIdeas: [],
    status: 'idle',
    error: null
}

export const fetchIdeas = createAsyncThunk('idea/fetchIdea', async (category) => {
    return axiosService
        .get(`admin/idea/?category=${category}`)
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
                if (action.payload.length !== 0) {
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
                }
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
            .addCase(deleteIdea.pending, state => {
                state.status = 'loading'
            })
            .addCase(deleteIdea.fulfilled, (state, action) => {
                state.status = 'succeeded'
                switch(getIdeaList(state.gameIdeas, state.devIdeas, state.designIdeas, state.variousIdeas, action.payload)) {
                    case 'G':
                        state.gameIdeas = deleteObject(state.gameIdeas, action.payload);
                        break;
                    case 'D':
                        state.devIdeas = deleteObject(state.devIdeas, action.payload);
                        break;
                    case 'W':
                        state.designIdeas = deleteObject(state.designIdeas, action.payload);
                        break;
                    case 'E':
                        state.variousIdeas = deleteObject(state.variousIdeas, action.payload);
                        break;
                    default: 
                        break;
                }
            })
            .addCase(deleteIdea.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default IdeaSlice.reducer;