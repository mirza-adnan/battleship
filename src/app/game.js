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
        player1.autoPlaceAllShips(p1GameBoard);
        DOM.hideShips();
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid, false);
        p1Drag.addDragDropListeners();
    };

    const reset = () => {
        p1GameBoard.reset();
        player1.resetShips();
        DOM.resetDirection();
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid, false);
        p1Drag.addGridCellListeners();
        DOM.showShips();
    };

    const toggleTurns = () => {
        player1.toggleTurn();
        player2.toggleTurn();
    };

    const attackHandler = (e) => {
        const cell = e.currentTarget;
        const y = cell.dataset.y;
        const x = cell.dataset.x;

        if (player1.turn) {
            if (p2GameBoard.isValidAttack(y, x)) {
                player1.attack(p2GameBoard, y, x);
                toggleTurns();
                DOM.renderGrid(p2GameBoard.board, ELEMENTS.p2Grid, true);
                addAttackListeners();
            }
        }

        if (p2GameBoard.areShipsSunk()) {
            const text = "Player 1 Wins";
            DOM.showModal(text);
        }

        if (player2.turn) {
            player2.randomAttack(p1GameBoard);
            setTimeout(
                DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid, false),
                3000
            );
            toggleTurns();
        }

        if (p1GameBoard.areShipsSunk()) {
            const text = "Player 2 Wins";
            DOM.showModal(text);
        }
    };

    const startGame = () => {
        addAttackListeners();
        player2.autoPlaceAllShips(p2GameBoard);
        DOM.startGame();
    };

    const addButtonListeners = () => {
        const changeDirBtn = document.querySelector(".change-direction");
        changeDirBtn.addEventListener("click", changeDirection);

        const autoPlaceBtn = document.querySelector(".auto-place");
        autoPlaceBtn.addEventListener("click", autoPlace);

        const resetBtn = document.querySelector(".reset");
        resetBtn.addEventListener("click", reset);

        const startBtn = document.querySelector(".start-btn");
        startBtn.addEventListener("click", startGame);
    };

    const addAttackListeners = () => {
        const gridCells = ELEMENTS.p2Grid.querySelectorAll(".grid-cell");
        gridCells.forEach((cell) => {
            cell.addEventListener("click", attackHandler);
        });
    };

    const init = () => {
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid, false);
        DOM.renderGrid(p2GameBoard.board, ELEMENTS.p2Grid, true);
        DOM.createShips(ELEMENTS.shipsContainer);
        p1Drag.addDragDropListeners();
        addButtonListeners();
    };

    return Object.freeze({
        init,
    });
}

export default Game;
