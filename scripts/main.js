"use strict";

const gameboard = (() => {
    let gameboardFields = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
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
        let currentPlayer = gameFlow.getPlayerOnTurn();
        let mark = currentPlayer.getMark();
        gameboardFields[y][x] = mark;
    };
    
    for (let i = 1; i < 10; i++){
        let indexString = "box" + i.toString();
        const currentBox = document.querySelector(`#${indexString}`);
        currentBox.addEventListener("click", () => {
            const list = currentBox.classList;
            const [y, x] = getCoordinates(list);

            if (gameboard.checkIfLegalMove(y, x) == true) {
                console.log("before move" + gameFlow.turnOfPlayer.getInternalName());
                gameboard.addMark(y, x);
                
                displayController.renderGameboard();
                gameFlow.switchTurn();
                console.log("after passing switch turn to gameboard"+gameFlow.turnOfPlayer.getInternalName());
                console.log("my new method " +gameFlow.getPlayerOnTurn().getInternalName());
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

const Player = (nameOnDisplay, mark, internalName) => {
    const getNameOnDisplay = () => nameOnDisplay;
    const getMark = () => mark;
    const getInternalName = () => internalName;

    return { getNameOnDisplay, getMark, getInternalName };
};

const player1 = Player("Player 1", "X", "player1");
const player2 = Player("Player 2", "O", "player2");

const gameFlow = (() => {
    let endOfGame = false;
    let turnOfPlayer = player1;
    const switchTurn = () => {
        console.log("before switching turn"+turnOfPlayer.getInternalName());
        if (turnOfPlayer.getInternalName() == "player1") {
            turnOfPlayer = player2;
        } else {
            turnOfPlayer = player1;
        }
        console.log("after switching turn"+turnOfPlayer.getInternalName());
    }

    const getPlayerOnTurn = () => turnOfPlayer;
    
    
    return { endOfGame, turnOfPlayer, switchTurn, getPlayerOnTurn };
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
