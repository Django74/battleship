import React, {Component} from 'react';
import Square from './Square';
import PropTypes from 'prop-types';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.ships = this.props.type === 'player' ? this.props.ships[this.props.turn] : {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.turn !== this.props.turn) {

    }
  }

  renderGrid() {
    let grid = [];
    let size = this.props.size;
    for (let x = 0; x < size; x++) {
      grid.push(<div key={`row${x}`} className="board-row"/>);
      for (let y = 0; y < size; y++) {
        const coord = `(${x},${y})`;
        grid.push(<Square key={coord}
                          xCoord={x}
                          yCoord={y}
                          type={this.props.type}
                          handleAttack={this.props.handleAttack}
                          ships={this.props.ships[this.props.turn]}
                          coord={coord}
        />);
      }
    }
    return grid;
  }

  render() {
    const grid = this.renderGrid();
    return (
      <div>
        <h1>{this.props.isPlayer ? `Player: ${this.props.turn + 1}` : 'Opponent'}</h1>
        {grid}
      </div>
    );
  }
}

Board.propTypes = {
  size: PropTypes.number,
  turn: PropTypes.number,
  isPlayer: PropTypes.bool,
  ships: PropTypes.array,
  type: PropTypes.string,
};

export default Board;