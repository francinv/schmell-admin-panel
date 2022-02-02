import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../utils/axios';

const initialState = {
    activeUser: {},
    allUsers: [],
    isLoggedIn: false,
    status: 'idle',
    error: null
}

export const logIn = createAsyncThunk('auth/login', async (data) => {
    const axe = axiosService.post('auth/login/', data);
    const response = await axe.then(res => res.data);
    axe.catch(res => console.log(res));
    return response;
});

export const fetchUsers = createAsyncThunk('user/', async () => {
    const axe = axiosService.get('user/');
    const response = await axe.then(res => res.data);
    axe.catch(res => console.log(res));
    return response;
})

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.isLoggedIn = true;
            state.activeUser = action.payload.user;
            state.access = action.payload.access
        },
        setLogOut: (state) => {
            state.isLoggedIn = false;
            state.activeUser = {};
            state.access = '';
            localStorage.removeItem('refresh')
        },
    },
    extraReducers(builder) {
        builder
            .addCase(logIn.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.activeUser = action.payload.user
                localStorage.setItem('access', action.payload.access)
                localStorage.setItem('refresh', action.payload.refresh)
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
            .addCase(fetchUsers.pending, (state, action) => {
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
    }
})

export const {setLogIn, setLogOut} = UserSlice.actions;

export default UserSlice.reducer;