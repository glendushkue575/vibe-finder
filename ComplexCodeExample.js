/*
FileName: ComplexCodeExample.js
Content: A complex code example demonstrating a sophisticated JavaScript application focused on data manipulation and visualization.
*/

// Create an SVG canvas
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "800");
svg.setAttribute("height", "600");
document.body.appendChild(svg);

// Generate random data
const data = [];
for (let i = 0; i < 1000; i++) {
  const randomValue = Math.random() * 100;
  data.push(randomValue);
}

// Manipulate and preprocess the data
const processedData = data
  .filter(value => value > 50)
  .map(value => Math.sqrt(value))
  .sort((a, b) => a - b);

// Helper function to calculate statistics
const calculateStats = (data) => {
  const sum = data.reduce((acc, value) => acc + value, 0);
  const average = sum / data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  return { sum, average, min, max, range };
};

// Calculate statistics of the processed data
const stats = calculateStats(processedData);

// Define visualization parameters
const barWidth = 3;
const barSpacing = 1;
const maxBarHeight = 400;
const chartOffset = 100;

// Scale the data to fit the chart
const scale = (value, min, max, newMin, newMax) => {
  return newMin + ((newMax - newMin) * (value - min)) / (max - min);
};

// Draw a bar chart
processedData.forEach((value, index) => {
  const barHeight = scale(value, stats.min, stats.max, 0, maxBarHeight);
  
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", (index * (barWidth + barSpacing)) + chartOffset);
  rect.setAttribute("y", maxBarHeight - barHeight + chartOffset);
  rect.setAttribute("width", barWidth);
  rect.setAttribute("height", barHeight);
  rect.setAttribute("fill", "steelblue");
  svg.appendChild(rect);
});

// Display statistics
console.log("Sum:", stats.sum);
console.log("Average:", stats.average);
console.log("Min:", stats.min);
console.log("Max:", stats.max);

// Add axis labels and title
const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
title.setAttribute("x", "400");
title.setAttribute("y", "50");
title.setAttribute("text-anchor", "middle");
title.setAttribute("font-size", "24");
title.textContent = "Data Visualization";
svg.appendChild(title);

const xAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
xAxisLabel.setAttribute("x", "425");
xAxisLabel.setAttribute("y", "550");
xAxisLabel.setAttribute("text-anchor", "middle");
xAxisLabel.setAttribute("font-size", "14");
xAxisLabel.textContent = "Value";
svg.appendChild(xAxisLabel);

const yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
yAxisLabel.setAttribute("x", "50");
yAxisLabel.setAttribute("y", "300");
yAxisLabel.setAttribute("text-anchor", "middle");
yAxisLabel.setAttribute("font-size", "14");
yAxisLabel.setAttribute("transform", "rotate(-90,50,300)");
yAxisLabel.textContent = "Frequency";
svg.appendChild(yAxisLabel);
