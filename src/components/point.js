import React from "react";
import "./point.css";
import nameEditor from "./nameEditor";

export default class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // color: "#8D99AE",
      x: this.props.x,
      y: this.props.y,
      cx: this.props.cx,
      cy: this.props.cy,
      id: this.props.id,
      isDragging: false,
      selected: false,
      name: this.props.name,
      r: "2.5"
    };
  }

  selected() {
    this.setState({
      selected: true
    });
  }

  deselected() {
    this.setState({
      selected: false
    });
  }

  handleMouseDown = e => {
    this.cords = {
      x: e.pageX,
      y: e.pageY,
      isDragging: e.target.id === this.state.id
    };

    document.addEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseMove = e => {
    this.setState({
      x: this.props.cx,
      y: this.props.cy
    });
  };

  handleMouseUp = () => {
    document.removeEventListener("mousemove", this.handleMouseMove);
  };

  renderClassList = () => {
    if (this.props.activePoint === this.state.id) {
      return "active";
    } else {
      return "point";
    }
  };

  render() {
    const { x, y, id, color, r } = this.state;
    const xOffset = 5;
    const yOffset = 5;
    if (!this.props.isDragging) {
      document.removeEventListener("mousemove", this.handleMouseMove);
    }
    return (
      <svg>
        <rect x={this.state.x + 5} y={this.state.y - 2.5} width="15" height="5" className="rect"/>
        <text
          x={this.state.x + 6}
          y={this.state.y + 0.6}
          className="pointName"
          fill={color}
        >
          {this.props.name}
        </text>
        <circle
          cx={x}
          cy={y}
          key={id}
          r={r}
          name={this.props.name}
          fill={color}
          stroke="#EDF2F4"
          strokeWidth="1"
          onMouseEnter={this.selected.bind(this)}
          onMouseLeave={this.deselected.bind(this)}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          id={id}
          className={
            (this.props.activePoint === this.state.id
              ? "active point"
              : "point") +
            " " +
            (this.props.selectedPoint === this.state.id ? "selected" : "")
          }
        />
      </svg>
    );
  }
}
