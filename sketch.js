//Creates variables.
var x, y;
var gSlider, fVal;
var strokeColor, database;
var colours,
  red1,
  black1,
  green1,
  blue1,
  yellow1,
  orange1,
  pink1,
  purple1,
  brown1,
  white1;

var drawing = [];

var db_drawing = [];

function setup() {
  //Creates the canvas.
  createCanvas(1200, 600);

  //Gives the background colour as white.
  background(255);

  database = firebase.database();

  colours = createButton("COLOURS");
  colours.position(625, 575);

  strokeColor = "black";

  red1 = createButton("red");
  red1.position(470, 530);

  black1 = createButton("black");
  black1.position(505, 530);

  green1 = createButton("green");
  green1.position(550, 530);

  blue1 = createButton("blue");
  blue1.position(600, 530);

  yellow1 = createButton("yellow");
  yellow1.position(640, 530);

  orange1 = createButton("orange");
  orange1.position(690, 530);

  pink1 = createButton("pink");
  pink1.position(740, 530);

  purple1 = createButton("purple");
  purple1.position(780, 530);

  brown1 = createButton("brown");
  brown1.position(830, 530);

  white1 = createButton("ERASER");
  white1.position(900, 530);

  //Creates the slider.
  //(min,max,initial)
  gSlider = createSlider(1, 15, 4);
  //(x,y)
  gSlider.position(375, 500);
  readData();


}

function mouseDragged() {
  var point = {
    x: mouseX,
    y: mouseY,
    x1: pmouseX,
    y1: pmouseY,
    stroke_weight: fVal,
    stroke_color: strokeColor,
  };
  drawing.push(point);
  var drawingRef = database.ref("drawing");
  drawingRef.set({
    d: drawing,
  });
}

function draw() {
 // clearDrawing();

  //Gives the value of mouse position for the variables.
  x = mouseX;
  y = mouseY;

  //Gives the value of slider for fval.
  fVal = gSlider.value();
  white1.mousePressed(() => {
    strokeColor = "white";
  });

  red1.mousePressed(() => {
    strokeColor = "red";
  });

  black1.mousePressed(() => {
    strokeColor = "black";
  });

  green1.mousePressed(() => {
    strokeColor = "green";
  });

  blue1.mousePressed(() => {
    strokeColor = "blue";
  });

  yellow1.mousePressed(() => {
    strokeColor = "yellow";
  });

  orange1.mousePressed(() => {
    strokeColor = "orange";
  });

  pink1.mousePressed(() => {
    strokeColor = "pink";
  });

  purple1.mousePressed(() => {
    strokeColor = "purple";
  });

  brown1.mousePressed(() => {
    strokeColor = "brown";
  });


  
  //Draws lines.
  // if (mouseIsPressed && mouseY < 400) {
  //   //stroke(0);
  //   stroke(strokeColor);
  //   strokeWeight(fVal);
  //   line(x, y, pmouseX, pmouseY);
  // }
  // //
  // //Draws the red line
  // for (var i = 0; i < 1166; i = i + 20) {
  //   stroke("black");
  //   strokeWeight(2);
  //   line(i, 400, i + 5, 400);
  // }

  //Real time drawing
  for (var i of db_drawing) {
    stroke(i.stroke_color);
    strokeWeight(i.stroke_weight);
    line(i.x, i.y, i.x1, i.y1);
  }
}

function readData() {
  var query = database.ref("drawing/").on("value", (data) => {
    db_drawing = data.val().d;
  });
}

function clearDrawing() {
  db_drawing = [];
  var drawingRef = database.ref("drawing");
  drawingRef.set({
    d: [],
  });
}
