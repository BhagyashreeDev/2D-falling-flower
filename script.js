// --- 1. Canvas Setup & Paintbrush ---
const canvas = document.getElementById("meshCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 2. Function to Draw One Organic Petal ---
function drawPetal(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.fillStyle = "#ffb7c5"; // Soft sakura pink
  ctx.moveTo(0, 0);

  // Right curved side
  ctx.bezierCurveTo(40, -20, 40, -80, 0, -100);
  // Left curved side
  ctx.bezierCurveTo(-40, -80, -40, -20, 0, 0);
  ctx.fill();

  ctx.restore();
}

// --- 3. Flower & Petal Particle Class (The Blueprint) ---
class Flower {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -50;
    this.size = Math.random() * 0.35 + 0.25; // Random size scale
    this.speedY = Math.random() * 1.5 + 1;  // Gravity / fall speed

    // Gentle wind sway (Sine wave)
    this.swayAngle = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.02 + 0.01;

    // Rotation & 3D flipping
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
    this.flip = Math.random() * Math.PI * 2;
    this.flipSpeed = Math.random() * 0.03 + 0.02;

    // 20% are full 5-petal flowers, 80% are individual petals
    this.isFullFlower = Math.random() < 0.2;
  }

  update() {
    // 1. Advance the wave and rotation angles
    this.swayAngle += this.swaySpeed;
    this.rotation += this.rotSpeed;
    this.flip += this.flipSpeed;

    // 2. Physics: fall down and drift horizontally with sine wave
    this.y += this.speedY;
    this.x += Math.sin(this.swayAngle) * 0.8;

    // 3. Reset back to the top when falling off the bottom
    if (this.y > canvas.height + 50) {
      this.reset(false);
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    // The 3D flip illusion using cosine scaling
    ctx.scale(this.size, this.size * Math.cos(this.flip));

    if (this.isFullFlower) {
      // Draw 5 petals in a circle
      for (let i = 0; i < 5; i++) {
        let angle = (i * Math.PI * 2) / 5;
        drawPetal(0, 0, angle);
      }

      // Draw center pistil
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#ec4899"; // Darker pink center
      ctx.fill();
    } else {
      // Draw a single drifting petal
      drawPetal(0, 0, 0);
    }

    ctx.restore();
  }
}

// --- 4. Spawn Flowers & Animation Loop ---
const flowers = [];
const TOTAL_FLOWERS = 35;

for (let i = 0; i < TOTAL_FLOWERS; i++) {
  flowers.push(new Flower());
}

function animate() {
  // Clear the screen for the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw all flowers
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update();
    flowers[i].draw();
  }

  requestAnimationFrame(animate);
}

// Start the animation!
animate();

// --- 5. Resize Event Listener ---
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});