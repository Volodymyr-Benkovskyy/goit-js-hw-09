import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
let daysEl = document.querySelector('.value[data-days]');
let hoursEl = document.querySelector('.value[data-hours]');
let minutesEl = document.querySelector('.value[data-minutes]');
let secondsEl = document.querySelector('.value[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      timer.deadline = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  deadline: new Date(),
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      const ms = this.deadline - Date.now();

      if (ms <= 0) {
        this.stop();
        return;
      }

      let { days, hours, minutes, seconds } = this.convertMs(ms);

      daysEl.textContent = this.addLeadingZero(days);
      hoursEl.textContent = this.addLeadingZero(hours);
      minutesEl.textContent = this.addLeadingZero(minutes);
      secondsEl.textContent = this.addLeadingZero(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};

btnStart.addEventListener('click', () => {
  timer.start();
  btnStart.disabled = true;
});
