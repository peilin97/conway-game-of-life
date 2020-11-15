import { createSlice } from '@reduxjs/toolkit';

const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

const computeCellLength = (gridLength, num) => (gridLength / num).toFixed(2);

export const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        width: 50,
        height: 50,
        grid: [],
        livingNeighbors: [],
        count: 0,
        stage: 0,
    },
    reducers: {
        setSize: (state, action) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
        },
        initializeGridAndNeighbors: (state) => {
            for (let i = 0; i < state.height; i++) {
                let row = [];
                for (let j = 0; j < state.width; j++) {
                    row.push(Number(0));
                }
                state.livingNeighbors.push(row);
            }
            for (let i = 0; i < state.height; i++) {
                let row = [];
                for (let j = 0; j < state.width; j++) {
                    if (Math.random() < 0.05) {
                        // 1 - living
                        row.push(1);
                        state.count += 1;
                        for (let dir of DIRECTIONS) {
                            let x = Number(i) + Number(dir[0]);
                            let y = Number(j) + Number(dir[1]);
                            if (
                                x >= 0 &&
                                y >= 0 &&
                                x < state.height &&
                                y < state.width
                            ) {
                                state.livingNeighbors[x][y] += 1;
                            }
                        }
                    } else {
                        // set it to the max dead state
                        row.push(-10);
                    }
                }
                state.grid.push(row);
            }
        },
        toggleCell: (state, action) => {
            const i = action.payload[0];
            const j = action.payload[1];
            if (state.grid[i][j] === 1) {
                state.grid[i][j] = -10;
                state.count -= 1;
                for (let dir of DIRECTIONS) {
                    let x = Number(i) + Number(dir[0]);
                    let y = Number(j) + Number(dir[1]);
                    if (
                        x >= 0 &&
                        y >= 0 &&
                        x < state.height &&
                        y < state.width
                    ) {
                        state.livingNeighbors[x][y]--;
                    }
                }
            } else {
                state.grid[i][j] = 1;
                state.count += 1;
                for (let dir of DIRECTIONS) {
                    let x = Number(i) + Number(dir[0]);
                    let y = Number(j) + Number(dir[1]);
                    if (
                        x >= 0 &&
                        y >= 0 &&
                        x < state.height &&
                        y < state.width
                    ) {
                        state.livingNeighbors[x][y] += Number(1);
                    }
                }
            }
        },
        updateGridAndNeighbors: state => {
            // deep copy neighbors
            const newNeighbors = [];
            for (let i = 0; i < state.height; i++) {
                let row = [];
                for (let j = 0; j < state.width; j++) {
                    row.push(state.livingNeighbors[i][j]);
                }
                newNeighbors.push(row);
            }
            // update grid based on their livingneighbors
            // and also update the count and newNeighbors if necessary
            for (let i = 0; i < state.height; i++) {
                for (let j = 0; j < state.width; j++) {
                    if (
                        state.grid[i][j] === 1 &&
                        (state.livingNeighbors[i][j] < 2 ||
                            state.livingNeighbors[i][j] > 3)
                    ) {
                        state.grid[i][j] = 0;
                        state.count -= 1;
                        for (let dir of DIRECTIONS) {
                            let x = Number(i) + Number(dir[0]);
                            let y = Number(j) + Number(dir[1]);
                            if (
                                x >= 0 &&
                                y >= 0 &&
                                x < state.height &&
                                y < state.width
                            ) {
                                newNeighbors[x][y]--;
                            }
                        }
                    } else if (
                        state.grid[i][j] <= 0 &&
                        state.livingNeighbors[i][j] === 3
                    ) {
                        state.grid[i][j] = 1;
                        state.count += 1;
                        for (let dir of DIRECTIONS) {
                            let x = Number(i) + Number(dir[0]);
                            let y = Number(j) + Number(dir[1]);
                            if (
                                x >= 0 &&
                                y >= 0 &&
                                x < state.height &&
                                y < state.width
                            ) {
                                newNeighbors[x][y]++;
                            }
                        }
                    } else if (
                        state.grid[i][j] <= 0 &&
                        state.grid[i][j] > -10
                    ) {
                        state.grid[i][j] -= 1;
                    }
                }
            }
            state.livingNeighbors = newNeighbors;
            state.stage += 1;
        },
        setGridLength: state => {
            const windowWidth = window.innerWidth;
            let gridLength;
            if (windowWidth >= 1200) {
                gridLength = 700;
            } else if (windowWidth >= 992) {
                gridLength = 600;
            } else if (windowWidth >= 768) {
                gridLength = 500;
            } else if (windowWidth >= 500) {
                gridLength = 400;
            } else {
                gridLength = 300;
            }
            state.gridLength = gridLength;
        },
        setCellSize: state => {
            state.cellWidth = computeCellLength(state.gridLength, state.width);
            state.cellHeight = computeCellLength(state.gridLength, state.height);
        },
        resetGrid: state => {
            // state.width = 50;
            // state.height = 50;
            state.grid = [];
            state.livingNeighbors = [];
            state.count = 0;
            state.stage = 0;
            // state.gridLength = 0;
            // state.cellHeight = 0;
            // state.cellWidth = 0;
        },
        clearGrid: state => {
            state.count = 0;
            state.stage = 0;
            for (let i = 0; i < state.height; i++) {
                for (let j = 0; j < state.width; j++) {
                    state.grid[i][j] = Number(-10);
                    state.livingNeighbors[i][j] = Number(0);
                }
            }
        },
    },
});

export const {
    setSize,
    initializeGridAndNeighbors,
    toggleCell,
    updateGridAndNeighbors,
    setCellSize,
    resetGrid,
    clearGrid,
    setGridLength,
} = gridSlice.actions;

export const selectWidth = state => state.grid.width;
export const selectHeight = state => state.grid.height;
export const selectCount = state => state.grid.count;
export const selectGrid = state => state.grid.grid;
export const selectStage = state => state.grid.stage;
export const selectGridLength = state => state.grid.gridLength;
export const selectCellWidth = state => state.grid.cellWidth;
export const selectCellHeight = state => state.grid.cellHeight;

export default gridSlice.reducer;
