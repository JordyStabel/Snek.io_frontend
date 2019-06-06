//import "p5/lib/addons/p5.dom";
import uuid from "uuid";
import ballll from "../components/mainpage/Ball";
import Ball from "../components/mainpage/Ball";

let id;
let players = null;
let sneks = [];
let canvas;

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
  let ballz = new ballll(0, 0, 100, p);

  // Websocket testing stuff
  const webSocket = new WebSocket("ws://localhost:1337/test/");

  webSocket.onopen = event => {
    //console.log(`Message: ${event.data}`);
    console.log("Connection opened");

    let output = {
      name: uuid.v4(),
      color: "#0984e3"
    };

    let message = {
      action: "REGISTER",
      content: JSON.stringify(output)
    };
    id = output.name;
    console.log(id);
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
        sneks = player.sneks;
      }
    });

    //#region Old Code
    // let circle = {
    //   x: Math.floor(Math.random() * (window.innerWidth - 80) + 60),
    //   y: Math.floor(Math.random() * (window.innerHeight - 80) + 60),
    //   diameter: Math.floor(Math.random() * 100 + 20),
    //   dx: (Math.random() - 0.5) * 4,
    //   dy: (Math.random() - 0.5) * 4
    // };
    // circles.push(circle);
    // this.props.receiveMessage(JSON.parse(event.data).messageData);
    //#endregion
  };

  webSocket.onclose = () => {
    console.log("Connection closed");
  };

  p.mousePressed = function() {
    ballz.maxMag = 10;
  };

  p.mouseReleased = function() {
    ballz.maxMag = 2.5;
  };

  p.setup = function() {
    height = window.innerHeight - 56;
    width = window.innerWidth;

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

  function test() {
    if (
      webSocket.readyState !== 1 ||
      p.mouseX < 0 ||
      p.mouseX > width ||
      p.mouseY < 0 ||
      p.mouseY > height
    ) {
      return;
    }

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
    width = document.getElementById("right").offsetWidth;
    height = document.getElementById("right").offsetHeight;
    p.resizeCanvas(width, height);
  };

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
    p.background(50);

    // Camera move with Snek (test)
    // Starting point now at the center of the canvas
    p.translate(width / 2, height / 2);
    p.scale(1);
    p.translate(-ball.x, -ball.y); //-ballz.position.x & y

    // snek.draw();
    // ballz.draw();
    // ballz.update(p.mouseX, p.mouseY);

    p.fill(0, 255, 255);

    // ONLY for testing!
    for (let i = 0; i < balls.length; i++) {
      p.circle(balls[i].x, balls[i].y, 20);
    }

    // Need to fix this, so the game continues when a player move mouse outside of the game window
    if (
      webSocket.readyState !== 1 ||
      p.mouseX < 0 ||
      p.mouseX > width ||
      p.mouseY < 0 ||
      p.mouseY > height
    ) {
      return;
    }

    // let x = p.lerp(prevX, ball.x, 0.05);
    // let y = p.lerp(prevY, ball.y, 0.05);
    // let r = p.lerp(prevR, ball.r, 0.05);

    // Displaying the lightblue debug balls (to visualize the camera movement)
    for (let i = 0; i < balls.length; i++) {
      p.circle(balls[i].x, balls[i].y, 20);
    }

    // Update mouse position to server
    let input = {
      x: p.mouseX,
      y: p.mouseY
    };
    let message = {
      action: "INPUTMOUSE",
      content: JSON.stringify(input)
    };
    webSocket.send(JSON.stringify(message));

    // Draw other players
    if (players !== null) {
      players.map(player => {
        p.circle(player.inputMouse.x, player.inputMouse.y, 50);
        player.sneks.map(snek => {
          if (snekMap[snek.uuid] == null) {
            snekMap[snek.uuid] = new Ball(snek.x, snek.y, snek.r, p);
          }
          let _snek = snekMap[snek.uuid];
          _snek.update(snek.x, snek.y);
          _snek.draw();

          // OLD WAY!!
          // OLD WAY!!
          // OLD WAY!!
          // OLD WAY!!
          // Add snek to map for first time
          // if (snekMap[snek.uuid] == null) {
          //   snekMap[snek.uuid] = snek;
          // }
          // let _snek = snekMap[snek.uuid];
          // let x = p.lerp(_snek.x, snek.x, 0.05);
          // let y = p.lerp(_snek.y, snek.y, 0.05);
          // p.circle(x, y, snek.r);
          // _snek.x = x;
          // _snek.y = y;
        });
      });
    }

    // sneks.map(snek => {
    //   p.circle(snek.x, snek.y, snek.r);
    // });

    // p.fill(255, 255, 0);
    // p.circle(x, y, r);
    // p.fill(0, 255, 0);
    // p.circle(ball.x, ball.y, 10);

    // prevX = x;
    // prevY = y;
    // prevR = r;
  };
}
