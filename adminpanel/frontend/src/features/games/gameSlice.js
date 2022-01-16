import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    games: [],
    selectedGame: {},
    weeks: [],
    selectedWeek: {},
    questions: [],
}

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGames: (state, action) => {
            state.games = action.payload;
        },
        setSelectedGame: (state, action) => {
            state.selectedGame = action.payload;
        },
        setWeeks: (state, action) => {
            state.weeks = action.payload;
        },
        setSelectedWeek: (state, action) => {
            state.selectedWeek = action.payload;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
    }
})

export const {setGames, setSelectedGame, setWeeks, setSelectedWeek, setQuestions} = GameSlice.actions;

export default GameSlice.reducer;