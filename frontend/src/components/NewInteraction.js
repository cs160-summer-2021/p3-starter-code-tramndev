import colors from "colors.json";
import $ from "jquery";
import * as paper from "paper";
import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { ReactComponent as Mandala } from "../assets/images/mandala-freepik.svg";
import SocialMediaButtons from "./SocialMediaButtons";
import Toolbar from "./Toolbar";

const cp = {
  history: ["#000000"],
  options: [],
  $container: $("#color-palette"),
};
const HIT_TOLERANCE = {
  tolerance: 10,
  fill: true,
};
const XML_NAMESPACE = `http://www.w3.org/2000/svg`;
const mandala = {
  item: null,
  lastClicked: null,
};
const DEFAULT_STROKE_WIDTH = 10;

class NewInteraction extends Component {
  test = null;
  componentDidMount() {
    const newPaper = new paper.PaperScope();
    this.paper = newPaper;
    this.canvas = document.getElementById("myCanvas");
    newPaper.setup(this.canvas);
    newPaper.view.draw();
    const svg = $(document.createElementNS(XML_NAMESPACE, `svg`))[0];
    svg.replaceWith(
      ReactDOMServer.renderToString(
        `https://github.com/cs160-summer-2021/p3-starter-code-tramndev/blob/master/coloring/static/coloring/images/mandala-freepik.svg`
      )
    );
    const item = newPaper.project.importSVG(svg);
    console.log(item);
    item.strokeWidth = DEFAULT_STROKE_WIDTH;
    mandala.item = item;
    newPaper.project.insertLayer(0, item);
    item.fillColor = new paper.Color(1, 0, 0);
    item.strokeColor = "black";
    item.strokeWidth = 5;

    console.log(this.paper.project.activeLayer.children);
    this.picture = this.setState({ ...this.state });
    // Resize the image to match the size of canvas

    this.toolFactory({
      name: "toolPath",
      onMouseDown: function (event) {
        this.path = new paper.Path();
        this.path.strokeColor = cp.history[cp.history.length - 1];
        this.path.strokeWidth = DEFAULT_STROKE_WIDTH;
        this.path.add(event.point);
      },
      onMouseDrag: function (event) {
        this.path.add(event.point);
      },
    });
    this.toolFactory({
      name: "toolFill",
      onMouseDown: function (event) {
        const hit = mandala.item.hitTest(event.point, HIT_TOLERANCE);
        if (hit) {
          hit.item.fillColor = cp.history[cp.history.length - 1];
        }
      },
    });
    this.toolFactory({
      name: "toolLine",
      onMouseDown: function (event) {
        this.path = new paper.Path();
        this.path.strokeColor = cp.history[cp.history.length - 1];
        this.path.strokeWidth = DEFAULT_STROKE_WIDTH;
        this.path.add(event.point);
      },
      onMouseDrag: function (event) {
        this.path.add(event.point);
      },
    });
    this.toolFactory({
      name: "toolCircle",
      onMouseDown: function (event) {
        this.path = new paper.Path();
      },
      onMouseDrag: function (event) {
        this.path.add(event.point);
      },
      onMouseUp: function (event) {
        const circle = new paper.Path.Circle({
          center: event.middlePoint,
          radius: event.delta.length / 2,
        });
        circle.strokeWidth = DEFAULT_STROKE_WIDTH;
        circle.strokeColor = cp.history[cp.history.length - 1];
      },
    });
    this.toolFactory({
      name: "toolEraser",
      onMouseDown: function (event) {
        this.path = new paper.Path();
        this.path.strokeColor = "#FFFFFF";
        this.path.strokeWidth = DEFAULT_STROKE_WIDTH;
        this.path.add(event.point);
      },
      onMouseDrag: function (event) {
        this.path.add(event.point);
      },
    });

    // Change stroke size using slider: https://stackoverflow.com/questions/56912782/change-linewidth-on-canvas-using-slider-in-javascript-jquery
    strokeWidth.addEventListener("input", function () {
      this.STROKE_WIDTH = strokeWidth.value;
    });

    document.querySelectorAll(".tool-button").forEach((toolBtn) => {
      toolBtn.addEventListener("click", (e) => {
        this.activateTool(e.target.getAttribute("data-tool-name"));
      });
    });
  }

  toolFactory = (options) => {
    const tool = new this.paper.Tool();
    for (let key of Object.keys(options)) {
      tool[key] = options[key];
    }
  };

  // Toogling Tools: https://stackoverflow.com/questions/49215584/toggling-multiple-tools-on-paper-js
  // Mouse Tools: http://paperjs.org/tutorials/interaction/creating-mouse-tools/
  activateTool = (name) => {
    const tool = this.paper.tools.find((tool) => tool.name === name);
    tool.activate();
  };

  render = () => {
    // Refresh page if the reset button is clicked
    $("exit").on("click", function () {
      window.location.reload();
    });

    document.querySelectorAll(".tool-button").forEach((toolBtn) => {
      toolBtn.addEventListener("click", (e) => {
        this.activateTool(e.target.getAttribute("data-tool-name"));
      });
    });

    return (
      <div>
        {/* <!-- COLORING CONTROL PANEL--> */}
        <div id="color-palette">
          {Object.keys(colors).map((key) => {
            return (
              <div
                className="swatch"
                style={{ backgroundColor: colors[key][500] }}
                key={key}
                onClick={(e) => {
                  this.setState({ ...this.state, activeColor: key });
                }}
              ></div>
            );
          })}
        </div>
        <Toolbar />

        {/* <!-- CANVAS--> */}
        <div id="canvas-container">
          <canvas id="myCanvas"></canvas>
        </div>

        {/* <!-- FLOATING SHARE BUTTON WITH SUBMENU -->
	      <!-- http://androidcss.com/css/css3-floating-button-tutorial/ --> */}
        <input data-jscolor="{}" defaultValue="#3399FF"></input>

        {/* <!-- Icon library for social media button --> */}
        <SocialMediaButtons />
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(withRouter(NewInteraction));
