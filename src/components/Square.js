import React, {Component} from 'react';
import classNames from 'classnames';

class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttonClass = {'square': true, 'ship': this.props.isShip};
    return (
      <button
        className={classNames(buttonClass)}
        onClick={() => {
        }}
      />
    );
  }
}

export default Square;