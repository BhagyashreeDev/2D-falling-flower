# 🌸 Falling Sakura (Cherry Blossom) Animation

A lightweight, zero-dependency HTML5 Canvas particle animation simulating natural falling cherry blossom petals and flowers with realistic physics and 3D tumbling.

---

## 📌 Key Concepts to Remember (What You Learned)

- **1. The Digital Paintbrush (`ctx`)**
  - `canvas.getContext("2d")` gives you the drawing engine.
  - Set `canvas.width` and `canvas.height` to `window.innerWidth` and `window.innerHeight` to fill the full screen.

- **2. Organic Curves with Bézier Curves (`ctx.bezierCurveTo`)**
  - Rigid shapes look artificial. Petals need organic curvature.
  - Control points act like invisible magnets pulling the curve outwards:
    ```javascript
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    ```

- **3. Canvas Transformation Sandbox (`save`, `translate`, `restore`)**
  - **`ctx.save()`**: Saves current canvas settings.
  - **`ctx.translate(x, y)`**: Temporarily moves the origin `(0, 0)` to the base of the petal/flower.
  - **`ctx.restore()`**: Resets coordinates back so other elements aren't affected.

- **4. Radial Symmetry for 5-Petal Flowers**
  - A full circle in radians is `Math.PI * 2` ($360^\circ$).
  - Divide by 5 to place petals evenly at $72^\circ$ intervals:
    ```javascript
    let angle = (i * Math.PI * 2) / 5;
    ```

- **5. Animation Flipbook (`requestAnimationFrame`)**
  - Runs at ~60 frames per second.
  - Every frame:
    1. Clear old frame with `ctx.clearRect(0, 0, width, height)`.
    2. Add gravity: `y += speedY`.
    3. Redraw at new position.

- **6. Wind Sway with Sine Waves (`Math.sin()`)**
  - `Math.sin(angle)` oscillates smoothly between **-1** and **+1**.
  - Creates natural pendulum-like drifting instead of falling straight down like a stone:
    ```javascript
    this.x += Math.sin(this.swayAngle) * amplitude;
    ```

- **7. The 3D "Coin Flip" Illusion (`Math.cos()`)**
  - As a petal tumbles in the air, its edge turns toward your eye.
  - Scaling the vertical axis with `Math.cos(flip)` squashes and flips it, tricking the brain into seeing real 3D rotation:
    ```javascript
    ctx.scale(size, size * Math.cos(flip));
    ```

- **8. Particle Blueprint (`class Flower`)**
  - One class manages many particles.
  - Gives each particle its own randomized speed, size, starting position, and type (80% single petals, 20% full flowers).
  - Resets particles to the top when they fall past the screen bottom.