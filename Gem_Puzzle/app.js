class GemPuzlle {
  initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
  constructor(element) {
    this.elem = document.querySelector(element);
    this.elem.addEventListener('click', this.switchCell.bind(this));
  }

  renderTable() {
    for (let i = this.initialArray.length; i > 0; i--) {
      this.elem.insertAdjacentHTML(
        'afterbegin',
        `<div class="cell cell-${i}" data-n=${i}>${i}</div>`,
      );
    }
  }
  switchCell(event) {
    console.log('event :>> ', event.target);
  }
}

const firstGame = new GemPuzlle('.root');

firstGame.renderTable();
