const startBtn = document.getElementById('startBtn');
const calc = document.getElementById('calc');
const calcBtn = document.getElementById('calcBtn');
const result = document.getElementById('result');

startBtn.addEventListener('click', () => {
  calc.classList.remove('hidden');
  calc.scrollIntoView({ behavior: 'smooth' });
});

calcBtn.addEventListener('click', () => {
  const income = +document.getElementById('income').value || 0;
  const rent = +document.getElementById('rent').value || 0;
  const food = +document.getElementById('food').value || 0;
  const transport = +document.getElementById('transport').value || 0;
  const other = +document.getElementById('other').value || 0;

  const expenses = rent + food + transport + other;
  const left = income - expenses;

  if (income === 0) {
    result.classList.remove('hidden');
    result.innerHTML = 'Введите доход';
    return;
  }

  const days = left > 0 ? Math.floor(left / (expenses / 30)) : 0;
  const percent = Math.round((expenses / income) * 100);

  result.classList.remove('hidden');
  result.innerHTML = `
    <p>Остаётся: <b>${left.toLocaleString()} ₽</b></p>
    <p>Уходит: <b>${percent}% дохода</b></p>
    <p>Денег хватит примерно на <b>${days} дней</b></p>
  const lifeCalc = document.getElementById('lifeCalc');
const lifeBtn = document.getElementById('lifeBtn');
const lifeResult = document.getElementById('lifeResult');

calcBtn.addEventListener('click', () => {
  lifeCalc.classList.remove('hidden');
});

lifeBtn.addEventListener('click', () => {
  const income = +document.getElementById('income').value || 0;
  const work = +document.getElementById('workHours').value || 0;
  const road = +document.getElementById('roadHours').value || 0;
  const extra = +document.getElementById('extraHours').value || 0;

  if (income === 0 || work === 0) {
    lifeResult.classList.remove('hidden');
    lifeResult.innerHTML = 'Заполни доход и часы работы';
    return;
  }

  const nominal = Math.round(income / work);
  const realHours = work + road + extra;
  const real = Math.round(income / realHours);

  lifeResult.classList.remove('hidden');
  lifeResult.innerHTML = `
    <p>Номинальная цена часа: <b>${nominal} ₽</b></p>
    <p>Реальная цена часа жизни: <b>${real} ₽</b></p>
  `;
});



