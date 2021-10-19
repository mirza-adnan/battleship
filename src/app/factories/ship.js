function Ship(name, length) {
    let isVertical = false;
    const hits = Array(length).fill(false); // false means not hit
    const id = name.toLowerCase();

    const hit = (index) => {
        hits[index] = true;
    };

    const isSunk = () => {
        return hits.every((item) => item);
    };

    const toggleDirection = () => {
        isVertical = !isVertical;
    };

    return Object.freeze({
        get name() {
            return name;
        },
        get id() {
            return id;
        },
        get length() {
            return length;
        },
        get isVertical() {
            return isVertical;
        },
        get hits() {
            return hits;
        },
        hit,
        isSunk,
        toggleDirection,
    });
}

export default Ship;
