import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days');
const hours = document.querySelector('[data-hours');
const minutes = document.querySelector('[data-minutes');
const seconds = document.querySelector('[data-seconds');
const insertData = document.querySelector('input[type="text"]')
let selectedTime = 0;
let tempSelectionTime = 0;


let currentTime = new Date;
let convertTime = convertMs(currentTime.getTime());
let statusInterval = false;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        tempSelectionTime = selectedDates[0].getTime();
        if (((tempSelectionTime - currentTime.getTime()) <= 0) && (statusInterval == true)) {
            Notify.failure("Please choose a date in the future");
        } else {
            tempSelectionTime = selectedDates[0].getTime();
            // const tempTime = convertMs(selectedTime)
            if ((tempSelectionTime - currentTime.getTime()) <= 0) {
                btnStart.setAttribute("disabled", true);
                Notify.failure("Please choose a date in the future");
                //window.alert("Please choose a date in the future");
            } else {
                btnStart.removeAttribute("disabled");

            }
        }
    },
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

btnStart.addEventListener("click", () => {
    btnStart.setAttribute("disabled", true);
    insertData.setAttribute("disabled", true);
    selectedTime = tempSelectionTime;
    updateTime = setInterval(() => {
        statusInterval = true;
        currentTime = new Date;
        convertTime = convertMs(selectedTime - currentTime.getTime());

        days.textContent = (addLeadingZero(convertTime.days)).padStart();
        hours.textContent = (addLeadingZero(convertTime.hours)).padStart();
        minutes.textContent = (addLeadingZero(convertTime.minutes)).padStart();
        seconds.textContent = (addLeadingZero(convertTime.seconds)).padStart();
        // console.log(selectedTime - currentTime.getTime());
        if ((selectedTime - currentTime.getTime()) <= 1000) {
            clearInterval(updateTime);
            statusInterval = false;
        }
    }, 1000);

});