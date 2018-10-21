import React from 'react'

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
            selected: false,
            r: "2.5"
        }
    }
    
    selected() {
        console.log("selected point: ", this.state.id)
        this.setState({
            color: "red",
            r: "3",
        })
    }

    deselected() {
        this.setState({
            color: "#000",
            r: "2.5", 
        })
    }

    handleMouseDown = (e) => {
        this.cords = {
            x: e.pageX,
            y: e.pageY,
        }
        document.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (e) => {
        this.setState({x: this.props.cx, y: this.props.cy})
    }

    handleMouseUp = () => {
        console.log('mouse up')
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
        const {x, y, id, color, r} = this.state
        if (!(this.props.isDragging)) {
            document.removeEventListener('mousemove', this.handleMouseMove);
        } 
        return <circle 
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
            />
    
    }
}
