import React, {Component} from 'react';
import Square from './Square';
import PropTypes from 'prop-types';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ships = this.props.ships;
  }

  renderGrid() {
    let grid = [];
    let size = this.props.size;
    for (let x = 0; x < size; x++) {
      grid.push(<div className="board-row"/>);
      for (let y = 0; y < size; y++) {
        const coord = `(${x},${y})`;
        const isShip = !!this.ships[coord];
        grid.push(<Square isShip={isShip}/>);
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
  ships: PropTypes.object,
};

export default Board;