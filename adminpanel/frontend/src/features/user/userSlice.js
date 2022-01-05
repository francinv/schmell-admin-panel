import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeUser: {},
    isLoggedIn: false,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true;
        }
    }
})

export const {logIn} = UserSlice.actions;

export default UserSlice.reducer;