import React, {Component} from 'react';
import Board from './Board';
import Statistics from './Statistics';

class Game extends Component {
  constructor(props) {
    super(props);
    this.size = 8;
  }

  render() {
    return (
      <div className="game-dashboard">
        <Board className="player-board" size={this.size} isPlayer={true}/>
        <Board className="opponent-board" size={this.size} isPlayer={false}/>
        <Statistics/>
      </div>
    );

  }
}

export default Game;