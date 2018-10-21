import React from 'react'
import "./point.css"

export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "#000",
            x: this.props.x,
            y: this.props.y,
            cx: this.props.cx,
            cy: this.props.cy,
            id: this.props.id,
            isDragging: false,
            selected: false,
            r: "2.5"
        }
    }
    
    selected() {
        console.log("selected point: ", this.state.id)
        this.setState({
            selected: true
        })
    }

    deselected() {
        this.setState({
            selected: false,
        })
    }

    handleMouseDown = (e) => {
        this.cords = {
            x: e.pageX,
            y: e.pageY,
            isDragging: e.target.id === this.state.id,
        }
        console.log(e.target.id === this.state.id)
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (e) => {
        this.setState({
            x: this.props.cx, 
            y: this.props.cy,
        })
    }

    handleMouseUp = () => {
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    renderClassList = () => {
        if (this.props.activePoint === this.state.id) {
            return "active"
        } else {
            return "point"
        }
    }

    render() {
        const {x, y, id, color, r} = this.state
        const xOffset = 5
        const yOffset = 5
        if (!(this.props.isDragging)) {
            document.removeEventListener('mousemove', this.handleMouseMove);
        } 
        return (
        <svg>
        <text x={this.state.x - xOffset} y={this.state.y - yOffset} className="pointName" fill={color}>{this.props.name}</text>
        <circle 
            cx={x} 
            cy={y}
            key={id} 
            r={r}
            fill={color}
            stroke="#fff"
            strokeWidth="1"
            onMouseEnter={this.selected.bind(this)}
            onMouseLeave={this.deselected.bind(this)}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            id={id}
            className={this.props.activePoint === this.state.id ? "active point" : "point"}
            />
        </svg>
        )
    }
}
