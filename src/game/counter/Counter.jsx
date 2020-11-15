import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount, selectStage } from '../grid/gridSlice';

export default function Counter() {
    const count = Number(useSelector(selectCount));
    const stage = Number(useSelector(selectStage));
    let countWord = '';
    let stageWord = '';
    countWord = 'Living cells: ' + count;
    stageWord = 'stage: ' + stage;

    return (
        <div className="flexRow">
            <span className="largeText">{countWord}</span>
            <span className="largeText">{stageWord}</span>
        </div>
    );
}