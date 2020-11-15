import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectGrid,
    updateGridAndNeighbors,
    setCellSize,
    setGridLength,
} from './gridSlice';
import { selectStart } from '../buttons/gameStateSlice';
import { selectSpeed } from '../speed/speedSlice';
import Cell from './Cell';
import './grid.css';

export default function Grid() {
    const grid = useSelector(selectGrid);
    const start = useSelector(selectStart);
    const speed = useSelector(selectSpeed);

    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (start) {
                dispatch(updateGridAndNeighbors());
            }
        }, Number(speed));
        const handleResize = () => {
            dispatch(setGridLength());
            dispatch(setCellSize());
        };
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    });

    return (
        <div className="flexRow">
            <div className="gridContainer">
                {grid.map(function (row, rowId) {
                    return (
                        <div className="gridRow">
                            {row.map((val, colId) => (
                                <Cell pos={[rowId, colId]} />
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
