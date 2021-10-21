import { WIDTH } from "../helpers/data";

function GameBoard() {
    const board = Array(WIDTH)
        .fill(0)
        .map((item) => Array(WIDTH).fill(false)); // false means unoccupied/untouched

    const placedShips = [];

    const isValidPosition = (ship, y, x) => {
        // Depending on the orientation, if the difference between the Width and x/y coordinate
        // is less than the length of the ship, that means there isn't enough space for the ship
        if (ship.isHorizontal) {
            if (WIDTH - x >= ship.length) {
                return true;
            }
        } else {
            if (WIDTH - y >= ship.length) {
                return true;
            }
        }
        return false;
    };

    const isEmpty = (ship, y, x) => {
        let empty = true;
        // looping through the length of the ship through the board either horizontally or vertically
        // and checking it there is a ship object in any of the places
        if (ship.isHorizontal) {
            for (let i = 0; i < ship.length; i++) {
                if (board[y][x + i].ship) {
                    empty = false;
                    break;
                }
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                if (board[y + 1][x].ship) {
                    empty = false;
                    break;
                }
            }
        }
        return empty;
    };

    const placeShip = (ship, y, x) => {
        // placing ship at the giver coordinate if the ship fits and
        // and the spots are unoccupied
        if (isValidPosition(ship, y, x) && isEmpty(ship, y, x)) {
            if (ship.isHorizontal) {
                for (let i = 0; i < ship.length; i++) {
                    board[y][x + i] = { ship, index: i };
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    board[y + i][x] = { ship, index: i };
                }
            }
            placedShips.push(ship);
            return true;
        }
        return false;
    };

    const receiveAttack = (y, x) => {
        if (board[y][x].ship) {
            const ship = board[y][x].ship;
            const index = board[y][x].index;
            ship.hit(index);
        } else {
            board[y][x] = true;
        }
    };

    const areShipsSunk = () => {
        const sunk = placedShips.every((ship) => {
            return ship.hits.every((item) => item);
        });

        return sunk;
    };

    return Object.freeze({
        get board() {
            return board;
        },
        placeShip,
        receiveAttack,
        areShipsSunk,
    });
}

export default GameBoard;
