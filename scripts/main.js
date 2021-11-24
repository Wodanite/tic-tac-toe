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

    const resetFields = () => {
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                gameboardFields[y][x] = "";
            }
        }
    }

    const addFunctionalityToGrid = () => {
        for (let i = 1; i < 10; i++) {
            let indexString = "box" + i.toString();
            const currentBox = document.querySelector(`#${indexString}`);
            currentBox.addEventListener("click", function doStuffOnClick() {
                const [isEndOfGame, isDraw] = gameFlow.checkEndOfGame();
                if (isEndOfGame == false) {
                    const list = currentBox.classList;
                    const [y, x] = getCoordinates(list);

                    if (gameboard.checkIfLegalMove(y, x) == true) {
                        gameboard.addMark(y, x);

                        displayController.renderGameboard();
                        const [isEndOfGame, isDraw] = gameFlow.checkEndOfGame();
                        console.log(isEndOfGame, isDraw);
                        if (isEndOfGame == false) {
                            gameFlow.switchTurn();
                        } else {
                            if (isEndOfGame == true && isDraw == false) {
                                displayController.announceWinner();
                            } else {
                                displayController.announceDraw();
                            }
                        }
                    }
                }

            });
        }
    }

    function getCoordinates(list) {
        let y = 0;
        let x = 0;

        const coordinate = list[0];
        y = coordinate.slice(1, 2);
        x = coordinate.slice(3);
        return [y, x];
    }

    return { showGameboard, checkIfLegalMove, getCoordinates, addMark, addFunctionalityToGrid, resetFields };
})();

const Player = (nameOnDisplay, mark, internalName) => {
    const getNameOnDisplay = () => nameOnDisplay;
    const getMark = () => mark;
    const getInternalName = () => internalName;

    return { getNameOnDisplay, getMark, getInternalName };
};

const player1 = Player("Player 1", "X", "player1");
const player2 = Player("Player 2", "O", "player2");

const displayController = (() => {
    const announcementsDisplay = document.querySelector("#announcementsDisplay");
    const restartButton = document.querySelector("#restartButton");
    const nameDisplayPlayer1 = document.querySelector("#nameDisplayPlayer1");
    const nameDisplayPlayer2 = document.querySelector("#nameDisplayPlayer2");
    const changeNameButtonPlayer1 = document.querySelector("#changeNameButtonPlayer1");
    const changeNameButtonPlayer2 = document.querySelector("#changeNameButtonPlayer2");

    const renderGameboard = () => {
        let id = 1;
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let mark = gameboard.showGameboard(y, x);
                let indexString = "box" + id.toString();
                const currentBox = document.querySelector(`#${indexString}`);
                currentBox.textContent = mark;
                id++;
            }
        }
    }

    const announceWinner = () => {
        announcementsDisplay.textContent = `The winner is ${gameFlow.getPlayerOnTurn().getNameOnDisplay()}!`;
    }

    const announceDraw = () => {
        announcementsDisplay.textContent = `It's a Draw!`;
    }

    restartButton.addEventListener("click", () => {
        gameFlow.restart();
    });

    const changePlayerName = () => {

    }

    const nameButtons = document.querySelectorAll(".playerSection button");
    nameButtons.forEach((button) => {
        button.addEventListener("click", () => {
            displayController.addFormDiv();
        });
    });

    const addFormDiv = () => {
        const nameForm = document.createElement("div");
        nameForm.setAttribute("class", "nameForm");
        document.querySelector(".gameboardSection").appendChild(nameForm);
        nameForm.innerHTML = "<form><p>Change Name</p><div class='inputContainer'><label for='name'>Name</label><input type='text' name='name' id='nameInput'></div><div class='buttonContainer'><button id='cancelButton'>Cancel</button><button id='changeButton'>OK</button></form>";
    }

    return { renderGameboard, announceWinner, announceDraw, changePlayerName, addFormDiv };
})();

const gameFlow = (() => {
    displayController.renderGameboard();
    gameboard.addFunctionalityToGrid();
    let turnOfPlayer = player1;

    const switchTurn = () => {
        if (turnOfPlayer.getInternalName() == "player1") {
            turnOfPlayer = player2;
        } else {
            turnOfPlayer = player1;
        }
    }

    const getPlayerOnTurn = () => turnOfPlayer;

    const checkEndOfGame = () => {
        let endOfGame = false;
        let isDraw = false;
        let marks = ["", "", ""];
        let currentMark = turnOfPlayer.getMark();
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                marks[x] = gameboard.showGameboard(y, x);
            }
            if (marks[0] == currentMark && marks[1] == currentMark && marks[2] == currentMark) {
                endOfGame = true;
            }
        }
        if (endOfGame == false) {
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    marks[y] = gameboard.showGameboard(y, x);
                }
                if (marks[0] == currentMark && marks[1] == currentMark && marks[2] == currentMark) {
                    endOfGame = true;
                }
            }
        }
        if (endOfGame == false) {
            for (let i = 0; i < 3; i++) {
                marks[i] = gameboard.showGameboard(i, i);
            }
            if (marks[0] == currentMark && marks[1] == currentMark && marks[2] == currentMark) {
                endOfGame = true;
            }
        }
        if (endOfGame == false) {
            for (let x = 0; x < 3; x++) {
                marks[x] = gameboard.showGameboard(2 - x, x);
            }
            if (marks[0] == currentMark && marks[1] == currentMark && marks[2] == currentMark) {
                endOfGame = true;
            }
        }
        if (endOfGame == false) {
            let voidRowsCount = 0;
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    marks[x] = gameboard.showGameboard(y, x);
                }
                if (marks.includes("") == false) {
                    voidRowsCount++;
                }
            }
            if (voidRowsCount == 3) {
                endOfGame = true;
                isDraw = true;
            }
        }
        return [endOfGame, isDraw];
    }

    const restart = () => {
        gameboard.resetFields();
        displayController.renderGameboard();
        announcementsDisplay.textContent = "";
        turnOfPlayer = player1;
    }

    return { turnOfPlayer, switchTurn, getPlayerOnTurn, checkEndOfGame, restart };
})();