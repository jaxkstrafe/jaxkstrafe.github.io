const monthYearElement = document.getElementById('monthYear');
const daysElement = document.querySelector('.days');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const saveEventBtn = document.getElementById('saveEventBtn');
const activitySelect = document.getElementById('activitySelect');

let currentDate = new Date();
let events = []; // Array to store events
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
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentDate.getFullYear() &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getDate() === i;
    });

    if (dayEvents.length > 0) {
      const eventList = document.createElement('ul');
      dayEvents.forEach(event => {
        const eventItem = document.createElement('li');
        eventItem.textContent = event.activity;
        eventList.appendChild(eventItem);
      });
      day.appendChild(eventList);
    }

    daysElement.appendChild(day);
  }
}

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
    day.setAttribute('data-day', i);
    day.addEventListener('click', openModal);
    
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentDate.getFullYear() &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getDate() === i;
    });

    if (dayEvents.length > 0) {
      const eventList = document.createElement('ul');
      dayEvents.forEach(event => {
        const eventItem = document.createElement('li');
        eventItem.textContent = event.activity;
        eventList.appendChild(eventItem);
      });
      day.appendChild(eventList);
    }

    daysElement.appendChild(day);
  }
}

function openModal(event) {
  const selectedDay = event.target.getAttribute('data-day');
  if (selectedDay) {
    modal.style.display = 'block';
    currentDate.setDate(selectedDay); // Set the selected day for the modal
  }
}

function closeModal() {
  modal.style.display = 'none';
}

function saveEvent() {
  const selectedDate = currentDate.getDate();
  const selectedMonth = currentDate.getMonth();
  const selectedYear = currentDate.getFullYear();
  const selectedActivity = activitySelect.value;

  const newEvent = {
    date: new Date(selectedYear, selectedMonth, selectedDate),
    activity: selectedActivity
  };

  events.push(newEvent);
  renderCalendar(); // Update the calendar to display the new event

  closeModal();
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
daysElement.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
saveEventBtn.addEventListener('click', saveEvent);

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

renderCalendar();
