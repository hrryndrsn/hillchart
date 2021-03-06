import React from "react";
import "./container.css";
import Point from "./point";
import Editor from "./editor";

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      h: 0,
      w: 0,
      cx: 0,
      cy: 0,
      curvePct: 0.0,
      points: [],
      hoveredPoint: 0,
      uid: 2,
      isDragging: false,
      activePoint: 0,
      selectedPoint: 0,
      name: "zord",
      colors: [
        "#FFBE0B",
        "#FB5607",
        "#FF006E",
        "#8338EC",
        "#3A86FF",
        "#3BCEAC",
        "#0EAD69"
      ]
    };

    this.containerRef = React.createRef();
    this.pathRef = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.setState({
      h: window.innerHeight,
      w: window.innerWidth
    });
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener("keydown", this.handleKeyPress);
  }

  updateDimensions() {
    this.setState({
      h: window.innerHeight,
      w: window.innerWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  pointOnCrv(pct) {
    var length = this.pathRef.current.getTotalLength();
    var containerWidth = this.state.w * 0.8;
    var offset = (this.state.w - this.state.w * 0.8) / 2;
    var relPct = ((this.state.x - offset) / containerWidth) * length;
    var crds = this.pathRef.current.getPointAtLength(relPct);
    return crds;
  }

  _onMouseMove(e) {
    //find point on the curve
    var length = this.pathRef.current.getTotalLength();
    var offset = (this.state.w - this.state.w * 0.8) / 2;
    var containerWidth = this.state.w * 0.8;
    var pct = Math.floor(((e.screenX - offset) / containerWidth) * 100) / 100;
    var relPct = ((e.screenX - offset) / containerWidth) * length;
    var crds = this.pathRef.current.getPointAtLength(relPct);
    var hoveredPoint;

    if (e.target.id === "") {
      hoveredPoint = 0;
    } else {
      hoveredPoint = parseInt(e.target.id);
    }
    this.setState({
      x: e.screenX,
      y: e.screenY,
      cx: crds.x,
      cy: crds.y,
      curvePct: pct,
      hoveredPoint
    });
  }

  handleMouseDown(e) {
    let color = this.randomColor();
    let activePoint = parseInt(e.target.id);
    this.setState({ isDragging: true, activePoint: activePoint });
    //if no point is hovered and the target of the event was the path (hill) -> Add a new point
    if (this.state.hoveredPoint === 0 && e.target == this.pathRef.current) {
      this.state.points.push({
        name: "new point",
        id: this.state.uid,
        x: this.state.cx,
        y: this.state.cy,
        color: color
      });
      var i = this.state.uid + 1;
      this.setState({ uid: i });
      return;
    } else if (e.target.id === "nameInput") {
    } else if (e.target.id != "") {
      //set the selected point
      let newSelection = parseInt(e.target.id);
      this.setState({ selectedPoint: newSelection });
      return;
    } else if (e.target.id === "main") {
      //delect and selected point
      this.setState({ selectedPoint: 0 });
    }
    return;
  }

  handleMouseUp(e) {
    this.findSelectedPoint();
    this.setState({ isDragging: false, activePoint: 0 });
  }

  handleDeletePoint = e => {
    if (this.state.selectedPoint) {
      console.log("point is selected", this.state.selectedPoint);
      const selectedPoint = this.state.selectedPoint;
      const filteredPoints = this.state.points.filter(
        point => point.id !== selectedPoint
      );
      this.setState({ points: filteredPoints, selectedPoint: null });
    }
  };

  renderPoint(point) {
    return (
      <Point
        key={point.id}
        x={point.x}
        y={point.y}
        id={point.id}
        cx={this.state.cx}
        cy={this.state.cy}
        isDragging={this.state.isDragging}
        activePoint={this.state.activePoint}
        selectedPoint={this.state.selectedPoint}
        name={point.name}
        color={point.color}
      />
    );
  }

  findSelectedPoint() {
    const points = this.state.points;
    for (let i = 0; i < points.length; i++) {
      if (points[i].id === this.state.selectedPoint) {
        this.setState({ name: points[i].name });
      } else {
      }
    }
  }

  handleNameChange(e) {
    const points = this.state.points;

    for (let i = 0; i < points.length; i++) {
      if (points[i].id === this.state.selectedPoint) {
        points[i].name = e.target.value;
        this.setState({
          points
        });
      }
    }

    this.setState({ name: e.target.value });
  }

  randomColor() {
    const number = Math.floor(Math.random() * this.state.colors.length);
    const color = this.state.colors[number];
    return color;
  }

  render() {
    return (
      <div
        className="container"
        ref={this.containerRef}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this._onMouseMove.bind(this)}
      >
        <div id="obj" />
        <svg
          id="main"
          width="100%"
          height="63%"
          viewBox="0 0 100 63"
          fill="none"
        >
          <text x={35} y={5} className="containerLabel noselect">
            Figuring it out
          </text>
          <text x={54} y={5} className="containerLabel noselect">
            Getting it done
          </text>
          <line
            x1="50"
            y1="1"
            x2="50"
            y2="62"
            stroke="#8D99AE"
            stroke-opacity="0.2"
            stroke-width="0.5"
            stroke-dasharray="2 2"
          />
          <path
            d="M5 43.9307C27.3438 43.9307 27.5 16 50 16C72.5 16 72.6562 43.9307 95 43.9307"
            stroke="#2B2D42"
            strokeWidth="1"
            ref={this.pathRef}
          />
          {this.state.points.map(point => this.renderPoint(point))}
        </svg>
        <Editor
          name={this.state.name}
          x={0}
          y={0}
          selectedPoint={this.state.selectedPoint}
          onChange={this.handleNameChange.bind(this)}
          handleDeletePoint={this.handleDeletePoint.bind(this)}
        />
      </div>
    );
  }
}
