import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ColorPalette extends Component {
  state = { strokeWidth: 10 };

  componentDidMount = () => {};

  onChange = (e) => {
    // Change stroke size using slider: https://stackoverflow.com/questions/56912782/change-linewidth-on-canvas-using-slider-in-javascript-jquery
    this.setState({ [e.target.name]: e.target.value });
  };

  render = () => {
    return (
      <div>
        <div className="slidecontainer">
          <img
            src="https://i.ibb.co/C103nLM/stroke.png"
            alt="stroke"
            style={{ paddingRight: "10px" }}
          />
          <input
            defaultValue="2"
            type="range"
            className="slider"
            name="strokeWidth"
            id="strokeWidth"
            onChange={this.onChange}
            min="1"
            max="40"
            title="Line width"
          />
          <output
            style={{
              paddingLeft: "10px",
              fontSize: "24px",
              fontWeight: 800,
              paddingRight: "3px",
            }}
          >
            {this.state.strokeWidth}
          </output>{" "}
          px
        </div>
        <div id="tool-panel">
          <button className="tool-button tool-float" data-tool-name="toolPath">
            <img
              src="https://i.ibb.co/0y6Gjyq/paintbrush.png"
              alt="paintbrush"
              style={{ transform: "scaleX(-1)" }}
              className="tool-image"
            />
          </button>
          <button
            className="tool-button tool-float"
            data-tool-name="toolFill"
            style={{ marginLeft: "20px" }}
          >
            <img
              src="https://i.ibb.co/KFwqXCr/paint-bucket.png"
              alt="paint-bucket"
              className="tool-image"
            />
          </button>
          <button
            className="tool-button tool-float"
            data-tool-name="toolLine"
            style={{ marginLeft: "20px" }}
          >
            <img
              src="https://i.ibb.co/vByvCY5/line.png"
              alt="line"
              className="tool-image"
            />
          </button>
          <button
            className="tool-button tool-float"
            data-tool-name="toolCircle"
            style={{ marignLeft: "20px" }}
          >
            <img
              src="https://i.ibb.co/LR1Rh2H/circumference-1.png"
              alt="circumference-1"
              className="tool-image"
            />
          </button>
          <button
            className="tool-button tool-float"
            data-tool-name="toolEraser"
            style={{ marginLeft: "20px" }}
          >
            <img
              src="https://i.ibb.co/Y0pVwMc/eraser.png"
              alt="eraser"
              className="tool-image"
            />
          </button>
        </div>
      </div>
    );
  };
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(withRouter(ColorPalette));
