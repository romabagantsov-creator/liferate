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
  `;
});

