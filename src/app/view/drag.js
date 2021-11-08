import DOM from "./dom";

const Drag = (player, board, grid) => {
    let draggedShip;
    let shipSquareIndex;
    let hoveredCells = [];

    const resetHoveredCells = () => {
        hoveredCells.forEach((cell) => {
            cell.classList.remove("success");
        });
        hoveredCells = [];
    };

    const resetDraggedShip = () => {
        draggedShip = null;
    };

    const assignSquareIndex = (e) => {
        shipSquareIndex = e.target.dataset.index;
    };

    const dragStart = (e) => {
        draggedShip = e.target;
        setTimeout(() => {
            draggedShip.classList.add("invisible");
        }, 0);
    };

    const dragEnd = (e) => {
        const ship = e.target;
        ship.classList.remove("invisible");
        resetHoveredCells();
        resetDraggedShip();
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
        if (draggedShip) {
            const cell = e.target;

            // y0 and x0 are the coordinates of the cell where the cursor is currently
            const y0 = cell.dataset.y;
            const x0 = cell.dataset.x;

            const ship = player.ships[draggedShip.dataset.index];

            // subtracting accordingly so that the grid highlighting always starts from the beginning of the ship
            // even if the ship is not being dragged by the starting square of the ship
            const y = y0 - (ship.isHorizontal ? 0 : shipSquareIndex);
            const x = x0 - (ship.isHorizontal ? shipSquareIndex : 0);

            if (board.isValidPosition(ship, y, x)) {
                resetHoveredCells();

                if (ship.isHorizontal) {
                    for (let i = 0; i < ship.length; i++) {
                        grid.childNodes[y * 10 + x + i].classList.add(
                            "success"
                        );
                        hoveredCells.push(grid.childNodes[y * 10 + x + i]);
                    }
                } else {
                    for (let i = 0; i < ship.length; i++) {
                        grid.childNodes[(y + i) * 10 + x].classList.add(
                            "success"
                        );
                        hoveredCells.push(grid.childNodes[(y + i) * 10 + x]);
                    }
                }
            }
        }
    };

    const dragLeave = (e) => {};

    const dragDrop = (e) => {
        if (hoveredCells.length > 0 && draggedShip) {
            const y = Number(hoveredCells[0].dataset.y);
            const x = Number(hoveredCells[0].dataset.x);
            const ship = player.ships[draggedShip.dataset.index];

            if (board.isValidPosition(ship, y, x)) {
                board.placeShip(ship, y, x);
                DOM.renderGrid(board.board, grid, false);
                addGridCellListeners();
                // hoveredCells.forEach((cell) => {
                //     const placedShipSquare = document.createElement("div");
                //     placedShipSquare.classList.add("placed-ship-square");
                //     cell.appendChild(placedShipSquare);
                // });
                draggedShip.classList.add("removed");
                resetDraggedShip();
            }
        }
    };

    const addShipListeners = () => {
        const ships = document.querySelectorAll(".ship");
        ships.forEach((ship) => {
            ship.addEventListener("dragstart", dragStart);
            ship.addEventListener("dragend", dragEnd);
            ship.addEventListener("mousedown", assignSquareIndex);
        });
    };

    const addGridCellListeners = () => {
        const gridCells = grid.querySelectorAll(".grid-cell");
        gridCells.forEach((cell) => {
            cell.addEventListener("dragover", dragOver);
            cell.addEventListener("dragenter", dragEnter);
            cell.addEventListener("dragleave", dragLeave);
            cell.addEventListener("drop", dragDrop);
        });
    };

    const addDragDropListeners = () => {
        addShipListeners();
        addGridCellListeners();
    };

    return Object.freeze({
        addDragDropListeners,
        addShipListeners,
        addGridCellListeners,
    });
};

export default Drag;
