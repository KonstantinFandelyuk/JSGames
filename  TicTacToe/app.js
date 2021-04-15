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

class TikTakToe {
  arrayX = [];
  arrayZerro = [];
  currentFigure = '';
  startGame = false;
  constructor(elem) {
    this.elem = document.querySelector(elem);
    this.elem.addEventListener('click', (e) => {
      this.renderFigure(e);
    });
  }

  doYouHaveStartGame() {
    const qGame = confirm('Хотите начать игру?');
    console.log('object :>> ', qGame);
    if (qGame) {
      this.startGame = true;
    }
    this.createTable();
  }

  createTable() {
    if (this.startGame) {
      for (let i = 9; i > 0; i--) {
        this.elem.insertAdjacentHTML(
          'afterbegin',
          `<div class="card card-${i}" data-n=${i}></div>`,
        );
      }
    } else {
      this.elem.insertAdjacentHTML(
        'afterbegin',
        `<div class="">
      <h1>Начнем игру?</h1>
      <button type="button" onclick="${this.startGame = true}">Да</button>
      </div>`,
      );
    }
  }

  createSymbol(e, value) {
    e.target.textContent = value;
  }

  renderFigure(e) {
    if (this.startGame) {
      if (e.target.textContent) return;
      if (this.currentFigure === 'o' || this.currentFigure === '') {
        this.currentFigure = 'x';
        // addData(+e.target.dataset.n, 'x');
        this.createSymbol(e, 'x');
      } else {
        this.currentFigure = 'o';
        // addData(+e.target.dataset.n, 'o');
        this.createSymbol(e, 'o');
      }
    }
  }
}

// const checkWhoWin = (n, array, text) => {
//   const sortWin = array.sort((a, b) => a - b);
//   const arrayWins = winWin.filter((item) => item.includes(n));
//   const res = arrayWins
//     .filter((arr) => sortWin.reduce((acc, el) => (arr.includes(el) ? ++acc : acc), 0) === 3)
//     .flat();
//   res.length > 1 ? alert(`${text} выграл`) : null;
// };

// const addData = (n, value) => {
//   if (value === 'x') {
//     arrayX.push(n);
//     checkWhoWin(n, arrayX, 'Крестик');
//   }
//   if (value === 'o') {
//     arrayZerro.push(n);
//     checkWhoWin(n, arrayZerro, 'Нолик');
//   }
// };

const firstGame = new TikTakToe('.root');
firstGame.doYouHaveStartGame();
