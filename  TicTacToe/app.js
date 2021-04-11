sessionStorage.clear('');
const root = document.querySelector('.root');
const winWin = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const arrayX = [];
const arrayZerro = [];

const renderTableGame = () => {
  for (let i = 9; i > 0; i--) {
    root.insertAdjacentHTML('afterbegin', `<div class="card card-${i}" data-n=${i}></div>`);
  }
};

renderTableGame();

const checkWhoWin = (n, array, text) => {
  const sortWin = array.sort((a, b) => a - b);
  const arrayWins = winWin.filter((item) => item.includes(n));
  const res = arrayWins
    .filter((arr) => sortWin.reduce((acc, el) => (arr.includes(el) ? ++acc : acc), 0) === 3)
    .flat();
  res.length > 1 ? alert(`${text} выграл`) : null;
};

const renderSymbol = (e, value, random) => {
  if (value === 'o') {
    random.textContent = value;
  } else {
    e.target.textContent = value;
  }
};

const addData = (n, value) => {
  if (value === 'x') {
    arrayX.push(n);
    checkWhoWin(n, arrayX, 'Крестик');
  }
  if (value === 'o') {
    arrayZerro.push(n);
    checkWhoWin(n, arrayZerro, 'Нолик');
  }
};

root.addEventListener('xEvent', (event) => {
  const randomNumber =
    event.detail.emptryArray[Math.floor(Math.random() * event.detail.emptryArray.length)];
  sessionStorage.setItem('figure', 'o');
  addData(+randomNumber.dataset.n, 'o');
  renderSymbol(event, 'o', randomNumber);
});

const renderFigure = (e) => {
  let currentFigure = sessionStorage.getItem('figure') ? sessionStorage.getItem('figure', '') : '';
  if (e.target.textContent) return;

  if (currentFigure === 'o' || currentFigure === '') {
    sessionStorage.setItem('figure', 'x');
    addData(+e.target.dataset.n, 'x');
    renderSymbol(e, 'x');
  }

  const newEvent = new CustomEvent('xEvent', {
    detail: {
      figure: 'o',
      event: e,
      emptryArray: [...document.querySelectorAll('.card')].filter(
        (item) => item.textContent === '',
      ),
    },
  });
  root.dispatchEvent(newEvent);
};

root.addEventListener('click', renderFigure);
