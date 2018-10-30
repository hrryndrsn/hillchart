import React from "react";
import styled from "styled-components";

const EditorContainer = styled.div`
  width: 100%;
  height: 75px;
  position: absolute;
  top: -50px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.selectedPoint ? "white" : "none")};
  visibility: ${props => (props.selectedPoint ? "visible" : "hidden")};
  transition: 0.2s ease-in-out;
  font-size: 2em;
  & input {
    font-size: 1em;
    border: none;
    border-radius: 5px;
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }
  &.active {
    top: 0px;
  }
`;

const LabelDiv = styled.div`
  height: 100%;
  line-height: 75px;;
  font-size: 0.5em;
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.4);
  padding-top: 4px;
  display: ${props => (props.selectedPoint ? "initial" : "none")};
`;

const DeleteButton = styled.button`
  visibility: ${props => (props.selectedPoint ? "visible" : "hidden")};
  color: #D90429;
  font-size: 0.5em;
  margin: 0.5em;
  padding: 0.5em 0.5em;
  background: none;
  border: none;
  border-radius: 30px;
  transition: background 0.2s ease-in-out;
  &:focus {
    outline: none
  }
  &:hover {
    background: #D90429;
    color: #fff;
  }
`

export default class Container extends React.Component {
  render() {
    return (
      <EditorContainer
        selectedPoint={this.props.selectedPoint}
        className={this.props.selectedPoint ? "active" : ""}
      >
        <LabelDiv className="noselect" selectedPoint={this.props.selectedPoint}>
          Label
        </LabelDiv>
        <input
          type="text"
          id="nameInput"
          value={this.props.name}
          onChange={this.props.onChange}
          style={{
            display: this.props.selectedPoint ? "initial" : "none"
          }}
        />
        <DeleteButton className="noselect" selectedPoint={this.props.selectedPoint} onClick={this.props.handleDeletePoint}>Delete</DeleteButton>
      </EditorContainer>
    );
  }
}


