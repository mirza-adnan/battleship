const WIDTH = 10;

const SHIPS = [
    {
        name: "Destroyer",
        id: "destroyer",
        length: 2,
    },
    {
        name: "Cruiser",
        id: "cruiser",
        length: 3,
    },
    {
        name: "Submarine",
        id: "submarine",
        length: 3,
    },
    {
        name: "Battleship",
        id: "battleship",
        length: 4,
    },
    {
        name: "Carrier",
        id: "carrier",
        length: 5,
    },
];

const ELEMENTS = {
    p1Grid: document.querySelector(".p1-grid"),
    p2Grid: document.querySelector(".p2-grid"),
    shipsContainer: document.querySelector(".ships-container"),
};

export { WIDTH, SHIPS, ELEMENTS };
