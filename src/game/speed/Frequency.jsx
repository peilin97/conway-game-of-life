import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpeed, setSpeed } from './speedSlice';
import { selectStart } from '../buttons/gameStateSlice';

export default function Frequency() {
    const frq = useSelector(selectSpeed);
    const start = useSelector(selectStart);
    const dispatch = useDispatch();
    return (
        <div className="flexRow">
            <div>
                <label className="smallerText" for="speed">
                    Speed: {(frq / 1000).toFixed(2)} s
                </label>
            </div>
            <div>
                <input
                type="range"
                className="custom-range"
                min="50"
                max="2000"
                id="speed"
                value={frq}
                disabled={start ? 'disabled' : null}
                onChange={e => dispatch(setSpeed(e.target.value))}
                ></input>
            </div>
        </div>
    );
}
