import React, { Component } from 'react';
import send from './send.js';

class Results extends Component {

  constructor (props) {
    super(props);
    const { iterations, phrase } = props;
    this.state = {
      fetchState: 'fetching',
      iterations,
      phrase
    };
  }

  async componentDidMount () {
    try {
      const { iterations, phrase } = this.state;
      await send(iterations, phrase);  
      this.setState({
        ...this.state,
        fetchState: 'complete'
      });
    } catch (err) {
      this.setState({
        ...this.state,
        fetchState: 'error'
      });
    }
  }

  render() {
    let message = `Phrase: ${this.state.phrase}, Iterations: ${this.state.iterations}`;
    switch(this.state.fetchState) {
      case 'fetching':
        message = `${message} FETCHING`;
        break;
      case 'complete':
        message = `${message} COMPLETE`;
        break;
      default:
        message = `${message} ERROR`;
    };

    return (
      <div>
        <h1>AWSome Chinese Whispers</h1>
        <p>{message}</p>
        <button onClick={this.props.submit}>Try Again</button>
      </div>
    );
  }
}

export default Results;
