import React from "react";
import "./container.css";
import Point from "./point";

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
      name: "zord"
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
    let activePoint = parseInt(e.target.id);
    this.setState({ isDragging: true, activePoint: activePoint });
    //if no point is hovered and the target of the event was the path (hill) -> Add a new point
    if (this.state.hoveredPoint === 0 && e.target == this.pathRef.current) {
      this.state.points.push({
        name: "heuy",
        id: this.state.uid,
        x: this.state.cx,
        y: this.state.cy
      });
      var i = this.state.uid + 1;
      this.setState({ uid: i });
      return;
    } else if (e.target.id != "") {
      //set the selected point
      let newSelection = parseInt(e.target.id);
      this.setState({ selectedPoint: newSelection });
      return;
    } 
    else if (e.target.id === "main") {
      //delect and selected point
      this.setState({ selectedPoint: 0 });
    }
    return
  }

  handleMouseUp(e) {
    this.findSelectedPoint();
    this.setState({ isDragging: false, activePoint: 0 });
  }

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
      />
    );
  }

  findSelectedPoint() {
    const points = this.state.points;
    for (let i = 0; i < points.length; i++) {
      if (points[i].id === this.state.selectedPoint) {
        this.setState({name: points[i].name})
        console.log(points[i].name)
      } else {
        
      }
    }

  } 

  handleNameChange(e) {
    const points = this.state.points;

    for (let i = 0; i < points.length; i++) {
      if (points[i].id === this.state.selectedPoint) {
        points[i].name = e.target.value
        this.setState ({
          points
        })
      }
    }

    this.setState({ name: e.target.value });
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
        <svg id="main" width="100%" height="63%" viewBox="0 0 100 63" fill="none">
          <path
            d="M5 43.9307C27.3438 43.9307 27.5 16 50 16C72.5 16 72.6562 43.9307 95 43.9307"
            stroke="#2B2D42"
            strokeWidth="1"
            ref={this.pathRef}
          />
          {this.state.points.map(point => this.renderPoint(point))}
        </svg>

        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange.bind(this)}
        />
      </div>
    );
  }
}
