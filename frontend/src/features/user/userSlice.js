import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService, { authService } from '../../services/axiosService';

const initialState = {
    activeUser: {},
    allUsers: [],
    isLoggedIn: false,
    status: 'idle',
    error: null
}

export const logIn = createAsyncThunk('auth/login', async (data) => {
    return authService
        .post('login/', data)
        .then(res => res.data);
});

export const fetchUsers = createAsyncThunk('user/', async () => {
    return axiosService
        .get('auth/user/')
        .then(res => res.data);
})

export const updateUser = createAsyncThunk('user/updateUser', async (data) => {
    const {id, content} = data;
    return axiosService
        .patch(`auth/user/${id}/`, content)
        .then(res => res.data);
})

export const updatePassword = createAsyncThunk('user/updatePassword', async (data) => {
    const {id, content} = data;
    return axiosService
        .patch(`auth/password/${id}/`, {password: content})
        .then(res => res.data);
})

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.isLoggedIn = true;
            state.activeUser = action.payload;
        },
        setLogOut: (state) => {
            state.isLoggedIn = false;
            state.activeUser = {};
            localStorage.removeItem('refresh');
            localStorage.removeItem('access');
            localStorage.removeItem('user');
        },
    },
    extraReducers(builder) {
        builder
            .addCase(logIn.pending, state => {
                state.status = 'loading'
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.activeUser = action.payload.user
                localStorage.setItem('access', action.payload.access)
                localStorage.setItem('refresh', action.payload.refresh)
                localStorage.setItem('user', action.payload.user.id)
                let temp = localStorage.getItem('refresh');
                if (temp === undefined) {
                    alert('Could not set refresh token. Try logging out and in.');
                }
                state.isLoggedIn = true
            })
            .addCase(logIn.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchUsers.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.allUsers = action.payload;
                state.isLoggedIn = true
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(updateUser.pending, state => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.activeUser = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updatePassword.pending, state => {
                state.status = 'loading';
            })
            .addCase(updatePassword.fulfilled, state => {
                state.status = 'succeeded';
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {setLogIn, setLogOut} = UserSlice.actions;

export default UserSlice.reducer;