const canvas = document.getElementById('spin-wheel');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Define wheel properties
const radius = canvas.width / 2 - 20;
const segments = 8;
const segmentAngle = 2 * Math.PI / segments;
const colors = ['#f44336', '#9c27b0', '#3f51b5', '#009688', '#4caf50', '#ffeb3b', '#ffc107', '#ff5722'];

// Define arrow indicator properties
const arrowWidth = 20;
const arrowHeight = 30;

// Define spin function
function spin() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Generate a random angle to spin the wheel
  const randomAngle = Math.random() * 2 * Math.PI;

  // Rotate the canvas by the random angle
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(randomAngle);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Draw the spin wheel
  for (let i = 0; i < segments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = (i + 1) * segmentAngle;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    // Draw text in the middle of each segment
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`Prize ${i + 1}`, 50, 0);
    ctx.restore();
  }

  // Draw the arrow indicator
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - arrowWidth / 2, canvas.height / 2 - radius - arrowHeight);
  ctx.lineTo(canvas.width / 2 + arrowWidth / 2, canvas.height / 2 - radius - arrowHeight);
  ctx.lineTo(canvas.width / 2, canvas.height / 2 - radius);
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
}

// Execute spin function on window load
window.onload = spin;

// Add event listener to spin button
const spinButton = document.getElementById('spin-button');
spinButton.addEventListener('click', spin);