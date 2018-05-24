import React, {Component} from 'react';
import classNames from 'classnames';

class Square extends Component {
  constructor(props) {
    super(props);
    this.xCoord = this.props.xCoord;
    this.yCoord = this.props.yCoord;
  }

  render() {
    let isShip;
    if (this.props.type === 'player') {
      isShip = this.props.ships[this.props.coord];

    } else {

    }
    const buttonClass = {'square': true, 'ship': isShip};
    return (
      <button
        className={classNames(buttonClass)}
        onClick={() => {
          if (this.props.handleAttack) {
            this.props.handleAttack(this.xCoord, this.yCoord);
          }
        }}
        disabled={this.props.type === 'player'}
      />
    );
  }
}

export default Square;