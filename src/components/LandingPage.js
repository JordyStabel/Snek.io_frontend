import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../sketches/LandingPageSketch";

export default class LandingPage extends Component {
  render() {
    return (
      <div id="landing-page">
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}
