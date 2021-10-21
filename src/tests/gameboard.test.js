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
                expect(gameBoard.board[0].every((item) => !item)).toBe(true);
            });
        });
    });

    describe("Methods", () => {
        describe("placeShip", () => {
            describe("horizontal", () => {
                const ship = Ship("Cruiser", 3);
                test("places ship", () => {
                    gameBoard.placeShip(ship, 4, 6);
                    for (let i = 0; i < ship.length; i++) {
                        expect(gameBoard.board[4][6 + i].ship.name).toBe(
                            "Cruiser"
                        );
                    }
                });

                test("doesn't place at invalid position", () => {
                    const x = WIDTH - ship.length;
                    const y = 5;
                    gameBoard.placeShip(ship, y, x + 1);
                    expect(gameBoard.board[y][x + 1]).toBe(false);
                });

                test("doesn't place in an occupied spot", () => {
                    const ship2 = Ship("Battleship", 5);
                    const y = 5;
                    const x = 4;
                    gameBoard.placeShip(ship2, y, x);
                    gameBoard.placeShip(ship, y, x);
                    for (let i = 0; i < ship2.length; i++) {
                        expect(gameBoard.board[y][x + 1].ship.name).toBe(
                            "Battleship"
                        );
                    }
                });
            });

            describe("vertical", () => {
                const ship = Ship("Cruiser", 3);
                ship.toggleDirection();
                test("places ship", () => {
                    gameBoard.placeShip(ship, 4, 6);
                    for (let i = 0; i < ship.length; i++) {
                        expect(gameBoard.board[4 + i][6].ship.name).toBe(
                            "Cruiser"
                        );
                    }
                });

                test("doesn't place at invalid position", () => {
                    const x = 5;
                    const y = WIDTH - ship.length;
                    gameBoard.placeShip(ship, y + 1, 1);
                    expect(gameBoard.board[y + 1][x]).toBe(false);
                });

                test("doesn't place in an occupied spot", () => {
                    const ship2 = Ship("Battleship", 5);
                    ship2.toggleDirection();
                    const y = 4;
                    const x = 5;
                    gameBoard.placeShip(ship2, y, x);
                    gameBoard.placeShip(ship, y, x);
                    for (let i = 0; i < ship2.length; i++) {
                        expect(gameBoard.board[y + i][x].ship.name).toBe(
                            "Battleship"
                        );
                    }
                });
            });
        });

        describe("receiveAttack", () => {
            test("attacks ship", () => {
                const ship = Ship("Cruiser", 3);
                gameBoard.placeShip(ship, 2, 5);
                gameBoard.receiveAttack(2, 5);
                expect(ship.hits[0]).toBe(true);
                gameBoard.receiveAttack(2, 6);
                expect(ship.hits[1]).toBe(true);
            });

            test("marks other spots as miss", () => {
                gameBoard.receiveAttack(7, 2);
                expect(gameBoard.board[7][2]).toBe(true);
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
    });
});
