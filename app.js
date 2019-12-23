let shapesArr = [];
let shapesCount = 1;

class Shape {
  constructor(width, height, shapeName) {
    this.width = width;
    this.height = height;
    this.shapeName = shapeName;

    this.myDiv = document.createElement('div');
    this.myDiv.classList.add('shape');
    this.myDiv.classList.add(this.shapeName);
    this.myDiv.classList.add(shapesCount);  // Add unique # as a class to each shape.

    this.computeRandomLocation();  // This will happen EVERY time 1 of the shapes is instantiated with "new" since we're using "extends" on the class declaration.
    // '<div class="shape"></div>';
    this.setupStyles();

    $(`.${shapesCount}`).click(() => {
      // console.log(shapesArr[shapesCount-1]);
      // console.log(`you clicked on: ${shapesArr[shapesCount-1].shape}`);
      this.describe();

      // $('#shapeHeightField').text(this.)
    })
    shapesCount++;
  };

  describe() {
    $('#shapeNameField').text(this.shapeName);
    $('#shapeHeightField').text(shapesArr[shapesCount - 1].height);
    $('#shapeWidthField').text(shapesArr[shapesCount - 1].width);
    $('#shapeAreaField').text(shapesArr[shapesCount - 1].area);
    $('#shapePerimeterField').text(shapesArr[shapesCount - 1].perimeter);
    $('#shapeRadiusField').text(shapesArr[shapesCount - 1].radius);
  }

  computeRandomLocation() {
    this.randomX = Math.floor(Math.random() * 600);
    this.randomY = Math.floor(Math.random() * 600);

    if ((this.randomX + (this.width * 2)) > (600)) {
      this.randomX = 600 - (this.width);
    }
    if ((this.randomY + (this.height * 2)) > (600)) {
      this.randomY = 600 - (this.height);
    }

  }

  setupStyles() {
    this.myDiv.style.left = `${this.randomX}px`;
    this.myDiv.style.top = `${this.randomY}px`;
    this.myDiv.style.width = `${this.width}px`;
    this.myDiv.style.height = `${this.height}px`;
    console.log(this.myDiv);  // For debugging...
    document.getElementById('canvas').appendChild(this.myDiv);
    // $('canvas').append(myDiv);
  }

}

class Circle extends Shape {
  constructor(radius) {
    super(`${radius * 2}`, `${radius * 2}`, 'circle');
    this.radius = radius;
    this.addToArray();
  }

  area = () => Math.PI * (this.radius * this.radius);
  perimeter = () => 2 * Math.PI * this.radius;

  addToArray() {
    shapesArr.push({ shape: "circle", height: "N/A", width: "N/A", area: this.area(), perimeter: this.perimeter(), radius: this.radius });
  }

}

class Triangle extends Shape {
  constructor(height) {
    super(height, height, 'triangle');
    this.height = height;
    this.addToArray();
  }

  setupStyles() {
    console.log('Function is overridden!');  // For debugging...
    this.myDiv.style.left = `${this.randomX}px`;
    this.myDiv.style.top = `${this.randomY}px`;
    this.myDiv.style.width = `0px`;
    this.myDiv.style.height = `0px`;
    this.myDiv.style.borderBottom = `${this.height}px solid yellow`;
    this.myDiv.style.borderRight = `${this.height}px solid transparent`;

    document.getElementById('canvas').appendChild(this.myDiv);
  }

  area = () => 0.5 * this.width * this.height;
  perimeter = () => (this.width * 2) + (this.height * 2);

  addToArray() {
    shapesArr.push({ shape: "triangle", height: this.height, width: this.height, area: this.area(), perimeter: this.perimeter(), radius: "N/A" });
  }

}

class Rectangle extends Shape {
  constructor(width, height) {
    super(width, height, 'rectangle');
    this.width = width;
    this.height = height;
    this.testFunc();
    this.addToArray();
  }

  area = () => this.width * this.height;
  perimeter = () => (this.width * 2) + (this.height * 2);
  testFunc = () => console.log(`the area of the rectangle is: ${this.area()}`);

  addToArray() {
    shapesArr.push({ shape: "rectangle", height: this.height, width: this.width, area: this.area(), perimeter: this.perimeter(), radius: "N/A" });
  }

}

class Square extends Shape {
  constructor(length) {  // with a square, ALL 4 sides are equal so I only need 1 value: this.width.
    super(length, length, 'square');
    this.length = length;
    this.addToArray();
  }

  area = () => this.width * this.width;
  perimeter = () => this.width * 4;

  addToArray() {
    shapesArr.push({ shape: "square", height: this.length, width: this.length, area: this.area(), perimeter: this.perimeter(), radius: "N/A" });
  }

}

$('#addTriangle').click(() => {
  let triangleLength = $('#triangle').val();
  let triangle = new Triangle(triangleLength);
})

$('#addRectangle').click(() => {
  let rectWidth = $('#rectangleWidth').val();
  let rectHeight = $('#rectangleHeight').val();
  let rect = new Rectangle(rectWidth, rectHeight);
})

$('#addSquare').click(() => {
  let squareLength = $('#squareLength').val();
  let square = new Square(squareLength, squareLength);
})


$('#addCircle').click(() => {
  let radius = $('#circleRadius').val();
  let circle = new Circle(radius);
})
