class ClassicPuzzle {
  constructor(element, countX, countY) {
    this.countX = countX;
    this.countY = countY;
    // Create Element
    this.container = document.createElement('div');
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'file');
    //AddClassList
    this.container.classList.add('container');
    //
    this.container.style.setProperty('--countX', this.countX);
    this.container.style.setProperty('--countY', this.countY);
    this.container.style.aspectRatio = `${this.countX} / ${this.countY}`;
    //
    this.elementRoot = document.querySelector(element);
    this.elementRoot.append(this.container);
    this.container.append(this.input);
    //AddEvents
    this.input.addEventListener('change', this.selectUserFiles.bind(this));
    // this.img.ondragstart = () => false;
  }

  selectUserFiles(event) {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.canvasView(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  canvasView(img) {
    if (img) {
      this.input.style.display = 'none';
      this.container.style.setProperty('--bg-image', `url(${img})`);
      for (let y = 0; y < this.countY; y++) {
        for (let x = 0; x < this.countX; x++) {
          const imgElement = document.createElement('div');
          imgElement.classList.add(`pic`);
          imgElement.style.backgroundPosition = `${(x * 100) / (this.countX - 1)}% ${
            (y * 100) / (this.countY - 1)
          }%`;
          imgElement.style.backgroundSize = `${this.countX * 100}% ${this.countY * 100}% `;
          imgElement.style.top = `${(y * 100) / this.countY}%`;
          imgElement.style.left = `${(x * 100) / this.countX}%`;
          this.container.append(imgElement);
          imgElement.addEventListener('mousedown', this.stepUser.bind(this, x, y));
        }
      }
    }
  }

  stepUser(x, y, event) {
    console.log('x, :>> ', x);
    console.log('y :>> ', y);
    console.log('event :>> ', event);
    let shiftX = event.clientX - event.target.getBoundingClientRect().left;
    let shiftY = event.clientY - event.target.getBoundingClientRect().top;

    event.target.style.position = 'absolute';
    event.target.style.zIndex = 1000;
    document.body.append(event.target);

    moveAt(event.pageX, event.pageY);

    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
      event.target.style.left = pageX - shiftX + 'px';
      event.target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    // отпустить мяч, удалить ненужные обработчики
    event.target.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      event.target.onmouseup = null;
    };
  }
}
const startGame = new ClassicPuzzle('.root', 4, 4);

startGame.canvasView();
