// const initialArray = [
//   { text: 1 },
//   { text: 2 },
//   { text: 3 },
//   { text: 4 },
//   { text: 5 },
//   { text: 6 },
//   { text: 7 },
//   { text: 8 },
//   { text: 9 },
//   { text: 10 },
//   { text: 11 },
//   { text: 12 },
//   { text: 13 },
//   { text: 14 },
//   { text: 15 },
//   { active: true, text: '' },
// ];
class GemPuzlle {
  initialArray = [];
  switchSquare = 0;
  newPlaceSquare = 0;
  counetr = 0;
  constructor(element, cellNumber) {
    this.elem = document.querySelector(element);
    this.cellNumber = cellNumber;
    this.elem.addEventListener('click', this.stepUser.bind(this));
  }
  createArrayCells() {
    let count = 1;
    for (let i = 0; i <= this.cellNumber; i++) {
      if (this.cellNumber === i) {
        this.initialArray.push({ active: true, text: '' });
        break;
      }
      this.initialArray.push({ text: count++ });
    }
  }

  renderTable() {
    this.elem.innerHTML = '';
    this.createArrayCells();
    for (let i = 0; i < this.initialArray.length; i++) {
      this.elem.innerHTML += `<div class="cell cell-${i} ${
        this.initialArray[i].active ? 'active' : ''
      }" data-i=${i}>${this.initialArray[i].text}</div>`;
    }
  }
  stepNumberClean() {
    this.switchSquare = null;
    this.newPlaceSquare = null;
  }

  switchCell() {
    console.log('object :>> ', this.switchSquare);
    console.log('newPlaceSquare :>> ', this.newPlaceSquare);
    this.initialArray[this.newPlaceSquare].active === true ? null : alert('Не корретный ход');

    [this.initialArray[+this.switchSquare], this.initialArray[+this.newPlaceSquare]] = [
      this.initialArray[+this.newPlaceSquare],
      this.initialArray[+this.switchSquare],
    ];
    this.renderTable();
  }

  stepUser(event) {
    const { dataset } = event.target;
    if (this.counetr === 0) {
      this.switchSquare = +dataset.i;
      this.counetr++;
    } else {
      this.newPlaceSquare = +dataset.i;
      this.counetr--;
      this.switchCell();
    }
  }
}

const firstGame = new GemPuzlle('.root', 15);

firstGame.renderTable();
