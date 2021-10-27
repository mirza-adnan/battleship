import GameBoard from "../app/factories/gameboard";
import Ship from "../app/factories/ship";
import { WIDTH } from "../app/helpers/data";

let gameBoard;
beforeEach(() => {
    gameBoard = GameBoard();
});

describe("GameBoard Factory Function", () => {
    describe("Properties", () => {
        describe("Board", () => {
            test("board rows", () => {
                expect(gameBoard.board.length).toBe(WIDTH);
            });

            test("board columns", () => {
                expect(gameBoard.board[0].length).toBe(WIDTH);
            });

            test("board items", () => {
                expect(
                    gameBoard.board[0].every((item) => item === "empty")
                ).toBe(true);
            });
        });
    });

    describe("Methods", () => {
        describe("placeShip", () => {
            test("places ship horizontally", () => {
                const ship = Ship("Cruiser", 3);
                gameBoard.placeShip(ship, 2, 4);

                for (let i = 0; i < ship.length; i++) {
                    expect(gameBoard.board[2][4 + i].ship.name).toBe("Cruiser");
                }
            });

            test("places ship vertically", () => {
                const ship = Ship("Cruiser", 3);
                ship.toggleDirection();

                gameBoard.placeShip(ship, 2, 3);

                for (let i = 0; i < ship.length; i++) {
                    expect(gameBoard.board[2 + i][3].ship.name).toBe("Cruiser");
                }
            });
        });

        describe("autoPlaceShip", () => {
            test("auto places ship at random cords", () => {
                const ship = Ship("Cruiser", 3);
                const ship2 = Ship("Destroyer", 2);
                gameBoard.autoPlaceShip(ship);
                gameBoard.autoPlaceShip(ship2);
                expect(gameBoard.placedShips.length).toBe(2);
            });
        });

        describe("receiveAttack", () => {
            test("attacks ship", () => {
                const ship = Ship("Cruiser", 3);

                gameBoard.placeShip(ship, 2, 5);
                gameBoard.receiveAttack(2, 5);

                expect(ship.hits[0]).toBe(true);
                expect(gameBoard.board[2][5].hit).toBe(true);

                gameBoard.receiveAttack(2, 6);

                expect(ship.hits[1]).toBe(true);
                expect(gameBoard.board[2][6].hit).toBe(true);
            });

            test("marks other spots as miss", () => {
                gameBoard.receiveAttack(7, 2);
                expect(gameBoard.board[7][2]).toBe("miss");
            });
        });

        describe("areShipsSunk", () => {
            test("all ships are sunk", () => {
                const ship = Ship("Cruiser", 3);
                const ship2 = Ship("Destroyer", 2);
                ship2.toggleDirection();
                gameBoard.placeShip(ship, 3, 2);
                gameBoard.placeShip(ship2, 5, 6);
                for (let i = 0; i < ship.length; i++) {
                    ship.hit(i);
                }

                for (let i = 0; i < ship2.length; i++) {
                    ship2.hit(i);
                }
                expect(gameBoard.areShipsSunk()).toBe(true);
            });

            test("ships aren't sunkk", () => {
                const ship = Ship("Cruiser", 3);
                gameBoard.placeShip(ship, 3, 2);
                expect(gameBoard.areShipsSunk()).toBe(false);
            });
        });

        describe("isValidAttack", () => {
            test("ship twice-invalid", () => {
                const ship = Ship("Cruiser", 3);

                gameBoard.placeShip(ship, 2, 4);
                gameBoard.receiveAttack(2, 4);
                expect(gameBoard.isValidAttack(2, 4)).toBe(false);
            });

            test("empty spot twice-invalid", () => {
                gameBoard.receiveAttack(5, 4);
                expect(gameBoard.isValidAttack(5, 4)).toBe(false);
            });

            test("empty spot once-valid", () => {
                expect(gameBoard.isValidAttack(1, 4)).toBe(true);
            });

            test("ship once-valid", () => {
                const ship = Ship("Cruiser", 3);
                gameBoard.placeShip(ship, 7, 4);
                expect(gameBoard.isValidAttack(7, 4)).toBe(true);
            });
        });
    });
});
