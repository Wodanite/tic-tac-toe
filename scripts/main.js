"use strict";

const gameboard = (() => {
    let gameboardFields = [
        ["X", "", "O"],
        ["O", "X", "X"],
        ["", "", "O"]
    ];

    const showGameboard = (y, x) => gameboardFields[y][x];

    const checkIfLegalMove = (x, y) => {
        console.log(gameboard.showGameboard(x, y));
        if (gameboard.showGameboard(x, y) == "") {
            return true;
        } else {
            return false;
        }
    };
    
    for (let i = 1; i < 10; i++){
        let indexString = "box" + i.toString();
        const currentBox = document.querySelector(`#${indexString}`);
        currentBox.addEventListener("click", () => {
            const list = currentBox.classList;
            const [x, y] = getCoordinates(list);
            console.log(x, y);
            console.log(gameboard.checkIfLegalMove(x,y));
        });
    }

    function getCoordinates(list) {
        let x = 0;
        let y = 0;

        const coordinate = list[0];
        x = coordinate.slice(1, 2);
        y = coordinate.slice(3);
        console.log(x, y);
        return [x, y];
    }

    return { showGameboard, checkIfLegalMove, getCoordinates };
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return { getName, getMark };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const gameFlow = (() => {
    let endOfGame = false;
    let turnOfPlayer = player1;
    const switchTurn = () => {
        if (turnOfPlayer = player1) {
            turnOfPlayer = player2;
        } else {
            turnOfPlayer = player1;
        }
    }
    /*
    do {





        displayController.renderGameboard();
        gameFlow.switchTurn();
    } while (endOfGame == false);
    */
    return { endOfGame, turnOfPlayer, switchTurn };
})();

const displayController = (() => {
    const renderGameboard = () => {
        let id = 1;
        for (let y = 0; y < 3; y++){
            for (let x = 0; x < 3; x++){
                let mark = gameboard.showGameboard(x, y);
                let indexString = "box" + id.toString();
                const currentBox = document.querySelector(`#${indexString}`);
                currentBox.textContent = mark;
                id++;
            }
        }
    }
    return { renderGameboard };
})();

displayController.renderGameboard();