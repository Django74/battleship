import React, {Component} from 'react';
import Board from './Board';
import Statistics from './Statistics';
import generateShips from './helper';

class Game extends Component {
  constructor(props) {
    super(props);
    this.size = 8;
    this.ships = generateShips(this.size);
  }

  render() {
    return (
      <div className="game-dashboard">
        <Board className="player-board"
               size={this.size}
               isPlayer={true}
               ships={this.ships}
        />
        <Board className="opponent-board"
               size={this.size}
               isPlayer={false}
               ships={this.ships}
        />
        <Statistics/>
      </div>
    );

  }
}

export default Game;