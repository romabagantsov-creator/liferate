// ==================== Вкладки ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.tab;
    tabContents.forEach(c => c.id === target ? c.classList.remove('hidden') : c.classList.add('hidden'));
  });
});

// ==================== Доход и расходы ====================
const calcBtn = document.getElementById('calcBtn');
const result = document.getElementById('result');

calcBtn.addEventListener('click', () => {
  const income = +document.getElementById('incomeLevel').value;
  const rent = +document.getElementById('rentLevel').value;
  const food = +document.getElementById('foodLevel').value;

  const expenses = rent + food;
  const left = income - expenses;
  const percent = Math.round((expenses / income) * 100);
  const days = left > 0 ? Math.floor(left / (expenses / 30)) : 0;

  result.classList.remove('hidden');
  result.innerHTML = `
    <p>Остаётся: <b>${left.toLocaleString()} ₽</b></p>
    <p>Уходит: <b>${percent}% дохода</b></p>
    <p>Денег хватит примерно на <b>${days} дней</b></p>
  `;
});

// ==================== Цена часа жизни ====================
const lifeBtn = document.getElementById('lifeBtn');
const lifeResult = document.getElementById('lifeResult');

lifeBtn.addEventListener('click', () => {
  const income = +document.getElementById('incomeLevel').value;
  const daysPerWeek = +document.getElementById('workDays').value;
  const hoursPerDay = +document.getElementById('workHoursPerDay').value;
  const commute = +document.getElementById('commute').value;
  const overtime = +document.getElementById('overtime').value;

  const workHours = daysPerWeek * hoursPerDay * 4; // месяц
  const roadHours = commute * daysPerWeek * 4; // дорога
  const extraHours = overtime * 4; // переработки

  const nominal = Math.round(income / workHours);
  const real = Math.round(income / (workHours + roadHours + extraHours));

  lifeResult.classList.remove('hidden');
  lifeResult.innerHTML = `
    <p>Номинальная цена часа: <b>${nominal} ₽</b></p>
    <p>Реальная цена часа жизни: <b>${real} ₽</b></p>
  `;
});

// ==================== Финансовый детектор ====================
const detectorBtn = document.getElementById('detectorBtn');
const detectorResult = document.getElementById('detectorResult');

detectorBtn.addEventListener('click', () => {
  const income = +document.getElementById('incomeLevel').value;
  const rent = +document.getElementById('rentLevel').value;
  const food = +document.getElementById('foodLevel').value;

  const daysPerWeek = +document.getElementById('workDays').value;
  const hoursPerDay = +document.getElementById('workHoursPerDay').value;
  const commute = +document.getElementById('commute').value;
  const overtime = +document.getElementById('overtime').value;

  const expenses = rent + food;
  const left = income - expenses;

  const workHours = daysPerWeek * hoursPerDay * 4;
  const roadHours = commute * daysPerWeek * 4;
  const extraHours = overtime * 4;

  const totalHours = workHours + roadHours + extraHours;
  const realHour = totalHours > 0 ? income / totalHours : 0;
  const wastedMoney = expenses > income ? expenses - income : 0;
  const wastedHours = totalHours - workHours;

  detectorResult.classList.remove('hidden');
  detectorResult.innerHTML = `
    <p>Финансовые утечки: <b>${wastedMoney.toLocaleString()} ₽</b></p>
    <p>Потеря времени (дорога + переработки): <b>${wastedHours} ч</b></p>
    <p>Реальная цена часа жизни: <b>${Math.round(realHour)} ₽</b></p>
  `;
});


