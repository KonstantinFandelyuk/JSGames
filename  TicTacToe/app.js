const root = document.querySelector('.root');
const cardList = [...root.querySelectorAll('.card')];
sessionStorage.clear('');
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

const checkWinX = (n) => {
  const sortX = X.sort((a, b) => a - b);
  const arrayWins = winWin.filter((item) => item.includes(n));
  const res = arrayWins
    .filter((arr) => sortX.reduce((acc, el) => (arr.includes(el) ? ++acc : acc), 0) === 3)
    .flat();
  res.length > 1 ? alert('Kрестик выграл') : null;
};

const checkWinZerro = (n) => {
  const sortZerro = Zerro.sort((a, b) => a - b);
  const arrayWins = winWin.filter((item) => item.includes(n));
  const res = arrayWins
    .filter((arr) => sortZerro.reduce((acc, el) => (arr.includes(el) ? ++acc : acc), 0) === 3)
    .flat();
  res.length > 1 ? alert('Нолик выграл') : null;
};

const renderX = (e) => {
  e.target.textContent = 'x';
};
const render0 = (e) => {
  e.target.textContent = '0';
};

const addData = (n, value) => {
  if (value === 'x') {
    X.push(n);
    checkWinX(n);
  }
  if (value === 'o') {
    Zerro.push(n);
    checkWinZerro(n);
  }
};

const renderFigure = (e) => {
  let currentFigure = sessionStorage.getItem('figure') ? sessionStorage.getItem('figure', '') : '';
  if (e.target.textContent) return;

  if (currentFigure === 'o' || currentFigure === '') {
    sessionStorage.setItem('figure', 'x');
    addData(+e.target.dataset.n, 'x');
    renderX(e);
  } else {
    sessionStorage.setItem('figure', 'o');
    addData(+e.target.dataset.n, 'o');
    render0(e);
  }
};

root.addEventListener('click', renderFigure);
