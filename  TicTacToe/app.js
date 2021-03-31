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
const test = [];

const checkWinX = (n) => {
  // if (arr.length < 3) return;
  // console.log('winX :>> ', arr);
  // winWin.map((array, i) => {
  //   if (array.includes(arr)) {
  //     console.log('array :>> ', array);
  //     winX.map((el, index) => {
  //       if (array.includes(el)) {
  //         test.push(true);
  //       }
  //     });
  //     // test.push(array);
  //   }
  // });
  const www = winX.sort((a, b) => a - b);
  const c = winWin.filter((item) => item.includes(n));
  console.log('c :>> ', c);
  console.log('winX :>> ', www);
  console.log('test :>> ', test);
};

const checkWinO = (arr) => {
  if (arr.length < 3) return;
  // console.log('winO :>> ', arr);
};

const renderX = (e) => {
  e.target.textContent = 'x';
};
const render0 = (e) => {
  e.target.textContent = '0';
};

const addData = (n, value) => {
  if (value === 'x') {
    checkWinX(n);
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
