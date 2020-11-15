import { createSlice } from '@reduxjs/toolkit';
import Gradient from 'javascript-color-gradient';

const colorGradient = new Gradient();
colorGradient.setGradient('#000000', '#FFFFFF');
colorGradient.setMidpoint(12);
const initialArray = colorGradient.getArray();

export const colorSlice = createSlice({
    name: 'color',
    initialState: {
        livingColor: '#000000',
        deadColor: '#FFFFFF',
        heatMap: false,
        colorGradientArray: initialArray,
    },
    reducers: {
        setLivingColor: (state, action) => {
            state.livingColor = action.payload;
            colorGradient.setGradient(action.payload, state.deadColor);
            state.colorGradientArray = colorGradient.getArray();
        },
        setDeadColor: (state, action) => {
            state.deadColor = action.payload;
            colorGradient.setGradient(state.livingColor, action.payload);
            state.colorGradientArray = colorGradient.getArray();
        },
        toggleHeatMap: state => {
            state.heatMap = !state.heatMap;
        },
    },
});

export const {
    setLivingColor,
    setDeadColor,
    toggleHeatMap,
} = colorSlice.actions;

export const selectLivingColor = state => state.color.livingColor;
export const selectDeadColor = state => state.color.deadColor;
export const selectHeatMap = state => state.color.heatMap;
export const selectColorGradientArray = state => state.color.colorGradientArray;

export default colorSlice.reducer;
