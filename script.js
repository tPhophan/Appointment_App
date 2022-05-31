//------------------------------------------------------------------
const countDownForm = document.querySelector('#countDownForm');
//console.log(countDownForm);
const inputContainer = document.querySelector('#input-container');
//console.log(inputContainer);
const datePicker = document.querySelector('#date-picker');
//console.log(datePicker);
//------------------------------------------------------------------
const countDownEl = document.querySelector('#countDown');
//console.log(countDownEl);
const countDownTitleEl = document.querySelector('#countDown-title');
//console.log(countDownTitleEl);
const countDownBtn = document.querySelector('#countDown-btn');
//console.log(countDownBtn);
const timeEl = document.querySelectorAll('span');
//console.log(timeEl);
//------------------------------------------------------------------
const completeEl = document.querySelector('#complete');
//console.log(completeEl);
const completeInfoEl = document.querySelector('#complete-info');
//console.log(completeInfoEl);
const completeBtnEl = document.querySelector('#complete-btn');
//console.log(completeBtnEl);
//------------------------------------------------------------------

let countDownTitle = '';
let countDownDate = '';

let countDownValue = Date;
let countDownActive;
let saveCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

countDownForm.addEventListener('submit', ft_updateCountDown);

function ft_updateCountDown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;

    if (countDownTitle === '' || countDownDate === ''){
        alert('ป้อนข้อมูลไม่ครบ');
    }
    else{
        saveCountDown = {title:countDownTitle, date:countDownDate};
        localStorage.setItem('countDown',JSON.stringify(saveCountDown));
        countDownValue = new Date(countDownDate).getTime();
        ft_setupTime();
    }
}

function ft_setupTime() {
    countDownActive = setInterval(()=>{
        const now = new Date().getTime();
        const dif = countDownValue - now;

        const days = Math.floor(dif / day);
        const hours = Math.floor((dif % day) / hour);
        const minutes = Math.floor((dif % hour) / minute);
        const seconds = Math.floor((dif % minute) / second);
        inputContainer.hidden = true;

        if (dif < 0){
            countDownEl.hidden = true;
            completeEl.hidden = false;
            completeInfoEl.textContent = `${countDownTitle} วันที่ ${countDownDate}`
            clearInterval(countDownActive);
        }
        else{
            countDownTitleEl.textContent = `${countDownTitle}`
            timeEl[0].innerText = `${days}`
            timeEl[1].innerText = `${hours}`
            timeEl[2].innerText = `${minutes}`
            timeEl[3].innerText = `${seconds}`
            countDownEl.hidden = false;
            completeEl.hidden = true;
        }
    },second);
}

function ft_callDataInStore(){
    if (localStorage.getItem('countDown')){
        inputContainer.hidden = true;
        saveCountDown = JSON.parse(localStorage.getItem('countDown'));
        countDownTitle = saveCountDown.title;
        countDownDate = saveCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        ft_setupTime();
    }
}

function ft_resetLocalStorage(){
    localStorage.removeItem('countDown');
    countDownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countDownActive);
    countDownTitle = '';
    countDownDate = '';
}

ft_callDataInStore();

countDownBtn.addEventListener('click', ft_resetLocalStorage);

completeBtnEl.addEventListener('click', ft_resetLocalStorage);
