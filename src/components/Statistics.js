import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Your info</h1>
        <h3>Ships Sunk:</h3>
        <button>Start</button>
        <button>Reset</button>
      </div>
    );
  }
}

Statistics.propTypes = {};

export default Statistics;