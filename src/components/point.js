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
        }
    }
    
    handleClick(e) {
        console.log(e.target)
    }
    
    selected() {
        console.log("selected point: ", this.state.id)
        this.setState({color: "red"})
    }

    deselected() {
        console.log('out')
        this.setState({color: "#000"})
    }

    render() {
        return <circle 
            cx={this.props.x} 
            cy={this.props.y}
            key={this.props.id} 
            r="2.5" 
            fill={this.state.color}
            stroke="#fff"
            strokeWidth="1"
            onClick={this.handleClick.bind(this)}
            onMouseEnter={this.selected.bind(this)}
            onMouseLeave={this.deselected.bind(this)}
            />
    
    }
}
