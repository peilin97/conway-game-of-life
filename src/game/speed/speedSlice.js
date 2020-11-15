import { createSlice } from '@reduxjs/toolkit';

export const speedSlice = createSlice({
    name: 'speed',
    initialState: {
        speed: 1000,
    },
    reducers: {
        setSpeed: (state, action) => {
            state.speed = action.payload;
        },
    },
});

export const { setSpeed } = speedSlice.actions;

export const selectSpeed = state => state.speed.speed;

export default speedSlice.reducer;
