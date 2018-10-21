import React from 'react'

export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "#000",
            x: this.props.x,
            y: this.props.y,
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

    render() {
        const {x, y, id, color, r} = this.state
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
            id={id}
            />
    
    }
}
