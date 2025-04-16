import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPlaying: null,
    currentSongId: null,
    currentSongData: null,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        playSong: (state, action) => {
            state.currentSongId = action.payload.id;
            state.currentSongData = action.payload.data;
        },
        pauseSong: (state) => {
            state.isPlaying = false;
        },
        setPlaying: (state) => {
            state.isPlaying = true;
        },
        setIdSong: (state, action) => {
            state.currentSongId = action.payload;
        },
    },
});
export const { playSong, pauseSong, setPlaying, setIdSong } = playerSlice.actions;

export default playerSlice.reducer;
