import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';
import { deleteObject } from '../../utils/filterUtil';

const initialState = {
    questions: [] ,
    status: 'idle',
    error: null
}

export const fetchQuestions = createAsyncThunk('question/fetchQuestions', async (idWeek) => {
    let url = '';
    if (idWeek != undefined || idWeek != '') {
        url = `cms/question/?related_week=${idWeek}`
    } else {
        url = 'cms/question/'
    }
    return axiosService
        .get(url)
        .then(res => res.data);
});

export const postQuestion = createAsyncThunk('question/postQuestion', async (data) => {
    return axiosService
        .post('cms/question/', data)
        .then(res => res.data);
});

export const updateQuestion = createAsyncThunk('question/updateQuestion', async (content) => {
    const url = `cms/question/${content.id}/`
    return axiosService
        .put(url, content.content)
        .then(res => res.data);
});

export const deleteQuestion = createAsyncThunk('question/deleteQuestion', async (idQuestion) => {
    const url = `cms/question/${idQuestion}/`;
    const axe = axiosService.delete(url);
    const response = await axe.then(res => res.status);
    if (response === 204) {
        return idQuestion;
    }
});

export const QuestionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        resetQuestions: (state) => {
            state.status = 'idle';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postQuestion.pending, state => {
                state.status = 'loading'
            })
            .addCase(postQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.questions.push(action.payload);
            })
            .addCase(postQuestion.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateQuestion.pending, state => {
                state.status = 'loading'
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const {id, type, question_desc, phase, read_out_file} = action.payload;
                const existingQuestion = state.questions.find(q => q.id === id);
                if (existingQuestion) {
                    existingQuestion.type = type;
                    existingQuestion.question_desc = question_desc;
                    existingQuestion.function = action.payload.function;
                    existingQuestion.phase = phase;
                    existingQuestion.read_out_file = read_out_file;
                }
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteQuestion.pending, state => {
                state.status = 'loading'
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.questions = deleteObject(state.questions, action.payload)
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchQuestions.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { resetQuestions } = QuestionSlice.actions;

export default QuestionSlice.reducer;