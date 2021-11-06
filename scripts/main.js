"use strict";

const gameboard = (() => {
    let gameboardFields = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const showGameboard = () => gameboardFields;
    return {
        showGameboard
    }
})();

console.log(gameboard.showGameboard());

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return { getName, getMark };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

console.log(player1.getName());
console.log(player2.getMark());