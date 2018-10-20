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

      this.containerRef = React.createRef();
      this.pathRef = React.createRef();
      this.updateDimensions = this.updateDimensions.bind(this);
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
      var length = this.pathRef.current.getTotalLength();
      var offset = (this.state.w - (window.innerWidth * 0.8)) / 2
      var containerWidth = this.state.w * 0.8
      var relPct = ((e.screenX - offset)/containerWidth) * length
      var crds = this.pathRef.current.getPointAtLength(relPct)
      

      console.log(containerWidth)
      console.log()

      this.setState({ x: e.screenX, y: e.screenY,  cx: crds.x, cy: crds.y}); 
    }


    handleClick(e) {
      //TODO - figure out the position as a percentage instead of a number
      // console.log(this.state.cx)
      // console.log(this.state.cy)
      // console.log(this.state.x / this.state.w) //x percentage

    }

  
    render() {      
      return <div className="container" ref={this.containerRef} onClick={this.handleClick.bind(this)} onMouseMove={this._onMouseMove.bind(this)}>
        <div id="obj"></div>
        <svg width="100%" height="63%" viewBox="0 0 100 63" fill="none">
              <path 
                d="M5 43.9307C27.3438 43.9307 27.5 16 50 16C72.5 16 72.6562 43.9307 95 43.9307" 
                stroke="black" 
                strokeWidth="1"
                ref={this.pathRef}
              
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




