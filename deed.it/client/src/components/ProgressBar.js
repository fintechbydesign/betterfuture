import React, { Component } from 'react';
import { Line } from 'rc-progress';
import './ProgressBar.css';

class ProgressBar extends Component {

  static getDerivedStateFromProps (props, state) {
    return { ...state, ...props };
  }

  constructor (props) {
    super(props);
    this.autoIncrement = this.autoIncrement.bind(this);
    this.autoIncrementProgress = this.autoIncrementProgress.bind(this);
    const { duration } = props;
    if (duration) {
      const autoIncrementInterval = duration / 20;
      this.state = { autoIncrementInterval, percent: 0 }
      setTimeout(this.autoIncrement, autoIncrementInterval);
    }
  }

  componentWillUnmount () {
    this.autoIncrementProgress = () => undefined;
  }

  autoIncrement () {
    this.autoIncrementProgress();
  }

  autoIncrementProgress () {
    const { autoIncrementInterval, percent } = this.state;
    if (percent < 100) {
      let increment;
      if (percent < 50) {
        increment = 10;
      } else if (percent < 80) {
        increment = 5;
      } else {
        increment = 1;
      }
      const newPercent = percent + increment;
      this.setState({
        ...this.state,
        percent: newPercent
      });
      setTimeout(this.autoIncrement, autoIncrementInterval);
    }
  }

  render () {
    const {className, color, percent, style, text} = this.state;
    const containerProps = {
      className: (className) ? `ProgressBar-container ${className}` : 'ProgressBar-container',
      style: { ...style, color }
    };
    const lineProps = {
      percent,
      strokeColor: (color) ? color : '#002E4A'
    };
    return (
      <div {...containerProps} >
        <Line {...lineProps} />
        {text}
      </div>
    );
  }
}

export default ProgressBar;
