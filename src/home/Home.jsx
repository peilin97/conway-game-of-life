import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    resetGrid,
    initializeGridAndNeighbors,
    setCellSize,
    setGridLength,
} from '../game/grid/gridSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './home.css';

export default function Home() {
    const dispatch = useDispatch();
    dispatch(resetGrid());
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);

    const handleSizeChange = () => {
        dispatch({
            type: 'grid/setSize',
            payload: { width: width, height: height },
        });
        dispatch(initializeGridAndNeighbors());
        dispatch(setGridLength());
        dispatch(setCellSize());
    };

    return (
        <div className="customJumbotron homeContainer">
            <h1>First, set the width and the height!</h1>
            <Form>
                <Form.Group controlId="forWidth">
                    <Form.Label>Width: {width} cells</Form.Label>
                    <Form.Control
                        custom
                        type="range"
                        min="10"
                        max="100"
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="forHeight">
                    <Form.Label>Height: {height} cells</Form.Label>
                    <Form.Control
                        custom
                        type="range"
                        min="10"
                        max="100"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Link onClick={handleSizeChange} exact to={'/lifesimulation'}>
                <Button variant="outline-dark">Enter the Game</Button>
            </Link>
        </div>
    );
}
