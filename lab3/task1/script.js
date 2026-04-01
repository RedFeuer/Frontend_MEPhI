/* ==============================
   Лабораторная работа 3
   HTML Basics, DOM API
   ============================== */

/* ------------------------------
   Задание 2
   Защита блока от выделения,
   копирования и контекстного меню
   ------------------------------ */
const protectedPage = document.getElementById("protectedPage");

[
  "contextmenu",
  "copy",
  "cut",
  "selectstart",
  "dragstart",
].forEach((eventName) => {
  protectedPage.addEventListener(eventName, (event) => {
    event.preventDefault();
  });
});

/* ------------------------------
   Задания 3-4
   Кликер + сохранение + среднее
   количество кликов в секунду
   ------------------------------ */
const clickBtn = document.getElementById("clickBtn");
const resetClickerBtn = document.getElementById("resetClickerBtn");
const clickCountElement = document.getElementById("clickCount");
const clickRateElement = document.getElementById("clickRate");

const CLICK_COUNT_KEY = "lab3_click_count";
const FIRST_CLICK_TIME_KEY = "lab3_first_click_time";

let clickCount = Number(localStorage.getItem(CLICK_COUNT_KEY)) || 0;
let firstClickTime = Number(localStorage.getItem(FIRST_CLICK_TIME_KEY)) || 0;

function saveClickerState() {
  localStorage.setItem(CLICK_COUNT_KEY, String(clickCount));
  localStorage.setItem(FIRST_CLICK_TIME_KEY, String(firstClickTime));
}

function calculateAverageClicksPerSecond() {
  if (clickCount === 0 || firstClickTime === 0) {
    return 0;
  }

  const now = Date.now();
  const elapsedSeconds = (now - firstClickTime) / 1000;

  if (elapsedSeconds <= 0) {
    return clickCount;
  }

  return clickCount / elapsedSeconds;
}

function renderClicker() {
  clickCountElement.textContent = String(clickCount);
  clickRateElement.textContent = calculateAverageClicksPerSecond().toFixed(2);
}

clickBtn.addEventListener("click", () => {
  if (clickCount === 0 && firstClickTime === 0) {
    firstClickTime = Date.now();
  }

  clickCount += 1;
  saveClickerState();
  renderClicker();
});

resetClickerBtn.addEventListener("click", () => {
  clickCount = 0;
  firstClickTime = 0;
  saveClickerState();
  renderClicker();
});

setInterval(renderClicker, 200);
renderClicker();

/* ------------------------------
   Задания 5-6
   Калькулятор с поддержкой
   скобок и обратной польской нотации
   ------------------------------ */
const display = document.getElementById("display");
const clearBtn = document.getElementById("clearBtn");
const equalBtn = document.getElementById("equalBtn");
const valueButtons = document.querySelectorAll(".calc-btn[data-value]");

let expression = "";

function updateDisplay(value) {
  display.value = value;
}

function appendToExpression(value) {
  expression += value;
  updateDisplay(expression);
}

function clearExpression() {
  expression = "";
  updateDisplay(expression);
}

function isOperator(token) {
  return ["+", "-", "*", "/"].includes(token);
}

function precedence(operator) {
  if (operator === "+" || operator === "-") {
    return 1;
  }

  if (operator === "*" || operator === "/") {
    return 2;
  }

  return 0;
}

function tokenize(input) {
  const tokens = [];
  let currentNumber = "";

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const previousToken = tokens[tokens.length - 1];

    if (char === " ") {
      continue;
    }

    if (/\d/.test(char)) {
      currentNumber += char;
      continue;
    }

    if (currentNumber !== "") {
      tokens.push(currentNumber);
      currentNumber = "";
    }

    const isUnaryMinus =
      char === "-" &&
      (i === 0 || previousToken === "(" || isOperator(previousToken));

    if (isUnaryMinus) {
      const nextChar = input[i + 1];

      if (nextChar === "(") {
        tokens.push("0");
        tokens.push("-");
        continue;
      }

      currentNumber = "-";
      continue;
    }

    if (isOperator(char) || char === "(" || char === ")") {
      tokens.push(char);
      continue;
    }

    throw new Error("Недопустимый символ: " + char);
  }

  if (currentNumber !== "") {
    tokens.push(currentNumber);
  }

  return tokens;
}

function infixToRpn(tokens) {
  const output = [];
  const operators = [];

  tokens.forEach((token) => {
    if (!Number.isNaN(Number(token))) {
      output.push(token);
      return;
    }

    if (isOperator(token)) {
      while (
        operators.length > 0 &&
        isOperator(operators[operators.length - 1]) &&
        precedence(operators[operators.length - 1]) >= precedence(token)
      ) {
        output.push(operators.pop());
      }

      operators.push(token);
      return;
    }

    if (token === "(") {
      operators.push(token);
      return;
    }

    if (token === ")") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }

      if (operators.length === 0) {
        throw new Error("Лишняя закрывающая скобка");
      }

      operators.pop();
    }
  });

  while (operators.length > 0) {
    const top = operators.pop();

    if (top === "(" || top === ")") {
      throw new Error("Скобки расставлены неверно");
    }

    output.push(top);
  }

  return output;
}

function evaluateRpn(rpn) {
  const stack = [];

  rpn.forEach((token) => {
    if (!Number.isNaN(Number(token))) {
      stack.push(Number(token));
      return;
    }

    const right = stack.pop();
    const left = stack.pop();

    if (left === undefined || right === undefined) {
      throw new Error("Некорректное выражение");
    }

    switch (token) {
      case "+":
        stack.push(left + right);
        break;
      case "-":
        stack.push(left - right);
        break;
      case "*":
        stack.push(left * right);
        break;
      case "/":
        if (right === 0) {
          throw new Error("Деление на ноль");
        }
        stack.push(left / right);
        break;
      default:
        throw new Error("Неизвестная операция: " + token);
    }
  });

  if (stack.length !== 1) {
    throw new Error("Некорректное выражение");
  }

  return stack[0];
}

function calculateExpression(input) {
  if (!input.trim()) {
    return "";
  }

  const tokens = tokenize(input);
  const rpn = infixToRpn(tokens);
  const result = evaluateRpn(rpn);

  if (Number.isInteger(result)) {
    return String(result);
  }

  return String(Number(result.toFixed(10)));
}

valueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    appendToExpression(value);
  });
});

clearBtn.addEventListener("click", clearExpression);

equalBtn.addEventListener("click", () => {
  try {
    expression = calculateExpression(expression);
    updateDisplay(expression);
  } catch (error) {
    expression = "";
    updateDisplay(error.message);
  }
});

window.addEventListener("keydown", (event) => {
  const allowedKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", "(", ")",
  ];

  if (allowedKeys.includes(event.key)) {
    event.preventDefault();
    appendToExpression(event.key);
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    equalBtn.click();
    return;
  }

  if (event.key === "Escape" || event.key.toLowerCase() === "c") {
    event.preventDefault();
    clearBtn.click();
    return;
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  }
});