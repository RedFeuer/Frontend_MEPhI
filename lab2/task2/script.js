const result = document.getElementById("result");
const btnTask1 = document.getElementById("t1");
const btnTask2 = document.getElementById("t2");
const btnTask3 = document.getElementById("t3");
const btnTask4 = document.getElementById("t4");
const btnTask5 = document.getElementById("t5");
const btnTask6 = document.getElementById("t6");

function clearResult() {
  result.textContent = "";
}

function showResult(text) {
  result.textContent = text;
}

/* =========================
   Задание 1
   class User
   ========================= */

class UserClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  hello() {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

btnTask1.addEventListener("click", () => {
  clearResult();

  const name = prompt("Введите имя:");
  const age = prompt("Введите возраст:");

  const user = new UserClass(name, age);
  user.hello();

  alert("Сообщение выведено в консоль.");
  showResult(
    `Создан объект UserClass:
name = ${user.name}
age = ${user.age}

Проверь консоль.`
  );
});

/* =========================
   Задание 2
   User через функцию-конструктор
   ========================= */

function UserFunction(name, age) {
  this.name = name;
  this.age = age;
}

UserFunction.prototype.hello = function () {
  console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
};

btnTask2.addEventListener("click", () => {
  clearResult();

  const name = prompt("Введите имя:");
  const age = prompt("Введите возраст:");

  const user = new UserFunction(name, age);
  user.hello();

  alert("Сообщение выведено в консоль.");
  showResult(
    `Создан объект UserFunction:
name = ${user.name}
age = ${user.age}

Проверь консоль.`
  );
});

/* =========================
   Общий класс User
   Для заданий 3, 4, 5
   ========================= */

class User {
  #age = 1;

  constructor(name, age, tel = "") {
    this.name = name;
    this.age = age;
    this.tel = tel;
  }

  hello() {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }

  get tel() {
    return this._tel;
  }

  set tel(value) {
    /* с помощью RegEx - ожидаем 10 цифр */
    const phonePattern = /^\+7\d{10}$/;

    if (phonePattern.test(value)) {
      this._tel = value;
    } else {
      alert("Телефон должен быть в формате +7xxxxxxxxxx");
    }
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    const num = Number(value);

    if (Number.isInteger(num) && num >= 1 && num <= 100) {
      this.#age = num;
    } else {
      alert("Возраст должен быть целым числом от 1 до 100");
    }
  }
}

/* =========================
   Задание 3
   tel через getter/setter
   ========================= */

btnTask3.addEventListener("click", () => {
  clearResult();

  const name = prompt("Введите имя:");
  const age = prompt("Введите возраст:");
  const tel = prompt("Введите телефон в формате +7xxxxxxxxxx:");

  const user = new User(name, age, tel);

  showResult(
    `Создан объект User:
name = ${user.name}
age = ${user.age}
tel = ${user.tel || "не установлен"}`
  );
});

/* =========================
   Задание 4
   age через getter/setter
   ========================= */

btnTask4.addEventListener("click", () => {
  clearResult();

  const name = prompt("Введите имя:");
  const age = prompt("Введите возраст (1..100):");
  const tel = prompt("Введите телефон в формате +7xxxxxxxxxx:");

  const user = new User(name, age, tel);

  showResult(
    `Создан объект User:
name = ${user.name}
age = ${user.age}
tel = ${user.tel || "не установлен"}

Попробуй ввести неверный возраст, чтобы увидеть проверку.`
  );
});

/* =========================
   Задание 5
   Student наследуется от User
   ========================= */

class Student extends User {
  #knowledge = 0;

  constructor(name, age, tel = "") {
    super(name, age, tel);
  }

  hello() {
    console.log(
      `Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`
    );
  }

  learn() {
    this.#knowledge += 1;
  }

  get knowledge() {
    return this.#knowledge;
  }
}

btnTask5.addEventListener("click", () => {
  clearResult();

  const name = prompt("Введите имя студента:");
  const age = prompt("Введите возраст студента:");
  const tel = prompt("Введите телефон студента в формате +7xxxxxxxxxx:");

  const student = new Student(name, age, tel);

  student.hello();

  const learnCount = Number(prompt("Сколько раз вызвать learn()?")) || 0;

  for (let i = 0; i < learnCount; i++) {
    student.learn();
  }

  alert("Сообщение hello() выведено в консоль.");

  showResult(
    `Создан объект Student:
name = ${student.name}
age = ${student.age}
tel = ${student.tel || "не установлен"}
knowledge = ${student.knowledge}

knowledge можно изменить только через learn().`
  );
});

/* =========================
   Задание 6
   reverse() дублирует массив
   ========================= */

let reverseChanged = false;

btnTask6.addEventListener("click", () => {
  clearResult();

  if (!reverseChanged) {
    /* переопределяем метод */
    Array.prototype.reverse = function () {
      return this.concat(this);
    };

    reverseChanged = true;
  }

  const input = prompt("Введите элементы массива через запятую:", "1,2,3,4,5");
  const arr = input.split(",").map((item) => item.trim());
  const reversed = arr.reverse();

  alert(`Результат: [${reversed.join(", ")}]`);

  showResult(
    `Исходный массив: [${arr.join(", ")}]
Результат arr.reverse(): [${reversed.join(", ")}]

Теперь reverse() дублирует массив.`
  );
});