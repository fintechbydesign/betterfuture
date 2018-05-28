import React, { Component } from 'react';
import './Ticker.css';

class Ticker extends Component {

  // use this function to cache all incoming news items
  // it could get called more often than new news items hence the 'latestNews' check
  // never update on incoming news items
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.latestNews === prevState.latestNews) return null;
    return {
      ...prevState,
      latestNews: nextProps.latestNews,
      newNews: [...prevState.newNews, nextProps.latestNews],
      update: false
    }
  }

  constructor (props) {
    super(props);

    this.reportNews = this.reportNews.bind(this);

    this.state = {
      currentNews: [],
      latestNews: undefined,
      newNews: [],
      update: false
    };

    setTimeout(this.reportNews, 15 * 1000);
  }

  // only update from reportNews() calls
  shouldComponentUpdate (nextProps, nextState) {
    return nextState.update;
  }

  reportNews () {
    const maxItems = 5;
    const newItems = this.state.newNews.length;
    if (newItems > 0) {
      if (newItems > maxItems) {
        this.setState({
          ...this.state,
          currentNews: this.state.newNews.splice(0, maxItems),
          update: true
        });
      } else {
        this.setState({
          ...this.state,
          currentNews: [...this.state.newNews, ...this.state.currentNews].slice(0, maxItems),
          newNews: [],
          update: true
        });
      }
    } else {
      this.setState({
        ...this.state,
        update: false
      });
    }
    setTimeout(this.reportNews, 10 * 1000);
  }

  render () {
    const tickerItems = this.state.currentNews.map((news, index) =>
      (<div key={index} className={'Ticker-item'}>{news.src}</div>));
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