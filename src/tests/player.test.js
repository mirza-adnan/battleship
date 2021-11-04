import Player from "../app/factories/player";
import GameBoard from "../app/factories/gameboard";
import Ship from "../app/factories/ship";
import { SHIPS } from "../app/helpers/data";

let player, gameBoard;
beforeEach(() => {
    player = Player(1);
    gameBoard = GameBoard();
});

describe("Player Factory Function", () => {
    test("toggleTurn inverses turn", () => {
        expect(player.turn).toBe(true);
        player.toggleTurn();
        expect(player.turn).toBe(false);

        const player2 = Player(2);
        expect(player2.turn).toBe(false);
        player2.toggleTurn();
        expect(player2.turn).toBe(true);
    });

    test("isAi value is assigned correctly", () => {
        expect(player.isAi).toBe(false);
    });

    test("ships array is created", () => {
        expect(player.ships.length).toBe(SHIPS.length);
    });

    test("attacks", () => {
        player.attack(gameBoard, 4, 5);
        expect(gameBoard.board[4][5]).toBe("miss");

        const ship = Ship("Cruiser", 3);
        gameBoard.placeShip(ship, 6, 2);
        player.attack(gameBoard, 6, 2);
        expect(gameBoard.board[6][2].hit).toBe(true);
    });
});
