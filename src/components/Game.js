import React, {Component} from 'react';
import Board from './Board';
import Console from './Console';
import {generateShips, isInvalidCoord} from './helper';

class Game extends Component {
  constructor(props) {
    super(props);
    this.size = 8;
    if (sessionStorage.getItem('isFirstTime')) {

    }
    this.state = {
      started: false,
      turn: 0,
      ships: [{}, {}],
      playersHealth: [16, 16],
      playersShipHit: [{}, {}],
      playerMisses: [{}, {}],
      playerHints: [{}, {}],
      hitAlready: false,
    };

    this.changeTurn = this.changeTurn.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidUpdate() {
    if (this.state.playersHealth[0] === 0 || this.state.playersHealth[1] === 0) {
      alert(`Player: ${this.state.turn + 1} WON`);
    }
  }

  changeTurn() {
    if (window.confirm("Are you sure you want to change turns?")) {
      this.setState({
        turn: this.getOppositeTurn(),
        hitAlready: false,
      });
    }
  }

  handleAttack(coord, xCoord, yCoord) {
    let newHealth = [...this.state.playersHealth];
    let newHits = [...this.state.playersShipHit];
    let newMisses = [...this.state.playerMisses];
    let currentTurn = this.getOppositeTurn();

    // if hit decrease health and update accordingly
    // else miss
    if (this.state.ships[currentTurn][coord]) {
      // update health
      newHealth[currentTurn]--;

      // update tracked ships
      newHits[currentTurn][coord] = true;
    } else {
      //update missed ships
      newMisses[this.getOppositeTurn()][coord] = true;

      // update ship hints
      this.updateHints(currentTurn, coord, xCoord, yCoord);
    }

    this.setState({
      playersHealth: newHealth,
      playersShipHit: newHits,
      playerMisses: newMisses,
      hitAlready: true,
    });
  }

  updateHints(turn, coord, xCoord, yCoord) {
    // initialize map
    let testMap = {};

    // iterate through adjacent squares and if is hint, mark in map
    // for both rows in adjacent x axis
    let currentYPoint = yCoord - 1;
    let xForward = xCoord + 1;
    let xBackward = xCoord - 1;
    for (let i = 0; i < 3; i++) {
      let forwardCoord = `(${xForward},${currentYPoint + i})`;
      if (this.state.ships[turn][forwardCoord]) {
        testMap[forwardCoord] = true;
      }

      let backwardCoord = `(${xBackward},${currentYPoint + i})`;
      if (this.state.ships[turn][backwardCoord]) {
        testMap[backwardCoord] = true;
      }
    }
    // for remaining squares
    for (let i = 0; i < 3; i+= 2) {
      let adjacentCoord = `(${xCoord},${currentYPoint + i})`;
      if (this.state.ships[turn][adjacentCoord]) {
        testMap[adjacentCoord] = true;
      }
    }

    // update state
    let newHints = [...this.state.playerHints];
    newHints[turn] = Object.assign(this.state.playerHints[turn], testMap);
    this.setState({playerHints: newHints});
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

  start() {
    this.setState({
      turn: 0,
      ships: [generateShips(this.size), generateShips(this.size)],
      playersHealth: [16, 16],
      playersShipHit: [{}, {}],
      playerMisses: [{}, {}],
      hitAlready: false,
      started: true,
    })
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
               playerHints={this.state.playerHints}
        />
        <Console
          changeTurn={this.changeTurn}
          start={this.start}
          started={this.state.started}
        />
      </div>
    );

  }
}

export default Game;