// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
// get access to the paragraph to display count
const ballCountParagraph = document.getElementById('ballCount');
let ballCount = 0;
// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true; // Track whether the ball exists
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  // increment ball count
  ballCount++;
  ballCountParagraph.textContent = `Ball count: ${ballCount}`;
}

// shape class with only constructor
class Shape {
  constructor(x, y, velX, velY) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
  }
}

// evil circle
class EvilCircle extends Shape {
  constructor(x, y) {
      super(x, y, 20, 20);
      this.color = 'white';
      this.size = 10;

      // move the circle around the screen
      window.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "a":
            this.x -= this.velX;
            break;
          case "d":
            this.x += this.velX;
            break;
          case "w":
            this.y -= this.velY;
            break;
          case "s":
            this.y += this.velY;
            break;
        }
      });
    }
      // draw method to draw the object instance
      draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
        context.strokeStyle = this.color; 
        context.lineWidth = 3; 
        context.stroke(); 
      }

      // look to see whether the evil circle is going to go off the edge of the screen
      checkBounds(){
        if (this.x + this.size >= width) {
          this.x = -Math.abs(this.x);
        }
    
        if (this.x - this.size <= 0) {
          this.x = Math.abs(this.x);
        }
    
        if (this.y + this.size >= height) {
          this.y = -Math.abs(this.y);
        }
    
        if (this.y - this.size <= 0) {
          this.y = Math.abs(this.y);
        }
    
      }

      //detect collision
      collisionDetect() {
        for (const ball of balls) {
            // Check if the ball exists
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.exists = false; // erase the ball
                    // decrement the ball count
                    ballCount--;
                    ballCountParagraph.textContent = `Ball count: ${ballCount}`;
                }
            }
        }
    }

}


// instance for evilcircle
const evilCircle = new EvilCircle(random(0, width), random(0, height));

// function to keep all balls moving
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {           // will make sure if the ball exist
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }
  // call evil circle's method
  evilCircle.draw(ctx);
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();









