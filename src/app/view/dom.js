import { WIDTH, SHIPS } from "../helpers/data";
import ELEMENTS from "./elements";

const DOM = (() => {
    const clearGrid = (grid) => {
        grid.textContent = "";
    };
    const renderGrid = (board, grid) => {
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
                        grid.classList.add("danger");
                    } else {
                        const placedShipSquare = document.createElement("div");
                        placedShipSquare.classList.add("placed-ship-square");
                        gridCell.appendChild(placedShipSquare);
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

    const changeDirection = () => {
        ELEMENTS.shipsContainer.classList.toggle("horizontal");
        ELEMENTS.shipsContainer.classList.toggle("vertical");
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

    return Object.freeze({
        renderGrid,
        createShips,
        changeDirection,
        clearGrid,
        hideShips,
        showShips,
    });
})();

export default DOM;
