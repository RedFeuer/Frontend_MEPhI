// ===== helpers =====
function isIntegerString(s) {
  return /^\s*\d+\s*$/.test(s);
}

function promptInt(message) {
  const raw = prompt(message);
  if (raw === null) return null;
  if (!isIntegerString(raw)) return NaN;
  return Number(raw.trim());
}

// ===== task 2 =====
function task2_month() {
  const month = promptInt("Введите номер месяца (1–12):");
  if (month === null) return;

  const months = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  if (Number.isNaN(month) || month < 1 || month > 12) {
    alert("Некорректный номер месяца");
    return;
  }

  alert(months[month - 1]);
}

// ===== task 3 =====
function isPrime(x) {
  if (x < 2) return false;
  if (x === 2) return true;
  if (x % 2 === 0) return false;
  for (let d = 3; d * d <= x; d += 2) {
    if (x % d === 0) return false;
  }
  return true;
}

function task3_nPrimes() {
  const n = promptInt("Введите натуральное число n (сколько простых чисел вывести):");
  if (n === null) return;

  if (Number.isNaN(n) || n < 1) {
    alert("Некорректное n");
    return;
  }

  const primes = [];
  let x = 2;
  while (primes.length < n) {
    /* это неоптимальный алгоритм
    Можно использовать Решето Эратосфена,
    но это не суть задачи, поэтмоу пусть будет этот */
    if (isPrime(x)) primes.push(x);
    x++;
  }

  alert(primes.join(" "));
}

// ===== task 4 =====
function task4_counter() {
  const Counter = {
    count: 0,
    add(value) { this.count += value; },
    sub(value) { this.count -= value; }
  };

  alert("Создан Counter: count = 0");

  while (true) {
    const op = prompt("Введите операцию: add или sub (Отмена — выход)");
    if (op === null) break;

    const opNorm = op.trim().toLowerCase();
    if (opNorm !== "add" && opNorm !== "sub") {
      alert("Некорректная операция");
      continue;
    }

    const value = promptInt("Введите целое число value:");
    if (value === null) break;
    if (Number.isNaN(value)) {
      alert("Некорректное value");
      continue;
    }

    if (opNorm === "add") Counter.add(value);
    else Counter.sub(value);

    alert(`Текущее значение count = ${Counter.count}`);
  }
}

// ===== task 5 =====
function task5_commasToDots() {
  const raw = prompt("Введите список слов, разделённых запятыми:");
  if (raw === null) return;

  const words = raw
    .split(",")
    .map(w => w.trim())
    .filter(w => w.length > 0);

  alert(words.join("."));
}

// ===== task 6 =====
function task6_palindrome() {
  const raw = prompt("Введите строку:");
  if (raw === null) return;

  /* нижний регистр + убираем пробелы */
  const s = raw.toLowerCase().replace(/\s+/g, "");
  const rev = s.split("").reverse().join("");

  alert(s === rev ? "Да" : "Нет");
}

// ===== bindings =====
document.getElementById("t2").addEventListener("click", task2_month);
document.getElementById("t3").addEventListener("click", task3_nPrimes);
document.getElementById("t4").addEventListener("click", task4_counter);
document.getElementById("t5").addEventListener("click", task5_commasToDots);
document.getElementById("t6").addEventListener("click", task6_palindrome);