/* complex_code.js */

// This code generates a Mandelbrot fractal image using JavaScript

// Canvas parameters
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

// Color palette
var colors = ["#000000", "#111111", "#222222", "#333333", "#444444",
              "#555555", "#666666", "#777777", "#888888", "#999999",
              "#AAAAAA", "#BBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE"];

// Calculate the Mandelbrot set
function calculateMandelbrot() {
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var real = map(x, 0, width, -2.5, 1);
      var imag = map(y, 0, height, -1, 1);
      
      var cr = real;
      var ci = imag;
      var iterations = 0;
      
      while (iterations < 100) {
        var tempR = cr * cr - ci * ci + real;
        var tempI = 2 * cr * ci + imag;
        
        cr = tempR;
        ci = tempI;
        
        if (cr * cr + ci * ci > 4) {
          break;
        }
        
        iterations++;
      }
      
      var colorIndex = map(iterations, 0, 100, 0, colors.length - 1);
      var color = colors[Math.floor(colorIndex)];
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

// Map a value from one range to another
function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

// Initialize the Mandelbrot calculation
function init() {
  calculateMandelbrot();
}

init();