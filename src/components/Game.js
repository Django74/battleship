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
      playerMisses: [{}, {}],
      hitAlready: false,
    };

    this.changeTurn = this.changeTurn.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
  }

  changeTurn() {
    if(window.confirm("Are you sure you want to change turns?")) {
      this.setState({
        turn: this.getOppositeTurn(),
        hitAlready: false,
      });
    }
  }

  handleAttack(coord) {
    let newHealth = this.state.playersHealth;
    let newHits = this.state.playersShipHit;
    let newMisses = this.state.playerMisses;

    // if hit decrease health and update accordingly
    // else miss
    if (this.state.ships[this.getOppositeTurn()][coord]) {
      // update health
      newHealth = [...this.state.playersHealth];
      newHealth[this.getOppositeTurn()]--;

      // update tracked ships
      let newHits = [...this.state.playersShipHit];
      newHits[this.getOppositeTurn()][coord] = true;
    } else {
      //update missed ships
      let newMisses = [...this.state.playerMisses];
      newMisses[this.getOppositeTurn()][coord] = true;
    }

    this.setState({
      playersHealth: newHealth,
      playersShipHit: newHits,
      playerMisses: newMisses,
      hitAlready: true,
    });
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
               playerMisses={this.state.playerMisses}
               handleAttack={this.handleAttack}
               hitAlready={this.state.hitAlready}
        />
        <Console
          changeTurn={this.changeTurn}
        />
      </div>
    );

  }
}

export default Game;