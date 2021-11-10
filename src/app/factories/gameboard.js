import { WIDTH } from "../helpers/data";
import { randomCords } from "../helpers/functions";

function GameBoard() {
    let board = Array(WIDTH)
        .fill(0)
        .map((item) => Array(WIDTH).fill("empty"));

    let placedShips = [];

    const hasEnoughSpace = (ship, y, x) => {
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
                if (board[y + i][x].ship) {
                    empty = false;
                    break;
                }
            }
        }
        return empty;
    };

    const isValidPosition = (ship, y, x) => {
        return hasEnoughSpace(ship, y, x) && isEmpty(ship, y, x);
    };

    const placeShip = (ship, y, x) => {
        if (ship.isHorizontal) {
            for (let i = 0; i < ship.length; i++) {
                board[y][x + i] = { ship, hit: false, index: i };
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                board[y + i][x] = { ship, hit: false, index: i };
            }
        }
        placedShips.push(ship);
    };

    const autoPlaceShip = (ship) => {
        const [y, x] = randomCords();
        const orientation = Math.floor(Math.random() * 2);

        // value of orientation can be either 1 or 0
        // if it is 1, we make the ship vertical
        if (orientation === 1) {
            ship.toggleDirection();
        }

        if (isValidPosition(ship, y, x)) {
            placeShip(ship, y, x);
        } else {
            autoPlaceShip(ship);
        }
    };

    const receiveAttack = (y, x) => {
        if (board[y][x].ship) {
            const ship = board[y][x].ship;
            const index = board[y][x].index;
            ship.hit(index);
            board[y][x].hit = true;
        } else {
            board[y][x] = "miss";
        }
    };

    const areShipsSunk = () => {
        const sunk = placedShips.every((ship) => {
            return ship.hits.every((item) => item);
        });

        return sunk;
    };

    const isValidAttack = (y, x) => {
        if (board[y][x].hit) {
            return false;
        } else if (board[y][x] === "miss") {
            return false;
        }
        return true;
    };

    const reset = () => {
        board = Array(WIDTH)
            .fill(0)
            .map((item) => Array(WIDTH).fill("empty"));
        placedShips = [];
    };

    return Object.freeze({
        get board() {
            return board;
        },
        get placedShips() {
            return placedShips;
        },
        isValidPosition,
        placeShip,
        autoPlaceShip,
        receiveAttack,
        areShipsSunk,
        isValidAttack,
        reset,
    });
}

export default GameBoard;
