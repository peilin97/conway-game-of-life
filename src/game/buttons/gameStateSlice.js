import { createSlice } from '@reduxjs/toolkit';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: {
        start: false,
        play: 'Start',
        disabled: 'disabled',
        playSign: faPlay,
    },
    reducers: {
        toggleGame: state => {
            state.playSign = !state.start ? faPause : faPlay;
            state.start = !state.start;
            state.play = state.play === 'Start' ? 'Pause' : 'Start';
            state.disabled = state.disabled === 'disabled' ? '' : 'disabled';
        },
        stopGame: state => {
            state.start = false;
            state.play = 'Start';
            state.disabled = 'disabled';
            state.playSign = faPlay;
        },
    },
});

export const { toggleGame, stopGame } = gameStateSlice.actions;

export const selectStart = state => state.gameState.start;
export const selectPlay = state => state.gameState.play;
export const selectPlaySign = state => state.gameState.playSign;

export default gameStateSlice.reducer;
