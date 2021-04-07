sessionStorage.clear('');
const root = document.querySelector('.root');
const cardList = [...root.querySelectorAll('.card')];
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
const X = [];
const Zerro = [];

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

const renderSymbol = (e, value) => {
  e.target.textContent = value;
};

const addData = (n, value) => {
  if (value === 'x') {
    X.push(n);
    checkWhoWin(n, X, 'Крестик');
  }
  if (value === 'o') {
    Zerro.push(n);
    checkWhoWin(n, Zerro, 'Нолик');
  }
};

const renderFigure = (e) => {
  let currentFigure = sessionStorage.getItem('figure') ? sessionStorage.getItem('figure', '') : '';
  if (e.target.textContent) return;

  if (currentFigure === 'o' || currentFigure === '') {
    sessionStorage.setItem('figure', 'x');
    addData(+e.target.dataset.n, 'x');
    renderSymbol(e, 'x');
  } else {
    sessionStorage.setItem('figure', 'o');
    addData(+e.target.dataset.n, 'o');
    renderSymbol(e, 'o');
  }
};

root.addEventListener('click', renderFigure);
