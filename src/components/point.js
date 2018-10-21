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
        return <circle 
            cx={this.props.x} 
            cy={this.props.y}
            key={this.props.id} 
            r={this.state.r}
            fill={this.state.color}
            stroke="#fff"
            strokeWidth="1"
            onMouseEnter={this.selected.bind(this)}
            onMouseLeave={this.deselected.bind(this)}
            id={this.state.id}
            />
    
    }
}
