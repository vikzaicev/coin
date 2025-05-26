export const persentDifference = (a, b) => {
    return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export const toUpperCase = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}