import uuid from "uuid";
import Ball from "../components/mainpage/Ball";

let paused = false;

let id;
let players = null;
let sneks = [];
let mouseInputReferencePoint;
let zoom = 1;

// For testing only!
let balls = [];

var snekMap = {};

let width;
let height;

export default function sketch(p) {
  class Snek {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }

    update() {
      var velocity = this.createVector(
        this.mouseX - this.width,
        this.mouseY - this.height
      );
      velocity.setMag(3);
      this.position.add(velocity);
    }

    draw() {
      p.fill(255);
      p.circle(this.x, this.y, this.r);
    }
  }

  // Create a few sneks for testing
  for (let i = 0; i < 10; i++) {
    let ball = new Ball(i * 25, i * 25, 75, p);
    sneks.push(ball);
  }

  p.setup = function() {
    height = window.innerHeight - 56;
    width = window.innerWidth;

    p.createCanvas(width, height);

    // Draw some random dots on the screen, so it's easier to see the camera movement
    for (let i = 0; i < 1000; i++) {
      let ball = {
        x: p.random(-width * 5, width * 5), //p.randomGaussian(width * 5, width),
        y: p.random(-height * 5, height * 5),
        r: p.random(25) + 5 //p.randomGaussian(height * 5, height)
      };
      balls.push(ball);
    }
  };

  // Point this used to send the mouse data to the server, but is being lerped so it's more smoove and has some constrains speed wise
  mouseInputReferencePoint = new Ball(width / 2, height / 2, 25, p);

  // Create Websocket
  const webSocket = new WebSocket("ws://localhost:1337/test/");

  webSocket.onopen = event => {
    //console.log(`Message: ${event.data}`);
    console.log("Connection opened");

    let output = {
      name: uuid.v4(),
      color: "#0984e3",
      startingPosition: {
        x: mouseInputReferencePoint.position.x,
        y: mouseInputReferencePoint.position.y
      }
    };

    let message = {
      action: "REGISTER",
      content: JSON.stringify(output)
    };
    id = output.name;
    webSocket.send(JSON.stringify(message));
  };

  webSocket.onmessage = event => {
    const content = JSON.parse(JSON.parse(event.data).content);
    players = content.players;
  };

  webSocket.onclose = () => {
    console.log("Connection closed");
  };

  p.mousePressed = function() {
    // TODO: Speedup the Snek
  };

  p.mouseReleased = function() {
    // TODO: Speeddown the Snek
  };

  p.keyPressed = function() {
    // SPACE
    if (p.keyCode == 32) {
      paused = !paused;
    }
  };

  // Resizing the canvas when the webwindow size is changed
  p.windowResized = () => {
    width = document.getElementById("main-container").offsetWidth;
    height = document.getElementById("main-container").offsetHeight;
    p.resizeCanvas(width, height);
  };

  p.mouseWheel = event => {
    event.delta / 100 < 0 ? (zoom *= 1.035) : (zoom /= 1.035);
  };

  p.draw = () => {
    if (paused) {
      return;
    }

    p.background(51);

    // Camera move with Snek
    // Starting point now at the center of the canvas
    p.translate(width / 2, height / 2);
    p.scale(zoom);
    p.translate(
      -mouseInputReferencePoint.position.x,
      -mouseInputReferencePoint.position.y
    );

    // Main reference point for the Snek to use as input values
    mouseInputReferencePoint.update(
      p.mouseX - width / 2,
      p.mouseY - height / 2
    );
    p.stroke(0, 0, 0, 50);
    p.fill(0, 0, 0, 50);
    mouseInputReferencePoint.draw();

    // ONLY for testing!
    // Displaying the lightblue debug balls (to visualize the camera movement)
    p.fill(0, 255, 255);
    for (let i = 0; i < balls.length; i++) {
      p.circle(balls[i].x, balls[i].y, balls[i].r);
    }

    // Need to fix this, so the game continues when a player move mouse outside of the game window
    if (webSocket.readyState !== 1) {
      return;
    }

    // Update mouse position to server
    // 10 per second timer (at 60 fps)
    if (p.frameCount % 6 === 0) {
      let input = {
        x: mouseInputReferencePoint.vel.x * 6,
        y: mouseInputReferencePoint.vel.y * 6
      };
      let message = {
        action: "INPUTMOUSE",
        content: JSON.stringify(input)
      };
      webSocket.send(JSON.stringify(message));
    }

    if (players !== null) {
      players.map(player => {
        p.fill(255);
        p.circle(player.inputMouse.x, player.inputMouse.y, 15);
        player.snek.tail.map((position, index) => {
          // Add the position if it isn't already in the mpa
          // Use name + index as identifier
          if (snekMap[player.name + index] == null) {
            snekMap[player.name + index] = position;
          }

          // Draw all Sneks with interpolated server data (for final use)
          p.fill(255, 255, 0);
          p.stroke(0, 0, 0, 100);
          let _snek = snekMap[player.name + index];
          let x = p.lerp(_snek.x, position.x, 0.1);
          let y = p.lerp(_snek.y, position.y, 0.1);
          p.circle(x, y, player.snek.r);
          _snek.x = x;
          _snek.y = y;

          // Draw all Sneks with only server data (for debug use only)
          p.fill(255, 0, 0);
          p.circle(position.x, position.y, 15);
        });
      });
    }
  };
}
