// ================== ВСПОМОГАТЕЛЬНЫЕ ==================
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setProgress(barId, percent, color) {
  const bar = document.getElementById(barId);
  bar.style.width = percent + "%";
  bar.style.background = color;
}

// ================== ВКЛАДКИ ==================
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.remove("hidden");
  });
});

// ================== ДОХОДЫ И РАСХОДЫ ==================
document.getElementById("calcBtn").addEventListener("click", () => {
  const income = Number(document.getElementById("income").value);
  const rent = Number(document.getElementById("rent").value);
  const food = Number(document.getElementById("food").value);

  if (!income || income <= 0) return;

  const expenses = rent + food;
  const percent = clamp(Math.round((expenses / income) * 100), 0, 100);

  let level = "Комфортный уровень";
  let color = "#22c55e";

  if (percent > 70) {
    level = "Высокая финансовая нагрузка";
    color = "#ef4444";
  } else if (percent > 45) {
    level = "Средний уровень";
    color = "#facc15";
  }

  setProgress("expenseBar", percent, color);

  const remain = income - expenses;

  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.innerHTML = `
    <p>Расходы: <b>${percent}%</b> дохода</p>
    <p>Статус: <b style="color:${color}">${level}</b></p>
    <p>Остаётся: <b>${remain.toLocaleString()} ₽</b></p>
  `;

  const advice = document.getElementById("financeAdvice");
  advice.classList.remove("hidden");
  advice.innerText =
    percent > 70
      ? "Ты тратишь слишком много. Подумай о снижении расходов или увеличении дохода."
      : percent > 45
      ? "Баланс нормальный, но есть потенциал для улучшения."
      : "Отличный баланс. Ты хорошо контролируешь финансы.";
});

// ================== ЦЕНА ЧАСА ЖИЗНИ ==================
document.getElementById("lifeBtn").addEventListener("click", () => {
  const income = Number(document.getElementById("lifeIncome").value);
  const days = Number(document.getElementById("days").value);
  const hours = Number(document.getElementById("hours").value);
  const commute = Number(document.getElementById("commute").value);
  const overtime = Number(document.getElementById("overtime").value);

  // Проверяем только то, что реально нужно
  if (!days || !hours) {
    alert("Введи дни и часы работы");
    return;
  }

  const workHours = days * hours * 4;
  const roadHours = commute ? commute * days * 4 : 0;
  const extraHours = overtime ? overtime * 4 : 0;

  let nominalText = "";
  let realText = "";
  let efficiency = 0;

  // Если доход введён — считаем цену часа
  if (income && income > 0) {
    const nominal = Math.round(income / workHours);
    const real = Math.round(income / (workHours + roadHours + extraHours));
    efficiency = Math.round((real / nominal) * 100);

    nominalText = `<p>Номинальная цена часа: <b>${nominal} ₽</b></p>`;
    realText = `<p>Реальная цена часа жизни: <b>${real} ₽</b></p>`;
  } else {
    nominalText = `<p><i>Введи доход, чтобы узнать цену часа</i></p>`;
  }

  const color =
    efficiency < 70 ? "#ef4444" :
    efficiency < 85 ? "#facc15" :
    "#22c55e";

  if (income) setProgress("lifeBar", efficiency, color);

  const lifeResult = document.getElementById("lifeResult");
  lifeResult.classList.remove("hidden");
  lifeResult.innerHTML = `
    ${nominalText}
    ${realText}
    <p>Всего рабочих часов в месяц: <b>${workHours}</b></p>
    <p>Времени уходит на работу + дорогу: <b>${workHours + roadHours + extraHours}</b></p>
  `;

  const lifeAdvice = document.getElementById("lifeAdvice");
  lifeAdvice.classList.remove("hidden");
  lifeAdvice.innerText =
    income
      ? efficiency < 70
        ? "Ты тратишь слишком много времени вне жизни. Работа съедает доход."
        : "Баланс времени и дохода нормальный."
      : "Ты уже видишь, сколько времени уходит на работу. Доход — следующий шаг.";
});





