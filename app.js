class Shape {
  constructor(width, height, shapeName) {
    this.width = Number(width);
    this.height = Number(height);
    this.shapeName = shapeName;

    this.myDiv = document.createElement('div');
    this.myDiv.classList.add('shape');
    this.myDiv.classList.add(this.shapeName);

    this.computeRandomLocation();  // This will happen EVERY time 1 of the shapes is instantiated with "new" since we're using "extends" on the class declaration.
    this.setupStyles();

    this.myDiv.addEventListener('click', () => this.describe());
    this.myDiv.addEventListener('dblclick', () => {
      document.getElementById('canvas').removeChild(this.myDiv);
    })

  };

  describe() {
    $('#shapeNameField').text(this.shapeName);
    $('#shapeHeightField').text(this.height);
    $('#shapeWidthField').text(this.width);
    $('#shapeAreaField').text(this.height * this.width);
    $('#shapePerimeterField').text(2*this.height + 2*this.width);
    $('#shapeRadiusField').text('N/A');
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
    document.getElementById('canvas').appendChild(this.myDiv);
  }

}

class Circle extends Shape {
  constructor(radius) {
    super(`${radius * 2}`, `${radius * 2}`, 'circle');
    this.radius = Number(radius);
  }

  area = () => Math.PI * (this.radius * this.radius);
  perimeter = () => 2 * Math.PI * this.radius;

  describe() {
    $('#shapeNameField').text(this.shapeName);
    $('#shapeHeightField').text(this.height);
    $('#shapeWidthField').text(this.width);
    $('#shapeAreaField').text(this.area());
    $('#shapePerimeterField').text(this.perimeter());
    $('#shapeRadiusField').text(this.radius);
  }

}

class Triangle extends Shape {
  constructor(height) {
    super(height, height, 'triangle');
  }

  setupStyles() {
    this.myDiv.style.left = `${this.randomX}px`;
    this.myDiv.style.top = `${this.randomY}px`;
    this.myDiv.style.width = `0px`;
    this.myDiv.style.height = `0px`;
    this.myDiv.style.borderBottom = `${this.height}px solid yellow`;
    this.myDiv.style.borderRight = `${this.height}px solid transparent`;

    document.getElementById('canvas').appendChild(this.myDiv);
  }

  area = () => 0.5 * this.width * this.height;
  perimeter = () => this.hypotenuse() + this.width + this.height;
  hypotenuse = () => Math.sqrt(this.height * this.height + this.width * this.width);

  describe() {
    $('#shapeNameField').text('triangle');
    $('#shapeHeightField').text(this.height);
    $('#shapeWidthField').text(this.width);
    $('#shapeAreaField').text(this.area());
    $('#shapePerimeterField').text(this.perimeter());
    $('#shapeRadiusField').text('N/A');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super(width, height, 'rectangle');  // No "this.width" or "this.height" needed here!
  }

  area = () => this.width * this.height;
  perimeter = () => (this.width * 2) + (this.height * 2);

  describe() {
    $('#shapeNameField').text('rectangle');
    $('#shapeHeightField').text(this.height);
    $('#shapeWidthField').text(this.width);
    $('#shapeAreaField').text(this.area());
    $('#shapePerimeterField').text(this.perimeter());
    $('#shapeRadiusField').text('N/A');
  }

}

class Square extends Shape {
  constructor(length) {  // with a square, ALL 4 sides are equal so I only need 1 value: length.
    super(length, length, 'square');
  }

  area = () => this.width * this.width;
  perimeter = () => this.width * 4;

  describe() {
    $('#shapeNameField').text('square');
    $('#shapeHeightField').text(this.height);
    $('#shapeWidthField').text(this.width);
    $('#shapeAreaField').text(this.area());
    $('#shapePerimeterField').text(this.perimeter());
    $('#shapeRadiusField').text('N/A');
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
