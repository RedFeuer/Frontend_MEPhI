const result = document.getElementById("result");
const btnTask1 = document.getElementById("t1");
const btnTask2 = document.getElementById("t2");
const btnTask3 = document.getElementById("t3");
const btnTask4 = document.getElementById("t4");
const btnTask5 = document.getElementById("t5");

/* =========================
   Задание 1
   ========================= */

/* счетчик увеличивается именно при каждой загрузке страницы */
let pageLoadCount = Number(localStorage.getItem("pageLoadCount")) || 0;
pageLoadCount++;
localStorage.setItem("pageLoadCount", pageLoadCount);

btnTask1.addEventListener("click", () => {
  clearResult();
  showMessage(`Вы загрузили/обновили страницу ${pageLoadCount} раз(а).`);
  alert(`Вы загрузили/обновили страницу ${pageLoadCount} раз(а).`);
});

/* =========================
   Общие вспомогательные функции
   ========================= */

function clearResult() {
  result.innerHTML = "";
}

function showMessage(text) {
  const div = document.createElement("div");
  div.className = "message";
  div.textContent = text;
  result.appendChild(div);
}

function createErrorElement() {
  const div = document.createElement("div");
  div.className = "error";
  div.textContent = "Can’t load image";
  return div;
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Ошибка загрузки изображения"));
  });
}

function getFiveUrls() {
  const urls = [];

  for (let i = 0; i < 5; i++) {
    const url = prompt(`Введите URL картинки №${i + 1}:`);
    urls.push(url ? url.trim() : "");
  }

  return urls;
}

/* =========================
   Задание 2
   По порядку ввода URL
   ========================= */

btnTask2.addEventListener("click", () => {
  clearResult();

  const urls = getFiveUrls();

  const promises = urls.map((url) =>
    /* сразу запускаем загрузку */
    loadImage(url).catch(() => createErrorElement())
  );

  /* вывод в порядке ввода - Promise ждет пока все завершится */
  Promise.all(promises).then((elements) => {
    elements.forEach((element) => {
      result.appendChild(element);
    });
  });
});

/* =========================
   Задание 3
   Без сохранения порядка
   ========================= */

btnTask3.addEventListener("click", () => {
  clearResult();

  const urls = getFiveUrls();

  urls.forEach((url) => {
    /* по мере готовности */
    loadImage(url)
      .then((img) => {
        result.appendChild(img);
      })
      .catch(() => {
        result.appendChild(createErrorElement());
      });
  });
});

/* =========================
   Задание 4
   async/await
   1 - с сохранением порядка
   2 - без сохранения порядка
   ========================= */

btnTask4.addEventListener("click", async () => {
  clearResult();

  const mode = prompt(
    "Выберите режим:\n1 - с сохранением порядка\n2 - без сохранения порядка"
  );

  if (mode !== "1" && mode !== "2") {
    showMessage("Нужно ввести 1 или 2.");
    return;
  }

  const urls = getFiveUrls();

  if (mode === "1") {
    /* вариант async/await с сохранением порядка
    по сути просто создаем массив промисов и ждем пока все завершат загрузку */
    const tasks = urls.map(async (url) => {
      try {
        return await loadImage(url);
      } catch {
        return createErrorElement();
      }
    });

    const elements = await Promise.all(tasks);

    elements.forEach((element) => {
      result.appendChild(element);
    });
  } else {
    /* вариант async/await без сохранения порядка */
    urls.forEach(async (url) => {
      try {
        const img = await loadImage(url);
        result.appendChild(img);
      } catch {
        result.appendChild(createErrorElement());
      }
    });
  }
});

function getFiveIps() {
  const ips = [];

  for (let i = 0; i < 5; i++) {
    const ip = prompt(`Введите IP-адрес №${i + 1}:`);
    ips.push(ip ? ip.trim() : "");
  }

  return ips;
}

function createIpInfoElement(ip, country) {
  const div = document.createElement("div");
  div.className = "ip-info";
  div.textContent = `IP: ${ip}\nСтрана: ${country}`;
  return div;
}

function checkIp(ip) {
  return fetch(`https://geoiplookup.io/api/${ip}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка запроса к API");
      }
      return response.json();
    });
}

/* =========================
   Задание 5
   Проверка 5 IP через API
   ========================= */

btnTask5.addEventListener("click", async () => {
  clearResult();

  const blockedCountries = [
    "Russia",
    "Belarus",
    "Afghanistan",
    "China",
    "Venezuela",
    "Iran"
  ];

  const ips = getFiveIps();

  try {
    const checks = ips.map(async (ip) => {
      const data = await checkIp(ip);

      return {
        ip: ip,
        country: data.country_name || "Unknown"
      };
    });

    const results = await Promise.all(checks);

    results.forEach((item) => {
      result.appendChild(createIpInfoElement(item.ip, item.country));
    });

    const hasBlockedCountry = results.some((item) =>
      blockedCountries.includes(item.country)
    );

    if (hasBlockedCountry) {
      showMessage("Our services are not available in your country");
      alert("Our services are not available in your country");
    } else {
      showMessage("Welcome to our website!");
      alert("Welcome to our website!");
    }
  } catch (error) {
    showMessage("Не удалось проверить один или несколько IP-адресов.");
    alert("Не удалось проверить один или несколько IP-адресов.");
    console.error(error);
  }
});