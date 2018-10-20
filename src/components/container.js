import React from 'react';
import './container.css';

export default class Container extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = { 
        x: this.props.x, 
        y: this.props.y,
        h: window.innerHeight,
        w: window.innerWidth,
        cx: 0,
        cy: 0,
      };

      this.myRef = React.createRef();


      this.updateDimensions = this.updateDimensions.bind(this);
      // this.getPosition = this.getPosition.bind(this);
    }

    componentDidMount() {
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
    
  
    _onMouseMove(e) {
      //find point on the curve
      //need to use cords relative to new div position
      var length = this.myRef.current.getTotalLength();
      var pct = (e.screenX / window.innerWidth) * length
      var crds = this.myRef.current.getPointAtLength(pct)
      

      this.setState({ x: e.screenX, y: e.screenY,  cx: crds.x, cy: crds.y}); 
    }


    handleClick(e) {
      //TODO - figure out the position as a percentage instead of a number
      console.log(this.state.cx)
      console.log(this.state.cy)
      console.log(this.state.x / this.state.w) //x percentage

    }

  
    render() {
      //TO DO - make curve responsive
      const pathD = "M0.5 45 C35 45 36 5 72 5.5 C1080.5 5.5 1083 455 1440.5 455"
      
      return <div className="container" onClick={this.handleClick.bind(this)} onMouseMove={this._onMouseMove.bind(this)}>
        <div id="obj"></div>
            <svg 
              width="100%" 
              height="33%" 
              viewBox="0 0 100 33" 
              fill="none">
              <path 
                d="M0 32C25.0747 32 25.25 1 50.5 1C75.75 1 75.9253 32 101 32" 
                stroke="black" 
                strokeWidth="1"
                ref={this.myRef}
              />
              <circle 
                cx={this.state.cx} 
                cy={this.state.cy} 
                r="2.5" 
                fill={"#000"}
                stroke="#fff"
                strokeWidth="1"   
              />
            </svg>
      </div>;
    }
  }

