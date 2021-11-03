const Drag = (player, board, grid) => {
    let draggedShip;
    let shipSquareIndex;
    let hoveredCells = [];

    const removeSuccessClass = () => {
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
        removeSuccessClass();
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
                removeSuccessClass();
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
            } else {
                console.log("invalid position");
            }
        }
    };

    const dragLeave = (e) => {};

    const dragDrop = (e) => {
        if (draggedShip) {
            hoveredCells.forEach((cell) => {
                const placedShipSquare = document.createElement("div");
                placedShipSquare.classList.add("placed-ship-square");
                cell.appendChild(placedShipSquare);
            });
            draggedShip.remove();
            resetDraggedShip();
        }
    };

    const addDragDropListeners = () => {
        const ships = document.querySelectorAll(".ship");
        ships.forEach((ship) => {
            ship.addEventListener("dragstart", dragStart);
            ship.addEventListener("dragend", dragEnd);
            ship.addEventListener("mousedown", assignSquareIndex);
        });

        const gridCells = grid.querySelectorAll(".grid-cell");
        gridCells.forEach((cell) => {
            cell.addEventListener("dragover", dragOver);
            cell.addEventListener("dragenter", dragEnter);
            cell.addEventListener("dragleave", dragLeave);
            cell.addEventListener("drop", dragDrop);
        });
    };

    return Object.freeze({
        addDragDropListeners,
    });
};

export default Drag;
