import React from "react"
import styled from "styled-components"

export default class Container extends React.Component {
    render() {
        return (
    <input
          type="text"
          id="nameInput"
          value={this.props.name}
          onChange={this.props.onChange}
          style={{
            "position": "absolute",
            "top": this.props.y,
            "left": this.props.x,
            "display": this.props.selectedPoint ? "initial" : "none",
          }}
        /> 
    )}
}
