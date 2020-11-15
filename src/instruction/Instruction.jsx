import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import parse from 'html-react-parser';
import './instruction.css';

export default function Instruction() {
    const questions = [
        "What is Conway's Game of Life?",
        'How does the game work?',
        'What are the rules of the game?',
        'What do the width and the height of the grid mean?',
        'About colors of living and dead cells',
        'About the color gradient option',
    ];
    const answers = [
        '<p>The Game of Life is a cellular-automaton,\
        zero player game, developed by John Conway in 1970.\
        The game is played on an infinite grid of square cells,\
        and its evolution is only determined by its initial state.\
        </p>\
        <p>\
        <a href="http://web.mit.edu/sp.268/www/2010/lifeSlides.pdf">\
        reference</a>\
        </p>',
        '<p>Conway’s Game of Life (henceforth, <b>​Life</b>​)\
        is based on a grid system.\
        Every individual location on the grid can\
        be understood as a ​<b>cell</b>​.\
        The game, or simulation, occurs over iterations,\
        or <b>generations</b>​.\
        After a generation, a cell may change from ​living​ or ​dead​ based\
        on how many <b>living</b> or <b>dead</b>\
        neighbors it had in a previous iteration.\
        A <b>​neighbor</b>​ is any immediately adjacent\
        spot on the grid\
        (horizontal, vertical or diagonal).\
        </p>',
        '<p>Life has 4 simple rules:</p>\
        <ol>\
            <li>A living cell with less than two living neighbours dies.</li>\
            <li>A living cell with two or three live neighbours lives.</li>\
            <li>A living cell with more than three live neighbours dies.</li>\
            <li>A dead cell with exactly three live neighbours becomes a live cell,\
            as if by reproduction.</li>\
        </ol>',
        '<p>\
            Width decides the number of cells on each row,\
            and height decides the number of celss on each column.\
            The maximum width or height you can set is 100,\
            and the minimum width or height you can set is 10.\
            In default, the width and the height are both 50.\
        </p>',
        "<p>\
        In default, dead cells are in white, and living cells are in black.\
        You can change both of their colors when the game\
        is not in the playing state.\
        You also could seen each dead cell's\
        It is better to choose two easily distinguishable colors.\
        </p>",
        '<p>\
        By selecting the color gradient option,\
        the color of a cell will represent how it was alive.\
        When a cell is currently alive,\
        it is in the same color with the one you choose for a living cell.\
        When a cell has been dead for 10 or more iterations,\
        it is in the same color with the one you choose for a dead cell.\
        For every iteration in between, it reflects that\
        spot on the gradient.\
        </p>',
    ];
    const initialOpens = [];
    for (let i = 0; i < answers.length; i++) {
        initialOpens.push(false);
    }
    const [opens, setOpens] = useState(initialOpens);

    const handleOpen = id => {
        let newOpens = [...opens];
        newOpens[id] = !opens[id];
        setOpens(newOpens);
    };

    return (
        <div className="customJumbotron instruction">
            {questions.map(function (q, id) {
                return (
                    <div className="instructionItem">
                        <Button
                            variant="light"
                            className="uniInstruction instructionButton"
                            onClick={() => handleOpen(id)}
                            aria-controls={id}
                            aria-expanded={opens[id]}>
                            {parse(q)}
                        </Button>
                        <Collapse in={opens[id]} className="uniInstruction">
                            <div
                            className="answer"
                            id={id}>
                                {parse(answers[id])}
                            </div>
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
}
