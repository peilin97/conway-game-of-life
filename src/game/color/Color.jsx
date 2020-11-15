import React, { useState } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import {
    setDeadColor,
    selectDeadColor,
    setLivingColor,
    selectLivingColor,
    toggleHeatMap,
} from './colorSlice';
import { selectStart } from '../buttons/gameStateSlice';
import './color.css';

export default function Color() {
    const dispatch = useDispatch();
    const livingColor = useSelector(selectLivingColor);
    const deadColor = useSelector(selectDeadColor);
    const start = useSelector(selectStart);
    const [displayLivingPicker, setLivingDisplay] = useState(false);
    const [displayDeadPicker, setDeadDisplay] = useState(false);

    const styles = reactCSS({
        default: {
            living: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `${livingColor}`,
            },
            dead: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `${deadColor}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
            linearGradient: {
                height:'15px',
                marginTop: '5px',
                marginBottom: '5px',
                width: '120px',
                background: `linear-gradient(to right, ${livingColor}, ${deadColor})`,
            },
        },
    });

    const handleLivingClick = () => {
        if (!start) {
            setLivingDisplay(!displayLivingPicker);
        }
    };

    const handleDeadClick = () => {
        if (!start) {
            setDeadDisplay(!displayDeadPicker);
        }
    };

    const handleLivingClose = () => {
        if (!start) {
            setLivingDisplay(false);
        }
    };

    const handleDeadClose = () => {
        if (!start) {
            setDeadDisplay(false);
        }
    };

    const handleLivingChange = color => {
        if (!start) {
            dispatch(setLivingColor(color.hex));
        }
    };

    const handleDeadChange = color => {
        if (!start) {
            dispatch(setDeadColor(color.hex));
        }
    };

    const handleHeatMap = () => {
        dispatch(toggleHeatMap());
    };

    return (
        <div>
            <div className="flexRow">
                    <div>
                        <div
                        className="floatText"
                        id = "living">Living</div>
                        <div style={styles.swatch} onClick={handleLivingClick}>
                            <div style={styles.living} />
                        </div>
                        {displayLivingPicker ? (
                            <div style={styles.popover}>
                                <div style={styles.cover} onClick={handleLivingClose} />
                                <SketchPicker
                                    color={livingColor}
                                    onChange={handleLivingChange}
                                />
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <div
                        id = "dead"
                        className="floatText">Dead</div>
                        <div style={styles.swatch} onClick={handleDeadClick}>
                            <div style={styles.dead} />
                        </div>
                        {displayDeadPicker ? (
                            <div style={styles.popover}>
                                <div style={styles.cover} onClick={handleDeadClose} />
                                <SketchPicker
                                    color={deadColor}
                                    onChange={handleDeadChange}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="flexRow">
                    <div>
                        <div className="floatText">
                            <label
                            className = "smallerText"
                            id = "colorGradient"
                            htmlFor="heatmap"
                            >Color Gradient</label>
                        </div>
                        <input type="checkbox" id="heatmap" onChange={handleHeatMap} />
                    </div>
                    <div>
                        <div
                            className="linearGradient"
                            style={styles.linearGradient}></div>
                    </div>
            </div>
        </div>
    );
}
