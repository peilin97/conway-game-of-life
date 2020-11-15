import React from 'react';
import Grid from './grid/Grid';
import Counter from './counter/Counter';
import GameButton from './buttons/GameButton';
import Frequency from './speed/Frequency';
import Color from './color/Color';
import './lifeSimulation.css';

export default function LifeSimulation() {
    return (
        <div className="customJumbotron">
            <div className="flexRow lifeSimulation">
                <div>
                    <Color />
                    <GameButton />
                    <Frequency />
                    <Counter />
                </div>
                <Grid />
            </div>
        </div>
    );
}
