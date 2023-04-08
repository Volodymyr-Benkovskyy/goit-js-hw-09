import Notiflix from 'notiflix';
const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const {
    elements: { amount, delay, step },
  } = evt.currentTarget;

  let delayEl = Number(delay.value);
  const stepEl = Number(step.value);
  const amountEl = Number(amount.value);

  for (let i = 1; i <= amountEl; i += 1) {
    createPromise(i, delayEl)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌Rejected promise ${position} in ${delay}ms`);
      });
    delayEl += stepEl;
  }
});
