/* обработчик ввода списка нарутарльных чисел
разделители: пробел, запятая, точка с запятой */
function parseNatList(input) {
  const parts = input.split(/[\s,;]+/).filter(Boolean);
  if (parts.length === 0) return null;

  const nums = [];
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const n = Number(p);
    if (!Number.isSafeInteger(n) || n <= 0) return null;
    nums.push(n); // берем только натуральные
  }
  return nums;
}

/* обработчик ввода списка нарутарльных чисел
разделители: пробел, запятая, точка с запятой */
function promptNatList(message) {
  const raw = prompt(message);
  if (raw === null) return null;
  const arr = parseNatList(raw.trim());
  if (!arr) return NaN;
  return arr;
}

/* склеиваем в строку через пробел */
function alertArray(arr) {
  alert(arr.join(" "));
}

/* Задание 1 */
function task1_sortAsc() {
  const arr = promptNatList("Введите список натуральных чисел (пример: 5 1 3 2):");
  if (arr === null) return;
  if (Number.isNaN(arr)) {
    alert("Некорректный ввод. Нужны натуральные числа.");
    return;
  }
  /* сортируем копию массива с помощью опаратора распаковки */
  const sorted = [...arr].sort((a, b) => a - b);
  alertArray(sorted);
}

/* Задание 2 */
function task2_mod5() {
  const arr = promptNatList("Введите массив натуральных чисел (пример: 10, 11, 12):");
  if (arr === null) return;
  if (Number.isNaN(arr)) {
    alert("Некорректный ввод. Нужны натуральные числа.");
    return;
  }
  const mods = arr.map(x => x % 5);
  alertArray(mods);
}

/* Задание 3 */
function median(...nums) {
  if (nums.length === 0) return NaN;
  for (const x of nums) {
    if (typeof x !== "number" || Number.isNaN(x)) return NaN;
  }
  const a = [...nums].sort((x, y) => x - y);
  const mid = Math.floor(a.length / 2);
  if (a.length % 2 === 1) return a[mid];
  return (a[mid - 1] + a[mid]) / 2;
}

function task3_medianTwoWays() {
  const raw = prompt("Введите числа (пример: 1 2 10 7):");
  if (raw === null) return;

  const parts = raw.trim().split(/[\s,;]+/).filter(Boolean);
  if (parts.length === 0) {
    alert("Некорректный ввод.");
    return;
  }

  const nums = [];
  for (const p of parts) {
    if (!/^-?\d+(\.\d+)?$/.test(p)) {
      alert("Некорректный ввод: нужны числа.");
      return;
    }
    nums.push(Number(p));
  }

  /* классически через запятую (если аргументов меньше 3 - NaN) */
  const m1 = median(nums[0], nums[1], nums[2]);

  /* через распаковку массива */
  const m2 = median(...nums);

  alert(
    `Ввод: ${nums.join(" ")}\n` +
    `median(a,b,c) = ${m1}\n` +
    `median(...arr) = ${m2}`
  );
}

/* Задание 4 */
function isCorrectBracketString(s) {
  const stack = [];
  for (const ch of s) {
    if (ch === "(") stack.push(ch);
    else if (ch === ")") {
      if (stack.length === 0) return false;
      stack.pop();
    } else {
      return false; // другие символы кроме '(' и ')'
    }
  }
  return stack.length === 0;
}

function task4_brackets() {
  const s = prompt('Введите строку из "(" и ")" (пример: (())()() ):');
  if (s === null) return;

  const ok = isCorrectBracketString(s.trim());
  alert(ok ? "Правильная" : "Неправильная");
}

/* Задание 5 */
function deepClone(value, seen = new Map()) {
  /* база рекурсии - копировать нечего */  
  if (value === null || typeof value !== "object") return value;

  /* такой объект встречался - возвращаем копию */
  if (seen.has(value)) return seen.get(value);

  /* копирование массива */
  if (Array.isArray(value)) {
    const arr = [];
    seen.set(value, arr);
    for (const item of value) arr.push(deepClone(item, seen));
    return arr;
  }

  /* копирование объекта */
  const obj = {};
  seen.set(value, obj);
  for (const key of Object.keys(value)) {
    obj[key] = deepClone(value[key], seen);
  }
  return obj;
}

function task5_deepCopy() {
  const raw = prompt(
    'Введите объект в формате JSON (пример: {"a":1,"b":[2,{"c":3}]}):'
  );
  if (raw === null) return;

  let obj;
  try {
    obj = JSON.parse(raw);
  } catch {
    alert("Некорректный JSON.");
    return;
  }

  const copy = deepClone(obj);

  /* другая область памяти - ссылки разные */
  const sameRef = obj === copy;

  /* корневые ссылки
  false -> указывает на разные области памяти */
  alert(`obj === copy ? ${sameRef}`);

  /* вывод */
  alert(`Оригинал:\n${JSON.stringify(obj, null, 2)}`);
  alert(`Копия:\n${JSON.stringify(copy, null, 2)}`);
}

/* привязки кнопок на странице к реализованным функциям */
document.getElementById("t1").addEventListener("click", task1_sortAsc);
document.getElementById("t2").addEventListener("click", task2_mod5);
document.getElementById("t3").addEventListener("click", task3_medianTwoWays);
document.getElementById("t4").addEventListener("click", task4_brackets);
document.getElementById("t5").addEventListener("click", task5_deepCopy);