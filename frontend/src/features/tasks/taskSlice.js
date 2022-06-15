import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../services/axiosService';

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
    
    const axe = axiosService.get(url);
    const response = await axe.then(res => res.data);
    return response;
});

export const postTask = createAsyncThunk('task/postTask', async (data) => {
    const url = 'tasks/task/';
    const axe = axiosService.post(url, data)
    const response = await axe.then(res => res.data)
    axe.catch(res => console.log(res));
    return response;
});

export const updateTask = createAsyncThunk('task/updateTask', async (content) => {
    const { id, data } = content;
    const url = `tasks/task/${id}/`;
    const axe = axiosService.patch(url, data);
    const response = await axe.then(res => res.data);
    axe.catch(res => console.log(res));
    return response;
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
            .addCase(fetchTasks.pending, (state, action) => {
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
            .addCase(postTask.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(postTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateTask.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {resetStatus, setSortState, setStatusState, setPriorityState, setResponsibleState, setP, setPageSize, setSelected} = TaskSlice.actions;

export default TaskSlice.reducer;
