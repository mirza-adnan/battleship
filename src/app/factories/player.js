import Ship from "./ship";
import { SHIPS } from "../helpers/data";
import { randomCords } from "../helpers/functions";

function Player(playerNum, type = "human") {
    let turn = playerNum === 1 ? true : false;
    const isAi = type === "computer" ? true : false;
    let ships = SHIPS.map((ship) => {
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

    const invertShips = () => {
        ships.forEach((ship) => {
            ship.toggleDirection();
        });
    };

    const resetShips = () => {
        ships = SHIPS.map((ship) => {
            return Ship(ship.name, ship.length);
        });
    };

    return Object.freeze({
        get turn() {
            return turn;
        },
        get isAi() {
            return isAi;
        },
        get ships() {
            return ships;
        },
        toggleTurn,
        attack,
        randomAttack,
        invertShips,
        resetShips,
    });
}

export default Player;
