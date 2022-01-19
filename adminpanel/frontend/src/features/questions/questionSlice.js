import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../utils/axios';
import { deleteObject } from '../../utils/filterUtil';

const initialState = {
    allQuestions: [],
    questionsByWeek: [],
    status: 'idle',
    statusAll: 'idle',
    statusByWeek: 'idle',
    error: null
}

export const fetchQuestions = createAsyncThunk('question/fetchQuestions', async () => {
    const axe = axiosService.get('question/');
    const response = await axe.then(res => res.data);
    return response;
});

export const fetchQuestionByWeek = createAsyncThunk('question/fetchQuestionsByWeek', async (idWeek) => {
    const url = `question?related_week=${idWeek}`;
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
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        questionAdded: (state, action) => {
            state.questions.push(action.payload);
        },
        questionDeleted: (state, action) => {
            state.questions = state.questions.filter((q) => {
                q.id != action.payload;
            })
        },
        questionUpdated: (state, action) => {
            const {id, type, question_desc, hint, phase} = action.payload;
            const existingQuestion = state.questions.find(q => q.id === id);
            if (existingQuestion) {
                existingQuestion.type = type;
                existingQuestion.question_desc = question_desc;
                existingQuestion.hint = hint;
                existingQuestion.phase = phase;
            }
        },
        resetAllQuestions: (state) => {
            state.statusAll = 'idle';
            state.allQuestions = [];
        },
        resetQuestionByWeek: (state) => {
            state.statusByWeek = 'idle';
            state.questionsByWeek = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuestionByWeek.pending, (state, action) => {
                state.statusByWeek = 'loading'
            })
            .addCase(fetchQuestionByWeek.fulfilled, (state, action) => {
                state.statusByWeek = 'succeeded'
                state.questionsByWeek = state.questionsByWeek.concat(action.payload);
            })
            .addCase(fetchQuestionByWeek.rejected, (state, action) => {
                state.statusByWeek = 'failed'
                state.error = action.error.message
            })
            .addCase(postQuestion.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.questionsByWeek.push(action.payload);
                state.allQuestions.push(action.payload);
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
                const {id, type, question_desc, hint, phase} = action.payload;
                const existingQuestion = state.allQuestions.find(q => q.id === id);
                if (existingQuestion) {
                    existingQuestion.type = type;
                    existingQuestion.question_desc = question_desc;
                    existingQuestion.hint = hint;
                    existingQuestion.phase = phase;
                }
                const existQuestion = state.questionsByWeek.find(q => q.id === id);
                if (existQuestion) {
                    existQuestion.type = type;
                    existQuestion.question_desc = question_desc;
                    existQuestion.hint = hint;
                    existQuestion.phase = phase;
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
                state.questionsByWeek = deleteObject(state.questionsByWeek, action.payload)
                state.allQuestions = deleteObject(state.allQuestions, action.payload)
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchQuestions.pending, (state, action) => {
                state.statusAll = 'loading'
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.statusAll = 'succeeded'
                state.allQuestions = state.allQuestions.concat(action.payload);
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.statusAll = 'failed'
                state.error = action.error.message
            })
    }
})

export const {setQuestions, questionAdded, questionDeleted, descLogoUpdated, questionUpdated, resetAllQuestions, resetQuestionByWeek} = QuestionSlice.actions;

export default QuestionSlice.reducer;