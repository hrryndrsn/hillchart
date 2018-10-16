import React from 'react';

export default class Container extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        x: this.props.x, 
        y: this.props.y,
        h: window.innerHeight,
        w: window.innerWidth
      };

      this.styles = {
      
      }

      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      console.log(this.state.h);
      // Additionally I could have just used an arrow function for the binding `this` to the component...
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
      this.setState({ x: e.screenX, y: e.screenY });
      // console.log(this.props.mouse)
      // console.log(document.getElementById('path'))
    }

    translateAlong(path) {
      var l = path.getTotalLength();
      return function(d, i, a) {
        return function(t) {
          var p = path.getPointAtLength(t * l);
          return "translate(" + p.x + "," + p.y + ")";
        };
      };
    }

  
    render() {
      const { x, y } = this.state;
      const pathD = "M0.5 455 C358 455 360.5 5.5 720.5 5.5 C1080.5 5.5 1083 455 1440.5 455"
      const p = document.getElementById('path')
    
       const length = p.getTotalLength();
      
      const cords = p.getPointAtLength(0.5 * length)

      // console.log(cords);

      return <div onMouseMove={this._onMouseMove.bind(this)}>

        <div id="obj"></div>
        <p></p>
        <svg style={this.styles.svg} 
            width={this.state.w} 
            height={this.state.h}  
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path id= "path" 
                  d="M0.5 455 C358 455 360.5 5.5 720.5 5.5 C1080.5 5.5 1083 455 1440.5 455" 
                  stroke="black" 
                  strokeWidth="10"
            />
            <circle cx={this.props.mouse.x} 
                    cy={this.props.mouse.y} 
                    r="50" 
                    fill="#C4C4C4"
            />



            <circle cx={cords.x} 
                    cy={cords.y} 
                    r="50" 
                    fill="#C4C4C4"
            />
        </svg>
      </div>;
    }
  }

