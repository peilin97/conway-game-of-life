import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './game/grid/gridSlice';
import gameStateReducer from './game/buttons/gameStateSlice';
import speedReducer from './game/speed/speedSlice';
import colorReducer from './game/color/colorSlice';

const store = configureStore({
    reducer: {
        grid: gridReducer,
        gameState: gameStateReducer,
        speed: speedReducer,
        color: colorReducer,
    },
});

export default store;
