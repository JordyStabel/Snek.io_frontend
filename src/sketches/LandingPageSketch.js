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

  // Check if device is mobile
  var isMobile = false; //initiate as false
  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    // eslint-disable-next-line
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
    zoom = 0.25;
    zoomScrollEnabled = true;
  }

  // Create Websocket
  let ip;
  localStorage.getItem("snek_ip")
    ? (ip = localStorage.getItem("snek_ip"))
    : (ip = "localhost");

  // Let user enter a ip if it's on a mobile device
  if (isMobile) {
    ip = prompt("Please enter your ip:", "IPv4 Address of the Wi-Fi");
    if (ip === "IPv4 Address of the Wi-Fi") {
      alert("No valid ip!");
    }
  }

  const webSocket = new WebSocket(`ws://${ip}:1337/test/`);
  console.log(webSocket.url);

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
