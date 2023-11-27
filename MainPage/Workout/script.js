const monthYearElement = document.getElementById('monthYear');
const daysElement = document.querySelector('.days');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

function renderCalendar() {
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  monthYearElement.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  daysElement.innerHTML = '';

  for (let i = 0; i < startDate.getDay(); i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day', 'empty');
    daysElement.appendChild(emptyDay);
  }

  for (let i = 1; i <= endDate.getDate(); i++) {
    const day = document.createElement('div');
    day.textContent = i;
    day.classList.add('day');
    daysElement.appendChild(day);
  }
}

function goToPreviousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function goToNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

prevBtn.addEventListener('click', goToPreviousMonth);
nextBtn.addEventListener('click', goToNextMonth);

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

renderCalendar();
