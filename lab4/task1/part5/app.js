const { createApp } = Vue;

createApp({
  data() {
    return {
      numbers: Array.from({ length: 100 }, (_, index) => index + 1),
      navItems: ["Домой", "Товары", "Услуги", "О нас", "Контакты"],
      columns: ["Колонка 1", "Колонка 2", "Колонка 3"]
    };
  }
}).mount("#app");