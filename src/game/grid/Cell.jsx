import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleCell,
    selectGrid,
    selectCellWidth,
    selectCellHeight,
} from './gridSlice';
import { selectStart } from '../buttons/gameStateSlice';
import {
    selectDeadColor,
    selectLivingColor,
    selectHeatMap,
    selectColorGradientArray,
} from '../color/colorSlice';

export default function Cell(props) {
    const dispatch = useDispatch();

    const grid = useSelector(selectGrid);
    const cellWidth = useSelector(selectCellWidth);
    const cellHeight = useSelector(selectCellHeight);
    const start = useSelector(selectStart);
    const livingColor = useSelector(selectLivingColor);
    const deadColor = useSelector(selectDeadColor);
    const heatMap = useSelector(selectHeatMap);
    const colorGradientArray = useSelector(selectColorGradientArray);

    const sizeStyle = {
             width: `${cellWidth}px`,
            height: `${cellHeight}px`,
    };

    let colorStyle = {}

    function addLifeStatus() {
        if (grid[props.pos[0]][props.pos[1]] === 1) {
            colorStyle.backgroundColor = `${livingColor}`;
        } else if (!heatMap) {
            colorStyle.backgroundColor = `${deadColor}`;
        } else {
            // build heat map for dead cells
            let val = -Number(grid[props.pos[0]][props.pos[1]]);
            colorStyle.backgroundColor = `${
                colorGradientArray[Number(val + 1)]
            }`;
        }
    }
    addLifeStatus();

    function clickCell() {
        if (!start) {
            dispatch(toggleCell(props.pos));
        }
    }

    return (
        <div
            className="gridCol"
            style={{...sizeStyle, ...colorStyle}}
            onClick={() => clickCell()}></div>
      
    );
}
