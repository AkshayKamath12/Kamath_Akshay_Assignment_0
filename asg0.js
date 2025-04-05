// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color
  v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(v1, 'red'); 
}


function drawVector(v, color) {
  vElements = v.elements;
  var ctx = document.getElementById('example').getContext('2d');
  ctx.beginPath();
  ctx.moveTo(200, 200); // Ending point
  ctx.lineTo(200 + vElements[0] * 20, 200 - vElements[1] * 20); // Ending point
  ctx.strokeStyle = color; // Set line color
  ctx.lineWidth = 2; // Set line width
  ctx.stroke(); // Draw the line
}

function handleDraw() {
  var xVal1 = document.getElementById("x-input").value;
  var yVal1 = document.getElementById("y-input").value;
  var xVal2 = document.getElementById("x-input2").value;
  var yVal2 = document.getElementById("y-input2").value;

  xVal1 = !isNaN(xVal1) && xVal1 != "" ? parseFloat(xVal1) : 0;
  yVal1 = !isNaN(yVal1) && yVal1 != "" ? parseFloat(yVal1) : 0;
  xVal2 = !isNaN(xVal2) && xVal2 != "" ? parseFloat(xVal2) : 0;
  yVal2 = !isNaN(yVal2) && yVal2 != "" ? parseFloat(yVal2) : 0;

  var ctx = document.getElementById('example').getContext('2d');
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color

  var v1 = new Vector3([xVal1, yVal1, 0]);
  var v2 = new Vector3([xVal2, yVal2, 0]);
  drawVector(v1, 'red');
  drawVector(v2, 'blue');


}

function handleDrawOperationEvent() {
  var xVal1 = document.getElementById("x-input").value;
  var yVal1 = document.getElementById("y-input").value;
  var xVal2 = document.getElementById("x-input2").value;
  var yVal2 = document.getElementById("y-input2").value;

  xVal1 = !isNaN(xVal1) && xVal1 != "" ? parseFloat(xVal1) : 0;
  yVal1 = !isNaN(yVal1) && yVal1 != "" ? parseFloat(yVal1) : 0;
  xVal2 = !isNaN(xVal2) && xVal2 != "" ? parseFloat(xVal2) : 0;
  yVal2 = !isNaN(yVal2) ? parseFloat(yVal2) : 0;
  var operation = document.getElementById("operation").value;
  var scalar = document.getElementById("scalar").value;
  scalar = !isNaN(scalar) && scalar != "" ? parseFloat(scalar) : 0;
  var ctx = document.getElementById('example').getContext('2d');
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
  ctx.fillRect(0, 0, 400, 400);   

  var v1 = new Vector3([xVal1, yVal1, 0]);
  var v2 = new Vector3([xVal2, yVal2, 0]);
  drawVector(v1, 'red');
  drawVector(v2, 'blue');
  if(operation == "add") {
    v1.add(v2);
    drawVector(v1, 'green');
  } else if(operation == "subtract") {
    v1.sub(v2);
    drawVector(v1, 'green');
  } else if(operation == "multiply") {
    v1.mul(scalar);
    drawVector(v1, 'green');
    v2.mul(scalar);
    drawVector(v2, 'green');
  } else if(operation == "divide") {
    v1.div(scalar);
    drawVector(v1, 'green');
    v2.div(scalar);
    drawVector(v2, 'green');
  } else if (operation == "magnitude"){
    var mag1 = v1.magnitude();
    var mag2 = v2.magnitude();
    console.log("Magnitude v1: " + mag1);
    console.log("Magnitude v2: " + mag2);
  } else if (operation == "normalize"){
    v1.normalize();
    drawVector(v1, 'green');
    v2.normalize();
    drawVector(v2, 'green');
  } else if (operation == "angle between"){
    console.log("Angle: " + angleBetween(v1, v2));
  } else if (operation == "area"){
    console.log("Area of the triangle: " + areaTriangle(v1, v2));
  } 
  
}

function angleBetween(v1, v2) {
  var dotProduct = Vector3.dot(v1, v2);
  var mag1 = v1.magnitude();
  var mag2 = v2.magnitude();
  var cosTheta = dotProduct / (mag1 * mag2);
  return Math.round(Math.acos(cosTheta) * (180 / Math.PI), 2);
}

function areaTriangle(v1, v2) {
  var cross = Vector3.cross(v1, v2);
  var area = cross.magnitude() / 2;
  return area;
}