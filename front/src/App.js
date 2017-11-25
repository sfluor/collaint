import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import Canvas from './components/canvas';
import Header from './components/header';
import Options from './components/options';

const endpoint = "http://10.50.4.33:8000";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "#000000",
      width: 1
    };

    this.socket = openSocket(endpoint);

    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({
      color: color.hex
    });
  }

  handleWidthChange({ target }) {
    this.setState({
      [target.name]: Math.max(Math.min(20, Math.floor(target.value)), 1)
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row flex-center">
          <div className="col lg-4 sm-8">
            <Options
              color={this.state.color}
              width={this.state.width}
              onWidthChange={this.handleWidthChange}
              onColorChange={this.handleColorChange}
            />
          </div>
          <div className="col lg-6">
            <Canvas
              color={this.state.color}
              width={this.state.width}
              socket={this.socket}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
