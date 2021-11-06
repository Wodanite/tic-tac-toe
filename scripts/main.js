"use strict";

const gameboard = (() => {
    let gameboardFields = [
        ["X", "", "O"],
        ["O", "X", "X"],
        ["", "", "O"]
    ];

    const showGameboard = (y, x) => gameboardFields[y][x];

    const checkIfLegalMove = (y, x) => {
        if (gameboard.showGameboard(y, x) == "") {
            return true;
        } else {
            return false;
        }
    };

    const addMark = (y, x) => {
        let mark = player1.getMark();
        gameboardFields[y][x] = mark;

    };
    
    for (let i = 1; i < 10; i++){
        let indexString = "box" + i.toString();
        const currentBox = document.querySelector(`#${indexString}`);
        currentBox.addEventListener("click", () => {
            const list = currentBox.classList;
            const [y, x] = getCoordinates(list);

            console.log(y, x)
            console.log(gameboard.showGameboard(y, x))

            if (gameboard.checkIfLegalMove(y, x) == true) {
                gameboard.addMark(y, x);
                console.log("new mark " + gameboard.showGameboard(y, x))

                displayController.renderGameboard();
                gameFlow.switchTurn();
            }

        });
    }

    function getCoordinates(list) {
        let y = 0;
        let x = 0;

        const coordinate = list[0];
        y = coordinate.slice(1, 2);
        x = coordinate.slice(3);
        return [y, x];
    }

    return { showGameboard, checkIfLegalMove, getCoordinates, addMark };
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
                let mark = gameboard.showGameboard(y, x);
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