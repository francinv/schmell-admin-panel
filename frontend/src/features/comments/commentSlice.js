import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';

const initialState = {
    comments: [],
    status: 'idle',
    error: null,
}

export const fetchComments = createAsyncThunk('comment/fetchComments/', async (taskId) => { 
    return axiosService.get(`tasks/comment/?task=${taskId}`).then(res => res.data);
});

export const postComment = createAsyncThunk('comment/postComment/', async (data) => {
    return axiosService.post('tasks/comment/', data).then(res => res.data);
});

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {}, 
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postComment.pending, state => {
                state.status = 'loading'
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments.push(...action.payload);
            })
            .addCase(postComment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default CommentSlice.reducer;