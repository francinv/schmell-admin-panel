import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeUser: {},
    isLoggedIn: true,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
        }
    }
})

export const {logIn, logOut} = UserSlice.actions;

export default UserSlice.reducer;