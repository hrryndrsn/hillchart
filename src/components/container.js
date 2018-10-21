import React from 'react';
import './container.css';
import Point from './point'

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
        curvePct: 0.0,
        points: [],
        selectedPoint: 0,
        uid: 2,
        isDragging: false,
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

    pointOnCrv(pct) {
      var length = this.pathRef.current.getTotalLength();
      var containerWidth = this.state.w * 0.8
      var offset = (this.state.w - (window.innerWidth * 0.8)) / 2
      var relPct = ((this.state.x - offset)/containerWidth) * length
      var crds = this.pathRef.current.getPointAtLength(relPct)
      return crds;
    }

  
    _onMouseMove(e) {
      //find point on the curve
      var length = this.pathRef.current.getTotalLength();
      var offset = (this.state.w - (window.innerWidth * 0.8)) / 2
      var containerWidth = this.state.w * 0.8
      var pct = Math.floor(((e.screenX - offset)/containerWidth)*100) / 100
      var relPct = ((e.screenX - offset)/containerWidth) * length
      var crds = this.pathRef.current.getPointAtLength(relPct)
      var selectedPoint;

      if (e.target.id === "") {
        selectedPoint = 0
      } else {
        selectedPoint = parseInt(e.target.id)
      }
      
      
      this.setState({ 
        x: e.screenX, 
        y: e.screenY,  
        cx: crds.x, 
        cy: crds.y, 
        curvePct: pct,
        selectedPoint,
      }); 
    }

    handleMouseDown(e) {
      this.setState({isDragging: true});

      if (this.state.selectedPoint === 0) {
        this.state.points.push({name: 'zord', id: this.state.uid, x: this.state.cx, y: this.state.cy})
        var i = this.state.uid + 1
        this.setState({uid: i})
        return
      } 
    }

    handleMouseUp(e) {
      this.setState({isDragging: false});
    }

    renderPoint(point) {      
      return <Point 
        key={point.id} 
        x={point.x} 
        y={point.y}
        id={point.id}
        cx={this.state.cx}
        cy={this.state.cy}
        isDragging={this.state.isDragging}
        />
    }

  
    render() {      
      return (
      
      <div 
        className="container" 
        ref={this.containerRef} 
        onMouseDown={this.handleMouseDown.bind(this)} 
        onMouseUp={this.handleMouseUp.bind(this)}
        onMouseMove={this._onMouseMove.bind(this)}
        >
        <div id="obj"></div>
        <svg width="100%" height="63%" viewBox="0 0 100 63" fill="none">
              <path 
                d="M5 43.9307C27.3438 43.9307 27.5 16 50 16C72.5 16 72.6562 43.9307 95 43.9307" 
                stroke="black" 
                strokeWidth="1"
                ref={this.pathRef}
              />
              {
                this.state.points.map(point => this.renderPoint(point))
              }

            </svg>

      </div>)
    }
  }




