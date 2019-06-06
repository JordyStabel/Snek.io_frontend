let height;
let width;

export default function sketch(p) {
  p.setup = function() {
    height = document.getElementById("right").offsetHeight;
    width = document.getElementById("right").offsetWidth;
    let canvas = p.createCanvas(width, height);

    //this.circles();
    //canvas.mouseMoved(test);
  };

  function test() {
    if (p.mouseX < 0 || p.mouseX > width || p.mouseY < 0 || p.mouseY > height) {
      return;
    }

    // 10 per second timer (at 60 fps)
    if (p.frameCount % 6 === 0) {
      // Do something maybe...
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
    p.fill(255, 0, 255);

    // Draw other players
    // if (balls !== null) {
    //   balls.map(ball => {
    //     ball.update();
    //     ball.show();

    // p.circle(player.inputMouse.x, player.inputMouse.y, 20);
    // player.sneks.map(snek => {
    //   // Add snek to map for first time
    //   if (snekMap[snek.uuid] == null) {
    //     snekMap[snek.uuid] = snek;
    //   }
    //   let _snek = snekMap[snek.uuid];
    //   let x = p.lerp(_snek.x, snek.x, 0.05);
    //   let y = p.lerp(_snek.y, snek.y, 0.05);
    //   p.circle(x, y, snek.r);

    //   _snek.x = x;
    //   _snek.y = y;
    // });
    //});
    //}
  };
}
