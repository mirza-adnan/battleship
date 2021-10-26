import GameBoard from "./gameboard";
import Ship from "./ship";
import { SHIPS } from "../helpers/data";
import { randomCords } from "../helpers/functions";

function Player(type) {
    let turn = false;
    const isAi = type === "computer" ? true : false;
    const gameBoard = GameBoard();
    const ships = SHIPS.map((ship) => {
        return Ship(ship.name, ship.length);
    });

    const toggleTurn = () => {
        turn = !turn;
    };

    const attack = (board, y, x) => {
        board.receiveAttack(y, x);
    };

    const randomAttack = (board) => {
        const [y, x] = randomCords();

        if (board.isValidAttack(y, x)) {
            board.receiveAttack(y, x);
        } else {
            randomAttack(board);
        }
    };

    const placeAllShips = () => {
        ships.forEach((ship) => {
            gameBoard.autoPlaceShip(ship);
        });
    };

    return Object.freeze({
        get turn() {
            return turn;
        },
        get isAi() {
            return isAi;
        },
        get gameBoard() {
            return gameBoard;
        },
        get ships() {
            return ships;
        },
        toggleTurn,
        attack,
        randomAttack,
        placeAllShips,
    });
}

export default Player;
