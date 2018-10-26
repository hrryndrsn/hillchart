import React from "react";
import styled from "styled-components";

const EditorContainer = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    ${'' /* background: ${props => props.selectedPoint ? "red" : "blue"} */}
    display: flex;
    justify-content: center;
`


export default class Container extends React.Component {
  render() {
    const x = this.props.x 
    const y = this.props.y 
    console.log(x, y)
    return (
        <EditorContainer>
            <input
                type="text"
                id="nameInput"
                value={this.props.name}
                onChange={this.props.onChange}
                autoFocus={true}
                style={{

                display: this.props.selectedPoint ? "initial" : "none"
                }}
            />
        </EditorContainer>
    );
  }
}
