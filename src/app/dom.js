import { WIDTH, SHIPS, ELEMENTS } from "./helpers/data";

const DOM = (() => {
    const populateGrid = (grid) => {
        for (let i = 0; i < WIDTH; i++) {
            for (let j = 0; j < WIDTH; j++) {
                const gridCell = document.createElement("div");
                gridCell.classList.add("grid-cell");
                gridCell.dataset.y = i;
                gridCell.dataset.x = j;
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

    return Object.freeze({
        populateGrid,
        createShips,
    });
})();

export default DOM;
