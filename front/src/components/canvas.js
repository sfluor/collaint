import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: Math.random().toString(36).substr(0, 10),
      drawing: false,
      strokes: [],
      otherStrokes: {}
    };

    this.props.socket.on('change', ({ id, data }) => {
      const { otherStrokes } = this.state;
      otherStrokes[id] = data;
      this.setState({
        otherStrokes
      });

      this.updateCanvas();
    });

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  retrieveCoordinates(event) {
    if (event.type.indexOf('touch') !== -1) {
      // Touch event we prevent scrolling
      event.preventDefault();
      return {
        pageX: event.targetTouches[0].pageX,
        pageY: event.targetTouches[0].pageY
      };
    }
    else {
      return {
        pageX: event.pageX, 
        pageY: event.pageY 
      };
    }
  }



  handleMouseDown(event) {
    // Handle touch event
    const { pageX, pageY } = this.retrieveCoordinates(event);

    this.setState({ drawing: true });
    // Offsets
    const { offsetLeft, offsetTop } = this.refs.canvas;
    this.setState({
      strokes: [...this.state.strokes, {
        color: this.props.color,
        width: this.props.width,
        points: [{
          x: pageX - offsetLeft,
          y: pageY - offsetTop,
        }]
      }]
    });
  }

  handleMouseUp() {
    this.setState({ drawing: false });
  }

  handleMouseLeave() {
    this.setState({ drawing: false });
  }

  handleMouseMove(event) {

    const { pageX, pageY } = this.retrieveCoordinates(event);
    if (this.state.drawing) {
      // Offsets
      const { offsetLeft, offsetTop } = this.refs.canvas;
      const { strokes } = this.state;
      strokes[strokes.length - 1].points.push({
        x: pageX - offsetLeft,
        y: pageY - offsetTop,
      });
      this.setState({
        strokes
      });
      this.updateCanvas();
      this.props.socket.emit('change', this.state);
    }

  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');

    const { strokes } = this.state;

    const otherStrokes = Object.values(this.state.otherStrokes);
    const allStrokes = strokes.concat(otherStrokes[0] || []);
    allStrokes.forEach(stroke => {
      ctx.beginPath();

      // Draw lines betwen points
      stroke.points.forEach((_, i, points) => {
        if (i !== points.length - 1) {
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[i + 1].x, points[i + 1].y);
        }
      });

      ctx.lineWidth = stroke.width;
      ctx.strokeStyle = stroke.color;
      ctx.closePath();
      ctx.stroke();
    });
  }

  render() {
    return (
      <div className="row flex-center">
        <canvas
          ref="canvas"
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleMouseDown}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
          onTouchEnd={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onTouchMove={this.handleMouseMove}
          width={500}
          height={500}
        />
      </div>
    );
  }
}