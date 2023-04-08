const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyBg = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function paintBody() {
  const colorRendom = getRandomHexColor();
  bodyBg.style.backgroundColor = colorRendom;
}

let intervalId = null;

btnStart.addEventListener('click', () => {
  intervalId = setInterval(paintBody, 1000);
  btnStart.disabled = true;
});

btnStop.addEventListener('click', () => {
  clearInterval(intervalId);
  btnStart.disabled = false;
});
