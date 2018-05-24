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
      playersHealth: [16,16],
      playersShipHit: [{},{}],
    };

    this.changeTurn = this.changeTurn.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
  }

  changeTurn() {
    if(window.confirm("Are you sure you want to change turns?")) {
      this.setState({turn: this.getOppositeTurn()});
    }
  }

  handleAttack(coord) {
    if (this.state.ships[this.getOppositeTurn()][coord]) {
      // update health
      let newHealth = [...this.state.playersHealth];
      newHealth[this.getOppositeTurn()]--;

      //update tracked ships
      let newHits = [...this.state.playersShipHit];
      newHits[this.getOppositeTurn()][coord] = true;

      this.setState({
        playersHealth: newHealth,
        playersShipHit: newHits,
      })
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
               playersShipHit={this.state.playersShipHit}
        />
        <Board className="opponent-board"
               size={this.size}
               isPlayer={false}
               ships={this.state.ships}
               turn={this.state.turn}
               type="opponent"
               playersShipHit={this.state.playersShipHit}
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