import Player from "./factories/player";
import GameBoard from "./factories/gameboard";
import DOM from "./view/dom";
import Drag from "./view/drag";
import ELEMENTS from "./view/elements";
import { SHIPS } from "./helpers/data";

const Game = (() => {
    const player1 = Player(1);
    const player2 = Player(2, "computer");

    const p1GameBoard = GameBoard();
    const p2GameBoard = GameBoard();

    const p1Drag = Drag(player1, p1GameBoard, ELEMENTS.p1Grid);

    const changeDirection = () => {
        player1.invertShips();
        DOM.changeOrientation();
    };

    const autoPlace = () => {
        p1GameBoard.reset();
        player1.autoPlaceAllShips(p1GameBoard);
        DOM.hideShips();
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid, false);
        p1Drag.addDragDropListeners();
    };

    const resetShips = () => {
        p1GameBoard.reset();
        player1.resetShips();
        DOM.resetOrientation();
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid, false);
        p1Drag.addGridCellListeners();
        DOM.showShips();
    };

    const resetGame = () => {
        player1.reset();
        player2.reset();
        p1GameBoard.reset();
        p2GameBoard.reset();

        DOM.resetGame();
        DOM.resetOrientation();
        DOM.showShips();
        DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid);
        DOM.renderGrid(p2GameBoard.board, ELEMENTS.p2Grid);
        DOM.hideModal();

        p1Drag.addGridCellListeners();
    };

    const toggleTurns = () => {
        player1.toggleTurn();
        player2.toggleTurn();
    };

    const closeModal = (e) => {
        if (e.target.classList.contains("modal-bg")) {
            DOM.hideModal();
        }
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
            DOM.showPlayAgainButton();
            DOM.showModal(text);
            return;
        }

        if (player2.turn) {
            player2.randomAttack(p1GameBoard);
            setTimeout(() => {
                DOM.renderGrid(p1GameBoard.board, ELEMENTS.p1Grid, false);
                player1.toggleTurn();
            }, 250);
            player2.setTurn(false);
        }

        if (p1GameBoard.areShipsSunk()) {
            const text = "Player 2 Wins";
            DOM.showPlayAgainButton();
            DOM.showModal(text);
            return;
        }
    };

    const startGame = () => {
        if (p1GameBoard.placedShips.length === SHIPS.length) {
            addAttackListeners();
            player2.autoPlaceAllShips(p2GameBoard);
            DOM.startGame();
        } else {
            DOM.hidePlayAgainButton();
            DOM.showModal("Place all your ships");
        }
    };

    const addEventListeners = () => {
        ELEMENTS.changeOrientationBtn.addEventListener(
            "click",
            changeDirection
        );
        ELEMENTS.autoPlaceBtn.addEventListener("click", autoPlace);
        ELEMENTS.resetBtn.addEventListener("click", resetShips);
        ELEMENTS.startBtn.addEventListener("click", startGame);
        ELEMENTS.modalBg.addEventListener("click", closeModal);
        ELEMENTS.playAgainBtn.addEventListener("click", resetGame);
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
        addEventListeners();
    };

    return Object.freeze({
        init,
    });
})();

export default Game;
