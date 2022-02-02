import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../utils/axios';
import { deleteObject, replaceObject } from '../../utils/filterUtil';

const initialState = {
    games: [],
    selectedGame: {},
    status: 'idle',
    error: null
}

export const fetchGames = createAsyncThunk('game/fetchGames', async () => {
    const axe = axiosService.get('game/');
    const response = await axe.then(res => res.data);
    return response;
});

export const postGame = createAsyncThunk('game/postGame', async (data) => {
    const axe = axiosService.post('game/', data);
    const response = await axe.then(res => 
        res.data
    );
    return response;
});

export const updateGame = createAsyncThunk('game/updateGame', async (content) => {
    const url = `game/${content.id}/`;
    const axe = axiosService.put(url, content.content)
    const response = await axe.then(res => res.data)
    axe.catch(res => console.log(res));
    return response;
});

export const putStatus = createAsyncThunk('game/putStatus', async (data) => {
    const url = `game/${data.id}/`;
    const axe = axiosService.put(url, {'status': data.content})
    const response = await axe.then(res => res.data);
    axe.catch(res => console.log(res));
    return response;
});

export const deleteGame = createAsyncThunk('game/deleteGame', async (idGame) => {
    const url = `game/${idGame}/`;
    const axe = axiosService.delete(url);
    const response = await axe.then(res => res.status);
    if (response === 204) {
        return idGame;
    }
});

export const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGames: (state, action) => {
            state.games = state.games.concat(action.payload);
        },
        setSelectedGame: (state, action) => {
            state.selectedGame = state.games.find(g => g.id === action.payload);
        },
        descLogoUpdated: (state, action) => {
            const {id, description, logo} = action.payload;
            const existingGame = state.games.find(g => g.id === id);
            if (existingGame) {
                existingGame.description = description;
                existingGame.logo = logo;
            }
            state.selectedGame.description = description;
            state.selectedGame.logo = logo;
        },
        gameAdded: (state, action) => {
            state.games.push(action.payload);
        },
        gameDeleted: (state, action) => {
            state.games = state.games.filter((g) => {
                g.id != action.payload;
            })
        },
        statusUpdated: (state, action) => {
            const {id, status} = action.payload;
            state.selectedGame.status = status;
            const existingGame = state.games.find(g => g.id === id);
            if (existingGame) {
                existingGame.status = status;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGames.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.games = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postGame.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postGame.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.games.push(action.payload);
            })
            .addCase(postGame.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(putStatus.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(putStatus.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const {id, status} = action.payload;
                state.selectedGame.status = status;
                const existingGame = state.games.find(g => g.id === id);
                if (existingGame) {
                    existingGame.status = status;
                }
            })
            .addCase(putStatus.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteGame.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.games = deleteObject(state.games, action.payload)
            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })    
            .addCase(updateGame.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateGame.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.selectedGame = action.payload
                state.games = replaceObject(state.games, action.payload)
            })
            .addCase(updateGame.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })  
    }
})

export const {setGames, setSelectedGame, descLogoUpdated, gameAdded, gameDeleted, statusUpdated} = GameSlice.actions;

export default GameSlice.reducer;