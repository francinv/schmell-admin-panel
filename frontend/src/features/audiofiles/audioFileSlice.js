import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';

const initialState = {
    count: 0,
    previous: '',
    next: '',
    files: [],
    status: 'idle',
    error: null,
    questionid: '',
    question: '',
    page_size: 10,
    p: 1,
}

export const fetchAudioFiles = createAsyncThunk('audioFiles/fetchAudioFiles', async content => {
    const { question, page_size, p } = content;
    let url = `cms/files/readout/`;
    if (question !== '') url += `?question=${question}`;
    if (page_size !== 10) url += `&page_size=${page_size}`;
    if (p !== 1) url += `&p=${p}`;

    return axiosService
        .get(url)
        .then(res => res.data);
});

export const addAudioFile = createAsyncThunk('audioFiles/addAudioFile', async data => {
    return axiosService
        .post('cms/files/readout/', data)
        .then(res => res.data);
});

export const deleteAudioFile = createAsyncThunk('audioFiles/deleteAudioFile', async id => {
    const url = `cms/files/readout/${id}/`;
    const axe = axiosService.delete(url);
    const response = await axe.then(res => res.status);
    if (response === 204) {
        return id;
    }
})

export const AudioFileSlice = createSlice({
    name: 'audioFile',
    initialState,
    reducers: {
        setQuestionId: (state, action) => {
            state.questionid = action.payload;
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        setPageSize: (state, action) => {
            state.page_size = action.payload;
        },
        resetStatus: (state) => {
            state.status = 'idle';
        },
        setP: (state, action) => {
            state.p = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAudioFiles.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchAudioFiles.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
                state.files = action.payload.results;
            })
            .addCase(fetchAudioFiles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addAudioFile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addAudioFile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (state.files.length < state.page_size) {
                    state.files.push(action.payload);
                }
                state.count++;
            })
            .addCase(addAudioFile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteAudioFile.pending, state => {
                state.status = 'loading'
            })
            .addCase(deleteAudioFile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (state.files.length < state.page_size) {
                    state.files = state.files.filter(file => file.id !== action.payload);
                }
                state.count--;
            })
            .addCase(deleteAudioFile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {resetStatus, setQuestionId, setQuestion, setP, setPageSize} = AudioFileSlice.actions;

export default AudioFileSlice.reducer;
