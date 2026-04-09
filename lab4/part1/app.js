// Лабораторная работа 4
// part1
// Решение на JavaScript + Vue

const { createApp } = Vue;

createApp({
  data() {
    return {
      // Задание 2
      numbers: Array.from({ length: 100 }, (_, index) => index + 1),

      // Задание 3
      navItems: ["Домой", "Товары", "Услуги", "О нас", "Контакты"],
      columns: ["Колонка 1", "Колонка 2", "Колонка 3"]
    };
  }
}).mount("#app");