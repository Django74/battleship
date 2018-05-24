import React, {Component} from 'react';
import Board from './Board';
import Console from './Console';
import generateShips from './helper';

class Game extends Component {
  constructor(props) {
    super(props);
    this.size = 8;
    if (sessionStorage.getItem('isFirstTime')) {

    }
    this.state={
      turn: 1,
      ships: [generateShips(this.size), generateShips(this.size)],
    };

    this.changeTurn = this.changeTurn.bind(this);
  }

  changeTurn() {
    let newTurn=this.state.turn;
    if (this.state.turn === 1) {
      newTurn++;
    } else {
      newTurn--;
    }
    this.setState({turn: newTurn});
  }

  render() {
    return (
      <div className="game-dashboard">
        <Board className="player-board"
               size={this.size}
               isPlayer={true}
               ships={this.state.ships}
               turn={this.state.turn}
               type="player"
        />
        <Board className="opponent-board"
               size={this.size}
               isPlayer={false}
               ships={this.state.ships}
               turn={this.state.turn}
               type="opponent"
        />
        <Console changeTurn={this.changeTurn}/>
      </div>
    );

  }
}

export default Game;