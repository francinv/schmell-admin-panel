import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../utils/axios';

const initialState = {
    comments: [],
    status: 'idle',
    error: null,
}

export const fetchComments = createAsyncThunk('comment/fetchComments/', async (taskId) => {
    let url = `comment/?task=${taskId}`
    const axe = axiosService.get(url);
    const response = await axe.then(res => res.data);
    return response;
});

export const postComment = createAsyncThunk('comment/postComment/', async (data) => {
    const url = 'comment/';
    const axe = axiosService.post(url, data)
    const response = await axe.then(res => res.data)
    axe.catch(res => console.log(res));
    return response;
});

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        resetCommentStatus: (state) => {
            state.status = 'idle';
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {
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
            .addCase(postComment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments.push(action.payload);
            })
            .addCase(postComment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {resetCommentStatus} = CommentSlice.actions;

export default CommentSlice.reducer;