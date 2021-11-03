import Ship from "./ship";
import { SHIPS } from "../helpers/data";
import { randomCords } from "../helpers/functions";

function Player(type = "human") {
    let turn = false;
    const isAi = type === "computer" ? true : false;
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

    const invertShips = () => {
        ships.forEach((ship) => {
            ship.toggleDirection();
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
    });
}

export default Player;
