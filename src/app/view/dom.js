import { WIDTH, SHIPS } from "../helpers/data";
import ELEMENTS from "./elements";

const DOM = (() => {
    const clearGrid = (grid) => {
        grid.textContent = "";
    };
    const renderGrid = (board, grid, isAi) => {
        clearGrid(grid);
        for (let i = 0; i < WIDTH; i++) {
            for (let j = 0; j < WIDTH; j++) {
                const gridCell = document.createElement("div");
                const boardCell = board[i][j];

                gridCell.classList.add("grid-cell");
                gridCell.dataset.y = i;
                gridCell.dataset.x = j;

                if (boardCell === "miss") {
                    gridCell.classList.add("miss");
                } else if (boardCell.ship) {
                    if (boardCell.hit) {
                        gridCell.classList.add("danger");
                    } else {
                        if (!isAi) {
                            const placedShipSquare =
                                document.createElement("div");
                            placedShipSquare.classList.add(
                                "placed-ship-square"
                            );
                            gridCell.appendChild(placedShipSquare);
                        }
                    }
                }

                grid.appendChild(gridCell);
            }
        }
    };

    const createShips = (container) => {
        SHIPS.forEach((ship, index) => {
            const shipEle = document.createElement("div");
            shipEle.classList.add("ship", ship.id);
            shipEle.draggable = true;
            shipEle.dataset.index = index;

            for (let i = 0; i < ship.length; i++) {
                const shipSquare = document.createElement("div");
                shipSquare.classList.add("ship-square", `${ship.id}-${i}`);
                shipSquare.dataset.index = i;
                shipEle.appendChild(shipSquare);
            }

            container.appendChild(shipEle);
        });
    };

    const changeOrientation = () => {
        ELEMENTS.shipsContainer.classList.toggle("horizontal");
        ELEMENTS.shipsContainer.classList.toggle("vertical");
    };

    const resetOrientation = () => {
        ELEMENTS.shipsContainer.classList.add("horizontal");
        ELEMENTS.shipsContainer.classList.remove("vertical");
    };

    const hideShips = () => {
        const ships = document.querySelectorAll(".ship");
        ships.forEach((ship) => {
            ship.classList.add("removed");
        });
    };

    const showShips = () => {
        const ships = document.querySelectorAll(".ship");
        ships.forEach((ship) => {
            ship.classList.remove("removed");
        });
    };

    const showModal = (text) => {
        ELEMENTS.modelText.textContent = text;
        ELEMENTS.modalBg.style.display = "flex";
    };

    const hideModal = () => {
        ELEMENTS.modelText.textContent = "";
        ELEMENTS.modalBg.style.display = "none";
    };

    const hidePlayAgainButton = () => {
        ELEMENTS.playAgainBtn.classList.add("invisible");
    };

    const showPlayAgainButton = () => {
        ELEMENTS.playAgainBtn.classList.remove("invisible");
    };

    const startGame = () => {
        ELEMENTS.p2Grid.classList.remove("invisible");
        ELEMENTS.shipsContainer.classList.add("invisible");
        ELEMENTS.controlBtns.classList.add("invisible");
        ELEMENTS.startBtn.classList.add("invisible");
        ELEMENTS.playerNames.forEach((name) => {
            name.classList.remove("invisible");
        });
    };

    const resetGame = () => {
        ELEMENTS.p2Grid.classList.add("invisible");
        ELEMENTS.shipsContainer.classList.remove("invisible");
        ELEMENTS.controlBtns.classList.remove("invisible");
        ELEMENTS.startBtn.classList.remove("invisible");
        ELEMENTS.playerNames.forEach((name) => {
            name.classList.add("invisible");
        });
    };

    return Object.freeze({
        renderGrid,
        createShips,
        changeOrientation,
        resetOrientation,
        clearGrid,
        hideShips,
        showShips,
        showModal,
        hideModal,
        showPlayAgainButton,
        hidePlayAgainButton,
        startGame,
        resetGame,
    });
})();

export default DOM;
