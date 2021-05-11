class ClassicPuzzle {
  constructor(element) {
    this.elementRoot = document.querySelector(element);
    this.countX = 2;
    this.countY = 2;
    this.optionsList = [
      { name: 'Детский', countX: 2, countY: 2 },
      { name: 'Чуть старше', countX: 4, countY: 4 },
      { name: 'Играем по взрослому', countX: 8, countY: 8 },
      { name: 'Hard core', countX: 10, countY: 4 },
    ];
    // Create Element
    this.container = document.createElement('div');
    this.informationContainer = document.createElement('div');
    this.informationMessage = document.createElement('div');
    this.informationElement = document.createElement('span');
    this.informationImage = document.createElement('img');
    this.input = document.createElement('input');
    this.select = document.createElement('select');
    //AddAttribute
    this.input.setAttribute('type', 'file');
    //AddClassList
    this.container.classList.add('container');
    this.informationContainer.classList.add('informationContainer');
    this.informationElement.classList.add('informationElement');
    this.informationImage.classList.add('informationImage');
    //AddText
    this.informationMessage.textContent = 'Как должна выглядеть картинка';
    this.informationElement.textContent = 'i';
    //AddStyle
    //
    this.elementRoot.append(this.informationContainer);
    this.informationContainer.append(this.informationMessage);
    this.informationContainer.append(this.informationElement);
    this.informationContainer.append(this.informationImage);
    this.elementRoot.append(this.container);
    this.container.append(this.input);
    this.container.append(this.select);

    //AddEvents
    this.input.addEventListener('change', this.selectUserFiles.bind(this));
    this.select.addEventListener('change', this.selectListValue.bind(this));
    this.container.addEventListener('mousedown', this.stepUser.bind(this));
  }

  createOptionsList() {
    for (let i = 0; i < 4; i++) {
      const options = document.createElement('option');
      options.setAttribute('data-countx', this.optionsList[i].countX);
      options.setAttribute('data-county', this.optionsList[i].countY);
      options.textContent = this.optionsList[i].name;
      this.select.append(options);
    }
  }

  selectListValue(event) {
    const checkValueIndex = event.target.options.selectedIndex;
    this.countX = +event.target.options[checkValueIndex].dataset.countx;
    this.countY = +event.target.options[checkValueIndex].dataset.county;
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
      this.select.style.display = 'none';
      this.container.style.setProperty('--bg-image', `url(${img})`);
      this.container.style.setProperty('--countX', this.countX);
      this.container.style.setProperty('--countY', this.countY);
      this.container.style.aspectRatio = `${this.countX} / ${this.countY}`;
      this.informationImage.src = img;
      for (let y = 0; y < this.countY; y++) {
        for (let x = 0; x < this.countX; x++) {
          const imgElement = document.createElement('div');
          imgElement.classList.add(`pic`);
          imgElement.style.backgroundPosition = `${(x * 100) / (this.countX - 1)}% ${
            (y * 100) / (this.countY - 1)
          }%`;
          imgElement.style.backgroundSize = `${this.countX * 100}% ${this.countY * 100}% `;
          // imgElement.style.top = `${(y * 100) / this.countY}%`;
          // imgElement.style.left = `${(x * 100) / this.countX}%`;
          imgElement.style.top = `${(y * 10) / this.countY}%`;
          imgElement.style.left = `${(x * 10) / this.countX}%`;
          this.container.append(imgElement);
          imgElement.ondragstart = () => false;
        }
      }
    }
  }

  stepUser(event) {
    const elem = event.target.closest('.pic');
    if (elem) {
      // let shiftX = event.clientX - elem.getBoundingClientRect().left;
      // let shiftY = event.clientY - elem.getBoundingClientRect().top;
      this.container.append(elem);

      let shiftX = event.pageX - event.offsetX;
      let shiftY = event.pageY - event.offsetY;
      console.log('object :>> ', shiftX);
      console.log('object :>> ', shiftY);

      function moveAt(pageX, pageY) {
        elem.style.left = pageX - shiftX + 'px';
        elem.style.top = pageY - shiftY + 'px';
      }
      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      this.container.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onMouseMove);
      });
    }
  }
}
const startGame = new ClassicPuzzle('.root');
startGame.createOptionsList();
// startGame.canvasView();
