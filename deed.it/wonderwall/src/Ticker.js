import React, { Component } from 'react';
import './Ticker.css';

class Ticker extends Component {

  static getDerivedStateFromProps (nextProps, prevState) {
    return { ...nextProps };
  }

  constructor (props) {
    super(props);
    this.state = { ...props };
  }

  render () {
    const tickerItems = this.state.items.map((item) => (<div className={'Ticker-item'}>{item}</div>));
    return (
      <div className='Ticker-wrap'>
        <div className='Ticker'>
          {tickerItems}
        </div>
      </div>
    );
  }
}

export default Ticker;