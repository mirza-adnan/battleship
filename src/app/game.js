import Player from "./factories/player";
import GameBoard from "./factories/gameboard";
import DOM from "./view/dom";
import Drag from "./view/drag";
import ELEMENTS from "./view/elements";

function Game() {
    const player1 = Player(1);
    const player2 = Player(2, "computer");

    const p1GameBoard = GameBoard();
    const p2GameBoard = GameBoard();

    const p1Drag = Drag(player1, p1GameBoard, ELEMENTS.p1Grid);

    const changeDirection = () => {
        player1.invertShips();
        DOM.changeDirection();
    };

    const autoPlace = () => {
        p1GameBoard.reset();
        player1.ships.forEach((ship) => {
            p1GameBoard.autoPlaceShip(ship);
        });
        DOM.hideShips();
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid);
        p1Drag.addDragDropListeners();
    };

    const reset = () => {
        p1GameBoard.reset();
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid);
        DOM.showShips();
    };

    const startGame = () => {};

    const addButtonListeners = () => {
        const changeDirBtn = document.querySelector(".change-direction");
        changeDirBtn.addEventListener("click", changeDirection);

        const autoPlaceBtn = document.querySelector(".auto-place");
        autoPlaceBtn.addEventListener("click", autoPlace);

        const resetBtn = document.querySelector(".reset");
        resetBtn.addEventListener("click", reset);
    };

    const init = () => {
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid);
        DOM.createShips(ELEMENTS.shipsContainer);
        p1Drag.addDragDropListeners();
        addButtonListeners();
    };

    return Object.freeze({
        init,
    });
}

export default Game;
