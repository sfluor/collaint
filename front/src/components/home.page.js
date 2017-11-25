import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/draw/${this.state.projectName}`)
  }

  render() {
    return (
      <div>
        <h2>Hello and welcome to Collaint ! </h2>
        <p>You can start drawing by creating a new project !</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>
            <input
              name="projectName"
              value={this.state.projectName}
              onChange={this.handleInputChange}
              type="text" 
              placeholder="Your project name" 
            />
          </div>
        </form>
      </div>
    );
  }
}