import { distance } from "./distance.js";
const d1 = distance(0, 0, 3, 4);
const p1 = { x: 10, y: 20 };
const p2 = { x: 13, y: 24 };
const d2 = distance(p1, p2);
console.log("distance(x1, y1, x2, y2) =", d1);
console.log("distance(p1, p2) =", d2);
