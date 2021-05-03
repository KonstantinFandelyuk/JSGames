const stepChecker = {
  0: [1, 4],
  1: [0, 2, 5],
  2: [1, 3, 6],
  3: [2, 7],
  4: [0, 5, 8],
  5: [1, 4, 6, 9],
  6: [2, 5, 7, 10],
  7: [3, 6, 11],
  8: [4, 9, 12],
  9: [5, 8, 10, 13],
  10: [6, 9, 11, 14],
  11: [7, 10, 15],
  12: [8, 13],
  13: [9, 12, 14],
  14: [10, 13, 15],
  15: [11, 14],
};

class GemPuzlle {
  initialArray = [];
  currentCell = null;
  searchIndexElement = null;
  constructor(element, cellNumber) {
    this.elem = document.querySelector(element);
    this.cellNumber = cellNumber;
    this.elem.addEventListener('click', this.stepUser.bind(this));
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

      // поменять элементы местами
      // мы используем для этого синтаксис "деструктурирующее присваивание"
      // подробнее о нём - в следующих главах
      // то же самое можно записать как:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  createArrayCells() {
    let count = 1;
    for (let i = 0; i <= this.cellNumber; i++) {
      if (this.cellNumber === i) {
        this.initialArray.push({ active: true, text: '16' });
        break;
      }
      this.initialArray.push({ text: count++ });
    }
    this.shuffleArray(this.initialArray);
  }

  renderTable() {
    this.elem.innerHTML = '';
    for (let i = 0; i < this.initialArray.length; i++) {
      this.elem.innerHTML += `<div class="cell cell-${i} ${
        this.initialArray[i].active ? 'active' : ''
      }" data-i=${i}>${this.initialArray[i].text}</div>`;
    }
  }

  seatchElemnt(number) {
    for (const key in stepChecker) {
      if (+key === +number) {
        stepChecker[key].forEach((element) => {
          this.initialArray.forEach((item, i) => {
            if (i === element && item.active) {
              this.searchIndexElement = i;
            }
          });
        });
      }
    }
  }

  switchCell(elem) {
    this.seatchElemnt(elem);
    if (this.searchIndexElement === undefined || this.searchIndexElement === null) {
      alert('Не корретный ход');
      return;
    }

    [this.initialArray[+this.currentCell], this.initialArray[+this.searchIndexElement]] = [
      this.initialArray[+this.searchIndexElement],
      this.initialArray[+this.currentCell],
    ];

    this.renderTable();
    this.checkWin();
    this.currentCell = null;
    this.searchIndexElement = null;
  }

  stepUser(event) {
    const { dataset } = event.target;
    this.currentCell = +dataset.i;
    this.switchCell(+dataset.i);
  }
  checkWin() {
    let count = sessionStorage.getItem('step') ? sessionStorage.getItem('step') : 0;
    const winArray = this.initialArray.slice().sort((a, b) => a.text - b.text);
    if (winArray.every((elem, i) => elem.text === this.initialArray[i].text)) {
      alert(`Вы выграли за ${count} шагов`);
      sessionStorage.removeItem('step');
    } else {
      count++;
      sessionStorage.setItem('step', count);
    }
  }
}

const firstGame = new GemPuzlle('.root', 15);

firstGame.createArrayCells();
firstGame.renderTable();
