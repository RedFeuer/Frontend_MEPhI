export function distance(arg1, arg2, arg3, arg4) {
    if (typeof arg1 === "number" &&
        typeof arg2 === "number" &&
        typeof arg3 === "number" &&
        typeof arg4 === "number") {
        return Math.sqrt((arg3 - arg1) ** 2 + (arg4 - arg2) ** 2);
    }
    if (typeof arg1 === "object" && typeof arg2 === "object") {
        return Math.sqrt((arg2.x - arg1.x) ** 2 + (arg2.y - arg1.y) ** 2);
    }
    throw new Error("Некорректные аргументы функции distance");
}
