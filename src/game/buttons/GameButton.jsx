import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleGame,
    stopGame,
    selectPlay,
    selectStart,
    selectPlaySign,
} from './gameStateSlice';
import {
    resetGrid,
    selectCount,
    initializeGridAndNeighbors,
    updateGridAndNeighbors,
    clearGrid,
} from '../grid/gridSlice';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faForward,
    faTimes,
    faRandom,
} from '@fortawesome/free-solid-svg-icons';
import './buttons.css';

export default function GameButton() {
    const dispatch = useDispatch();
    const play = useSelector(selectPlay);
    const start = useSelector(selectStart);
    const count = useSelector(selectCount);
    const playSign = useSelector(selectPlaySign);

    const toggleState = () => {
        if (count > 0) {
            dispatch(toggleGame());
        }
    };

    const resetState = () => {
        dispatch(stopGame());
        dispatch(resetGrid());
        dispatch(initializeGridAndNeighbors());
    };

    const handleNext = () => {
        if (!start) {
            dispatch(updateGridAndNeighbors());
        }
    };

    const handleClear = () => {
        dispatch(stopGame());
        dispatch(clearGrid());
    };

    return (
        <div className="flexRow">
                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={toggleState}>
                        <FontAwesomeIcon
                            id="start"
                            className="fontAwesomeIcon"
                            icon={playSign}
                        />
                        {play}
                    </Button>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={handleNext}>
                        <FontAwesomeIcon
                            id="next"
                            className="fontAwesomeIcon"
                            icon={faForward}
                        />
                        Next
                    </Button>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={resetState}>
                        <FontAwesomeIcon
                            id="reset"
                            className="fontAwesomeIcon"
                            icon={faRandom}
                        />
                        Reset
                    </Button>
                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={handleClear}>
                        <FontAwesomeIcon
                            id="clear"
                            className="fontAwesomeIcon"
                            icon={faTimes}
                        />
                        Clear
                    </Button>
        </div>
    );
}
