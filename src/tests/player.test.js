import Player from "../app/factories/player";
import { SHIPS } from "../app/helpers/data";

let player1, player2;
beforeEach(() => {
    player1 = Player("human");
    player2 = Player("computer");
});

describe("Player Factory Function", () => {
    test("toggleTurn inverses turn", () => {
        expect(player1.turn).toBe(false);
        player1.toggleTurn();
        expect(player1.turn).toBe(true);
        player1.toggleTurn();
        expect(player1.turn).toBe(false);
    });

    test("isAi value is assigned correctly", () => {
        expect(player1.isAi).toBe(false);
        expect(player2.isAi).toBe(true);
    });

    test("ships array is created", () => {
        expect(player1.ships.length).toBe(SHIPS.length);
    });

    test("attacks", () => {
        player1.attack(player2.gameBoard, 4, 5);
        expect(player2.gameBoard.board[4][5]).toBe(true);
        player2.gameBoard.placeShip(player2.ships[0], 2, 0);
        player1.attack(player2.gameBoard, 2, 0);
        expect(player2.gameBoard.board[2][0].status).toBe("hit");
    });

    test("randomly places all ships", () => {
        player1.placeAllShips();
        expect(player1.gameBoard.placedShips.length).toBe(player1.ships.length);
    });
});
