import React, {Component} from 'react';
import classNames from 'classnames';

class Square extends Component {
  constructor(props) {
    super(props);
    this.xCoord = this.props.xCoord;
    this.yCoord = this.props.yCoord;
    this.coord = this.props.coord;
  }

  checkStatus() {
    let isShip = false;
    let isHit = false;
    let isMiss = false;

    if (this.props.type === 'player') {
      let playerNumber = this.props.turn;
      isHit = this.props.playersShipHit[playerNumber][this.coord];
      isShip = this.props.ships[this.coord];
    } else {
      let playerNumber = this.props.turn === 0 ? 1 : 0;
      isHit = this.props.playersShipHit[playerNumber][this.coord];
      isMiss = this.props.playerMisses[playerNumber][this.coord];
    }
    return [isHit, isMiss, isShip];
  }

  render() {
    let isHit;
    let isShip;
    let isMiss;
    [isHit, isMiss, isShip] = this.checkStatus();
    const buttonClass = {
      'square': true,
      'ship': isShip,
      'hit': isHit,
      'miss': isMiss,
    };

    return (
      <button
        className={classNames(buttonClass)}
        onClick={() => {
          if (this.props.handleAttack) {
            this.props.handleAttack(this.coord);
          }
        }}
        disabled={this.props.type === 'player' || this.props.hitAlready}
      />
    );
  }
}

export default Square;