import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../utils/axios';
import { deleteObject } from '../../utils/filterUtil';

const initialState = {
    questions: [] ,
    status: 'idle',
    error: null
}

export const fetchQuestions = createAsyncThunk('question/fetchQuestions', async (idWeek) => {
    let url = '';
    if (idWeek != undefined || idWeek != '') {
        url = `question/?related_week=${idWeek}`
    } else {
        url = 'question/'
    }
    const axe = axiosService.get(url);
    const response = await axe.then(res => res.data);
    return response;
});

export const postQuestion = createAsyncThunk('question/postQuestion', async (data) => {
    const url = 'question/';
    const axe = axiosService.post(url, data)
    const response = axe.then(res => res.data)
    axe.catch(res => console.log(res));
    return response;
});

export const updateQuestion = createAsyncThunk('question/updateQuestion', async (content) => {
    const url = `question/${content.id}/`
    const axe = axiosService.put(url, content.content)
    const response = axe.then(res => res.data)
    axe.catch(res => console.log(res));
    return response;
});

export const deleteQuestion = createAsyncThunk('question/deleteQuestion', async (idQuestion) => {
    const url = `question/${idQuestion}/`;
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
            .addCase(postQuestion.pending, (state, action) => {
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
            .addCase(updateQuestion.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const {id, type, question_desc, hint, phase, read_out_file} = action.payload;
                const existingQuestion = state.questions.find(q => q.id === id);
                if (existingQuestion) {
                    existingQuestion.type = type;
                    existingQuestion.question_desc = question_desc;
                    existingQuestion.hint = hint;
                    existingQuestion.phase = phase;
                    existingQuestion.read_out_file = read_out_file;
                }
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteQuestion.pending, (state, action) => {
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
            .addCase(fetchQuestions.pending, (state, action) => {
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