function getColorNumber() {
    return Math.round(Math.random() * 256)
        .toString(16)
        .padStart(2, "0");
}

export function randomColor() {
    return "#" + getColorNumber() + getColorNumber() +
        getColorNumber();
}
