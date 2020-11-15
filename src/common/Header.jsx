import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import LifeSimulation from '../game/LifeSimulation';
import Instruction from '../instruction/Instruction';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    return (
        <Router>
            <Navbar
                bg="light"
                variant="light"
                fixed="top"
                className="justify-content-between">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <div className="hide">
                    <Navbar.Brand href="/">
                        Conway's Game of Life
                    </Navbar.Brand>
                </div>
                <Navbar.Brand href="/instruction">Instruction</Navbar.Brand>
            </Navbar>
            <Switch>
                <Route path="/instruction">
                    <Instruction />
                </Route>
                <Route path="/lifesimulation">
                    <LifeSimulation />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
