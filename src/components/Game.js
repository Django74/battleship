import React, {Component} from 'react';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.size = 8;
  }

  render() {
    return (
        <div className="game-dashboard">
          <Board className="player-board" size={this.size}/>
          <Board className="opponent-board" size={this.size}/>
        </div>
    );
  }
}

export default Game;