"use strict";

const gameboard = (() => {
    let gameboardFields = [
        ["X", "", "O"],
        ["O", "X", "X"],
        ["", "", "O"]
    ];

    const showGameboard = () => gameboardFields;
    return {
        showGameboard
    }
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return { getName, getMark };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const gameFlow = (() => {
    
})();

const displayController = (() => {
    
})();