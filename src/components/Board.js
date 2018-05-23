import React, {Component} from 'react';
import Square from './Square';
import PropTypes from 'prop-types';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderGrid() {
    let grid = [];
    let size = this.props.size;
    for (let row = 0; row < size; row++) {
      grid.push(<div className="board-row"/>);
      for (let col = 0; col < size; col++) {
        grid.push(<Square/>);
      }
    }
    return grid;
  }

  render() {
    const grid = this.renderGrid();
    return (
      <div>
        <h1>{this.props.isPlayer ? 'Player' : 'Opponent'}</h1>
        {grid}
      </div>
    );
  }
}

Board.propTypes = {
  size: PropTypes.number,
  isPlayer: PropTypes.bool,
};

export default Board;