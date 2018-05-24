import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Your info</h1>
        <h3>Ships Sunk:</h3>
        <button style={{margin: 10}} onClick={() => {this.props.changeTurn()}}>Next Turn</button>
        <button style={{margin: 10}} onClick={() => {this.props.start()}} disabled={this.props.started}> Start</button>
        <button style={{margin: 10}} disabled={false}>Reset</button>
      </div>
    );
  }
}

Console.propTypes = {};

export default Console;