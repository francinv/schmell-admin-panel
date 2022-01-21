import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosService from '../../utils/axios';

const initialState = {
    activeUser: {},
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
                state.isLoggedIn = true
            })
            .addCase(logIn.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {setLogIn, setLogOut} = UserSlice.actions;

export default UserSlice.reducer;