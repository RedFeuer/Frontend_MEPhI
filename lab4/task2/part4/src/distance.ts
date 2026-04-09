import type { Point } from "./types.js";

export function distance(x1: number, y1: number, x2: number, y2: number): number;
export function distance(p1: Point, p2: Point): number;

export function distance(
  arg1: number | Point,
  arg2: number | Point,
  arg3?: number,
  arg4?: number
): number {
  if (
    typeof arg1 === "number" &&
    typeof arg2 === "number" &&
    typeof arg3 === "number" &&
    typeof arg4 === "number"
  ) {
    return Math.sqrt((arg3 - arg1) ** 2 + (arg4 - arg2) ** 2);
  }

  if (typeof arg1 === "object" && typeof arg2 === "object") {
    return Math.sqrt((arg2.x - arg1.x) ** 2 + (arg2.y - arg1.y) ** 2);
  }

  throw new Error("Некорректные аргументы функции distance");
}