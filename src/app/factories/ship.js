function Ship(name, length) {
    let isHorizontal = true;
    const hits = Array(length).fill(false); // false means not hit
    const id = name.toLowerCase().split(" ").join("-");

    const hit = (index) => {
        hits[index] = true;
    };

    const isSunk = () => {
        return hits.every((item) => item);
    };

    const toggleDirection = () => {
        isHorizontal = !isHorizontal;
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
        get isHorizontal() {
            return isHorizontal;
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
