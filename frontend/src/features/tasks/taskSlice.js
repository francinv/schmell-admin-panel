import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';
import { replaceUsingMap } from '../../utils/filterUtil';

const initialState = {
    count: 0,
    previous: '',
    next: '',
    tasks: [],
    status: 'idle',
    error: null,
    sortState: 'PUBL_DESC',
    statusState: '',
    priorityState: '',
    responsibleState: '',
    page_size: 10,
    p: 1,
    selectedTask: {}
}

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (content) => {
    const sort = content.sort;
    const status = content.status;
    const priority = content.priority;
    const responsible = content.responsible;
    const page_size = content.page_size;
    const p = content.p;

    let url = `tasks/task/?sort=${sort}`;
    if (status !== '') url += `&status=${status}`;
    if (priority !== '') url += `&priority=${priority}`;
    if (responsible !== '') url += `&responsible=${responsible}`;
    if (page_size !== '') url += `&page_size=${page_size}`;
    if (p !== '') url += `&p=${p}`;
    
    return axiosService
        .get(url)
        .then(res => res.data);
});

export const postTask = createAsyncThunk('task/postTask', async (data) => {
    return axiosService
        .post('tasks/task/', data)
        .then(res => res.data);
});

export const updateTask = createAsyncThunk('task/updateTask', async (content) => {
    const { id, data } = content;
    console.log(data);
    return axiosService
        .patch(`tasks/task/${id}/`, data)
        .then(res => res.data);
})

export const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setSortState: (state, action) => {
            state.sortState = action.payload;
        },
        setStatusState: (state, action) => {
            state.statusState = action.payload;
        },
        setPriorityState: (state, action) => {
            state.priorityState = action.payload;
        },
        setResponsibleState: (state, action) => {
            state.responsibleState = action.payload;
        },
        setPageSize: (state, action) => {
            state.page_size = action.payload;
        },
        resetStatus: (state) => {
            state.status = 'idle';
        },
        setP: (state, action) => {
            state.p = action.payload;
        },
        setSelected: (state, action) => {
            console.log(action.payload);
            state.selectedTask = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
                state.tasks = action.payload.results;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(postTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.tasks.length < state.page_size && state.sortState === 'PUBL_DESC') {
                    state.tasks.unshift(action.payload);
                }
                state.count++
            })
            .addCase(postTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tasks = replaceUsingMap(state.tasks, action.payload);
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {resetStatus, setSortState, setStatusState, setPriorityState, setResponsibleState, setP, setPageSize, setSelected} = TaskSlice.actions;

export default TaskSlice.reducer;
