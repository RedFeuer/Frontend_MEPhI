"use strict";
const output = document.getElementById("output");
const message = "TypeScript установлен. Watch-компиляция работает: main.ts -> dist/main.js";
console.log(message);
if (output !== null) {
    output.textContent = message;
}
