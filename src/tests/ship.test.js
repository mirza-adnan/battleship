import Ship from "../app/factories/ship";

let ship;
beforeEach(() => {
    ship = Ship("Cruiser", 3);
});

describe("Ship Factory Function", () => {
    describe("Properties", () => {
        test("name", () => {
            expect(ship.name).toBe("Cruiser");
        });

        test("id", () => {
            const ship2 = Ship("Battle Ship", 2);
            expect(ship.id).toBe("cruiser");
            expect(ship2.id).toBe("battle-ship");
        });

        test("length", () => {
            expect(ship.length).toBe(3);
        });

        test("isVertical", () => {
            expect(ship.isHorizontal).toBe(true);
        });

        test("hits", () => {
            const hits = Array(ship.length).fill(false);
            const isHit = ship.hits.every((item) => item);

            expect(ship.hits).toStrictEqual(hits);
            expect(isHit).toBe(false);
        });
    });

    describe("Methods", () => {
        test("hit", () => {
            ship.hit(2);
            expect(ship.hits[2]).toBe(true);
        });

        test("isSunk", () => {
            expect(ship.isSunk()).toBe(false);
            ship.hit(0);
            expect(ship.isSunk()).toBe(false);
            for (let i = 0; i < ship.length; i++) {
                ship.hit(i);
            }
            expect(ship.isSunk()).toBe(true);
        });

        test("toggleDirection", () => {
            ship.toggleDirection();
            expect(ship.isHorizontal).toBe(false);
            ship.toggleDirection();
            expect(ship.isHorizontal).toBe(true);
        });
    });
});
