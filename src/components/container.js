import React from 'react';

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

      this.styles = {
      
      }

      this.updateDimensions = this.updateDimensions.bind(this);
      // this.getPosition = this.getPosition.bind(this);
    }

    componentDidMount() {
      console.log(this.state.h);
      console.log('derp', this.myRef.current);
      const p = document.getElementById('path')
      // this.setPos()
      // const l = p.getTotalLength();
      console.log(p);
      // Additionally I could have just used an arrow function for the binding `this` to the component...
      window.addEventListener("load", this.fuck());
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
      // this.setPos(e.screenX, e.screenY);
      var length = this.myRef.current.getTotalLength();
      var pct = (e.screenX / window.innerWidth) * length
      var crds = this.myRef.current.getPointAtLength(pct)
      
      console.log(crds);



      this.setState({ x: e.screenX, y: e.screenY,  cx: crds.x, cy: crds.y}); 
    }

    fuck(path, x, y) {
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path")
      p.setAttribute("d", "M0.5 455 C358 455 360.5 5.5 720.5 5.5 C1080.5 5.5 1083 455 1440.5 455")
      console.log(this.myRef.current);
      console.log(this.myRef.current);
      var ref = this.myRef.current;
      var l = 100;
      var s = (x / window.innerWidth) * l;
      var fs = Math.floor(s)
      var r = p.getPointAtLength(l)
      var c = {
        x: r.x,
        y: r.y
      } 

      // console.log(path.getTotalLength())
      console.log("x=" + r.x + ", y=" + r.y)
      console.log(x, y);
      console.log(isFinite(fs));
      
      return (
        <circle cx={c.x} 
        cy={c.y} 
        r="50" 
        fill="#C4C4C4"
        />
      )
    }
  
    render() {
      // const { x, y } = this.state;
      const pathD = "M0.5 455 C358 455 360.5 5.5 720.5 5.5 C1080.5 5.5 1083 455 1440.5 455"
      

      return <div onMouseMove={this._onMouseMove.bind(this)}>
        <div id="obj"></div>
        <p></p>
        <svg style={this.styles.svg} 
            width={this.state.w} 
            height={this.state.h}  
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path id= "path" 
                  d={pathD}
                  stroke="black" 
                  strokeWidth="10"
                  ref={this.myRef}
            />
            <circle cx={this.props.mouse.x} 
                    cy={this.props.mouse.y} 
                    r="50" 
                    fill="#C4C4C4"
            />

            <circle cx={this.state.cx} 
                    cy={this.state.cy} 
                    r="50" 
                    fill="#C4C4C4"
            />
        </svg>
      </div>;
    }
  }

