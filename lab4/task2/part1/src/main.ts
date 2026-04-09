const output: HTMLElement | null = document.getElementById("output");

const message: string =
  "TypeScript установлен. Watch-компиляция работает: main.ts -> dist/main.js";

console.log(message);

if (output !== null) {
  output.textContent = message;
}