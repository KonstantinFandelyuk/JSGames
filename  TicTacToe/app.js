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

const root = document.querySelector('.root');
const cardList = [...root.querySelectorAll('.card')];
const data = [];
sessionStorage.clear('');
const winX = [];
const winO = [];

const checkWinX = (arr) => {
  const test = [];
  // if (arr.length < 3) return;
  console.log('winX :>> ', arr);
  winWin.map((array, i) => {
    if (array.includes(arr[i])) {
      console.log('array :>> ', array);
    }
  });
  console.log('test :>> ', test);
};

const checkWinO = (arr) => {
  if (arr.length < 3) return;
  console.log('winO :>> ', arr);
};

const renderX = (e) => {
  e.target.textContent = 'x';
};
const render0 = (e) => {
  e.target.textContent = '0';
};

const addData = (n, value) => {
  if (value === 'x') {
    winX.push(n);
  }
  if (value === 'o') {
    winO.push(n);
  }
  checkWinX(winX);
  checkWinO(winO);
};

const renderFigure = (e) => {
  let currentFigure = sessionStorage.getItem('figure') ? sessionStorage.getItem('figure', '') : '';
  if (e.target.textContent) return;

  if (currentFigure === 'o' || currentFigure === '') {
    sessionStorage.setItem('figure', 'x');
    renderX(e);
    addData(+e.target.dataset.n, 'x');
  } else {
    sessionStorage.setItem('figure', 'o');
    render0(e);
    addData(+e.target.dataset.n, 'o');
  }
};

root.addEventListener('click', renderFigure);
