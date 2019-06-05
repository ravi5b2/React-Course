import React, { Component } from "react";

class aboutPage extends Component {
  state = {
    name: ""
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.name);
    console.log(nextState);
    return true;
  }

  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default aboutPage;
