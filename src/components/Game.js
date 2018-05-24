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
      turn: 0,
      ships: [generateShips(this.size), generateShips(this.size)],
      playerOneHp: 16,
      playerTwoHp: 16,
    };

    this.changeTurn = this.changeTurn.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
  }

  changeTurn() {
    this.setState({turn: this.getOppositeTurn()});
  }

  handleAttack(x, y) {
    const coord = `(${x},${y})`;
    if (this.ships[this.getOppositeTurn()][coord]) {
      console.log(x);
      console.log(y);
    }
  }

  getOppositeTurn() {
    let newTurn = this.state.turn;
    if (this.state.turn === 0) {
      newTurn++;
    } else {
      newTurn--;
    }
    return newTurn;
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
               handleAttack={this.handleAttack}
        />
        <Console
          changeTurn={this.changeTurn}
        />
      </div>
    );

  }
}

export default Game;