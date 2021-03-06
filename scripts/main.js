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
                    if (displayController.getFormIsActive() == false) {
                        const list = currentBox.classList;
                        const [y, x] = getCoordinates(list);

                        if (gameboard.checkIfLegalMove(y, x) == true) {
                            gameboard.addMark(y, x);

                            displayController.renderGameboard();
                            const [isEndOfGame, isDraw] = gameFlow.checkEndOfGame();
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
    const setNameOnDisplay = (nameInput) => {
        nameOnDisplay = nameInput;
    }

    return { getNameOnDisplay, getMark, getInternalName, setNameOnDisplay };
};

const player1 = Player("Player 1", "x", "player1");
const player2 = Player("Player 2", "o", "player2");

const displayController = (() => {
    const announcementsDisplay = document.querySelector("#announcementsDisplay");
    const restartButton = document.querySelector("#restartButton");
    let formIsActive = false;

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
        if (displayController.getFormIsActive() == false) {
            gameFlow.restart();
        }
    });

    const nameButtons = document.querySelectorAll(".playerSection button");
    nameButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (displayController.getFormIsActive() == false) {
                formIsActive = true;
                let buttonId = button.id;
                let internalPlayerName = getInternalPlayerName(buttonId);
                let nameOnDisplay = "";
                let player = player2;
                if (player1.getInternalName() == internalPlayerName) {
                    player = player1;
                }
                nameOnDisplay = player.getNameOnDisplay();
                let nameForm = displayController.createFormDiv(nameOnDisplay);
                document.querySelector(".gameboardSection").appendChild(nameForm);

                const cancelButton = document.querySelector("#cancelButton");
                const changeButton = document.querySelector("#changeButton");

                cancelButton.addEventListener("click", () => {
                    formIsActive = false;
                    document.querySelector(".gameboardSection").removeChild(nameForm);
                });
                changeButton.addEventListener("click", () => {
                    formIsActive = false;
                    let newPlayerName = document.querySelector("#nameInput").value;
                    player.setNameOnDisplay(newPlayerName);
                    let displayName = "nameDisplayPlayer" + buttonId.slice(-1);
                    document.querySelector(`#${displayName}`).innerText = player.getNameOnDisplay();
                    document.querySelector(".gameboardSection").removeChild(nameForm);
                });
            }
        });
    });

    const createFormDiv = (nameOnDisplay) => {
        const nameForm = document.createElement("div");
        nameForm.setAttribute("class", "nameForm");

        nameForm.innerHTML = `<p class='formTitle'>Change Name</p><div class='inputContainer'><label for='name'>Name</label><input type='text' name='name' id='nameInput' value='${nameOnDisplay}' maxlength='12'></div><div class='buttonContainer'><button id='cancelButton'>Cancel</button><button id='changeButton'>OK</button>`;
        return nameForm;
    }

    function getInternalPlayerName(buttonId) {
        let internalPlayerName = buttonId.slice(-1);
        internalPlayerName = "player" + internalPlayerName;
        return internalPlayerName;
    }

    const getFormIsActive = () => formIsActive;

    return { renderGameboard, announceWinner, announceDraw, createFormDiv, getFormIsActive };
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