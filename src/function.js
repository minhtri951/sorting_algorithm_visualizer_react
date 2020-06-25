export function initList(size) {
    const list = new Array(size)
    // console.log(list)

    for (let i = 0; i < size; i++) {
        list[i] = {
            color: "gray",
            value: random(100)
        }
    }
    return list
}
// From 0 to n (eq)
export function random(n) {
    return Math.floor(Math.random() * n) + 1;
}

export function swap(a, x, y) {
    const t = a[x].value
    a[x].value = a[y].value
    a[y].value = t
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






// WEBPACK FOOTER //
// src/function.js