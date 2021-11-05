"use strict";

const gameboard = (()=>{
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