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
  humanGame = false;
  pcGame = false;
  constructor(elem) {
    this.elem = document.querySelector(elem);
    this.elem.addEventListener('click', (e) => {
      this.renderFigure(e);
    });
    this.msgHello = this.elem.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="info-game">
        <form name="my">
        <h1>Для старта игры выбирите противна и нажмите Начать</h1>
        <label for="PC">Game with PC</label>
        <input type="radio" name="CH" id="PC" style="height:20px; width:20px; vertical-align: sub;" data-name="pc"/>
        <label for="Human">Game with Human</label>
        <input type="radio" name="CH" id="Human" style="height:20px; width:20px; vertical-align: sub;" checked data-name="human"/>
        <button type="button">Начать игру</button>
        </form>
      </div>
      `,
    );
    this.myForm = document.forms.my;
    this.buttonElement = [...this.myForm.elements].find((item) => item.tagName === 'BUTTON');
    this.buttonElement.addEventListener('click', (e) => {
      this.valideStartGame(e);
    });
  }

  doYouHaveStartGame() {
    this.createTable();
  }

  valideStartGame() {
    this.inputChecked = [...this.myForm.elements].find((item) => item.checked);
    if (this.inputChecked.dataset.name === 'human') {
      this.startGame = true;
      this.humanGame = true;
      this.createTable();
      this.msgHello = this.elem.insertAdjacentHTML('afterbegin', ``);
    }
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
      this.msgHello;
    }
  }

  createSymbol(e, value) {
    e.target.textContent = value;
  }

  addData(n, value) {
    if (value === 'x') {
      this.arrayX.push(n);
      this.checkWhoWin(n, this.arrayX, 'Крестик');
    }
    if (value === 'o') {
      this.arrayZerro.push(n);
      this.checkWhoWin(n, this.arrayZerro, 'Нолик');
    }
  }

  checkWhoWin(n, array, text) {
    const sortWin = array.sort((a, b) => a - b);
    const arrayWins = winWin.filter((item) => item.includes(n));
    const res = arrayWins
      .filter((arr) => sortWin.reduce((acc, el) => (arr.includes(el) ? ++acc : acc), 0) === 3)
      .flat();
    res.length > 1 ? alert(`${text} выграл`) : null;
  }

  renderFigure(e) {
    if (this.startGame) {
      if (e.target.textContent) return;
      if (this.currentFigure === 'o' || this.currentFigure === '') {
        this.currentFigure = 'x';
        this.addData(+e.target.dataset.n, 'x');
        this.createSymbol(e, 'x');
      } else {
        this.currentFigure = 'o';
        this.addData(+e.target.dataset.n, 'o');
        this.createSymbol(e, 'o');
      }
    }
  }
}

const firstGame = new TikTakToe('.root');

firstGame.doYouHaveStartGame();
