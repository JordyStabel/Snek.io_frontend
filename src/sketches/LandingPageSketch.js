import uuid from "uuid";
import ballll from "../components/mainpage/Ball";
import Ball from "../components/mainpage/Ball";
import Snake from "../components/mainpage/Snake";
import Trail from "../components/mainpage/Trail";

let paused = false;

let id;
let players = null;
let sneks = [];
let canvas;
let vel;
let position;

let mouseInputReferencePoint;

let target = 650;
let x = 100;

let zoom = 1.01;

// For testing only!
let balls = [];

var snekMap = {};

let ball = {
  x: 610,
  y: 330,
  r: 50
};

let prevX = 0;
let prevY = 0;
let prevR = 0;

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

  let snek = new Snek(100, 100, 100);

  // Create a few sneks for testing
  for (let i = 0; i < 10; i++) {
    let ball = new ballll(i * 25, i * 25, 75, p);
    sneks.push(ball);
  }

  let ballz = new ballll(0, 0, 100, p);

  p.setup = function() {
    //p.frameRate(5);
    height = window.innerHeight - 56;
    width = window.innerWidth;

    position = p.createVector(width / 2, height / 2);
    position.setMag(1);

    canvas = p.createCanvas(width, height);

    // Draw some random dots on the screen, so it's easier to see the camera movement
    for (let i = 0; i < 1000; i++) {
      ball = {
        x: p.random(-width * 5, width * 5), //p.randomGaussian(width * 5, width),
        y: p.random(-height * 5, height * 5) //p.randomGaussian(height * 5, height)
      };
      balls.push(ball);
    }

    //this.circles();
    //canvas.mouseMoved(test);
  };

  mouseInputReferencePoint = new Ball(width / 2, height / 2, 75, p);
  // Websocket testing stuff
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
    // Do nothing with the on connect message
    // if (event.data === `{"connected":"Connecting succesfull"}`) {
    //   return;
    // }

    //console.log(`Message: ${event.data}`);

    // this.setState({
    //   messages: [...this.state.messages, event.data]
    // });

    // var info = event.data.split(",");

    // if (!info) {
    //   return;
    // }

    const content = JSON.parse(JSON.parse(event.data).content);

    players = content.players;

    content.players.map(player => {
      if (id === player.name) {
        ball.x = player.inputMouse.x;
        ball.y = player.inputMouse.y;
        ball.r = 50;
      }
    });
  };

  webSocket.onclose = () => {
    console.log("Connection closed");
  };

  p.mousePressed = function() {
    sneks[0].maxMag = 10;
    ballz.maxMag = 10;
    snake.grow();
    target = p.mouseX;
  };

  p.mouseReleased = function() {
    sneks[0].maxMag = 3;
    ballz.maxMag = 3;
  };

  p.keyPressed = function() {
    // SPACE
    if (p.keyCode == 32) {
      paused = !paused;
    }
  };

  function test() {
    // 10 per second timer (at 60 fps)
    if (p.frameCount % 6 === 0) {
      let input = {
        x: p.mouseX,
        y: p.mouseY
      };
      let message = {
        action: "INPUTMOUSE",
        content: JSON.stringify(input)
      };
      webSocket.send(JSON.stringify(message));
    }
  }

  // Resizing the canvas when the webwindow size is changed
  p.windowResized = () => {
    width = document.getElementById("main-container").offsetWidth;
    height = document.getElementById("main-container").offsetHeight;
    p.resizeCanvas(width, height);
  };

  function dragSegment(i, xin, yin) {
    const dx = xin - sneks[i].position.x;
    const dy = yin - sneks[i].position.y;
    const angle = p.atan2(dy, dx);
    sneks[i].position.x = xin - p.cos(angle) * 25;
    sneks[i].position.y = yin - p.sin(angle) * 25;
  }

  function moveSnek() {
    for (let i = 0; i < sneks.length - 1; i++) {
      sneks[i].x = sneks[i + 1].x;
      sneks[i].y = sneks[i + 1].y;
    }
  }

  p.mouseWheel = event => {
    event.delta / 100 < 0 ? (zoom *= 1.035) : (zoom /= 1.035);
  };

  let snake = new Snake(250, 250, 125, p);
  let trail = new Trail(250, 250, 100, p);

  //#region Old code
  // //clean up after redirect
  // p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
  //   if (props.clicked) {
  //     p.remove();
  //     props.history.push("/signup");
  //   }
  // };

  // p.circles = function() {
  //   for (let i = 0; i < 3; i++) {
  //     let circle = {
  //       x: Math.floor(Math.random() * (window.innerWidth - 80) + 60),
  //       y: Math.floor(Math.random() * (window.innerHeight - 80) + 60),
  //       diameter: Math.floor(Math.random() * 30 + 20),
  //       dx: (Math.random() - 0.5) * 4,
  //       dy: (Math.random() - 0.5) * 4
  //     };
  //     circles.push(circle);
  //   }
  // };

  // const changeVelocity = c => {
  //   if (c.x + c.diameter / 2 > window.innerWidth || c.x - c.diameter / 2 < 0) {
  //     c.dx = -c.dx;
  //   }
  //   if (c.y + c.diameter / 2 > window.innerHeight || c.y - c.diameter / 2 < 0) {
  //     c.dy = -c.dy;
  //   }
  //   c.x += c.dx;
  //   c.y += c.dy;
  // };

  // const text = () => {
  //   //title
  //   p.noStroke();
  //   p.fill(235, 81, 96);
  //   p.textFont("Libre Franklin");
  //   p.textSize(75);
  //   p.textStyle(p.ITALIC);
  //   p.textAlign(p.CENTER);
  //   p.text("thread'd", window.innerWidth / 2, window.innerHeight / 2 - 70);
  //   //subheading
  //   p.fill(179, 172, 167);
  //   p.textSize(24);
  //   p.textStyle(p.NORMAL);
  //   p.textFont("Muli");
  //   p.text(
  //     "an interactive experience to create custom clothing",
  //     window.innerWidth / 2,
  //     window.innerHeight / 2
  //   );
  // };

  // p.draw = () => {
  //   p.background(50);
  //   //loop through circles to draw them and draw lines between
  //   circles.forEach(c => {
  //     p.noStroke();
  //     p.fill(255, 255, 255, 50);
  //     p.ellipse(c.x, c.y, c.diameter, c.diameter);
  //     changeVelocity(c);
  //     circles.forEach(circleTwo => {
  //       let a = Math.abs(c.x - circleTwo.x);
  //       let b = Math.abs(c.y - circleTwo.y);
  //       let distance = Math.sqrt(a * a + b * b);
  //       if (distance < 200) {
  //         p.stroke(255, 255, 255, 70);
  //         p.line(c.x, c.y, circleTwo.x, circleTwo.y);
  //       }
  //     });
  //   });
  //   text();
  // };
  //#endregion

  p.draw = () => {
    if (paused) {
      return;
    }

    p.background(51);
    // Camera move with Snek (test)
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
    p.fill(255, 128, 0);
    mouseInputReferencePoint.draw();

    x = p.lerp(x, target, 0.05);

    p.fill(255, 128, 0);
    p.rect(x, 100, 100, 100);

    p.fill(0, 255, 0);
    snake.update(-p.mouseX, -p.mouseY);
    snake.draw();

    // Follow the head of players own snek
    // if (players != null) {
    //   const player = players.find(player => player.name === id);
    //   if (player != null) {
    //     console.log(player);
    //     console.log(player.inputMouse.x);
    //     p.translate(-player.inputMouse.x, -player.inputMouse.y);
    //   }
    // } else {
    //   p.translate(-sneks[0].position.x, -sneks[0].position.y);
    // }

    if (p.frameCount % 4 === 0) {
      trail.update(sneks[0].position.x, sneks[0].position.y);
    }

    trail.draw();

    dragSegment(0, ballz.position.x, ballz.position.y, sneks[0]);

    // moveSnek();
    sneks[0].update(-p.mouseX, -p.mouseY);

    // for (let i = 0; i < sneks.length - 1; i++) {
    //   dragSegment(i + 1, sneks[i].position.x, sneks[i].position.y, sneks[i]);
    //   sneks[i].draw();
    // }

    // snek.draw();
    ballz.draw();
    ballz.update(p.mouseX, p.mouseY, false);

    p.fill(0, 255, 255);

    // ONLY for testing!
    // Displaying the lightblue debug balls (to visualize the camera movement)
    for (let i = 0; i < balls.length; i++) {
      p.circle(balls[i].x, balls[i].y, 20);
    }

    // Need to fix this, so the game continues when a player move mouse outside of the game window
    if (
      webSocket.readyState !== 1
      // p.mouseX < 0 ||
      // p.mouseX > width ||
      // p.mouseY < 0 ||
      // p.mouseY > height
    ) {
      return;
    }

    // let x = p.lerp(prevX, ball.x, 0.05);
    // let y = p.lerp(prevY, ball.y, 0.05);
    // let r = p.lerp(prevR, ball.r, 0.05);

    // Update mouse position to server
    let input = {
      x: mouseInputReferencePoint.vel.x,
      y: mouseInputReferencePoint.vel.y
    };
    let message = {
      action: "INPUTMOUSE",
      content: JSON.stringify(input)
    };
    webSocket.send(JSON.stringify(message));

    // Draw all players
    // for (let key in snekMap) {
    //   if (snekMap.hasOwnProperty(key)) {
    //     snekMap[key].draw();
    //   }
    // }

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
          let x = p.lerp(_snek.x, position.x, 0.05);
          let y = p.lerp(_snek.y, position.y, 0.05);
          p.circle(x, y, player.snek.r * 1.5);
          _snek.x = x;
          _snek.y = y;

          // Draw all Sneks with only server data (for debug use only)
          p.fill(255, 0, 0);
          p.circle(position.x, position.y, 15);
        });
      });
    }

    // sneks.map(snek => {
    //   p.circle(snek.x, snek.y, snek.r);
    // });

    // p.fill(255, 255, 0);
    // p.circle(x, y, r);
    // p.fill(0, 255, 0);
    // p.circle(ball.x, ball.y, 30);

    // prevX = x;
    // prevY = y;
    // prevR = r;
  };
}
