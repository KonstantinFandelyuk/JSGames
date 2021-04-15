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
    this.elem.addEventListener('click', this.renderFigure.bind(this));
    this.elem.addEventListener('xEvent', this.pcStepEvent.bind(this));
  }

  doYouHaveStartGame() {
    this.renderInfoGame();
  }

  renderInfoGame() {
    this.elem.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="info-game">
        <form name="my">
        <h1>Для старта игры выбирите противна и нажмите Начать</h1>
        <label for="PC">Game with PC</label>
        <input type="radio" name="CH" id="PC" style="height:20px; width:20px; vertical-align: sub;" data-name="pc"/>
        <label for="Human">Game with Human</label>
        <input type="radio" name="CH" id="Human" style="height:20px; width:20px; vertical-align: sub;" checked data-name="human"/>
        <button type="submit">Начать игру</button>
        </form>
      </div>
      `,
    );
    this.myForm = document.forms.my;
    this.myForm.addEventListener('submit', this.valideStartGame.bind(this));
  }

  valideStartGame(event) {
    event.preventDefault();
    this.inputChecked = [...this.myForm.elements].find((item) => item.checked);
    if (this.inputChecked.dataset.name === 'human') {
      this.startGame = true;
      this.humanGame = true;
      this.createTable();
      this.myForm.remove();
    } else {
      this.startGame = true;
      this.pcGame = true;
      this.createTable();
      this.myForm.remove();
    }
  }

  createTable() {
    if (this.startGame)
      for (let i = 9; i > 0; i--) {
        this.elem.insertAdjacentHTML(
          'afterbegin',
          `<div class="card card-${i}" data-n=${i}></div>`,
        );
      }
  }

  addData(e, value, randomNamberAI) {
    if (value === 'x') {
      this.arrayX.push(+e.dataset.n);
      this.checkWhoWin(+e.dataset.n, this.arrayX, 'Крестик');
      e.textContent = value;
    }
    if (value === 'o') {
      this.arrayZerro.push(this.pcGame ? e : +e.dataset.n);
      this.checkWhoWin(this.pcGame ? e : +e.dataset.n, this.arrayZerro, 'Нолик');
      this.pcGame ? (randomNamberAI.textContent = value) : (e.textContent = value);
    }
  }

  pcStepEvent(event) {
    const randomNumber =
      event.detail.emptryArray[Math.floor(Math.random() * event.detail.emptryArray.length)];
    this.currentFigure = 'o';
    this.addData(+randomNumber.dataset.n, 'o', randomNumber);
  }

  renderFigure(e) {
    if (e.target.textContent) return;
    if (this.startGame) {
      if (this.currentFigure === 'o' || this.currentFigure === '') {
        this.currentFigure = 'x';
        this.addData(e.target, 'x');
      } else if (this.currentFigure === 'x' && this.humanGame) {
        this.currentFigure = 'o';
        this.addData(e.target, 'o');
      }
      this.pcGame &&
        this.elem.dispatchEvent(
          new CustomEvent('xEvent', {
            detail: {
              figure: 'o',
              event: e,
              emptryArray: [...document.querySelectorAll('.card')].filter(
                (item) => item.textContent === '',
              ),
            },
          }),
        );
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
}

const firstGame = new TikTakToe('.root');

firstGame.doYouHaveStartGame();
