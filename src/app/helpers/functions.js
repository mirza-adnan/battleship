import { WIDTH } from "./data";

function randomCords() {
    const y = Math.floor(Math.random() * WIDTH);
    const x = Math.floor(Math.random() * WIDTH);
    return [y, x];
}

export { randomCords };
