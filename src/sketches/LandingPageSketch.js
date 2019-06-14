import uuid from "uuid";
import Ball from "../components/mainpage/Ball";

let paused = false;

let id;
let score = 0;
let players = null;
let orbs = null;
let sneks = [];
let mouseInputReferencePoint;
let zoom = 2.25;
let isAlive = true;

let zoomScrollEnabled = false;

// For testing only!
let balls = [];

// Posible player colors
let colors = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#7f8c8d",
  "#f39c12"
];

var snekMap = {};

let width;
let height;

export default function sketch(p) {
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
    for (let i = 0; i < 500; i++) {
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

    id = uuid.v4();

    let output = {
      name: localStorage.getItem("snekio_username"),
      color: colors[p.floor(p.random(colors.length))],
      uuid: id,
      startingPosition: {
        x: mouseInputReferencePoint.position.x,
        y: mouseInputReferencePoint.position.y
      }
    };

    let message = {
      action: "REGISTER",
      content: JSON.stringify(output)
    };
    webSocket.send(JSON.stringify(message));
  };

  webSocket.onmessage = event => {
    let parsedData = JSON.parse(event.data);

    console.log(parsedData.action);

    if (parsedData.action === "GAMESTATE") {
      const content = JSON.parse(parsedData.content);
      players = content.players;
      orbs = content.orbs;
    } else if (parsedData.action === "YOUDIED") {
      // Extremely bad way of doing it but time...
      window.location.reload();
    }
  };

  webSocket.onclose = () => {
    console.log("Connection closed");
  };

  p.mousePressed = function() {
    mouseInputReferencePoint.maxMag = 6;
  };

  p.mouseReleased = function() {
    mouseInputReferencePoint.maxMag = 3;
  };

  p.keyPressed = function() {
    // SPACE
    if (p.keyCode === 32) {
      paused = !paused;
    }
    if (p.keyCode === 90) {
      zoomScrollEnabled = !zoomScrollEnabled;
    }
  };

  // Resizing the canvas when the webwindow size is changed
  p.windowResized = () => {
    width = document.getElementById("main-container").offsetWidth;
    height = document.getElementById("main-container").offsetHeight;
    p.resizeCanvas(width, height);
  };

  p.mouseWheel = event => {
    if (zoomScrollEnabled) {
      event.delta / 100 < 0 ? (zoom *= 1.035) : (zoom /= 1.035);
    }
  };

  p.draw = () => {
    if (paused) {
      return;
    }

    p.background(51);

    p.stroke(0);
    p.fill(255);
    p.textSize(35);
    p.text(`Score: ${score}`, 50, 70);

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

    if (webSocket.readyState !== 1) {
      return;
    }

    // Update mouse position to server
    // 10 per second timer (at 60 fps)
    if (p.frameCount % 6 === 0 && isAlive) {
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

    // Draw all orbs with data from server
    p.fill(50, 255, 50);
    if (orbs !== null) {
      // eslint-disable-next-line
      orbs.map(orb => {
        p.fill(50, 255, 50);
        let x = orb.position.x;
        let y = orb.position.y;
        let r = orb.value * 2;
        p.circle(x, y, r);
      });
    }

    if (players !== null) {
      // eslint-disable-next-line
      players.map(player => {
        // Set player score & zoom level
        if (player.uuid === id) {
          score = player.snek.size;
          if (!zoomScrollEnabled) {
            zoom = p.lerp(zoom, 5 / Math.pow(score, 1 / 3), 0.05);
          }
        }

        // eslint-disable-next-line
        player.snek.tail.map((position, index) => {
          // Add the position if it isn't already in the map
          // Use name + index as identifier
          if (snekMap[player.uuid + index] == null) {
            snekMap[player.uuid + index] = position;
          }

          // Draw all Sneks with interpolated server data (for final use)
          p.fill(player.color);
          p.stroke(0);
          let _snek = snekMap[player.uuid + index];
          let x = p.lerp(_snek.x, position.x, 0.1);
          let y = p.lerp(_snek.y, position.y, 0.1);
          p.circle(x, y, player.snek.r);
          _snek.x = x;
          _snek.y = y;

          // Display playername at first Snek head location
          if (index === player.snek.tail.length - 1) {
            p.fill(255);
            p.textSize(25);
            p.text(`${player.name}`, x, y);
            p.textSize(8);
            p.text(`${player.uuid}`, x, y + 10);
          }

          // Draw all Sneks with only server data (for debug use only)
          //p.fill(255, 0, 0);
          //p.circle(position.x, position.y, 15);
        });
      });
    }
  };
}
