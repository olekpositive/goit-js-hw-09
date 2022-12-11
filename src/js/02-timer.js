import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const x = {
    btnStart: document.querySelector('[data-start]'),
    btnReset: document.querySelector('[data-reset]'),
    timerDays: document.querySelector('[data-days'),
    timerHours: document.querySelector('[data-hours'),
    timerMinutes: document.querySelector('[data-minutes'),
    timerSeconds: document.querySelector('[data-seconds'),
    timerValue: document.querySelector('.value'),
};

x.btnStart.disabled = true;
x.btnReset.disabled = true;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();

        if (selectedDates[0] - currentDate > 0) {
            x.btnStart.disabled = false;
        } else {
            x.btnStart.disabled = true;
            Notify.failure('Please choose a date in the future', {
                timeout: 1500,
                width: '400px',
            });
        }
    },
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

const fp = flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

function onTimerStart() {
    const selectedDate = fp.selectedDates[0];

    timerId = setInterval(() => {
        const startTime = new Date();
        const countdown = selectedDate - startTime;
        x.btnStart.disabled = true;
        x.btnReset.disabled = false;

        if (countdown < 0) {
            clearInterval(timerId);
            return;
        }
        updateTimerFace(convertMs(countdown));
    }, 1000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
    x.timerDays.textContent = addLeadingZero(days);
    x.timerHours.textContent = addLeadingZero(hours);
    x.timerMinutes.textContent = addLeadingZero(minutes);
    x.timerSeconds.textContent = addLeadingZero(seconds);
}

x.btnStart.addEventListener('click', onTimerStart);
x.btnReset.addEventListener("click", () => {
    x.timerValue.reset();
})